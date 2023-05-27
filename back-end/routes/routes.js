// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
//const OrderController = require('./controllers/orderController');

// Routes for users
router.post('/api/user/create', userController.createUser);
router.put('/api/user/:userId/update', userController.updateUser);
router.post('/api/user/:userId/addFavorite/:itemId',userController.addFavoriteItem);
router.delete('/api/user/:userId/deleteFavorite/:itemId',userController.removeFavoriteItem);
router.get('/api/user/:userId', userController.getUser);
router.delete('/api/user/:userId', userController.deleteUser);

// Routes for items
router.get('/api/items', itemController.getItems);
router.get('/api/item/:itemId', itemController.getItem);
/*
router.post('/api/item/create', ItemController.createItem);
router.put('/api/item/:itemId/update', ItemController.updateItem);
router.delete('/api/item/:itemId/delete', ItemController.deleteItem);
*/
// Routes for orders
/*
router.get('/api/orders', OrderController.getOrders);
router.get('/api/order/:orderId', OrderController.getOrder);
router.post('/api/order/create', OrderController.createOrder);
router.put('/api/order/:orderId/update', OrderController.updateOrder);
router.delete('/api/order/:orderId/delete', OrderController.deleteOrder);

*/
module.exports = router;