import express from "express"
import { CreateBlog, createCategories, getBlogs, getCategories } from "../controllers/category.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create-category", upload.single("image"), createCategories)

router.get("/fetch-category", getCategories)

router.post("/create-blog",upload.single("image"), CreateBlog)
router.get("/fetch-blogs", getBlogs)

export default router