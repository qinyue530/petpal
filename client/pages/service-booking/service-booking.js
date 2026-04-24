// 服务预约页面逻辑
Page({
  data: {
    service: {},
    pets: [],
    petNames: [],
    selectedPet: '',
    selectedDate: '',
    selectedTime: '',
    remark: '',
    phone: ''
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('服务预约页面加载');
    this.setData({
      service: JSON.parse(options.service)
    });
    this.loadPets();
  },
  
  // 加载宠物数据
  loadPets: function() {
    const pets = wx.getStorageSync('pets') || [];
    const petNames = pets.map(pet => pet.name);
    this.setData({
      pets: pets,
      petNames: petNames
    });
  },
  
  // 选择宠物
  bindPetChange: function(e) {
    const index = e.detail.value;
    this.setData({
      selectedPet: this.data.petNames[index]
    });
  },
  
  // 选择日期
  bindDateChange: function(e) {
    this.setData({
      selectedDate: e.detail.value
    });
  },
  
  // 选择时间
  bindTimeChange: function(e) {
    this.setData({
      selectedTime: e.detail.value
    });
  },
  
  // 输入备注信息
  inputRemark: function(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  
  // 输入联系电话
  inputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  
  // 提交预约
  submitBooking: function() {
    if (!this.data.selectedPet) {
      wx.showToast({
        title: '请选择宠物',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.selectedDate) {
      wx.showToast({
        title: '请选择预约日期',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.selectedTime) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }
    
    // 创建预约对象
    const booking = {
      id: Date.now(),
      service: this.data.service,
      petName: this.data.selectedPet,
      date: this.data.selectedDate,
      time: this.data.selectedTime,
      remark: this.data.remark,
      phone: this.data.phone,
      status: '待确认',
      createTime: new Date().toISOString()
    };
    
    // 保存到本地存储
    const bookings = wx.getStorageSync('bookings') || [];
    bookings.push(booking);
    wx.setStorageSync('bookings', bookings);
    
    // 显示成功提示
    wx.showToast({
      title: '预约成功',
      icon: 'success',
      success: () => {
        // 跳转到个人中心页面
        wx.switchTab({
          url: '../profile/profile'
        });
      }
    });
  }
});