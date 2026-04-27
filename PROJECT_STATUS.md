# 🐾 PetPal 宠物伴侣 — 项目开发记录

> 最后更新：2026-04-27
> 本文件用于在新会话中快速恢复项目上下文，请在新对话开始时将此文件内容提供给 AI。

---

## 一、项目基本信息

| 项目 | 说明 |
|------|------|
| 项目名称 | PetPal 宠物伴侣 |
| 项目类型 | 微信小程序 + Node.js 后端 |
| 前端框架 | 微信小程序原生开发 |
| 后端框架 | Node.js + Express + Sequelize ORM |
| 数据库 | MySQL，端口 3306，用户名/密码：TRAE/TRAE，数据库名：TRAE |
| 后端端口 | 3000 |
| API 前缀 | `/api` |
| JWT 有效期 | 7天 |

---

## 二、项目目录结构

```
petpal/
├── PROJECT_STATUS.md        ← 本文件（项目状态记录）
├── docs.md                  ← 产品规划文档（五期路线图）
│
├── client/                  ← 微信小程序前端（用微信开发者工具打开此目录）
│   ├── app.js               ← 小程序入口，globalData 包含 baseUrl 和 userInfo
│   ├── app.json             ← 页面路由配置 + tabBar 配置
│   ├── app.wxss             ← 全局样式（CSS 变量定义在 page 选择器上）
│   ├── project.config.json  ← 微信开发者工具配置
│   ├── CODE_WIKI.md         ← 前端代码笔记
│   ├── database_init.sql    ← 早期 SQL 初始化脚本（已被 Sequelize 替代）
│   ├── images/              ← 所有图片资源（tab图标、商品图、服务图、头像等）
│   └── pages/               ← 20个页面
│       ├── index/           ← 首页（搜索、导航、推荐服务、推荐商品、社区帖子）
│       ├── login/           ← 登录页
│       ├── service/         ← 服务页（分类筛选、商家列表、服务列表）
│       ├── community/       ← 社区页（话题筛选、帖子列表）
│       │   ├── publish/     ← 发布帖子
│       │   └── comment/     ← 评论详情
│       ├── mall/            ← 商城页（商品网格展示）
│       ├── product-detail/  ← 商品详情（规格、评价、收藏、加购）
│       ├── cart/            ← 购物车
│       ├── orders/          ← 我的订单
│       ├── appointments/    ← 我的预约
│       ├── profile/         ← 个人中心
│       ├── edit-profile/    ← 编辑个人资料
│       ├── settings/        ← 设置页
│       ├── pet-management/  ← 宠物管理列表
│       │   ├── add-pet/     ← 添加宠物
│       │   └── edit-pet/    ← 编辑宠物
│       ├── service-booking/ ← 服务预约
│       ├── favorites/       ← 我的收藏
│       ├── tools/           ← 宠物工具
│       ├── about/           ← 关于我们
│       └── feedback/        ← 意见反馈
│
└── server/                  ← Node.js 后端
    ├── app.js               ← Express 主入口（加载模型→中间件→路由→错误处理）
    ├── package.json         ← 依赖配置
    ├── config/
    │   ├── index.js         ← 统一配置（端口、JWT、数据库、上传目录）
    │   └── database.js      ← Sequelize 实例（仅导出 sequelize，不加载模型）
    ├── models/              ← 14个 Sequelize 模型
    │   ├── User.js          ← 用户
    │   ├── Pet.js           ← 宠物
    │   ├── Category.js      ← 分类（service/product 类型）
    │   ├── Merchant.js      ← 商家
    │   ├── Service.js       ← 服务
    │   ├── Product.js       ← 商品
    │   ├── Order.js         ← 订单
    │   ├── OrderItem.js     ← 订单项
    │   ├── Booking.js       ← 预约
    │   ├── Post.js          ← 社区帖子
    │   ├── Topic.js         ← 话题
    │   ├── Comment.js       ← 评论
    │   ├── Favorite.js      ← 收藏
    │   └── Vaccine.js       ← 疫苗记录
    ├── controllers/         ← 14个控制器
    │   ├── authController.js
    │   ├── userController.js
    │   ├── petController.js
    │   ├── serviceController.js
    │   ├── productController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   ├── bookingController.js
    │   ├── postController.js
    │   ├── commentController.js
    │   ├── favoriteController.js
    │   ├── vaccineController.js
    │   ├── feedbackController.js
    │   └── uploadController.js
    ├── middleware/
    │   ├── auth.js          ← JWT 认证中间件
    │   └── errorHandler.js  ← 全局错误处理
    ├── routes/
    │   └── index.js         ← 路由汇总（公开路由 + 需登录路由）
    └── utils/
        ├── response.js      ← 统一响应格式 {code, message, data}
        ├── initDb.js        ← 数据库初始化脚本
        └── seed.js          ← 种子数据（分类、商家、服务、商品、话题）
```

