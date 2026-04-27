const app = getApp();

const api = {
  baseUrl: app.globalData.apiBaseUrl,
  
  request(options) {
    return new Promise((resolve, reject) => {
      const token = wx.getStorageSync('token');
      const header = {
        'Content-Type': 'application/json'
      };
      
      // 只在有token时才添加Authorization头
      if (token) {
        header['Authorization'] = 'Bearer ' + token;
      }
      
      wx.request({
        url: this.baseUrl + options.url,
        method: options.method || 'GET',
        data: options.data,
        header: header,
        success: (res) => {
          if (res.data.code === 200) {
            // 检查返回数据是否包含list字段
            if (res.data.data && res.data.data.list) {
              resolve(res.data.data.list);
            } else {
              resolve(res.data.data);
            }
          } else {
            reject(res.data.message);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },
  
  // 认证相关
  login(data) {
    return this.request({
      url: '/auth/login',
      method: 'POST',
      data
    });
  },
  
  register(data) {
    return this.request({
      url: '/auth/register',
      method: 'POST',
      data
    });
  },
  
  // 服务相关
  getServices() {
    return this.request({
      url: '/services'
    });
  },
  
  // 商品相关
  getProducts() {
    return this.request({
      url: '/products'
    });
  },
  
  // 社区相关
  getPosts() {
    return this.request({
      url: '/posts'
    });
  },
  
  // 宠物相关
  getPets() {
    return this.request({
      url: '/pets'
    });
  },
  
  addPet(data) {
    return this.request({
      url: '/pets',
      method: 'POST',
      data
    });
  }
};

module.exports = api;