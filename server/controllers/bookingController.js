const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  try {
    const { service_id, pet_id, merchant_id, date, time, remark } = req.body;
    if (!service_id || !date || !time) {
      return error(res, 400, '服务ID、日期和时间不能为空');
    }

    const booking = await Booking.create({
      user_id: req.user.id,
      service_id,
      pet_id,
      merchant_id,
      date,
      time,
      status: 'pending',
      remark
    });
    success(res, booking, '预约成功');
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

    const { count, rows } = await Booking.findAndCountAll({
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

const cancel = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({
      where: { id, user_id: req.user.id }
    });
    if (!booking) return error(res, 404, '预约不存在');
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return error(res, 400, '当前状态不可取消');
    }

    booking.status = 'cancelled';
    await booking.save();
    success(res, booking, '取消成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create, list, cancel };
