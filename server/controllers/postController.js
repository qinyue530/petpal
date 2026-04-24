const Post = require('../models/Post');
const User = require('../models/User');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  try {
    const { topic_id, content, images } = req.body;
    if (!content) return error(res, 400, '内容不能为空');

    const post = await Post.create({
      user_id: req.user.id,
      topic_id,
      content,
      images: images ? JSON.stringify(images) : null
    });
    success(res, post, '发布成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { topic_id } = req.query;

    const where = {};
    if (topic_id) where.topic_id = topic_id;

    const { count, rows } = await Post.findAndCountAll({
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

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'username', 'avatar']
      }]
    });
    if (!post) return error(res, 404, '帖子不存在');
    success(res, post);
  } catch (err) {
    error(res, 500, err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return error(res, 404, '帖子不存在');
    if (post.user_id !== req.user.id) return error(res, 403, '无权操作');

    await post.destroy();
    success(res, null, '删除成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return error(res, 404, '帖子不存在');

    post.likes += 1;
    await post.save();
    success(res, { likes: post.likes }, '点赞成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const unlike = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return error(res, 404, '帖子不存在');
    if (post.likes > 0) post.likes -= 1;

    await post.save();
    success(res, { likes: post.likes }, '取消点赞成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create, list, getDetail, delete: deletePost, like, unlike };
