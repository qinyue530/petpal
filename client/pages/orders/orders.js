// 订单页面逻辑
var STATUS_MAP = {
  '待付款': 'pending',
  '已付款': 'paid',
  '已取消': 'cancelled'
};

Page({
  data: {
    orders: []
  },
  
  onLoad: function() {
    this.loadOrders();
  },
  
  onShow: function() {
    this.loadOrders();
  },
  
  loadOrders: function() {
    var orders = wx.getStorageSync('orders') || [];
    for (var i = 0; i < orders.length; i++) {
      orders[i].statusClass = STATUS_MAP[orders[i].status] || 'pending';
    }
    this.setData({ orders: orders });
  },
  
  goShopping: function() {
    wx.switchTab({ url: '../mall/mall' });
  },
  
  cancelOrder: function(e) {
    var index = e.currentTarget.dataset.index;
    var orders = this.data.orders;
    orders[index].status = '已取消';
    orders[index].statusClass = 'cancelled';
    wx.setStorageSync('orders', orders);
    this.setData({ orders: orders });
    wx.showToast({ title: '订单已取消', icon: 'success' });
  },
  
  payOrder: function(e) {
    var index = e.currentTarget.dataset.index;
    var orders = this.data.orders;
    orders[index].status = '已付款';
    orders[index].statusClass = 'paid';
    wx.setStorageSync('orders', orders);
    this.setData({ orders: orders });
    wx.showToast({ title: '付款成功', icon: 'success' });
  }
});
