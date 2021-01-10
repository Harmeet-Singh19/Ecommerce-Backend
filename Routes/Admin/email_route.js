const express = require("express");
const router = express.Router();
const EmailControllers = require("../../Controllers/Admin/email_controller");
const AdminAuthMiddleware = require("../../Middlewares/admin_auth");

router.post("/send", AdminAuthMiddleware,EmailControllers.sendMail);
router.get("/",AdminAuthMiddleware,EmailControllers.getAllMails)

module.exports=router