# 宠物伴侣小程序 - Code Wiki

## 1. 项目概述

宠物伴侣是一个专为宠物主人设计的微信小程序，提供宠物服务预约、社区交流、商品购买等功能，旨在为宠物主人提供全方位的宠物管理和服务体验。

## 2. 项目架构

### 2.1 整体架构

宠物伴侣小程序采用微信小程序的标准架构，主要由以下部分组成：

- **页面层**：包含所有功能页面，如首页、服务、社区、商城、个人中心等
- **数据层**：使用微信本地存储模拟数据存储，同时提供了完整的数据库设计
- **逻辑层**：处理页面交互逻辑，实现各种功能

### 2.2 目录结构

```
├── app.js              # 应用初始化逻辑
├── app.json            # 应用配置
├── app.wxss            # 全局样式
├── database_init.sql   # 数据库初始化脚本
├── images/             # 图片资源
└── pages/              # 页面目录
    ├── about/          # 关于我们
    ├── appointments/   # 预约管理
    ├── cart/           # 购物车
    ├── community/      # 社区
    ├── edit-profile/   # 编辑个人资料
    ├── favorites/      # 收藏管理
    ├── feedback/       # 意见反馈
    ├── index/          # 首页
    ├── login/          # 登录页面
    ├── mall/           # 商城
    ├── orders/         # 订单管理
    ├── pet-management/ # 宠物管理
    ├── product-detail/ # 商品详情
    ├── profile/        # 个人中心
    ├── service/        # 服务页面
    ├── service-booking/# 服务预约
    ├── settings/       # 设置
    └── tools/          # 工具页面
```

## 3. 核心功能模块

### 3.1 首页模块

首页是用户进入小程序的第一个页面，提供了搜索、服务推荐、商品推荐和社区动态等功能。

**主要功能**：
- 搜索功能：支持服务和商品的搜索
- 快捷导航：快速跳转到服务、商城、社区等页面
- 服务推荐：展示热门宠物服务
- 商品推荐：展示热门宠物商品
- 社区动态：展示最新的社区帖子

**关键文件**：
- [pages/index/index.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/index/index.js)：首页逻辑
- [pages/index/index.wxml](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/index/index.wxml)：首页布局
- [pages/index/index.wxss](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/index/index.wxss)：首页样式

### 3.2 服务模块

服务模块提供宠物相关的各种服务，如宠物美容、寄养、医疗、训练等。

**主要功能**：
- 服务分类：按类别展示不同服务
- 服务详情：查看服务的详细信息
- 服务预约：预约宠物服务
- 附近商家：展示附近的宠物服务商家

**关键文件**：
- [pages/service/service.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/service/service.js)：服务页面逻辑
- [pages/service-booking/service-booking.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/service-booking/service-booking.js)：服务预约逻辑

### 3.3 社区模块

社区模块是宠物主人交流的平台，用户可以发布帖子、评论、点赞等。

**主要功能**：
- 帖子发布：用户可以发布宠物相关的帖子
- 帖子浏览：查看社区中的帖子
- 帖子互动：对帖子进行点赞、评论、分享
- 话题分类：按话题分类浏览帖子

**关键文件**：
- [pages/community/community.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/community/community.js)：社区页面逻辑
- [pages/community/publish/publish.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/community/publish/publish.js)：发布帖子逻辑
- [pages/community/comment/comment.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/community/comment/comment.js)：评论帖子逻辑

### 3.4 商城模块

商城模块提供宠物相关的商品购买功能。

**主要功能**：
- 商品分类：按类别展示商品
- 商品搜索：搜索商品
- 商品详情：查看商品详细信息
- 购物车：管理购物车商品
- 订单管理：查看和管理订单

**关键文件**：
- [pages/mall/mall.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/mall/mall.js)：商城页面逻辑
- [pages/cart/cart.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/cart/cart.js)：购物车逻辑
- [pages/orders/orders.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/orders/orders.js)：订单管理逻辑
- [pages/product-detail/product-detail.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/product-detail/product-detail.js)：商品详情逻辑

### 3.5 个人中心模块

