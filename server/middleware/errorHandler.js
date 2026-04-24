module.exports = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || '服务器内部错误'
  });
};
