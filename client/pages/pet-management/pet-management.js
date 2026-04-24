// 宠物管理页面逻辑
Page({
  data: {
    pets: []
  },
  
  onLoad: function() {
    // 页面加载时执行
    console.log('宠物管理页面加载');
    this.loadPets();
  },
  
  onShow: function() {
    // 页面显示时执行
    console.log('宠物管理页面显示');
    this.loadPets();
  },
  
  // 加载宠物数据
  loadPets: function() {
    let pets = wx.getStorageSync('pets') || [];
    // 如果没有宠物数据，添加默认宠物
    if (pets.length === 0) {
      pets = [
        {
          id: '1',
          name: '小白',
          type: '狗',
          breed: '拉布拉多',
          age: 2,
          gender: '公',
          birthday: '2022-01-01',
          weight: 25,
          image: '/images/post-dog-park.jpg',
          description: '非常活泼，喜欢玩球'
        },
        {
          id: '2',
          name: '小花',
          type: '猫',
          breed: '布偶猫',
          age: 1,
          gender: '母',
          birthday: '2022-06-01',
          weight: 5,
          image: '/images/post-cat-daily.jpg',
          description: '性格温顺，喜欢撒娇'
        }
      ];
      // 保存到本地存储
      wx.setStorageSync('pets', pets);
    }
    this.setData({
      pets: pets
    });
  },
  
  // 添加宠物
  addPet: function() {
    wx.navigateTo({
      url: './add-pet/add-pet'
    });
  },
  
  // 编辑宠物
  editPet: function(e) {
    const index = e.currentTarget.dataset.index;
    const pet = this.data.pets[index];
    wx.navigateTo({
      url: './edit-pet/edit-pet?index=' + index
    });
  },
  
  // 删除宠物
  deletePet: function(e) {
    const index = e.currentTarget.dataset.index;
    const pet = this.data.pets[index];
    
    wx.showModal({
      title: '删除宠物',
      content: '确定要删除宠物"' + pet.name + '"吗？',
      success: (res) => {
        if (res.confirm) {
          const pets = this.data.pets;
          pets.splice(index, 1);
          wx.setStorageSync('pets', pets);
          this.setData({
            pets: pets
          });
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
});