个人中心模块提供用户个人信息管理、宠物管理、预约管理等功能。

**主要功能**：
- 用户信息管理：查看和编辑个人信息
- 宠物管理：添加、编辑、删除宠物信息
- 我的预约：查看和管理服务预约
- 我的订单：查看和管理购物订单
- 我的收藏：查看收藏的商品和帖子

**关键文件**：
- [pages/profile/profile.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/profile/profile.js)：个人中心逻辑
- [pages/pet-management/pet-management.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/pet-management/pet-management.js)：宠物管理逻辑
- [pages/appointments/appointments.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/appointments/appointments.js)：预约管理逻辑
- [pages/favorites/favorites.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/favorites/favorites.js)：收藏管理逻辑

## 4. 核心 API/类/函数

### 4.1 全局应用 API

#### App 实例

**功能**：小程序的全局应用实例，管理全局数据和生命周期。

**关键方法**：
- `onLaunch()`：小程序初始化时调用
- `checkLoginStatus()`：检查用户登录状态
- `initGlobalData()`：初始化全局数据
- `login(userInfo)`：用户登录
- `logout()`：用户退出登录
- `addPet(pet)`：添加宠物
- `getPets()`：获取宠物列表

**全局数据**：
- `userInfo`：用户信息
- `pets`：宠物列表
- `services`：服务列表
- `products`：商品列表
- `communityPosts`：社区帖子列表

**文件**：[app.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/app.js)

### 4.2 首页模块 API

#### 导航函数

**功能**：导航到其他页面

- `navigateToService()`：跳转到服务页面
- `navigateToMall()`：跳转到商城页面
- `navigateToCommunity()`：跳转到社区页面
- `navigateToTools()`：跳转到工具页面

#### 搜索函数

**功能**：搜索服务和商品

- `inputSearch(e)`：输入搜索关键词
- `search()`：执行搜索
- `clearSearch()`：清除搜索

#### 跳转函数

**功能**：跳转到详情页面

- `goToServiceDetail(e)`：跳转到服务详情
- `goToProductDetail(e)`：跳转到商品详情

**文件**：[pages/index/index.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/index/index.js)

### 4.3 服务模块 API

#### 分类函数

**功能**：按分类筛选服务

- `selectCategory(e)`：选择服务分类

#### 预约函数

**功能**：预约服务

- `bookService(e)`：预约服务

**文件**：[pages/service/service.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/service/service.js)

### 4.4 社区模块 API

#### 帖子管理函数

**功能**：管理社区帖子

- `loadPosts()`：加载帖子数据
- `publishPost()`：发布帖子
- `selectTopic(e)`：选择话题
- `filterPosts()`：按话题过滤帖子
- `likePost(e)`：点赞帖子
- `commentPost(e)`：评论帖子
- `sharePost(e)`：分享帖子

**文件**：[pages/community/community.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/community/community.js)

### 4.5 商城模块 API

#### 商品管理函数

**功能**：管理商品

- `selectCategory(e)`：选择商品分类
- `inputSearch(e)`：输入搜索关键词
- `search()`：执行搜索
- `filterProducts()`：筛选商品
- `addToCart(e)`：加入购物车
- `goToDetail(e)`：跳转到商品详情
- `goToCart()`：跳转到购物车
- `updateCartCount()`：更新购物车数量

**文件**：[pages/mall/mall.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/mall/mall.js)

### 4.6 个人中心模块 API

#### 用户管理函数

**功能**：管理用户信息

- `loadUserInfo()`：加载用户信息
- `login()`：用户登录
- `logout()`：用户退出登录

#### 宠物管理函数

**功能**：管理宠物信息

- `loadPets()`：加载宠物数据
- `managePets()`：管理宠物
- `addPet()`：添加宠物
- `editPet(e)`：编辑宠物

#### 其他功能函数

**功能**：其他个人中心功能

- `myOrders()`：查看订单
- `myAppointments()`：查看预约
- `myFavorites()`：查看收藏
- `aboutUs()`：关于我们
- `feedback()`：意见反馈
- `settings()`：设置

