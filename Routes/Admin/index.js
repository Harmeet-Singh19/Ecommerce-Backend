const express = require("express");
const router = express.Router();
const AdminLoginRoutes = require("./login_route");
const AdminBookRoutes = require("./book_route");


router.use("/auth", AdminLoginRoutes);
router.use("/book", AdminBookRoutes);

module.exports = router;
