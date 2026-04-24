// 我的收藏页面
Page({
  data: { favorites: [] },
  onLoad: function() { this.loadFavorites(); },
  onShow: function() { this.loadFavorites(); },
  loadFavorites: function() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({ favorites });
  },
  removeFavorite: function(e) {
    const index = e.currentTarget.dataset.index;
    const favorites = this.data.favorites;
    favorites.splice(index, 1);
    wx.setStorageSync('favorites', favorites);
    this.setData({ favorites });
    wx.showToast({ title: '已取消收藏', icon: 'success' });
  },
  goMall: function() { wx.switchTab({ url: '../mall/mall' }); }
});
