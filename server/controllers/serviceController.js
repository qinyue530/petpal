const Service = require('../models/Service');
const Merchant = require('../models/Merchant');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const list = async (req, res) => {
  console.log('=== 获取服务列表接口调用 ===');
  console.log('请求参数:', req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { category_id } = req.query;

    const where = {};
    if (category_id) where.category_id = category_id;

    console.log('查询条件:', where);
    const { count, rows } = await Service.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    console.log('查询结果: 总数', count, '条，返回', rows.length, '条');
    success(res, { total: count, list: rows });
  } catch (err) {
    console.error('获取服务列表失败:', err.message);
    error(res, 500, err.message);
  }
};

const getDetail = async (req, res) => {
  console.log('=== 获取服务详情接口调用 ===');
  console.log('服务ID:', req.params.id);
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      console.log('服务不存在:', id);
      return error(res, 404, '服务不存在');
    }

    console.log('服务存在:', service.name);
    let merchant = null;
    if (service.merchant_id) {
      console.log('查询商家信息:', service.merchant_id);
      merchant = await Merchant.findByPk(service.merchant_id);
      console.log('商家信息:', merchant ? merchant.name : '无');
    }

    console.log('获取服务详情成功');
    success(res, { ...service.toJSON(), merchant });
  } catch (err) {
    console.error('获取服务详情失败:', err.message);
    error(res, 500, err.message);
  }
};

const getMerchants = async (req, res) => {
  console.log('=== 获取商家列表接口调用 ===');
  console.log('请求参数:', req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    console.log('查询条件: 限制', limit, '条，偏移', offset, '条');
    const { count, rows } = await Merchant.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    console.log('查询结果: 总数', count, '条，返回', rows.length, '条');
    success(res, { total: count, list: rows });
  } catch (err) {
    console.error('获取商家列表失败:', err.message);
    error(res, 500, err.message);
  }
};

module.exports = { list, getDetail, getMerchants };
