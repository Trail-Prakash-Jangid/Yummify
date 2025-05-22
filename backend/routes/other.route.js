import express from "express"
import { getBlogs, getCategories } from "../controllers/other.controller.js";

const router = express.Router();

router.get("/fetch-category", getCategories)

router.get("/fetch-blogs", getBlogs)

export default router