const express = require("express");
const router = express.Router();
const BookControllers = require("../../Controllers/Admin/book_controller");
const AdminAuthMiddleware = require("../../Middlewares/admin_auth");
const upload = require("../../Middlewares/multer");

router.post("/image/add",AdminAuthMiddleware,upload.array("multi-files", 10),BookControllers.addImage)
router.post("/add", AdminAuthMiddleware, BookControllers.addBook);
router.get("/", AdminAuthMiddleware, BookControllers.getAllBooks);
router.get("/:id", AdminAuthMiddleware, BookControllers.getBookById);
router.put("/:id", AdminAuthMiddleware, BookControllers.modifyBook);
router.delete("/:id", AdminAuthMiddleware, BookControllers.deleteBook);
router.post(
  "/image/:id",
  AdminAuthMiddleware,
  upload.array("multi-files", 10),
  BookControllers.updateImage
);
/*

router.put("/:id", AdminAuthMiddleware, BookControllers.modifyDish);
router.post(
  "/image/:dishId",
  AdminAuthMiddleware,
  upload.array("multi-files", 10),
  BookControllers.updateImage
);
router.delete("/:id", AdminAuthMiddleware, BookControllers.deleteDish);*/

module.exports = router;
