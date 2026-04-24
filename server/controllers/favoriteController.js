const Favorite = require('../models/Favorite');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const add = async (req, res) => {
  try {
    const { target_id, target_type } = req.body;
    if (!target_id || !target_type) return error(res, 400, '参数不完整');

    // 检查是否已收藏
    const existing = await Favorite.findOne({
      where: { user_id: req.user.id, target_id, target_type }
    });
    if (existing) return error(res, 400, '已收藏');

    const favorite = await Favorite.create({
      user_id: req.user.id,
      target_id,
      target_type
    });
    success(res, favorite, '收藏成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const remove = async (req, res) => {
  try {
    const { target_id, target_type } = req.body;
    if (!target_id || !target_type) return error(res, 400, '参数不完整');

    const favorite = await Favorite.findOne({
      where: { user_id: req.user.id, target_id, target_type }
    });
    if (!favorite) return error(res, 404, '收藏不存在');

    await favorite.destroy();
    success(res, null, '取消收藏成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { target_type } = req.query;

    const where = { user_id: req.user.id };
    if (target_type) where.target_type = target_type;

    const { count, rows } = await Favorite.findAndCountAll({
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

const check = async (req, res) => {
  try {
    const { target_id, target_type } = req.query;
    if (!target_id || !target_type) return error(res, 400, '参数不完整');

    const favorite = await Favorite.findOne({
      where: { user_id: req.user.id, target_id, target_type }
    });
    success(res, { is_favorited: !!favorite });
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { add, remove, list, check };
