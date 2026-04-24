const Service = require('../models/Service');
const Merchant = require('../models/Merchant');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { category_id } = req.query;

    const where = {};
    if (category_id) where.category_id = category_id;

    const { count, rows } = await Service.findAndCountAll({
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
    const service = await Service.findByPk(id);
    if (!service) return error(res, 404, '服务不存在');

    let merchant = null;
    if (service.merchant_id) {
      merchant = await Merchant.findByPk(service.merchant_id);
    }

    success(res, { ...service.toJSON(), merchant });
  } catch (err) {
    error(res, 500, err.message);
  }
};

const getMerchants = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const { count, rows } = await Merchant.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    success(res, { total: count, list: rows });
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { list, getDetail, getMerchants };
