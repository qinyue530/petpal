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
    const posts = wx.getStorageSync('posts') || [];
    if (posts.length === 0) {
      // 添加默认帖子
      const defaultPosts = [
        {
          id: 1,
          username: "宠物爱好者",
          avatar: "/images/avatar-user1.jpg",
          time: "2小时前",
          content: "我家狗狗今天学会了新技能，太聪明了！分享一下它的训练过程...",
          image: "/images/post-dog-park.jpg",
          likes: 23,
          comments: 5,
          topic: 3
        },
        {
          id: 2,
          username: "猫咪控",
          avatar: "/images/avatar-user2.jpg",
          time: "4小时前",
          content: "分享一下我家猫咪的日常，是不是很可爱？它最近特别喜欢玩这个玩具...",
          image: "/images/post-cat-daily.jpg",
          likes: 45,
          comments: 12,
          topic: 2
        },
        {
          id: 3,
          username: "宠物医生",
          avatar: "/images/avatar-vet.jpg",
          time: "6小时前",
          content: "最近天气变化较大，宠物容易生病，大家要注意给宠物保暖，定期检查健康状况...",
          image: "/images/post-pet-health.jpg",
          likes: 67,
          comments: 18,
          topic: 4
        }
      ];
      wx.setStorageSync('posts', defaultPosts);
      this.setData({
        posts: defaultPosts
      });
    } else {
      this.setData({
        posts: posts
      });
    }
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
    var allPosts = wx.getStorageSync('posts') || [];
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
