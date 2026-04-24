App({
  onLaunch: function() {
    // 初始化小程序
    console.log('宠物伴侣小程序启动');
    
    // 检查登录状态
    this.checkLoginStatus();
    
    // 初始化全局数据
    this.initGlobalData();
  },
  
  onShow: function() {
    // 小程序显示时执行
    console.log('宠物伴侣小程序显示');
  },
  
  onHide: function() {
    // 小程序隐藏时执行
    console.log('宠物伴侣小程序隐藏');
  },
  
  checkLoginStatus: function() {
    // 检查用户登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      console.log('用户已登录:', userInfo);
    } else {
      console.log('用户未登录');
    }
  },
  
  initGlobalData: function() {
    // 初始化全局数据
    this.globalData = {
      userInfo: null,
      pets: [],
      services: [],
      products: [],
      communityPosts: [],
      apiBaseUrl: 'http://192.168.20.71:3000/api'
    };
  },
  
  // 全局方法
  login: function(userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
  },
  
  logout: function() {
    this.globalData.userInfo = null;
    wx.removeStorageSync('userInfo');
  },
  
  addPet: function(pet) {
    this.globalData.pets.push(pet);
    wx.setStorageSync('pets', this.globalData.pets);
  },
  
  getPets: function() {
    return this.globalData.pets;
  },
  
  // 全局数据
  globalData: {
    userInfo: null,
    pets: [],
    services: [],
    products: [],
    communityPosts: [],
    apiBaseUrl: 'http://192.168.20.71:3000/api'
  }
})