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
  try {
    const { openid } = req.body;
    if (!openid) return error(res, 400, 'openid不能为空');

    let user = await User.findOne({ where: { openid } });
    if (!user) {
      user = await User.create({ openid });
    }

    const token = generateToken(user);
    success(res, { token, user }, '登录成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const phoneLogin = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return error(res, 400, '手机号不能为空');

    let user = await User.findOne({ where: { phone } });
    if (!user) {
      user = await User.create({ phone });
    }

    const token = generateToken(user);
    success(res, { token, user }, '登录成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return error(res, 404, '用户不存在');
    success(res, user);
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { login, phoneLogin, getUserInfo };
