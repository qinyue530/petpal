// 社区页面逻辑
Page({
  data: {
    topics: [
      { id: 1, name: "全部" },
      { id: 2, name: "宠物日常" },
      { id: 3, name: "宠物训练" },
      { id: 4, name: "宠物健康" },
      { id: 5, name: "宠物美食" },
      { id: 6, name: "宠物用品" }
    ],
    selectedTopic: 1,
    posts: []
  },

  onLoad: function() {
    // 页面加载时执行
    console.log('社区页面加载');
    this.loadPosts();
  },

  onShow: function() {
    // 页面显示时执行
    console.log('社区页面显示');
    this.loadPosts();
  },

  // 加载帖子数据
  loadPosts: function() {
    wx.showLoading({ title: '加载中...' });
    const api = require('../../utils/api');
    
    api.getPosts()
      .then(posts => {
        // 处理帖子数据，适配前端格式
        const processedPosts = (posts || []).map(post => {
          // 处理用户信息
          const user = post.user || {};
          // 处理图片（取第一张图片）
          let image = '';
          try {
            const images = JSON.parse(post.images || '[]');
            image = images[0] || '';
          } catch (e) {
            image = '';
          }
          
          return {
            id: post.id,
            topic: post.topic_id || 1, // 使用topic_id作为topic
            username: user.username || '未知用户',
            avatar: user.avatar || '/images/avatar-default.png',
            content: post.content || '',
            image: image,
            likes: post.likes || 0,
            comments: post.comments || 0,
            time: '刚刚' // 简化处理，使用固定时间
          };
        });
        
        this.setData({ posts: processedPosts });
        wx.hideLoading();
      })
      .catch(err => {
        console.error('加载帖子失败:', err);
        wx.hideLoading();
        wx.showToast({ title: '加载失败', icon: 'none' });
      });
  },

  // 发布动态
  publishPost: function() {
    wx.navigateTo({
      url: './publish/publish'
    });
  },

  // 选择话题
  selectTopic: function(e) {
    var index = e.currentTarget.dataset.index;
    var topicId = this.data.topics[index].id;
    this.setData({ selectedTopic: topicId });
    this.filterPosts();
  },

  // 按话题过滤帖子
  filterPosts: function() {
    var allPosts = this.data.posts;
    var topicId = this.data.selectedTopic;
    var filtered;
    if (topicId === 1) {
      filtered = allPosts;
    } else {
      filtered = allPosts.filter(function(p) { return p.topic === topicId; });
    }
    this.setData({ posts: filtered });
  },

  // 点赞帖子
  likePost: function(e) {
    const index = e.currentTarget.dataset.index;
    const posts = this.data.posts;
    posts[index].likes++;
    this.setData({
      posts: posts
    });
    // 更新本地存储
    wx.setStorageSync('posts', posts);
    wx.showToast({
      title: '点赞成功',
      icon: 'success'
    });
  },

  // 评论帖子
  commentPost: function(e) {
    const index = e.currentTarget.dataset.index;
    const postId = this.data.posts[index].id;
    wx.navigateTo({
      url: './comment/comment?postId=' + postId
    });
  },

  // 分享帖子
  sharePost: function(e) {
    const index = e.currentTarget.dataset.index;
    const post = this.data.posts[index];
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到朋友圈', '复制链接'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 触发分享给好友
          wx.showModal({
            title: '分享给好友',
            content: '请点击右上角菜单中的"转发"分享给好友',
            showCancel: false
          });
        } else if (res.tapIndex === 1) {
          // 分享到朋友圈
          wx.showModal({
            title: '分享到朋友圈',
            content: '请点击右上角菜单中的"分享到朋友圈"',
            showCancel: false
          });
        } else if (res.tapIndex === 2) {
          // 复制链接
          wx.setClipboardData({
            data: '宠物伴侣社区 - ' + post.content.substring(0, 20) + '...',
            success: () => {
              wx.showToast({ title: '已复制', icon: 'success' });
            }
          });
        }
      }
    });
  },

  // 分享给好友
  onShareAppMessage: function() {
    return {
      title: '宠物伴侣社区 - 分享宠物日常',
      path: '/pages/community/community',
      imageUrl: '/images/logo.png'
    };
  },

  // 分享到朋友圈
  onShareTimeline: function() {
    return {
      title: '宠物伴侣社区 - 分享宠物日常',
      query: '',
      imageUrl: '/images/logo.png'
    };
  }
});
