// 商品详情页
var ALL_PRODUCTS = [
  { id: 1, name: '宠物狗粮', price: 99, image: '/images/product-dogfood.jpg', category: '宠物食品',
    desc: '精选天然优质原料，富含蛋白质和维生素，为爱宠提供全面营养。采用低温烘焙工艺，保留食材原味，适口性极佳。',
    specs: ['1.5kg 小袋装', '5kg 家庭装', '10kg 经济装'],
    sales: 2341, rating: 4.8 },
  { id: 2, name: '宠物玩具', price: 49, image: '/images/product-toy.jpg', category: '宠物玩具',
    desc: '采用食品级天然橡胶材质，安全无毒，耐咬耐磨。独特的弹力设计，让宠物爱不释手，有效清洁牙齿。',
    specs: ['小球款', '骨头款', '飞盘款'],
    sales: 1856, rating: 4.7 },
  { id: 3, name: '宠物零食', price: 39, image: '/images/product-snack.jpg', category: '宠物零食',
    desc: '纯天然鸡胸肉烘干制作，无添加防腐剂和色素，高蛋白低脂肪，是训练奖励和日常零食的最佳选择。',
    specs: ['100g 便携装', '250g 家庭装', '500g 大包装'],
    sales: 3567, rating: 4.9 },
  { id: 4, name: '宠物用品', price: 69, image: '/images/product-supplies.jpg', category: '宠物用品',
    desc: '专业宠物美容护理套装，包含柔软毛刷、指甲钳、洁耳液等，一盒满足日常护理需求。',
    specs: ['基础套装', '豪华套装', '旅行套装'],
    sales: 982, rating: 4.6 },
  { id: 5, name: '宠物猫砂', price: 29, image: '/images/product-catlitter.jpg', category: '宠物用品',
    desc: '强力结团豆腐猫砂，天然豆渣制作，遇水快速结团，除臭效果好，可冲马桶，环保又方便。',
    specs: ['2.5kg 袋装', '6L 包装', '12L 大包装'],
    sales: 4123, rating: 4.8 },
  { id: 6, name: '宠物牵引绳', price: 59, image: '/images/product-leash.jpg', category: '宠物用品',
    desc: '高强度尼龙材质，配有舒适手柄和可调节卡扣。反光设计保障夜间散步安全，适合中小型犬使用。',
    specs: ['1.2m 标准款', '1.5m 加长款', '3m 自动伸缩款'],
    sales: 1567, rating: 4.7 }
];

var DEFAULT_REVIEWS = [
  { id: 1, username: '爱宠达人', avatar: '/images/avatar-user1.jpg', rating: 5,
    content: '质量非常好，我家狗狗很喜欢！已经回购好几次了。', time: '2026-04-20', images: [] },
  { id: 2, username: '猫奴一号', avatar: '/images/avatar-user2.jpg', rating: 4,
    content: '性价比很高，物流也快，推荐购买。', time: '2026-04-18', images: [] },
  { id: 3, username: '宠物医生小王', avatar: '/images/avatar-vet.jpg', rating: 5,
    content: '作为兽医推荐的产品，成分安全可靠，值得信赖。', time: '2026-04-15', images: [] }
];

Page({
  data: {
    product: null,
    reviews: [],
    selectedSpec: 0,
    quantity: 1,
    isFavorited: false,
    totalRating: 0
  },

  onLoad: function(options) {
    var productId = parseInt(options.id) || 1;
    var product = null;
    for (var i = 0; i < ALL_PRODUCTS.length; i++) {
      if (ALL_PRODUCTS[i].id === productId) {
        product = ALL_PRODUCTS[i];
        break;
      }
    }
    if (!product) product = ALL_PRODUCTS[0];

    // 加载该商品的评论
    var allReviews = wx.getStorageSync('product_reviews') || {};
    var reviews = allReviews[productId] || DEFAULT_REVIEWS;

    // 为每条评论生成星级文本
    for (var r = 0; r < reviews.length; r++) {
      var stars = '';
      for (var s = 0; s < reviews[r].rating; s++) stars += '★';
      for (var s2 = reviews[r].rating; s2 < 5; s2++) stars += '☆';
      reviews[r].ratingText = stars;
    }

    // 计算平均评分
    var totalRating = 0;
    for (var j = 0; j < reviews.length; j++) {
      totalRating += reviews[j].rating;
    }
    totalRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '5.0';

    // 检查是否已收藏
    var favorites = wx.getStorageSync('favorites') || [];
    var isFavorited = false;
    for (var k = 0; k < favorites.length; k++) {
      if (favorites[k].id === productId) { isFavorited = true; break; }
    }

    this.setData({
      product: product,
      reviews: reviews,
      totalRating: totalRating,
      isFavorited: isFavorited
    });

    // 设置导航栏标题
    wx.setNavigationBarTitle({ title: product.name });
  },

  // 选择规格
  selectSpec: function(e) {
    this.setData({ selectedSpec: e.currentTarget.dataset.index });
  },

  // 减少数量
  decreaseQuantity: function() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 });
    }
  },

  // 增加数量
  increaseQuantity: function() {
    this.setData({ quantity: this.data.quantity + 1 });
  },

  // 收藏/取消收藏
  toggleFavorite: function() {
    var favorites = wx.getStorageSync('favorites') || [];
    var product = this.data.product;
    if (this.data.isFavorited) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id === product.id) { favorites.splice(i, 1); break; }
      }
      wx.showToast({ title: '已取消收藏', icon: 'none' });
    } else {
      favorites.push({ id: product.id, name: product.name, price: product.price, image: product.image });
      wx.showToast({ title: '已收藏', icon: 'success' });
    }
    wx.setStorageSync('favorites', favorites);
    this.setData({ isFavorited: !this.data.isFavorited });
  },

  // 加入购物车
  addToCart: function() {
    var product = this.data.product;
    var cart = wx.getStorageSync('cart') || [];
    var existIndex = -1;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id && cart[i].spec === product.specs[this.data.selectedSpec]) {
        existIndex = i; break;
      }
    }
    if (existIndex >= 0) {
      cart[existIndex].quantity += this.data.quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        spec: product.specs[this.data.selectedSpec],
        quantity: this.data.quantity
      });
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  // 立即购买
  buyNow: function() {
    this.addToCart();
    wx.navigateTo({ url: '../cart/cart' });
  },

  // 分享
  onShareAppMessage: function() {
    return {
      title: this.data.product.name + ' - 宠物伴侣商城',
      path: '/pages/product-detail/product-detail?id=' + this.data.product.id,
      imageUrl: this.data.product.image
    };
  },

  // 预览商品图片
  previewImage: function() {
    wx.previewImage({
      urls: [this.data.product.image],
      current: this.data.product.image
    });
  }
});
