// 商城页面逻辑
Page({
  data: {
    categories: [
      { id: 1, name: "全部" },
      { id: 2, name: "宠物食品" },
      { id: 3, name: "宠物用品" },
      { id: 4, name: "宠物玩具" },
      { id: 5, name: "宠物零食" },
      { id: 6, name: "宠物医疗" }
    ],
    selectedCategory: 1,
    products: [],
    filteredProducts: [],
    searchKeyword: '',
    cartCount: 0,
    loading: true
  },

  onLoad: function() {
    console.log('商城页面加载');
    this.loadData();
  },
  
  loadData: function() {
    wx.showLoading({ title: '加载中...' });
    const api = require('../../utils/api');
    
    api.getProducts()
      .then(products => {
        // 处理商品数据，添加sales字段（后端未返回）
        const processedProducts = (products || []).map(product => ({
          ...product,
          sales: Math.floor(Math.random() * 1000) // 随机生成销量
        }));
        
        this.setData({
          products: processedProducts,
          filteredProducts: processedProducts,
          loading: false
        });
        wx.hideLoading();
      })
      .catch(err => {
        console.error('加载商品失败:', err);
        this.setData({ loading: false });
        wx.hideLoading();
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
  },

  onShow: function() {
    console.log('商城页面显示');
    this.updateCartCount();
  },

  // 选择分类
  selectCategory: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedCategory: index + 1 });
    this.filterProducts();
  },

  // 搜索输入
  inputSearch: function(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  // 搜索功能
  search: function() {
    this.filterProducts();
  },

  // 筛选商品
  filterProducts: function() {
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    const categoryId = this.data.selectedCategory;
    let filtered = this.data.products;

    // 按分类筛选
    if (categoryId !== 1) {
      const categoryMap = { 2: '粮', 3: '用品', 4: '玩具', 5: '零食', 6: '医疗' };
      filtered = filtered.filter(p => p.name.includes(categoryMap[categoryId] || ''));
    }

    // 按关键词筛选
    if (keyword) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));
    }

    this.setData({ filteredProducts: filtered });
    if (filtered.length === 0) {
      wx.showToast({ title: '未找到相关商品', icon: 'none' });
    }
  },

  // 加入购物车
  addToCart: function(e) {
    const index = e.currentTarget.dataset.index;
    const product = this.data.filteredProducts[index];

    // 获取购物车数据
    const cart = wx.getStorageSync('cart') || [];

    // 检查商品是否已在购物车中
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      // 商品已在购物车中，增加数量
      cart[existingProductIndex].quantity += 1;
    } else {
      // 商品不在购物车中，添加新商品
      cart.push({
        ...product,
        quantity: 1
      });
    }

    // 保存购物车数据
    wx.setStorageSync('cart', cart);

    // 更新购物车数量
    this.updateCartCount();

    // 显示成功提示
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success'
    });
  },

  // 跳转到商品详情
  goToDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product-detail/product-detail?id=' + id
    });
  },

  // 跳转到购物车
  goToCart: function() {
    wx.navigateTo({
      url: '../cart/cart'
    });
  },

  // 更新购物车数量
  updateCartCount: function() {
    const cart = wx.getStorageSync('cart') || [];
    let cartCount = 0;
    cart.forEach(item => {
      cartCount += item.quantity;
    });
    this.setData({
      cartCount: cartCount
    });
  }
});
