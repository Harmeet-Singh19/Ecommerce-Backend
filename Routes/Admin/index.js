const express = require("express");
const router = express.Router();
const AdminLoginRoutes = require("./login_route");
const AdminBookRoutes = require("./book_route");
const AdminUserRoutes = require("./user_route");
const AdminOrderRoutes=require('./order_route')

router.use("/auth", AdminLoginRoutes);
router.use("/book", AdminBookRoutes);
router.use("/user",AdminUserRoutes);
router.use('/order',AdminOrderRoutes);

module.exports = router;
