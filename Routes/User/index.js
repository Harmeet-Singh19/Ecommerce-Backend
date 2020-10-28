const express = require("express");
const router = express.Router();
const AuthRoutes= require('./auth_route')

router.use("/auth",AuthRoutes)

module.exports=router