const sequelize = require('../config/database');
const { success, error } = require('../utils/response');

const create = async (req, res) => {
  try {
    const { content, contact, type } = req.body;
    if (!content) return error(res, 400, '反馈内容不能为空');

    const feedback = await sequelize.query(
      'INSERT INTO feedbacks (user_id, content, contact, type, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      { replacements: [req.user.id, content, contact || null, type || 'suggestion'], type: 'INSERT' }
    );

    success(res, { id: feedback[0] }, '提交成功');
  } catch (err) {
    error(res, 500, err.message);
  }
};

module.exports = { create };
