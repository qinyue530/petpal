const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const serviceController = require('../controllers/serviceController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const bookingController = require('../controllers/bookingController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const favoriteController = require('../controllers/favoriteController');
const vaccineController = require('../controllers/vaccineController');
const feedbackController = require('../controllers/feedbackController');
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

// 公开路由（不需要登录）
router.post('/auth/login', authController.login);
router.post('/auth/phoneLogin', authController.phoneLogin);
router.get('/services', serviceController.list);
router.get('/services/:id', serviceController.getDetail);
router.get('/merchants', serviceController.getMerchants);
router.get('/products', productController.list);
router.get('/products/search', productController.search);
router.get('/products/:id', productController.getDetail);
router.get('/posts', postController.list);
router.get('/posts/:id', postController.getDetail);
router.get('/comments', commentController.list);

// 需要登录的路由
router.use(auth);
router.get('/auth/userInfo', authController.getUserInfo);
router.put('/user/profile', userController.updateProfile);
router.get('/user/profile', userController.getProfile);

router.post('/pets', petController.create);
router.get('/pets', petController.list);
router.get('/pets/:id', petController.getById);
router.put('/pets/:id', petController.update);
router.delete('/pets/:id', petController.delete);

router.post('/cart', cartController.add);
router.get('/cart', cartController.list);
router.put('/cart/:itemId', cartController.updateQuantity);
router.delete('/cart/:itemId', cartController.remove);

router.post('/orders', orderController.create);
router.get('/orders', orderController.list);
router.get('/orders/:id', orderController.getDetail);
router.put('/orders/:id/cancel', orderController.cancel);
router.put('/orders/:id/pay', orderController.pay);

router.post('/bookings', bookingController.create);
router.get('/bookings', bookingController.list);
router.put('/bookings/:id/cancel', bookingController.cancel);

router.post('/posts', postController.create);
router.delete('/posts/:id', postController.delete);
router.put('/posts/:id/like', postController.like);
router.put('/posts/:id/unlike', postController.unlike);

router.post('/comments', commentController.create);

router.post('/favorites', favoriteController.add);
router.delete('/favorites', favoriteController.remove);
router.get('/favorites', favoriteController.list);
router.get('/favorites/check', favoriteController.check);

router.post('/vaccines', vaccineController.create);
router.get('/vaccines', vaccineController.list);
router.put('/vaccines/:id', vaccineController.update);
router.delete('/vaccines/:id', vaccineController.delete);
router.put('/vaccines/:id/complete', vaccineController.complete);

router.post('/feedback', feedbackController.create);
router.post('/upload', uploadController.upload);

module.exports = router;
