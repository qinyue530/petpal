// 评论页面逻辑
Page({
  data: {
    post: {},
    comments: [],
    commentContent: ''
  },
  
  onLoad: function(options) {
    // 页面加载时执行
    console.log('评论页面加载');
    const postId = options.postId;
    this.loadPost(postId);
    this.loadComments(postId);
  },
  
  // 加载帖子信息
  loadPost: function(postId) {
    const posts = wx.getStorageSync('posts') || [];
    const post = posts.find(post => post.id == postId) || {};
    this.setData({
      post: post
    });
  },
  
  // 加载评论
  loadComments: function(postId) {
    const comments = wx.getStorageSync('comments') || {};
    this.setData({
      comments: comments[postId] || []
    });
  },
  
  // 输入评论内容
  inputComment: function(e) {
    this.setData({
      commentContent: e.detail.value
    });
  },
  
  // 提交评论
  submitComment: function() {
    if (!this.data.commentContent) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }
    
    // 获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || { username: '匿名用户' };
    
    // 创建评论对象
    const comment = {
      id: Date.now(),
      username: userInfo.username,
      time: '刚刚',
      content: this.data.commentContent,
      createTime: new Date().toISOString()
    };
    
    // 保存评论
    const postId = this.data.post.id;
    const comments = wx.getStorageSync('comments') || {};
    if (!comments[postId]) {
      comments[postId] = [];
    }
    comments[postId].push(comment);
    wx.setStorageSync('comments', comments);
    
    // 更新帖子的评论数
    const posts = wx.getStorageSync('posts') || [];
    const postIndex = posts.findIndex(post => post.id == postId);
    if (postIndex >= 0) {
      posts[postIndex].comments = (posts[postIndex].comments || 0) + 1;
      wx.setStorageSync('posts', posts);
    }
    
    // 更新评论列表
    this.setData({
      comments: comments[postId],
      commentContent: ''
    });
    
    // 显示成功提示
    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  }
});