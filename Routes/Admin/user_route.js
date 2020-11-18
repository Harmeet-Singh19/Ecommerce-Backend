const express = require("express");
const router = express.Router();
const UserController = require("../../Controllers/Admin/user_controller");
const AdminAuthMiddleware = require("../../Middlewares/admin_auth");

router.get("/",AdminAuthMiddleware, UserController.getAllUsers);
// router.get("/migrate", UserController.migrate);
router.get("/downloadusers", UserController.downloadCSV);

module.exports = router;
