// 首页逻辑
Page({
  data: {
    searchKeyword: '',
    services: [
      { id: 1, name: "宠物美容", price: 88, image: "/images/service-grooming.jpg" },
      { id: 2, name: "宠物寄养", price: 120, image: "/images/service-boarding.jpg" },
      { id: 3, name: "宠物医疗", price: 150, image: "/images/service-medical.jpg" },
      { id: 4, name: "宠物训练", price: 200, image: "/images/service-training.jpg" }
    ],
    products: [
      { id: 1, name: "宠物狗粮", price: 99, sales: 2341, image: "/images/product-dogfood.jpg" },
      { id: 2, name: "宠物玩具", price: 49, sales: 1856, image: "/images/product-toy.jpg" },
      { id: 3, name: "宠物零食", price: 39, sales: 3567, image: "/images/product-snack.jpg" },
      { id: 4, name: "宠物用品", price: 69, sales: 982, image: "/images/product-supplies.jpg" }
    ],
    communityPosts: [
      { id: 1, username: "宠物爱好者", avatar: "/images/avatar-user1.jpg", content: "今天带狗狗去公园玩，它玩得很开心！", image: "/images/post-dog-park.jpg", likes: 23, comments: 5, time: "2小时前" },
      { id: 2, username: "猫咪控", avatar: "/images/avatar-user2.jpg", content: "分享一下我家猫咪的日常，是不是很可爱？", image: "/images/post-cat-daily.jpg", likes: 45, comments: 12, time: "4小时前" }
    ],
    filteredServices: [],
    filteredProducts: [],
    showSearchResult: false
  },
  
  onLoad: function() {
    console.log('首页加载');
    this.setData({
      filteredServices: this.data.services,
      filteredProducts: this.data.products
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