const Comment = require('../models/Comment');
const User = require('../models/User');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  try {
    const { post_id, product_id, content, rating, parent_id } = req.body;
    if (!content) return error(res, 400, '评论内容不能为空');

    const comment = await Comment.create({
      user_id: req.user.id,
      post_id,
      product_id,
      content,
      rating,
      parent_id
    });
    success(res, comment, '评论成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { post_id, product_id } = req.query;

    const where = {};
    if (post_id) where.post_id = post_id;
    if (product_id) where.product_id = product_id;

    const { count, rows } = await Comment.findAndCountAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'username', 'avatar']
      }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    success(res, { total: count, list: rows });
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create, list };