---

## 三、已完成的工作

### 3.1 前端（微信小程序）✅ 基本完成

- **20个页面**全部创建，包含完整的 wxml/wxss/js
- **首页**：搜索栏、4个导航入口（渐变色块图标）、推荐服务横向滚动、推荐商品网格、社区帖子卡片
- **服务页**：分类筛选（宠物美容/寄养/医疗/训练）、商家列表、服务列表
- **社区页**：话题筛选（全部/宠物日常/宠物训练/宠物健康）、帖子列表、发布/评论
- **商城页**：商品网格展示、搜索、加购
- **商品详情页**：规格选择、评价展示、收藏、加购
- **个人中心**：头像/昵称、我的宠物（动态加载）、订单/预约/收藏/设置入口
- **宠物管理**：添加/编辑宠物，性别选择（独立方法模式）
- **购物车/订单/预约**：完整流程
- **TabBar**：5个标签页，选中态使用 -active.png 绿色图标
- **图片资源**：50+ 张图片（Pillow 生成的插画风格图片）

### 3.2 前端踩过的坑（重要！新会话不要再犯）

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| WXSS 中文类名编译报错 | `.status-待确认` 含中文 | JS 中用 STATUS_MAP 映射中文→英文类名 |
| wx.navigateTo 跳转 tabBar 页面无效 | tabBar 页面必须用 switchTab | 改用 `wx.switchTab` |
| WXML 中不能用 .repeat() | WXML 不支持 JS 方法 | 在 JS 中预处理，存为数据字段 |
| Picker 显示 [object Object] | range 传了对象数组 | 改为传 string 数组 `petNames` |
| 性别选择在真机无效 | data-* dataset 在真机不可靠 | 用独立方法 `selectMale()`/`selectFemale()` |
| app.wxss :root/:body 无效 | 小程序不支持这些选择器 | 改用 `page` 选择器 |
| app.wxss :hover 无效 | 小程序不支持 CSS :hover | 移除 :hover 样式 |
| 订单列表 wx:for 嵌套 | 内层 item 被外层覆盖 | 使用 `wx:for-item="product"` 重命名 |
| CSS 颜色不继承到子元素 | .active 的 color 不影响子 .text | 添加 `.active .text { color: white }` |
| mall.js addToCart 取错数组 | 用了 products 而非 filteredProducts | 改为 `this.data.filteredProducts[index]` |

### 3.3 后端（Node.js）✅ 已完成

- **14个 Sequelize 模型**已创建
- **14个控制器**已创建（auth/user/pet/service/product/cart/order/booking/post/comment/favorite/vaccine/feedback/upload）
- **路由**已配置：公开路由（登录、服务列表、商品列表、帖子列表）+ 需登录路由（所有 CRUD）
- **中间件**：JWT 认证 + 全局错误处理
- **工具**：统一响应格式、数据库初始化、种子数据
- **重要架构决策**：模型加载放在 app.js/seed.js 入口处显式 require，避免循环依赖
- **服务状态**：后端服务已成功启动，运行在 `http://localhost:3000`，所有API接口都已验证通过

### 3.4 后端踩过的坑

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| sequelize.models 为空 | database.js 没有加载模型 | 在 app.js/seed.js 入口显式 require 所有模型 |
| sequelize.define is not a function | database.js 加载模型时产生循环依赖 | 模型加载从 database.js 移到入口文件 |
| Topic 模型不存在 | models/ 下缺少 Topic.js | 创建 Topic.js 模型 |
| npm install 在沙箱卡住 | 沙箱网络环境受限 | 改为用户本地执行 npm install |

---

## 四、当前正在进行的工作

### ✅ 后端启动验证（已完成）

后端服务已成功启动，所有API接口都能正常工作。已完成的工作：

```bash
cd petpal/server

# 1. 安装依赖
npm install

# 2. 初始化数据库（创建 TRAE 数据库和所有表）
npm run init-db

# 3. 导入种子数据
npm run seed

# 4. 启动服务
npm start
```

**服务状态**：
- 后端服务运行在 `http://localhost:3000`
- API地址：`http://localhost:3000/api`
- 所有API接口都已验证通过

## 五、已完成的工作（续）

### 5.1 前后端联调（已完成）

