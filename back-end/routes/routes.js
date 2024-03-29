// backend/routes/itemRoutes.js
const express = require("express");
const router = express.Router();

// Import controllers
const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");
const orderController = require("../controllers/orderController");
const chatController = require("../controllers/chatController");

// Routes for users
router.post("/api/user/create", userController.createUser);
router.put("/api/user/:userId/update", userController.updateUser);
router.get("/api/user/:userId/favourites", userController.getUserFavourites);
router.post("/api/user/:userId/addFavourite/:itemId",userController.addFavouriteItem);
router.delete("/api/user/:userId/removeFavourite/:itemId",userController.removeFavouriteItem);
router.get("/api/user/get/:userId", userController.getUser);
router.delete("/api/user/delete/:userId", userController.deleteUser);

// Routes for items
router.get("/api/items", itemController.getItems);
router.get("/api/items/:category", itemController.getItemsCategory);
router.get("/api/item/:itemId", itemController.getItem);
router.post("/api/item/:itemId/addReview", itemController.addReview);

//chatgpt
router.post("/api/chat", chatController.postChat);

// Routes for orders
router.get("/api/orders/:userId", orderController.getOrders);
router.get("/api/orders/:orderid", orderController.getOrder);
router.get("/api/order/items/:orderId", orderController.getOrderItems);
router.post("/api/order/create", orderController.createOrder);

module.exports = router;

