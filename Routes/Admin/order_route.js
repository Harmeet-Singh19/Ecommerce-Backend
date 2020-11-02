const express = require("express");
const router = express.Router();
const OrderController = require("../../Controllers/Admin/order_controller");
const AdminAuthMiddleWare = require("../../Middlewares/admin_auth");

router.get("/live/orders", AdminAuthMiddleWare, OrderController.getLiveOrders);
router.get(
  "/history/orders",
  AdminAuthMiddleWare,
  OrderController.getOrderHistory
);

router.get("/:id", AdminAuthMiddleWare, OrderController.getOrderById);
router.get("/vendor/:id",AdminAuthMiddleWare,OrderController.getOrdersByVendor)
router.put("/cancel/:id", AdminAuthMiddleWare, OrderController.cancelOrder);
router.put("/:id", AdminAuthMiddleWare, OrderController.updateStatus);


router.put(
  "/delivered/:id",
  AdminAuthMiddleWare,
  OrderController.markDelivered
);
router.put(
  "/undelivered/:id",
  AdminAuthMiddleWare,
  OrderController.markUnDelivered
);

router.get(
  "/delivery/live",
  AdminAuthMiddleWare,
  OrderController.getLiveDeliveries
);
router.get(
  "/delivery/delivered",
  AdminAuthMiddleWare,
  OrderController.getDelivered
);

//for future use
//router.get("/migrate/scheduled", AdminAuthMiddleWare, OrderController.checkAndMigrateScheduled);

module.exports = router;
