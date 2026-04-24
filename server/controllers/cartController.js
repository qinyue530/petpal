const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const add = async (req, res) => {
  try {
    const { product_id, quantity = 1, spec } = req.body;
    if (!product_id) return error(res, 400, '商品ID不能为空');

    const product = await Product.findByPk(product_id);
    if (!product) return error(res, 404, '商品不存在');

    // 查找当前用户的 pending 状态购物车订单
    let cart = await Order.findOne({
      where: { user_id: req.user.id, status: 'cart' }
    });

    if (!cart) {
      cart = await Order.create({
        user_id: req.user.id,
        order_no: 'CART_' + Date.now(),
        total_price: 0,
        status: 'cart'
      });
    }

    // 检查购物车中是否已有该商品
    const existingItem = await OrderItem.findOne({
      where: { order_id: cart.id, product_id, spec: spec || null }
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await OrderItem.create({
        order_id: cart.id,
        product_id,
        product_name: product.name,
        product_image: product.image,
        spec: spec || null,
        price: product.price,
        quantity
      });
    }

    // 重新计算总价
    const items = await OrderItem.findAll({ where: { order_id: cart.id } });
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart.total_price = totalPrice;
    await cart.save();

    success(res, { cart_id: cart.id }, '添加成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Order.findAndCountAll({
      where: { user_id: req.user.id, status: 'cart' },
      include: [{ model: OrderItem }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    success(res, { total: count, list: rows });
  } catch (err) {
    error(res, 500, err.message);
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { item_id } = req.params;
    const { quantity } = req.body;
    if (quantity === undefined || quantity < 1) return error(res, 400, '数量不合法');

    const item = await OrderItem.findByPk(item_id);
    if (!item) return error(res, 404, '商品不存在');

    const cart = await Order.findByPk(item.order_id);
    if (!cart || cart.user_id !== req.user.id) return error(res, 403, '无权操作');

    item.quantity = quantity;
    await item.save();

    // 重新计算总价
    const items = await OrderItem.findAll({ where: { order_id: cart.id } });
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cart.total_price = totalPrice;
    await cart.save();

    success(res, item, '更新成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const remove = async (req, res) => {
  try {
    const { item_id } = req.params;
    const item = await OrderItem.findByPk(item_id);
    if (!item) return error(res, 404, '商品不存在');

    const cart = await Order.findByPk(item.order_id);
    if (!cart || cart.user_id !== req.user.id) return error(res, 403, '无权操作');

    await item.destroy();

    // 重新计算总价
    const items = await OrderItem.findAll({ where: { order_id: cart.id } });
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cart.total_price = totalPrice;
    await cart.save();

    success(res, null, '移除成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { add, list, updateQuantity, remove };
