// 编辑宠物页面逻辑
Page({
  data: {
    index: 0,
    petImage: '',
    petName: '',
    petTypeIndex: 0,
    petTypes: ['狗狗', '猫咪', '其他'],
    petBreed: '',
    petAge: '',
    gender: ''
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('编辑宠物页面加载');
    this.setData({
      index: options.index
    });
    this.loadPetData();
  },
  
  // 加载宠物数据
  loadPetData: function() {
    const index = this.data.index;
    const pets = wx.getStorageSync('pets') || [];
    if (pets[index]) {
      const pet = pets[index];
      this.setData({
        petImage: pet.image || '',
        petName: pet.name,
        petTypeIndex: this.data.petTypes.indexOf(pet.type),
        petBreed: pet.breed,
        petAge: pet.age,
        gender: pet.gender === '公' ? 'male' : 'female'
      });
    }
  },
  
  // 选择宠物照片
  chooseImage: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          petImage: tempFilePaths[0]
        });
      }
    });
  },
  
  // 输入宠物名称
  inputName: function(e) {
    this.setData({
      petName: e.detail.value
    });
  },
  
  // 选择宠物类型
  bindTypeChange: function(e) {
    this.setData({
      petTypeIndex: e.detail.value
    });
  },
  
  // 输入宠物品种
  inputBreed: function(e) {
    this.setData({
      petBreed: e.detail.value
    });
  },
  
  // 输入宠物年龄
  inputAge: function(e) {
    this.setData({
      petAge: e.detail.value
    });
  },
  
  // 选择公
  selectMale: function() {
    this.setData({ gender: 'male' });
  },

  // 选择母
  selectFemale: function() {
    this.setData({ gender: 'female' });
  },
  
  // 保存宠物信息
  savePet: function() {
    if (!this.data.petName) {
      wx.showToast({
        title: '请输入宠物名称',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.petBreed) {
      wx.showToast({
        title: '请输入宠物品种',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.petAge) {
      wx.showToast({
        title: '请输入宠物年龄',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.gender) {
      wx.showToast({
        title: '请选择宠物性别',
        icon: 'none'
      });
      return;
    }
    
    // 获取当前宠物数据
    const index = this.data.index;
    const pets = wx.getStorageSync('pets') || [];
    
    // 更新宠物信息
    pets[index] = {
      ...pets[index],
      name: this.data.petName,
      type: this.data.petTypes[this.data.petTypeIndex],
      breed: this.data.petBreed,
      age: this.data.petAge,
      gender: this.data.gender === 'male' ? '公' : '母',
      image: this.data.petImage
    };
    
    // 保存到本地存储
    wx.setStorageSync('pets', pets);
    
    // 显示成功提示
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      success: () => {
        // 跳转到宠物管理页面
        wx.navigateBack();
      }
    });
  }
});