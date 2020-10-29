const express = require("express");
const router = express.Router();
const AddressController = require("../../Controllers/User/address_controller");
const UserAuthMiddleWare = require("../../Middlewares/user_auth");

router.get("/", UserAuthMiddleWare, AddressController.getAllAddress);
router.post("/", UserAuthMiddleWare, AddressController.addAddress);
router.put("/:id", UserAuthMiddleWare, AddressController.updateAddress);
router.delete("/:id", UserAuthMiddleWare, AddressController.removeAddress);

module.exports = router;
