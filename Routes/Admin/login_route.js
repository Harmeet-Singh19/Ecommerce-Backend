const express = require("express");
const router = express.Router();
const LoginController = require("../../Controllers/Admin/login_controller");
const AdminAuthMiddleware = require("../../Middlewares/admin_auth");

router.get("/admin", AdminAuthMiddleware, LoginController.verifyAdmin);
router.post("/login", LoginController.login);
router.get("/verify", AdminAuthMiddleware, LoginController.currUser);
router.post("/add-admin",AdminAuthMiddleware, LoginController.newAdmin);
router.get("/all-admins", AdminAuthMiddleware, LoginController.getAllAdmins);
router.get("/all-vendors", AdminAuthMiddleware, LoginController.getAllVendors);
router.get("/admin/:id", AdminAuthMiddleware, LoginController.getAdminById);
router.put("/admin/:id", AdminAuthMiddleware, LoginController.updateAdmin);

module.exports = router;