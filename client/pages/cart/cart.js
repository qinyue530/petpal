// 购物车页面逻辑
Page({
  data: {
    cart: [],
    totalPrice: 0
  },
  
  onLoad: function() {
    // 页面加载时执行
    console.log('购物车页面加载');
    this.loadCart();
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('购物车页面显示');
    this.loadCart();
  },
  
  // 加载购物车数据
  loadCart: function() {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      cart: cart
    });
    this.calculateTotal();
  },
  
  // 计算总价
  calculateTotal: function() {
    const cart = this.data.cart;
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    this.setData({
      totalPrice: totalPrice
    });
  },
  
  // 增加数量
  increaseQuantity: function(e) {
    const index = e.currentTarget.dataset.index;
    const cart = this.data.cart;
    cart[index].quantity += 1;
    wx.setStorageSync('cart', cart);
    this.setData({
      cart: cart
    });
    this.calculateTotal();
  },
  
  // 减少数量
  decreaseQuantity: function(e) {
    const index = e.currentTarget.dataset.index;
    const cart = this.data.cart;
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      wx.setStorageSync('cart', cart);
      this.setData({
        cart: cart
      });
      this.calculateTotal();
    }
  },
  
  // 删除商品
  deleteItem: function(e) {
    const index = e.currentTarget.dataset.index;
    const cart = this.data.cart;
    cart.splice(index, 1);
    wx.setStorageSync('cart', cart);
    this.setData({
      cart: cart
    });
    this.calculateTotal();
  },
  
  // 去购物
  goShopping: function() {
    wx.switchTab({
      url: '../mall/mall'
    });
  },
  
  // 结算
  checkout: function() {
    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      });
      return;
    }
    
    // 创建订单
    const order = {
      id: Date.now(),
      items: this.data.cart,
      totalPrice: this.data.totalPrice,
      status: '待付款',
      createTime: new Date().toISOString()
    };
    
    // 保存订单
    const orders = wx.getStorageSync('orders') || [];
    orders.push(order);
    wx.setStorageSync('orders', orders);
    
    // 清空购物车
    wx.setStorageSync('cart', []);
    
    // 显示成功提示
    wx.showToast({
      title: '订单创建成功',
      icon: 'success',
      success: () => {
        // 跳转到订单页面
        wx.navigateTo({
          url: '../orders/orders'
        });
      }
    });
  }
});