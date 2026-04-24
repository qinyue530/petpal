// 我的预约页面
var STATUS_MAP = {
  '待确认': 'pending',
  '已确认': 'confirmed',
  '已完成': 'completed',
  '已取消': 'cancelled'
};

Page({
  data: {
    bookings: []
  },

  onLoad: function() {
    this.loadBookings();
  },

  onShow: function() {
    this.loadBookings();
  },

  loadBookings: function() {
    var bookings = wx.getStorageSync('bookings') || [];
    // 为每条预约添加英文状态类名
    for (var i = 0; i < bookings.length; i++) {
      bookings[i].statusClass = STATUS_MAP[bookings[i].status] || 'pending';
    }
    this.setData({ bookings: bookings });
  },

  cancelBooking: function(e) {
    var index = e.currentTarget.dataset.index;
    var bookings = this.data.bookings;
    bookings[index].status = '已取消';
    bookings[index].statusClass = 'cancelled';
    wx.setStorageSync('bookings', bookings);
    this.setData({ bookings: bookings });
    wx.showToast({ title: '已取消预约', icon: 'success' });
  },

  goBooking: function() {
    wx.switchTab({ url: '../service/service' });
  }
});
