const express = require("express");
const router = express.Router();
const OrderController = require("../../Controllers/User/order_controller");
const UserAuthMiddleWare = require("../../Middlewares/user_auth");

router.get("/", UserAuthMiddleWare, OrderController.getAllOrders);
router.get("/:id", UserAuthMiddleWare, OrderController.getOrderDetails);
router.post("/", UserAuthMiddleWare, OrderController.placeOrder);
router.post("/verify", UserAuthMiddleWare, OrderController.verifyOrder);

module.exports = router;
