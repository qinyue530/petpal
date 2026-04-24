const Post = require('../models/Post');
const User = require('../models/User');
const { Op } = require('sequelize');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  console.log('=== 发布帖子接口调用 ===');
  console.log('用户ID:', req.user.id);
  console.log('请求参数:', req.body);
  try {
    const { topic_id, content, images } = req.body;
    if (!content) {
      console.log('发布失败: 内容不能为空');
      return error(res, 400, '内容不能为空');
    }

    console.log('创建帖子');
    const post = await Post.create({
      user_id: req.user.id,
      topic_id,
      content,
      images: images ? JSON.stringify(images) : null
    });
    console.log('发布成功，帖子ID:', post.id);
    success(res, post, '发布成功');
  } catch (err) {
    console.error('发布失败:', err.message);
    error(res, 500, err.message);
  }
};

const list = async (req, res) => {
  console.log('=== 获取帖子列表接口调用 ===');
  console.log('请求参数:', req.query);
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const { topic_id } = req.query;

    const where = {};
    if (topic_id) where.topic_id = topic_id;

    console.log('查询条件:', where);
    const { count, rows } = await Post.findAndCountAll({
      where,
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'avatar']
      }],
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    console.log('查询结果: 总数', count, '条，返回', rows.length, '条');
    success(res, { total: count, list: rows });
  } catch (err) {
    console.error('获取帖子列表失败:', err.message);
    error(res, 500, err.message);
  }
};

const getDetail = async (req, res) => {
  console.log('=== 获取帖子详情接口调用 ===');
  console.log('帖子ID:', req.params.id);
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'avatar']
      }]
    });
    if (!post) {
      console.log('帖子不存在:', id);
      return error(res, 404, '帖子不存在');
    }
    console.log('获取帖子详情成功:', post.id);
    success(res, post);
  } catch (err) {
    console.error('获取帖子详情失败:', err.message);
    error(res, 500, err.message);
  }
};

const deletePost = async (req, res) => {
  console.log('=== 删除帖子接口调用 ===');
  console.log('用户ID:', req.user.id);
  console.log('帖子ID:', req.params.id);
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      console.log('帖子不存在:', id);
      return error(res, 404, '帖子不存在');
    }
    if (post.user_id !== req.user.id) {
      console.log('无权操作: 用户', req.user.id, '尝试删除用户', post.user_id, '的帖子');
      return error(res, 403, '无权操作');
    }

    console.log('删除帖子:', id);
    await post.destroy();
    console.log('删除成功');
    success(res, null, '删除成功');
  } catch (err) {
    console.error('删除帖子失败:', err.message);
    error(res, 500, err.message);
  }
};

const like = async (req, res) => {
  console.log('=== 点赞帖子接口调用 ===');
  console.log('帖子ID:', req.params.id);
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      console.log('帖子不存在:', id);
      return error(res, 404, '帖子不存在');
    }

    post.likes += 1;
    await post.save();
    console.log('点赞成功，当前点赞数:', post.likes);
    success(res, { likes: post.likes }, '点赞成功');
  } catch (err) {
    console.error('点赞失败:', err.message);
    error(res, 500, err.message);
  }
};

const unlike = async (req, res) => {
  console.log('=== 取消点赞接口调用 ===');
  console.log('帖子ID:', req.params.id);
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      console.log('帖子不存在:', id);
      return error(res, 404, '帖子不存在');
    }
    if (post.likes > 0) post.likes -= 1;

    await post.save();
    console.log('取消点赞成功，当前点赞数:', post.likes);
    success(res, { likes: post.likes }, '取消点赞成功');
  } catch (err) {
    console.error('取消点赞失败:', err.message);
    error(res, 500, err.message);
  }
};

module.exports = { create, list, getDetail, delete: deletePost, like, unlike };
