const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const generateOrderNo = () => {
  return 'ORD' + Date.now() + Math.random().toString(36).substring(2, 8).toUpperCase();
};

const create = async (req, res) => {
  try {
    const { address, phone, remark, cart_id } = req.body;
    if (!address) return error(res, 400, '收货地址不能为空');
    if (!phone) return error(res, 400, '联系电话不能为空');

    // 从购物车结算
    let cart;
    if (cart_id) {
      cart = await Order.findOne({
        where: { id: cart_id, user_id: req.user.id, status: 'cart' },
        include: [{ model: OrderItem }]
      });
    } else {
      cart = await Order.findOne({
        where: { user_id: req.user.id, status: 'cart' },
        include: [{ model: OrderItem }]
      });
    }

    if (!cart || !cart.OrderItems || cart.OrderItems.length === 0) {
      return error(res, 400, '购物车为空');
    }

    // 创建正式订单
    const order = await Order.create({
      user_id: req.user.id,
      order_no: generateOrderNo(),
      total_price: cart.total_price,
      status: 'pending',
      address,
      phone,
      remark
    });

    // 将购物车商品转移到新订单
    for (const item of cart.OrderItems) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        spec: item.spec,
        price: item.price,
        quantity: item.quantity
      });
    }

    // 清空购物车
    await OrderItem.destroy({ where: { order_id: cart.id } });
    await cart.destroy();

    const orderWithItems = await Order.findByPk(order.id, {
      include: [{ model: OrderItem }]
    });
    success(res, orderWithItems, '下单成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { status } = req.query;

    const where = { user_id: req.user.id };
    if (status) where.status = status;

    const { count, rows } = await Order.findAndCountAll({
      where,
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

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id, user_id: req.user.id },
      include: [{ model: OrderItem }]
    });
    if (!order) return error(res, 404, '订单不存在');
    success(res, order);
  } catch (err) {
    error(res, 500, err.message);
  }
};

const cancel = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!order) return error(res, 404, '订单不存在');
    if (!['pending', 'paid'].includes(order.status)) {
      return error(res, 400, '当前状态不可取消');
    }

    order.status = 'cancelled';
    await order.save();
    success(res, order, '取消成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const pay = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!order) return error(res, 404, '订单不存在');
    if (order.status !== 'pending') return error(res, 400, '当前状态不可支付');

    order.status = 'paid';
    await order.save();
    success(res, order, '支付成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create, list, getDetail, cancel, pay };
