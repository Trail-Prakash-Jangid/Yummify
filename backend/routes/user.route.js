import express from "express";
import { Signup, Login, Logout, getSavedRecipes, getUserInfo } from "../controllers/user.controller.js";
import { saveRecipe, unsaveRecipe } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.mid.js";

const router = express.Router();

router.post("/signup", Signup)
router.post("/login", Login)
router.get("/logout", Logout)
router.post("/save/:recipeId", userMiddleware, saveRecipe)
router.delete("/unsave/:recipeId",userMiddleware, unsaveRecipe)
router.get("/saved-recipes", userMiddleware, getSavedRecipes)
router.get("/userInfo",userMiddleware, getUserInfo)

export default router


