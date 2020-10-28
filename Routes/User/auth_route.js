const express= require('express');
const router=express.Router();
const AuthController= require('../../Controllers/User/auth_controller');
const UserAuthMiddleware=require('../../Middlewares/user_auth');


router.post("/login", AuthController.login);
router.post("/signup", AuthController.register);
router.post("/google", AuthController.googleAuth);
router.post("/facebook", AuthController.facebookAuth);
router.put("/update", UserAuthMiddleware, AuthController.updateUser);

module.exports = router;