- **创建 API 工具**：`client/utils/api.js`，封装 wx.request，统一处理 API 调用
- **修改前端页面**：将所有页面的静态数据替换为 API 调用
  - 首页：服务、商品、社区帖子数据从后端获取
  - 服务页：服务和商家数据从后端获取
  - 社区页：帖子数据从后端获取
  - 商城页：商品数据从后端获取
- **数据格式适配**：处理后端返回的数据格式，确保与前端期望的格式一致
- **图片路径修复**：修正服务、商品、商家的图片路径，确保与前端实际的图片文件名匹配
- **错误处理**：添加完整的错误处理机制，确保页面在网络错误时能够优雅降级
- **加载状态**：添加 loading 状态，提升用户体验

### 5.2 数据验证（已完成）

- **服务列表**：4个服务，包含名称、描述、价格、图片等信息
- **商品列表**：6个商品，包含名称、描述、价格、图片等信息
- **社区帖子**：3个帖子，包含内容、图片、点赞数、评论数，以及关联的用户信息
- **商家列表**：3个商家，包含名称、描述、地址、电话、评分、图片等信息
- **图片显示**：所有图片都能正确显示

## 六、未来待完成的工作

### 第一优先级：功能完善（产品路线图二期）

1. **支付集成**（微信支付）
2. **消息推送**（模板消息/订阅消息）
3. **图片上传**（对接后端 uploadController）
4. **搜索功能**（后端搜索 API + 前端搜索页）
5. **商家详情页**

### 第二优先级：体验优化（产品路线图三期）

6. **骨架屏 / 加载动画**
7. **下拉刷新 + 上拉加载更多**
8. **图片懒加载**
9. **动画过渡效果**

### 第三优先级：运营功能（产品路线图四期）

10. **商家后台管理**
11. **数据统计面板**
12. **优惠券 / 促销系统**

### 第四优先级：生态扩展（产品路线图五期）

13. **宠物社交匹配**
14. **宠物健康档案 AI 分析**
15. **O2O 服务（上门服务）**

---

## 七、技术要点备忘

### 前端关键模式

```javascript
// STATUS_MAP 模式：中文状态 → 英文 CSS 类名
const STATUS_MAP = {
  '待确认': 'pending',
  '已确认': 'confirmed',
  '已完成': 'completed',
  '已取消': 'cancelled'
};

// 性别选择：独立方法模式（不用 data-*）
selectMale() { this.setData({ petGender: '公', genderMale: true, genderFemale: false }); },
selectFemale() { this.setData({ petGender: '母', genderMale: false, genderFemale: true }); },

// tabBar 页面跳转
wx.switchTab({ url: '/pages/service/service' });  // 不是 wx.navigateTo

// Picker 绑定字符串数组
data: { pets: [{name: '旺财'}, {name: '咪咪'}], petNames: ['旺财', '咪咪'] },
// wxml: <picker range="{{petNames}}">
```

### 后端关键模式

```javascript
// 模型加载：必须在入口文件显式 require，不能放在 database.js 中
require('./models/Category');
require('./models/User');
// ... 所有模型

// 统一响应格式
res.json({ code: 200, message: 'success', data: result });

// JWT 认证流程
// 前端：wx.login() → 后端 /api/auth/login → 返回 token
// 后续请求：Header Authorization: Bearer <token>
```

### 数据库配置

```javascript
// config/index.js
db: {
  host: '127.0.0.1',
  port: 3306,
  username: 'TRAE',
  password: 'TRAE',
  database: 'TRAE',
  dialect: 'mysql'
}
```

---

## 八、给新会话 AI 的提示

> 如果你是一个新的 AI 会话，请阅读以下指引：

1. **先读此文件**：`PROJECT_STATUS.md`（本文件）和 `docs.md`（产品规划）
2. **当前状态**：
   - 后端服务已成功启动，运行在 `http://localhost:3000`
   - 所有API接口都已验证通过
   - 前端已成功对接后端 API，所有页面都从后端获取数据
   - 所有图片都能正确显示
3. **下一步行动**：根据产品路线图，优先完成功能完善（支付集成、消息推送、图片上传等）
4. **不要做的事**：
   - 不要在沙箱中执行 `npm install`（会卡住）
   - 不要在 WXSS 中使用中文类名
   - 不要用 `wx.navigateTo` 跳转 tabBar 页面
   - 不要在 WXML 中使用 `.repeat()` 等 JS 方法
   - 不要把模型加载逻辑放在 `database.js` 中（会循环依赖）
5. **前端所有页面已对接后端 API**，不再使用本地 Storage 模拟数据
