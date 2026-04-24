// 编辑个人资料页面
Page({
  data: {
    avatar: '',
    username: '',
    desc: ''
  },

  onLoad: function() {
    this.loadProfile();
  },

  loadProfile: function() {
    var userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      avatar: userInfo.avatar || '',
      username: userInfo.username || '',
      desc: userInfo.desc || ''
    });
  },

  // 选择头像
  chooseAvatar: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ avatar: res.tempFilePaths[0] });
      }
    });
  },

  inputUsername: function(e) {
    this.setData({ username: e.detail.value });
  },

  inputDesc: function(e) {
    this.setData({ desc: e.detail.value });
  },

  save: function() {
    if (!this.data.username) {
      wx.showToast({ title: '请输入用户名', icon: 'none' });
      return;
    }
    var userInfo = wx.getStorageSync('userInfo') || {};
    userInfo.avatar = this.data.avatar;
    userInfo.username = this.data.username;
    userInfo.desc = this.data.desc;
    wx.setStorageSync('userInfo', userInfo);
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(function() { wx.navigateBack(); }, 1500);
  }
});
