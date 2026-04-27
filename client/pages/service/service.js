// 服务页面逻辑
Page({
  data: {
    categories: [
      { id: 1, name: "全部" },
      { id: 2, name: "宠物美容" },
      { id: 3, name: "宠物寄养" },
      { id: 4, name: "宠物医疗" },
      { id: 5, name: "宠物训练" },
      { id: 6, name: "宠物摄影" }
    ],
    selectedCategory: 1,
    filteredServices: [],
    merchants: [],
    services: [],
    loading: true
  },
  
  onLoad: function() {
    console.log('服务页面加载');
    this.loadData();
  },
  
  loadData: function() {
    wx.showLoading({ title: '加载中...' });
    const api = require('../../utils/api');
    
    // 并行请求服务和商家数据
    Promise.all([
      api.getServices(),
      api.request({ url: '/merchants' })
    ])
    .then(([services, merchants]) => {
      // 为商家数据添加distance字段（后端未返回）
      const processedMerchants = (merchants || []).map(merchant => ({
        ...merchant,
        distance: Math.floor(Math.random() * 1000) // 随机生成距离
      }));
      
      this.setData({
        services: services || [],
        merchants: processedMerchants,
        filteredServices: services || [],
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
    console.log('服务页面显示');
  },
  
  // 选择分类
  selectCategory: function(e) {
    var index = e.currentTarget.dataset.index;
    var categoryId = this.data.categories[index].id;
    this.setData({ selectedCategory: categoryId });
    // 按分类过滤服务
    if (categoryId === 1) {
      this.setData({ filteredServices: this.data.services });
    } else {
      var filtered = this.data.services.filter(function(s) {
        return s.name.indexOf(this.data.categories[index].name.replace('宠物', '')) >= 0;
      }.bind(this));
      // 如果精确匹配没结果，显示全部
      if (filtered.length === 0) {
        filtered = this.data.services;
      }
      this.setData({ filteredServices: filtered });
    }
  },
  
  // 预约服务
  bookService: function(e) {
    const index = e.currentTarget.dataset.index;
    const service = this.data.services[index];
    wx.navigateTo({
      url: '../service-booking/service-booking?service=' + JSON.stringify(service)
    });
  },
  
  // 查看更多商家
  viewMoreMerchants: function() {
    wx.showModal({
      title: '附近商家',
      content: '当前已展示全部 ' + this.data.merchants.length + ' 家附近商家，更多商家正在入驻中，敬请期待！',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 查看更多服务
  viewMoreServices: function() {
    wx.showModal({
      title: '热门服务',
      content: '当前已展示全部 ' + this.data.services.length + ' 项热门服务，更多服务正在上线中，敬请期待！',
      showCancel: false,
      confirmText: '我知道了'
    });
  }
});