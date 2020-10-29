const express = require("express");
const router = express.Router();
const AuthRoutes= require('./auth_route')
const AddressRoutes=require('./address_route')

router.use("/auth",AuthRoutes)
router.use("/address",AddressRoutes)

module.exports=router