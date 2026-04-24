module.exports = {
  success: (res, data = null, message = 'success') => {
    res.json({ code: 200, message, data });
  },
  error: (res, code = 500, message = '操作失败') => {
    res.status(code).json({ code, message });
  }
};
