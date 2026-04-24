const User = require('../models/User');
const { success, error } = require('../utils/response');

const updateProfile = async (req, res) => {
  try {
    const { username, avatar, desc } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return error(res, 404, '用户不存在');

    if (username !== undefined) user.username = username;
    if (avatar !== undefined) user.avatar = avatar;
    if (desc !== undefined) user.desc = desc;

    await user.save();
    success(res, user, '更新成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return error(res, 404, '用户不存在');
    success(res, user);
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { updateProfile, getProfile };
