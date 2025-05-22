import express from "express";
import { createRecipe, getRecipes, likeRecipe, recipeCategory, recipeDetails, updateRecipe } from "../controllers/recipe.controller.js"
import { userMiddleware } from "../middleware/user.mid.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create", upload.single("image"), createRecipe)
router.get("/recipes", getRecipes)
router.put("/update/:recipeId", upload.single("image"), userMiddleware, updateRecipe)
router.get("/:recipeId", recipeDetails)
router.post("/like/:recipeId", userMiddleware, likeRecipe)
router.get("/category/:categoryName", recipeCategory)


export default router