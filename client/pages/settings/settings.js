// 设置页面
Page({
  data: { cacheSize: '0KB' },
  onLoad: function() { this.calculateCache(); },
  calculateCache: function() {
    const res = wx.getStorageInfoSync();
    this.setData({ cacheSize: res.currentSize + 'KB' });
  },
  clearCache: function() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          this.calculateCache();
          wx.showToast({ title: '清除成功', icon: 'success' });
        }
      }
    });
  },
  about: function() {
    wx.navigateTo({ url: '../about/about' });
  },
  editProfile: function() {
    wx.navigateTo({ url: '../edit-profile/edit-profile' });
  },
  testConnection: function() {
    wx.showLoading({ title: '测试连接中...' });
    const api = require('../../utils/api');
    api.request({
      url: '/test/time'
    })
    .then(data => {
      wx.hideLoading();
      wx.showModal({
        title: '连接成功',
        content: '后端时间：' + new Date(data.currentTime).toLocaleString(),
        showCancel: false
      });
    })
    .catch(err => {
      wx.hideLoading();
      wx.showModal({
        title: '连接失败',
        content: '错误信息：' + JSON.stringify(err),
        showCancel: false
      });
    });
  }
});
