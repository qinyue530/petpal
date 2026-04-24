const Product = require('../models/Product');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { category_id, keyword } = req.query;

    const where = {};
    if (category_id) where.category_id = category_id;
    if (keyword) where.name = { [Op.like]: `%${keyword}%` };

    const { count, rows } = await Product.findAndCountAll({
      where,
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
    const product = await Product.findByPk(id);
    if (!product) return error(res, 404, '商品不存在');
    success(res, product);
  } catch (err) {
    error(res, 500, err.message);
  }
};

const search = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { keyword } = req.query;

    if (!keyword) return error(res, 400, '搜索关键词不能为空');

    const { count, rows } = await Product.findAndCountAll({
      where: {
        name: { [Op.like]: `%${keyword}%` }
      },
      limit,
      offset,
      order: [['sales', 'DESC']]
    });
    success(res, { total: count, list: rows });
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { list, getDetail, search };
