const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const { success, error } = require('../utils/response');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, openid: user.openid, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

const login = async (req, res) => {
  console.log('=== 登录接口调用 ===');
  console.log('请求参数:', req.body);
  try {
    const { openid } = req.body;
    if (!openid) {
      console.log('登录失败: openid不能为空');
      return error(res, 400, 'openid不能为空');
    }

    console.log('查找用户:', openid);
    let user = await User.findOne({ where: { openid } });
    if (!user) {
      console.log('用户不存在，创建新用户');
      user = await User.create({ openid });
      console.log('新用户创建成功:', user.id);
    } else {
      console.log('用户存在:', user.id);
    }

    const token = generateToken(user);
    console.log('登录成功，生成token');
    success(res, { token, user }, '登录成功');
  } catch (err) {
    console.error('登录失败:', err.message);
    error(res, 500, err.message);
  }
};

const phoneLogin = async (req, res) => {
  console.log('=== 手机登录接口调用 ===');
  console.log('请求参数:', req.body);
  try {
    const { phone } = req.body;
    if (!phone) {
      console.log('登录失败: 手机号不能为空');
      return error(res, 400, '手机号不能为空');
    }

    console.log('查找用户:', phone);
    let user = await User.findOne({ where: { phone } });
    if (!user) {
      console.log('用户不存在，创建新用户');
      user = await User.create({ phone });
      console.log('新用户创建成功:', user.id);
    } else {
      console.log('用户存在:', user.id);
    }

    const token = generateToken(user);
    console.log('登录成功，生成token');
    success(res, { token, user }, '登录成功');
  } catch (err) {
    console.error('登录失败:', err.message);
    error(res, 500, err.message);
  }
};

const getUserInfo = async (req, res) => {
  console.log('=== 获取用户信息接口调用 ===');
  console.log('用户ID:', req.user.id);
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      console.log('用户不存在:', req.user.id);
      return error(res, 404, '用户不存在');
    }
    console.log('获取用户信息成功:', user.id);
    success(res, user);
  } catch (err) {
    console.error('获取用户信息失败:', err.message);
    error(res, 500, err.message);
  }
};

module.exports = { login, phoneLogin, getUserInfo };
