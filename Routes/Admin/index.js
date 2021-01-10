const express = require("express");
const router = express.Router();
const AdminLoginRoutes = require("./login_route");
const AdminBookRoutes = require("./book_route");
const AdminVBookRoutes =require('./vbook_route')
const AdminUserRoutes = require("./user_route");
const AdminOrderRoutes=require('./order_route')
const AdminEmailRoutes=require('./email_route')

router.use("/auth", AdminLoginRoutes);
router.use("/book", AdminBookRoutes);
router.use("/vbook",AdminVBookRoutes)
router.use("/user",AdminUserRoutes);
router.use('/order',AdminOrderRoutes);
router.use('/email',AdminEmailRoutes);

module.exports = router;
