-- 宠物小程序数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS pet_companion DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户并授权
CREATE USER IF NOT EXISTS 'pet_user'@'localhost' IDENTIFIED BY 'pet_password';
GRANT ALL PRIVILEGES ON pet_companion.* TO 'pet_user'@'localhost';
FLUSH PRIVILEGES;

-- 使用数据库
USE pet_companion;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    phone VARCHAR(11) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(255),
    desc VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 宠物表
CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(30) NOT NULL,
    breed VARCHAR(50),
    age INT,
    gender ENUM('male', 'female'),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 服务分类表
CREATE TABLE IF NOT EXISTS service_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 服务表
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE
);

-- 商家表
CREATE TABLE IF NOT EXISTS merchants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    rating DECIMAL(3,1) DEFAULT 0,
    image VARCHAR(255),
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 预约表
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    merchant_id INT NOT NULL,
    pet_id INT NOT NULL,
    appointment_time DATETIME NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (merchant_id) REFERENCES merchants(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- 社区话题表
CREATE TABLE IF NOT EXISTS topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 社区帖子表
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    topic_id INT,
    content TEXT NOT NULL,
    image VARCHAR(255),
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL
);

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 商品分类表
CREATE TABLE IF NOT EXISTS product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 商品表
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE CASCADE
);

-- 购物车表
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, product_id)
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 订单商品表
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 疫苗表
CREATE TABLE IF NOT EXISTS vaccines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- 初始化数据
-- 服务分类
INSERT INTO service_categories (name, icon) VALUES
('宠物美容', '美容图标'),
('宠物寄养', '寄养图标'),
('宠物医疗', '医疗图标'),
('宠物训练', '训练图标'),
('宠物摄影', '摄影图标');

-- 服务
INSERT INTO services (category_id, name, price, description, image) VALUES
(1, '宠物洗澡', 88.00, '专业宠物洗澡服务，包括洗澡、吹干、梳理', '洗澡图片'),
(1, '宠物剪毛', 128.00, '专业宠物剪毛服务，根据宠物品种和需求定制', '剪毛图片'),
(2, '宠物寄养', 120.00, '24小时专业宠物寄养服务，提供舒适的居住环境', '寄养图片'),
(3, '宠物体检', 150.00, '全面的宠物体检服务，包括身体检查、血液检查等', '体检图片'),
(4, '基础训练', 200.00, '宠物基础训练，包括坐下、握手、趴下等基本指令', '训练图片');

-- 商家
INSERT INTO merchants (name, address, phone, rating, image, latitude, longitude) VALUES
('宠物乐园', '北京市朝阳区建国路88号', '13800138000', 4.8, '商家图片1', 39.9042, 116.4074),
('萌宠之家', '北京市海淀区中关村大街1号', '13900139000', 4.6, '商家图片2', 39.9847, 116.3055),
('宠物医院', '北京市西城区西单大街120号', '13700137000', 4.9, '商家图片3', 39.9139, 116.3661);

-- 社区话题
INSERT INTO topics (name) VALUES
('全部'),
('宠物日常'),
('宠物训练'),
('宠物健康'),
('宠物美食'),
('宠物用品');

-- 商品分类
INSERT INTO product_categories (name, icon) VALUES
('宠物食品', '食品图标'),
('宠物用品', '用品图标'),
('宠物玩具', '玩具图标'),
('宠物零食', '零食图标'),
('宠物医疗', '医疗图标');

-- 商品
INSERT INTO products (category_id, name, price, stock, description, image) VALUES
(1, '宠物狗粮', 99.00, 100, '高品质宠物狗粮，富含营养，适合各种犬种', '狗粮图片'),
(2, '宠物猫砂', 29.00, 200, '膨润土猫砂，吸水结团，除臭效果好', '猫砂图片'),
(3, '宠物玩具', 49.00, 150, '耐咬宠物玩具，适合狗狗玩耍', '玩具图片'),
(4, '宠物零食', 39.00, 180, '健康宠物零食，训练奖励专用', '零食图片'),
(5, '宠物牵引绳', 59.00, 120, '舒适宠物牵引绳，适合遛狗使用', '牵引绳图片');

-- 用户（密码使用MD5加密，实际生产环境应使用更安全的加密方式）
INSERT INTO users (username, phone, password, avatar, desc) VALUES
('宠物主人', '13812345678', 'e10adc3949ba59abbe56e057f20f883e', '用户头像1', '爱宠人士'),
('猫咪控', '13912345678', 'e10adc3949ba59abbe56e057f20f883e', '用户头像2', '猫咪爱好者');

-- 宠物
INSERT INTO pets (user_id, name, type, breed, age, gender, avatar) VALUES
(1, '小白', '狗狗', '拉布拉多', 2, 'male', '宠物头像1'),
(1, '小花', '猫咪', '英短', 1, 'female', '宠物头像2'),
(2, '小黑', '猫咪', '美短', 3, 'male', '宠物头像3');

-- 社区帖子
INSERT INTO posts (user_id, topic_id, content, image, likes, comments) VALUES
(1, 2, '我家狗狗今天学会了新技能，太聪明了！分享一下它的训练过程...', '帖子图片1', 23, 5),
(2, 2, '分享一下我家猫咪的日常，是不是很可爱？它最近特别喜欢玩这个玩具...', '帖子图片2', 45, 12),
(1, 3, '最近天气变化较大，宠物容易生病，大家要注意给宠物保暖，定期检查健康状况...', NULL, 67, 18);

-- 评论
INSERT INTO comments (post_id, user_id, content) VALUES
(1, 2, '好厉害！我家狗狗还在学习中'),
(1, 1, '谢谢分享，我也试试这个训练方法'),
(2, 1, '太可爱了！是什么品种的猫咪？');

-- 疫苗
INSERT INTO vaccines (pet_id, name, date, status) VALUES
(1, '狂犬疫苗', '2026-06-15', 'pending'),
(1, '犬瘟热疫苗', '2026-07-20', 'pending'),
(2, '猫三联疫苗', '2026-06-10', 'pending');

-- 购物车
INSERT INTO cart (user_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 2, 1);

-- 订单
INSERT INTO orders (user_id, total_price, status) VALUES
(1, 197.00, 'completed'),
(2, 29.00, 'pending');

-- 订单商品
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 99.00),
(1, 3, 2, 49.00),
(2, 2, 1, 29.00);

-- 预约
INSERT INTO appointments (user_id, service_id, merchant_id, pet_id, appointment_time, status) VALUES
(1, 1, 1, 1, '2026-04-25 14:00:00', 'confirmed'),
(2, 3, 3, 3, '2026-04-26 10:00:00', 'pending');

-- 查看数据库结构
SHOW TABLES;

-- 查看用户权限
SHOW GRANTS FOR 'pet_user'@'localhost';
