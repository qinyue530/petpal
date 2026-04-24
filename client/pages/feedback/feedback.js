// 意见反馈页面
Page({
  data: { content: '', contact: '' },
  inputContent: function(e) { this.setData({ content: e.detail.value }); },
  inputContact: function(e) { this.setData({ contact: e.detail.value }); },
  submit: function() {
    if (!this.data.content) {
      wx.showToast({ title: '请输入反馈内容', icon: 'none' });
      return;
    }
    const feedback = {
      content: this.data.content,
      contact: this.data.contact,
      time: new Date().toISOString()
    };
    const feedbacks = wx.getStorageSync('feedbacks') || [];
    feedbacks.push(feedback);
    wx.setStorageSync('feedbacks', feedbacks);
    wx.showToast({ title: '感谢您的反馈', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1500);
  }
});
