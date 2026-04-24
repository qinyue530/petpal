// 个人中心页面逻辑
Page({
  data: {
    userInfo: {
      username: null,
      desc: null
    },
    pets: []
  },
  
  onLoad: function() {
    console.log('个人中心页面加载');
    this.loadUserInfo();
    this.loadPets();
  },
  
  onShow: function() {
    console.log('个人中心页面显示');
    this.loadUserInfo();
    this.loadPets();
  },

  // 加载宠物数据
  loadPets: function() {
    var pets = wx.getStorageSync('pets') || [];
    if (pets.length === 0) {
      pets = [
        { id: 1, name: '小白', type: '狗狗', image: '/images/avatar-user1.jpg' },
        { id: 2, name: '小花', type: '猫咪', image: '/images/avatar-user2.jpg' }
      ];
      wx.setStorageSync('pets', pets);
    }
    this.setData({ pets: pets });
  },
  
  // 加载用户信息
  loadUserInfo: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }
  },
  
  // 登录
  login: function() {
    if (this.data.userInfo.username) {
      // 已登录，跳转到设置页面
      wx.navigateTo({
        url: '../settings/settings'
      });
    } else {
      // 未登录，模拟登录
      const userInfo = {
        username: "宠物主人",
        desc: "爱宠人士"
      };
      this.setData({
        userInfo: userInfo
      });
      wx.setStorageSync('userInfo', userInfo);
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
    }
  },
  
  // 退出登录
  logout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            userInfo: {
              username: null,
              desc: null
            }
          });
          wx.removeStorageSync('userInfo');
          wx.showToast({
            title: '退出登录成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 管理宠物
  managePets: function() {
    wx.navigateTo({
      url: '../pet-management/pet-management'
    });
  },
  
  // 添加宠物
  addPet: function() {
    wx.navigateTo({
      url: '../pet-management/add-pet/add-pet'
    });
  },

  // 编辑宠物
  editPet: function(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../pet-management/edit-pet/edit-pet?index=' + index
    });
  },
  
  // 我的订单
  myOrders: function() {
    wx.navigateTo({
      url: '../orders/orders'
    });
  },
  
  // 我的预约
  myAppointments: function() {
    wx.navigateTo({
      url: '../appointments/appointments'
    });
  },
  
  // 我的收藏
  myFavorites: function() {
    wx.navigateTo({
      url: '../favorites/favorites'
    });
  },
  
  // 关于我们
  aboutUs: function() {
    wx.navigateTo({
      url: '../about/about'
    });
  },
  
  // 意见反馈
  feedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback'
    });
  },
  
  // 设置
  settings: function() {
    wx.navigateTo({
      url: '../settings/settings'
    });
  }
});