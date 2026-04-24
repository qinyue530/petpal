// 登录页面逻辑
Page({
  data: {
    phone: '',
    password: '',
    verifyCode: '',
    countdown: 0
  },
  
  onLoad: function() {
    // 页面加载时执行
    console.log('登录页面加载');
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('登录页面显示');
  },
  
  // 输入手机号
  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  
  // 输入密码
  inputPassword: function(e) {
    this.setData({
      password: e.detail.value
    });
  },
  
  // 输入验证码
  inputVerifyCode: function(e) {
    this.setData({
      verifyCode: e.detail.value
    });
  },
  
  // 发送验证码
  sendVerifyCode: function() {
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    // 模拟发送验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
    
    // 开始倒计时
    this.setData({
      countdown: 60
    });
    
    const timer = setInterval(() => {
      if (this.data.countdown > 0) {
        this.setData({
          countdown: this.data.countdown - 1
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
  },
  
  // 登录
  login: function() {
    if (!this.data.phone || !this.data.password) {
      wx.showToast({
        title: '请输入手机号和密码',
        icon: 'none'
      });
      return;
    }
    
    // 模拟登录
    const userInfo = {
      username: "宠物主人",
      desc: "爱宠人士",
      phone: this.data.phone
    };
    
    // 保存用户信息
    wx.setStorageSync('userInfo', userInfo);
    
    // 跳转到首页
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      success: () => {
        wx.switchTab({
          url: '../index/index'
        });
      }
    });
  },
  
  // 注册
  register: function() {
    if (!this.data.phone || !this.data.password || !this.data.verifyCode) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    
    // 模拟注册
    const userInfo = {
      username: "宠物主人",
      desc: "爱宠人士",
      phone: this.data.phone
    };
    
    // 保存用户信息
    wx.setStorageSync('userInfo', userInfo);
    
    // 跳转到首页
    wx.showToast({
      title: '注册成功',
      icon: 'success',
      success: () => {
        wx.switchTab({
          url: '../index/index'
        });
      }
    });
  },
  
  // 微信登录
  wechatLogin: function() {
    // 显示加载动画
    wx.showLoading({
      title: '正在登录...',
      mask: true
    });
    
    // 模拟微信授权过程
    setTimeout(() => {
      // 模拟获取微信用户信息
      const userInfo = {
        username: "微信用户",
        desc: "爱宠人士",
        avatar: "/images/avatar-user1.jpg",
        openid: "wx1234567890"
      };
      
      // 保存用户信息
      wx.setStorageSync('userInfo', userInfo);
      
      // 隐藏加载动画
      wx.hideLoading();
      
      // 跳转到首页
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        success: () => {
          wx.switchTab({
            url: '../index/index'
          });
        }
      });
    }, 1500);
  },
  
  // 手机号登录
  phoneLogin: function() {
    wx.showModal({
      title: '手机号登录',
      content: '请输入您的手机号',
      placeholderText: '请输入手机号',
      success: (res) => {
        if (res.confirm) {
          // 模拟发送验证码
          wx.showToast({
            title: '验证码已发送',
            icon: 'success'
          });
          
          // 模拟手机号登录
          setTimeout(() => {
            const userInfo = {
              username: "手机用户",
              desc: "爱宠人士",
              phone: "138****8888"
            };
            
            wx.setStorageSync('userInfo', userInfo);
            
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              success: () => {
                wx.switchTab({
                  url: '../index/index'
                });
              }
            });
          }, 1000);
        }
      }
    });
  },

  // 忘记密码
  forgotPassword: function() {
    wx.showModal({
      title: '忘记密码',
      content: '请输入您的手机号，我们将发送验证码到您的手机',
      placeholderText: '请输入手机号',
      success: (res) => {
        if (res.confirm) {
          // 模拟发送验证码
          wx.showToast({
            title: '验证码已发送',
            icon: 'success'
          });
          
          // 模拟密码重置
          setTimeout(() => {
            wx.showToast({
              title: '密码已重置为123456',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  }
});