**文件**：[pages/profile/profile.js](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/pages/profile/profile.js)

## 5. 数据结构

### 5.1 本地存储数据结构

小程序使用微信本地存储（wx.getStorageSync/wx.setStorageSync）来存储数据，主要存储以下数据：

- `userInfo`：用户信息
- `pets`：宠物列表
- `posts`：社区帖子
- `cart`：购物车商品

### 5.2 数据库结构

项目提供了完整的数据库设计，包含以下表：

#### 用户表 (users)
- `id`：用户ID
- `username`：用户名
- `phone`：手机号
- `password`：密码
- `avatar`：头像
- `desc`：个人描述
- `created_at`：创建时间
- `updated_at`：更新时间

#### 宠物表 (pets)
- `id`：宠物ID
- `user_id`：用户ID
- `name`：宠物名称
- `type`：宠物类型
- `breed`：宠物品种
- `age`：宠物年龄
- `gender`：宠物性别
- `avatar`：宠物头像
- `created_at`：创建时间
- `updated_at`：更新时间

#### 服务分类表 (service_categories)
- `id`：分类ID
- `name`：分类名称
- `icon`：分类图标
- `created_at`：创建时间

#### 服务表 (services)
- `id`：服务ID
- `category_id`：分类ID
- `name`：服务名称
- `price`：服务价格
- `description`：服务描述
- `image`：服务图片
- `created_at`：创建时间
- `updated_at`：更新时间

#### 商家表 (merchants)
- `id`：商家ID
- `name`：商家名称
- `address`：商家地址
- `phone`：商家电话
- `rating`：商家评分
- `image`：商家图片
- `latitude`：纬度
- `longitude`：经度
- `created_at`：创建时间
- `updated_at`：更新时间

#### 预约表 (appointments)
- `id`：预约ID
- `user_id`：用户ID
- `service_id`：服务ID
- `merchant_id`：商家ID
- `pet_id`：宠物ID
- `appointment_time`：预约时间
- `status`：预约状态
- `created_at`：创建时间
- `updated_at`：更新时间

#### 社区话题表 (topics)
- `id`：话题ID
- `name`：话题名称
- `created_at`：创建时间

#### 社区帖子表 (posts)
- `id`：帖子ID
- `user_id`：用户ID
- `topic_id`：话题ID
- `content`：帖子内容
- `image`：帖子图片
- `likes`：点赞数
- `comments`：评论数
- `created_at`：创建时间
- `updated_at`：更新时间

#### 评论表 (comments)
- `id`：评论ID
- `post_id`：帖子ID
- `user_id`：用户ID
- `content`：评论内容
- `created_at`：创建时间

#### 商品分类表 (product_categories)
- `id`：分类ID
- `name`：分类名称
- `icon`：分类图标
- `created_at`：创建时间

#### 商品表 (products)
- `id`：商品ID
- `category_id`：分类ID
- `name`：商品名称
- `price`：商品价格
- `stock`：商品库存
- `description`：商品描述
- `image`：商品图片
- `created_at`：创建时间
- `updated_at`：更新时间

#### 购物车表 (cart)
- `id`：购物车ID
- `user_id`：用户ID
- `product_id`：商品ID
- `quantity`：商品数量
- `created_at`：创建时间
- `updated_at`：更新时间

#### 订单表 (orders)
- `id`：订单ID
- `user_id`：用户ID
- `total_price`：订单总价
- `status`：订单状态
- `created_at`：创建时间
- `updated_at`：更新时间

#### 订单商品表 (order_items)
- `id`：订单商品ID
- `order_id`：订单ID
- `product_id`：商品ID
- `quantity`：商品数量
- `price`：商品价格

#### 疫苗表 (vaccines)
- `id`：疫苗ID
- `pet_id`：宠物ID
- `name`：疫苗名称
- `date`：疫苗日期
- `status`：疫苗状态
- `created_at`：创建时间
- `updated_at`：更新时间

**文件**：[database_init.sql](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/database_init.sql)

## 6. 依赖关系

### 6.1 页面依赖关系

