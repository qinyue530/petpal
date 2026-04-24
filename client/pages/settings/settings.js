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
  }
});
