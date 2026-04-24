const mysql = require('mysql2/promise');
const config = require('../config');

async function initDb() {
  // 1. 创建数据库
  const conn = await mysql.createConnection({ host: config.db.host, port: config.db.port, user: config.db.username, password: config.db.password });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.end();
  console.log('Database created:', config.db.database);

  // 2. 加载所有模型
  require('../models/Category');
  require('../models/User');
  require('../models/Pet');
  require('../models/Merchant');
  require('../models/Service');
  require('../models/Product');
  require('../models/Order');
  require('../models/OrderItem');
  require('../models/Booking');
  require('../models/Post');
  require('../models/Topic');
  require('../models/Comment');
  require('../models/Favorite');
  require('../models/Vaccine');

  // 3. 同步表结构
  const sequelize = require('../config/database');
  await sequelize.sync({ alter: true });
  console.log('All tables synced');
  process.exit(0);
}

initDb().catch(err => { console.error(err); process.exit(1); });
