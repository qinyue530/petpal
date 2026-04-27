const sequelize = require('../config/database');

// 先加载所有模型，确保 sequelize.models 注册完成
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

async function seed() {
  const { Category, User, Merchant, Service, Product, Topic, Post } = sequelize.models;

  // 服务分类
  const serviceCategories = [
    { id: 1, name: '宠物美容', type: 'service', sort_order: 1 },
    { id: 2, name: '宠物寄养', type: 'service', sort_order: 2 },
    { id: 3, name: '宠物医疗', type: 'service', sort_order: 3 },
    { id: 4, name: '宠物训练', type: 'service', sort_order: 4 },
  ];

  // 商品分类
  const productCategories = [
    { id: 5, name: '宠物食品', type: 'product', sort_order: 1 },
    { id: 6, name: '宠物玩具', type: 'product', sort_order: 2 },
    { id: 7, name: '宠物零食', type: 'product', sort_order: 3 },
    { id: 8, name: '宠物用品', type: 'product', sort_order: 4 },
  ];

  // 商家
  const merchants = [
    { id: 1, name: '宠物乐园', description: '专业宠物美容与寄养服务', address: '幸福路88号', phone: '13800001111', rating: 4.8, image: '/images/merchant-petpark.jpg' },
    { id: 2, name: '宠物之家', description: '温馨宠物寄养与训练中心', address: '阳光大道66号', phone: '13800002222', rating: 4.6, image: '/images/merchant-pethome.jpg' },
    { id: 3, name: '宠物医院', description: '专业宠物医疗机构', address: '健康路99号', phone: '13800003333', rating: 4.9, image: '/images/merchant-pethospital.jpg' },
  ];

  // 服务
  const services = [
    { id: 1, merchant_id: 1, category_id: 1, name: '美容洗护', description: '专业宠物美容洗护服务，包含洗澡、修剪、造型', price: 88, unit: '次', duration: 60, status: 1 },
    { id: 2, merchant_id: 2, category_id: 2, name: '宠物寄养', description: '温馨舒适的宠物寄养环境，每日专人照料', price: 120, unit: '天', duration: 1440, status: 1 },
    { id: 3, merchant_id: 3, category_id: 3, name: '宠物医疗', description: '专业宠物诊疗服务，包含常规检查与治疗', price: 150, unit: '次', duration: 30, status: 1 },
    { id: 4, merchant_id: 2, category_id: 4, name: '宠物训练', description: '专业宠物行为训练，纠正不良习惯', price: 200, unit: '次', duration: 90, status: 1 },
  ];

  // 商品
  const products = [
    { id: 1, category_id: 5, name: '狗粮', description: '优质天然狗粮，营养丰富均衡', price: 99, stock: 500, image: '/uploads/products/dog-food.jpg', status: 1 },
    { id: 2, category_id: 6, name: '玩具', description: '耐咬宠物玩具，安全无毒材质', price: 49, stock: 300, image: '/uploads/products/toy.jpg', status: 1 },
    { id: 3, category_id: 7, name: '零食', description: '美味宠物零食，健康无添加', price: 39, stock: 800, image: '/uploads/products/snack.jpg', status: 1 },
    { id: 4, category_id: 8, name: '用品', description: '宠物日常用品，品质保证', price: 69, stock: 200, image: '/uploads/products/supply.jpg', status: 1 },
    { id: 5, category_id: 8, name: '猫砂', description: '强力除臭猫砂，结团效果好', price: 29, stock: 1000, image: '/uploads/products/cat-litter.jpg', status: 1 },
    { id: 6, category_id: 8, name: '牵引绳', description: '可伸缩宠物牵引绳，安全牢固', price: 59, stock: 150, image: '/uploads/products/leash.jpg', status: 1 },
  ];

  // 社区话题
  const topics = [
    { id: 1, name: '全部', description: '所有话题', sort_order: 0 },
    { id: 2, name: '宠物日常', description: '分享宠物的日常生活', sort_order: 1 },
    { id: 3, name: '宠物训练', description: '交流宠物训练经验', sort_order: 2 },
    { id: 4, name: '宠物健康', description: '讨论宠物健康知识', sort_order: 3 },
  ];

  // 社区帖子
  // 用户数据
  const users = [
    { id: 1, openid: 'test_openid', username: '宠物爱好者', avatar: '/images/avatar-user1.jpg' },
  ];

  // 社区帖子
  const posts = [
    { id: 1, user_id: 1, topic_id: 2, content: '今天带狗狗去公园玩，它玩得很开心！分享一下它的照片。', images: JSON.stringify(['/images/post-dog-park.jpg']), likes: 23, comments: 5 },
    { id: 2, user_id: 1, topic_id: 3, content: '我家猫咪最近学会了新技能，太聪明了！分享一下训练过程。', images: JSON.stringify(['/images/post-cat-daily.jpg']), likes: 45, comments: 12 },
    { id: 3, user_id: 1, topic_id: 4, content: '最近天气变化较大，宠物容易生病，大家要注意给宠物保暖，定期检查健康状况。', images: JSON.stringify(['/images/post-pet-health.jpg']), likes: 67, comments: 18 },
  ];

  // 修正商品图片路径
  const updatedProducts = [
    { ...products[0], image: '/images/product-dogfood.jpg' },
    { ...products[1], image: '/images/product-toy.jpg' },
    { ...products[2], image: '/images/product-snack.jpg' },
    { ...products[3], image: '/images/product-supplies.jpg' },
    { ...products[4], image: '/images/product-catlitter.jpg' },
    { ...products[5], image: '/images/product-leash.jpg' }
  ];

  // 修正服务图片路径
  const updatedServices = [
    { ...services[0], image: '/images/service-grooming.jpg' },
    { ...services[1], image: '/images/service-boarding.jpg' },
    { ...services[2], image: '/images/service-medical.jpg' },
    { ...services[3], image: '/images/service-training.jpg' }
  ];

  // 使用force: true强制重新创建表结构，以更新字段名
  await sequelize.sync({ force: true });

  await Category.bulkCreate(serviceCategories, { updateOnDuplicate: ['name', 'type', 'sort_order'] });
  await Category.bulkCreate(productCategories, { updateOnDuplicate: ['name', 'type', 'sort_order'] });
  await User.bulkCreate(users, { updateOnDuplicate: ['openid', 'username', 'avatar'] });
  await Merchant.bulkCreate(merchants, { updateOnDuplicate: ['name', 'description', 'address', 'phone', 'rating'] });
  await Service.bulkCreate(updatedServices, { updateOnDuplicate: ['merchant_id', 'category_id', 'name', 'description', 'price', 'unit', 'duration', 'status', 'image'] });
  await Product.bulkCreate(updatedProducts, { updateOnDuplicate: ['category_id', 'name', 'description', 'price', 'stock', 'image', 'status'] });
  await Topic.bulkCreate(topics, { updateOnDuplicate: ['name', 'description', 'sort_order'] });
  await Post.bulkCreate(posts, { updateOnDuplicate: ['user_id', 'topic_id', 'content', 'images', 'likes', 'comments'] });

  console.log('Seed data inserted successfully!');
  console.log(`  - ${serviceCategories.length} service categories`);
  console.log(`  - ${productCategories.length} product categories`);
  console.log(`  - ${merchants.length} merchants`);
  console.log(`  - ${services.length} services`);
  console.log(`  - ${products.length} products`);
  console.log(`  - ${topics.length} topics`);
  console.log(`  - ${posts.length} posts`);

  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
