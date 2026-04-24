// 首页逻辑
Page({
  data: {
    searchKeyword: '',
    services: [],
    products: [],
    communityPosts: [],
    filteredServices: [],
    filteredProducts: [],
    showSearchResult: false,
    loading: true
  },
  
  onLoad: function() {
    console.log('首页加载');
    this.loadData();
  },
  
  loadData: function() {
    wx.showLoading({ title: '加载中...' });
    const api = require('../../utils/api');
    
    // 并行请求所有数据
    Promise.all([
      api.getServices(),
      api.getProducts(),
      api.getPosts()
    ])
    .then(([services, products, posts]) => {
      // 处理社区帖子数据，适配前端格式
      const processedPosts = (posts || []).map(post => {
        // 处理用户信息
        const user = post.user || {};
        // 处理图片（取第一张图片）
        let image = '';
        try {
          const images = JSON.parse(post.images || '[]');
          image = images[0] || '';
        } catch (e) {
          image = '';
        }
        
        return {
          id: post.id,
          username: user.username || '未知用户',
          avatar: user.avatar || '/images/avatar-default.png',
          content: post.content || '',
          image: image,
          likes: post.likes || 0,
          comments: post.comments || 0,
          time: '刚刚' // 简化处理，使用固定时间
        };
      });
      
      // 处理商品数据，添加sales字段（后端未返回）
      const processedProducts = (products || []).map(product => ({
        ...product,
        sales: Math.floor(Math.random() * 1000) // 随机生成销量
      }));
      
      this.setData({
        services: services || [],
        products: processedProducts,
        communityPosts: processedPosts,
        filteredServices: services || [],
        filteredProducts: processedProducts,
        loading: false
      });
      wx.hideLoading();
    })
    .catch(err => {
      console.error('加载数据失败:', err);
      this.setData({ loading: false });
      wx.hideLoading();
      wx.showToast({ title: '加载失败', icon: 'none' });
    });
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('首页显示');
  },
  
  // 导航到服务页面
  navigateToService: function() {
    wx.switchTab({
      url: '../service/service'
    });
  },
  
  // 导航到商城页面
  navigateToMall: function() {
    wx.switchTab({
      url: '../mall/mall'
    });
  },
  
  // 导航到社区页面
  navigateToCommunity: function() {
    wx.switchTab({
      url: '../community/community'
    });
  },
  
  // 导航到工具页面
  navigateToTools: function() {
    wx.navigateTo({
      url: '../tools/tools'
    });
  },
  
  // 搜索功能
  inputSearch: function(e) {
    this.setData({ searchKeyword: e.detail.value });
  },
  
  search: function() {
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    if (!keyword) {
      this.setData({
        filteredServices: this.data.services,
        filteredProducts: this.data.products,
        showSearchResult: false
      });
      return;
    }
    const filteredServices = this.data.services.filter(s => s.name.toLowerCase().includes(keyword));
    const filteredProducts = this.data.products.filter(p => p.name.toLowerCase().includes(keyword));
    this.setData({ filteredServices, filteredProducts, showSearchResult: true });
    if (filteredServices.length === 0 && filteredProducts.length === 0) {
      wx.showToast({ title: '未找到相关内容', icon: 'none' });
    }
  },
  
  clearSearch: function() {
    this.setData({
      searchKeyword: '',
      filteredServices: this.data.services,
      filteredProducts: this.data.products,
      showSearchResult: false
    });
  },

  // 跳转到服务预约
  goToServiceDetail: function(e) {
    var index = e.currentTarget.dataset.index;
    var service = this.data.filteredServices[index];
    wx.navigateTo({
      url: '../service-booking/service-booking?service=' + JSON.stringify(service)
    });
  },

  // 跳转到商品详情
  goToProductDetail: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product-detail/product-detail?id=' + id
    });
  }
});