| 页面 | 依赖页面 | 说明 |
|------|----------|------|
| 首页 | 服务页面、商城页面、社区页面、工具页面 | 从首页可以跳转到这些页面 |
| 服务页面 | 服务预约页面 | 从服务页面可以跳转到服务预约页面 |
| 社区页面 | 发布帖子页面、评论页面 | 从社区页面可以跳转到发布帖子和评论页面 |
| 商城页面 | 商品详情页面、购物车页面 | 从商城页面可以跳转到商品详情和购物车页面 |
| 个人中心页面 | 宠物管理页面、订单页面、预约页面、收藏页面、设置页面、关于我们页面、意见反馈页面 | 从个人中心页面可以跳转到这些页面 |
| 宠物管理页面 | 添加宠物页面、编辑宠物页面 | 从宠物管理页面可以跳转到添加宠物和编辑宠物页面 |

### 6.2 数据依赖关系

| 数据 | 依赖数据 | 说明 |
|------|----------|------|
| 服务 | 服务分类 | 服务属于某个服务分类 |
| 预约 | 用户、服务、商家、宠物 | 预约关联用户、服务、商家和宠物 |
| 帖子 | 用户、话题 | 帖子关联用户和话题 |
| 评论 | 帖子、用户 | 评论关联帖子和用户 |
| 商品 | 商品分类 | 商品属于某个商品分类 |
| 购物车 | 用户、商品 | 购物车关联用户和商品 |
| 订单 | 用户 | 订单关联用户 |
| 订单商品 | 订单、商品 | 订单商品关联订单和商品 |
| 疫苗 | 宠物 | 疫苗关联宠物 |

## 7. 项目运行方式

### 7.1 开发环境

1. 安装微信开发者工具
2. 克隆项目代码
3. 在微信开发者工具中导入项目
4. 运行项目进行开发和调试

### 7.2 生产环境

1. 在微信开发者工具中进行代码审核
2. 提交审核
3. 审核通过后发布上线

### 7.3 数据库配置

1. 执行 [database_init.sql](file:///Users/qinyue/github/MyGithub/Trae-All/Trae/database_init.sql) 脚本初始化数据库
2. 配置数据库连接信息

## 8. 关键技术点

### 8.1 微信小程序框架

- 使用微信小程序原生框架开发
- 采用组件化开发方式
- 使用微信提供的API进行数据存储和网络请求

### 8.2 数据存储

- 使用微信本地存储模拟数据存储
- 提供完整的数据库设计，支持后端数据存储

### 8.3 页面导航

- 使用 wx.switchTab 进行底部Tab切换
- 使用 wx.navigateTo 进行页面跳转

### 8.4 响应式设计

- 使用 wxss 实现响应式布局
- 适配不同尺寸的设备

## 9. 项目亮点

1. **功能全面**：涵盖宠物服务、社区交流、商品购买等多个功能模块
2. **用户体验良好**：界面设计美观，操作流程流畅
3. **数据结构完整**：提供了完整的数据库设计，支持后端数据存储
4. **代码结构清晰**：采用模块化设计，代码结构清晰易维护
5. **扩展性强**：预留了丰富的功能扩展空间

## 10. 未来发展方向

1. **接入实际后端服务**：将本地存储替换为实际的后端API
2. **增加更多服务类型**：扩展宠物服务的种类
3. **优化社区功能**：增加更多社区互动功能
4. **完善商城系统**：增加支付功能，实现完整的购物流程
5. **增加用户认证**：实现微信登录和手机号登录
6. **增加消息通知**：实现系统消息和互动消息通知

## 11. 总结

宠物伴侣小程序是一个功能全面、用户体验良好的宠物服务平台，为宠物主人提供了便捷的宠物管理和服务体验。通过微信小程序的技术优势，实现了服务预约、社区交流、商品购买等功能，满足了宠物主人的多样化需求。

项目采用模块化设计，代码结构清晰，数据结构完整，为后续的功能扩展和系统升级提供了良好的基础。未来，通过接入实际后端服务、增加更多功能模块，可以进一步提升用户体验，为宠物主人提供更加全面的服务。