// 服务页面逻辑
Page({
  data: {
    categories: [
      { id: 1, name: "全部" },
      { id: 2, name: "宠物美容" },
      { id: 3, name: "宠物寄养" },
      { id: 4, name: "宠物医疗" },
      { id: 5, name: "宠物训练" },
      { id: 6, name: "宠物摄影" }
    ],
    selectedCategory: 1,
    filteredServices: [],
    merchants: [
      {
        id: 1,
        name: "宠物乐园",
        rating: 4.8,
        address: "北京市朝阳区建国路88号",
        distance: 500,
        image: "/images/post-dog-park.jpg"
      },
      {
        id: 2,
        name: "萌宠之家",
        rating: 4.6,
        address: "北京市海淀区中关村大街1号",
        distance: 800,
        image: "/images/post-cat-daily.jpg"
      },
      {
        id: 3,
        name: "宠物医院",
        rating: 4.9,
        address: "北京市西城区西单大街120号",
        distance: 1200,
        image: "/images/service-medical.jpg"
      }
    ],
    services: [
      {
        id: 1,
        name: "宠物美容",
        price: 88,
        description: "专业宠物美容服务，包括洗澡、剪毛、造型等",
        image: "/images/service-grooming.jpg"
      },
      {
        id: 2,
        name: "宠物寄养",
        price: 120,
        description: "24小时专业宠物寄养服务，提供舒适的居住环境",
        image: "/images/service-boarding.jpg"
      },
      {
        id: 3,
        name: "宠物医疗",
        price: 150,
        description: "专业宠物医疗服务，包括体检、疫苗接种、疾病治疗等",
        image: "/images/service-medical.jpg"
      },
      {
        id: 4,
        name: "宠物训练",
        price: 200,
        description: "专业宠物训练服务，包括基础训练、行为纠正等",
        image: "/images/service-training.jpg"
      }
    ]
  },
  
  onLoad: function() {
    console.log('服务页面加载');
    this.setData({ filteredServices: this.data.services });
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('服务页面显示');
  },
  
  // 选择分类
  selectCategory: function(e) {
    var index = e.currentTarget.dataset.index;
    var categoryId = this.data.categories[index].id;
    this.setData({ selectedCategory: categoryId });
    // 按分类过滤服务
    if (categoryId === 1) {
      this.setData({ filteredServices: this.data.services });
    } else {
      var filtered = this.data.services.filter(function(s) {
        return s.name.indexOf(this.data.categories[index].name.replace('宠物', '')) >= 0;
      }.bind(this));
      // 如果精确匹配没结果，显示全部
      if (filtered.length === 0) {
        filtered = this.data.services;
      }
      this.setData({ filteredServices: filtered });
    }
  },
  
  // 预约服务
  bookService: function(e) {
    const index = e.currentTarget.dataset.index;
    const service = this.data.services[index];
    wx.navigateTo({
      url: '../service-booking/service-booking?service=' + JSON.stringify(service)
    });
  },
  
  // 查看更多商家
  viewMoreMerchants: function() {
    wx.showModal({
      title: '附近商家',
      content: '当前已展示全部 ' + this.data.merchants.length + ' 家附近商家，更多商家正在入驻中，敬请期待！',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  // 查看更多服务
  viewMoreServices: function() {
    wx.showModal({
      title: '热门服务',
      content: '当前已展示全部 ' + this.data.services.length + ' 项热门服务，更多服务正在上线中，敬请期待！',
      showCancel: false,
      confirmText: '我知道了'
    });
  }
});