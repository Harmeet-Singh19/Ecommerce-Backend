const express = require("express");
const router = express.Router();
const BookControllers = require("../../Controllers/User/book_controller");
const UserAuthMiddleware = require("../../Middlewares/user_auth");



router.get("/:id", BookControllers.getBookById);
router.post('/query',BookControllers.queryBook)
router.get('/',BookControllers.getAllBooks)

module.exports = router;
