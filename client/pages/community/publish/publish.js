// 发布帖子页面逻辑
Page({
  data: {
    topics: ["全部", "宠物日常", "宠物训练", "宠物健康", "宠物美食", "宠物用品"],
    selectedTopic: '',
    content: '',
    images: []
  },
  
  onLoad: function() {
    // 页面加载时执行
    console.log('发布帖子页面加载');
  },
  
  // 选择话题
  bindTopicChange: function(e) {
    const index = e.detail.value;
    this.setData({
      selectedTopic: this.data.topics[index]
    });
  },
  
  // 输入内容
  inputContent: function(e) {
    this.setData({
      content: e.detail.value
    });
  },
  
  // 选择图片
  chooseImage: function() {
    const that = this;
    wx.chooseImage({
      count: 9 - that.data.images.length,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        });
      }
    });
  },
  
  // 删除图片
  deleteImage: function(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    });
  },
  
  // 发布帖子
  publishPost: function() {
    if (!this.data.content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }
    
    // 获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || { username: '匿名用户' };
    
    // 创建帖子对象
    const post = {
      id: Date.now(),
      username: userInfo.username,
      time: '刚刚',
      content: this.data.content,
      images: this.data.images,
      likes: 0,
      comments: 0,
      topic: this.data.selectedTopic || '全部',
      createTime: new Date().toISOString()
    };
    
    // 保存帖子到本地存储
    const posts = wx.getStorageSync('posts') || [];
    posts.unshift(post); // 新帖子放在最前面
    wx.setStorageSync('posts', posts);
    
    // 显示成功提示
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      success: function() {
        // 跳转到社区页面
        wx.navigateBack();
      }
    });
  }
});