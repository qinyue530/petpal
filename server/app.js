const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config');

// 加载所有模型（必须在 routes 之前）
require('./models/Category');
require('./models/User');
require('./models/Pet');
require('./models/Merchant');
require('./models/Service');
require('./models/Product');
require('./models/Order');
require('./models/OrderItem');
require('./models/Booking');
require('./models/Post');
require('./models/Topic');
require('./models/Comment');
require('./models/Favorite');
require('./models/Vaccine');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 确保上传目录存在
const uploadDir = path.join(__dirname, config.upload.dir);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件 - 提供上传的图片访问
app.use('/uploads', express.static(uploadDir));

// API 路由
app.use('/api', routes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ code: 404, message: '接口不存在', data: null });
});

// 全局错误处理
app.use(errorHandler);

// 启动服务器
app.listen(config.port, () => {
  console.log(`🚀 PetPal 后端服务已启动`);
  console.log(`📍 地址: http://localhost:${config.port}`);
  console.log(`🔗 API: http://localhost:${config.port}/api`);
  console.log(`📁 上传目录: ${uploadDir}`);
});

module.exports = app;
