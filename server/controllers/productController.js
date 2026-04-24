const Product = require('../models/Product');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const list = async (req, res) => {
  console.log('=== 获取商品列表接口调用 ===');
  console.log('请求参数:', req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { category_id, keyword } = req.query;

    const where = {};
    if (category_id) where.category_id = category_id;
    if (keyword) where.name = { [Op.like]: `%${keyword}%` };

    console.log('查询条件:', where);
    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    console.log('查询结果: 总数', count, '条，返回', rows.length, '条');
    success(res, { total: count, list: rows });
  } catch (err) {
    console.error('获取商品列表失败:', err.message);
    error(res, 500, err.message);
  }
};

const getDetail = async (req, res) => {
  console.log('=== 获取商品详情接口调用 ===');
  console.log('商品ID:', req.params.id);
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      console.log('商品不存在:', id);
      return error(res, 404, '商品不存在');
    }
    console.log('获取商品详情成功:', product.name);
    success(res, product);
  } catch (err) {
    console.error('获取商品详情失败:', err.message);
    error(res, 500, err.message);
  }
};

const search = async (req, res) => {
  console.log('=== 搜索商品接口调用 ===');
  console.log('请求参数:', req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { keyword } = req.query;

    if (!keyword) {
      console.log('搜索失败: 搜索关键词不能为空');
      return error(res, 400, '搜索关键词不能为空');
    }

    console.log('搜索关键词:', keyword);
    const { count, rows } = await Product.findAndCountAll({
      where: {
        name: { [Op.like]: `%${keyword}%` }
      },
      limit,
      offset,
      order: [['sales', 'DESC']]
    });
    console.log('搜索结果: 总数', count, '条，返回', rows.length, '条');
    success(res, { total: count, list: rows });
  } catch (err) {
    console.error('搜索商品失败:', err.message);
    error(res, 500, err.message);
  }
};

module.exports = { list, getDetail, search };
