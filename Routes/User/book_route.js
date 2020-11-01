const express = require("express");
const router = express.Router();
const BookControllers = require("../../Controllers/User/book_controller");
const UserAuthMiddleware = require("../../Middlewares/user_auth");


router.get("/", UserAuthMiddleware, BookControllers.getAllBooks);
router.get("/:id", UserAuthMiddleware, BookControllers.getBookById);
router.get('/query',UserAuthMiddleware,BookControllers.queryBook)


module.exports = router;
