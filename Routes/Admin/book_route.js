const express = require("express");
const router = express.Router();
const BookControllers = require("../../Controllers/Admin/book_controller");
const AdminAuthMiddleware = require("../../Middlewares/admin_auth");
const upload = require("../../Middlewares/multer");

router.post("/image/add",AdminAuthMiddleware,upload.array("file", 10),BookControllers.addImage)
router.post("/add", AdminAuthMiddleware, BookControllers.addBook);
router.get("/", AdminAuthMiddleware, BookControllers.getAllBooks);
router.get("/:id", AdminAuthMiddleware, BookControllers.getBookById);
router.get("/vendor/:id", AdminAuthMiddleware, BookControllers.getBookByVendor);
router.put("/:id", AdminAuthMiddleware, BookControllers.modifyBook);
router.delete("/:id", AdminAuthMiddleware, BookControllers.deleteBook);
router.post(
  "/image/:id",
  AdminAuthMiddleware,
  upload.array("file", 10),
  BookControllers.updateImage
);


module.exports = router;
