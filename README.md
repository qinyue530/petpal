# 🐾 PetPal 宠物伴侣

PetPal 是一个专为宠物主人设计的综合性小程序应用，提供宠物管理、服务预约、社区互动、商城购物等功能，旨在为宠物主人提供一站式的宠物服务平台。

## 🤖 项目生成信息

本项目由 **TRAE SOLO AI** 生成
- **生成日期**：2026-04-27
- **技术支持**：TRAE SOLO 开发工具
- **版本**：1.0.0

---

## 🚀 项目特性

- **宠物管理**：添加、编辑宠物信息，跟踪宠物健康状况
- **服务预约**：预约宠物医疗、美容、寄养等服务
- **社区互动**：发布宠物动态，评论和点赞
- **商城购物**：浏览和购买宠物用品
- **用户管理**：注册、登录、个人资料编辑
- **疫苗管理**：记录宠物疫苗接种情况
- **订单管理**：查看和管理购物订单
- **收藏功能**：收藏喜欢的产品和服务
- **反馈系统**：提交用户反馈

## 🛠️ 技术栈

### 前端
- **框架**：微信小程序原生开发
- **语言**：JavaScript
- **样式**：WXSS
- **布局**：WXML

### 后端
- **语言**：Node.js
- **框架**：Express
- **ORM**：Sequelize
- **数据库**：MySQL
- **认证**：JWT (JSON Web Token)
- **文件上传**：Multer

## 📁 项目结构

```
petpal/
├── README.md               ← 项目说明文档
├── PROJECT_STATUS.md       ← 项目状态记录
├── docs.md                 ← 产品规划文档
│
├── client/                 ← 微信小程序前端
│   ├── app.js              ← 小程序入口
│   ├── app.json            ← 页面路由配置
│   ├── app.wxss            ← 全局样式
│   ├── images/             ← 图片资源
│   └── pages/              ← 20个页面
│       ├── index/          ← 首页
│       ├── login/          ← 登录页
│       ├── service/        ← 服务页
│       ├── community/      ← 社区页
│       ├── mall/           ← 商城页
│       └── ...             ← 其他页面
│
└── server/                 ← Node.js 后端
    ├── app.js              ← Express 主入口
    ├── config/             ← 配置文件
    ├── controllers/        ← 控制器
    ├── middleware/         ← 中间件
    ├── models/             ← 数据模型
    ├── routes/             ← API 路由
    └── utils/              ← 工具函数
```

## 📦 快速开始

### 后端启动

1. **安装依赖**
   ```bash
   cd petpal/server
   npm install
   ```

2. **初始化数据库**
   ```bash
   npm run init-db
   ```

3. **导入种子数据**
   ```bash
   npm run seed
   ```

4. **启动服务**
   ```bash
   npm start
   # 或开发模式
   npm run dev
   ```

   服务会运行在 `http://localhost:3000`，API 地址为 `http://localhost:3000/api`

### 前端启动

1. **打开微信开发者工具**
2. **导入项目**：选择 `petpal/client` 目录
3. **配置本地设置**：勾选"不校验合法域名、web-view（业务域名）、TLS版本以及HTTPS证书"
4. **编译运行**：点击"编译"按钮，小程序会在模拟器中运行

## 🌐 API 接口

### 公开接口
- `GET /api/services` - 获取服务列表
- `GET /api/products` - 获取商品列表
- `GET /api/posts` - 获取社区帖子列表
- `GET /api/merchants` - 获取商家列表
- `POST /api/auth/login` - 用户登录

### 需要认证的接口
- `GET /api/pets` - 获取宠物列表
- `POST /api/pets` - 添加宠物
- `PUT /api/pets/:id` - 更新宠物信息
- `DELETE /api/pets/:id` - 删除宠物
- `GET /api/orders` - 获取订单列表
- `POST /api/orders` - 创建订单
- `GET /api/bookings` - 获取预约列表
- `POST /api/bookings` - 创建预约
- `POST /api/posts` - 发布帖子
- `POST /api/comments` - 发表评论

## 📱 前端页面

- **首页**：搜索栏、导航入口、推荐服务、热门商品、社区动态
- **服务页**：分类筛选、商家列表、服务列表
- **社区页**：话题筛选、帖子列表、发布/评论
- **商城页**：商品网格展示、搜索、加购
- **个人中心**：头像/昵称、我的宠物、订单/预约/收藏/设置入口
- **宠物管理**：添加/编辑宠物，性别选择
- **购物车/订单/预约**：完整流程

## 🎨 设计风格

- **色彩方案**：温暖的橙色和绿色为主色调，营造温馨的宠物友好氛围
- **UI 元素**：圆角设计，柔和的阴影，清晰的层次结构
- **图标风格**：简约现代的线性图标，搭配可爱的宠物元素
- **图片资源**：使用插画风格的宠物图片，提升用户体验

## 📝 开发指南

### 前端开发
- 使用微信开发者工具进行开发和调试
- 遵循微信小程序开发规范
- 页面数据优先从后端 API 获取
- 添加适当的加载状态和错误处理

### 后端开发
- 遵循 RESTful API 设计规范
- 使用 Sequelize ORM 操作数据库
- 添加适当的日志记录和错误处理
- 确保 API 接口的安全性

## 🤝 贡献指南

1. **Fork 项目**
2. **创建分支**：`git checkout -b feature/your-feature`
3. **提交更改**：`git commit -m 'Add some feature'`
4. **推送到分支**：`git push origin feature/your-feature`
5. **创建 Pull Request**

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

MIT License

Copyright (c) 2026 PetPal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🌟 致谢

- 感谢所有为项目做出贡献的开发者
- 感谢微信小程序团队提供的开发工具和文档
- 感谢 Sequelize 团队提供的 ORM 框架
- 感谢所有支持和使用 PetPal 的用户

---

**PetPal - 让宠物生活更美好** 🐶🐱