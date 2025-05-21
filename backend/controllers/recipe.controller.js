import { Recipe } from "../models/recipe.model.js";
import { v2 as cloudinary } from "cloudinary"
import fs from 'fs';

export const createRecipe = async (req, res) => {
    const userId = req.userId;
    const { title, description, ingredients, steps, duration, serves, category } = req.body;

    console.log("success 1")

    try {
        if (!title || !description || !ingredients || !steps || !duration || !serves || !category) {
            return res.status(400).json({ errors: 'All fields are required' });
        }

        console.log("Success 2")

        if (!req.file) {
            return res.status(400).json({ errors: 'Image file is required' });
        }

        console.log("Success 3")


        const allowedFormat = ["image/png", "image/jpeg"]

        if (!allowedFormat.includes(req.file.mimetype)) {
            return res.status(400).json({ message: "Invalid image format only jpg and png are allowed" })
        }

        console.log("Success 4")

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'recipes',
        });

        fs.unlinkSync(req.file.path); // Remove file from local disk

        console.log("Success 3")

        const ingredientsData = JSON.parse(req.body.ingredients);
        const stepsData = JSON.parse(req.body.steps);


        const newRecipe = await Recipe.create({
            title,
            description,
            ingredients: ingredientsData,
            steps: stepsData,
            image: result.secure_url, // Save Cloudinary URL
            duration,
            serves,
            category,
            creatorId: userId,
        });

        return res.status(200).json({ message: 'Recipe created successfully', newrecipe: newRecipe });
    } catch (error) {
        console.error('Error in creating recipe:', error);
        return res.status(500).json({ errors: 'Server error while creating recipe' });
    }
};

export const updateRecipe = async (req, res) => {
    const userId = req.userId;
    const { recipeId } = req.params;
    const { title, description, ingredients, steps, duration, serves, category } = req.body;



    try {
        const recipe = await Recipe.findById(recipeId);
        // console.log("Found recipe:", recipe);
        console.log("success 1")

        if (!recipe) {
            console.log("Recipe not found");
            return res.status(400).json({ errors: "Recipe not found" });
        }

        let imageData = recipe.image

        console.log("success 1")

        if (req.file) {
            const newImage = req.file

            const allowedFormat = ["image/png", "image/jpeg"]

            if (!allowedFormat.includes(newImage.mimetype)) {
                return res.status(400).json({ message: "Invalid image format only jpg and png are allowed" })
            }

            console.log("success 1")
            const cloud_response = await cloudinary.uploader.upload(req.file.path, {
                folder: "recipes"
            })

            imageData = cloud_response.secure_url


            fs.unlinkSync(req.file.path)

            console.log("success 1")
        }

        const ingredientsData = JSON.parse(req.body.ingredients);
        const stepsData = JSON.parse(req.body.steps);


        const updatedRecipe = await Recipe.findOneAndUpdate(
            {
                _id: recipeId,
                creatorId: userId // ✅ corrected field name
            },
            {
                title,
                description,
                ingredients: ingredientsData,
                steps: stepsData,
                image: imageData,
                duration,
                serves,
                category
            },
            { new: true }
        );

        console.log("Recipe ID:", recipeId);
        console.log("User ID:", userId);
        console.log("Recipe creator:", recipe.creatorId);


        if (!updatedRecipe) {
            return res.status(403).json({ errors: "Not authorized to update this recipe" });
        }

        console.log("Recipe updated successfully:", updatedRecipe);
        return res.status(200).json({ message: "Recipe updated successfully", updatedRecipe });

    } catch (error) {
        console.log("Error in updating recipe:", error);
        return res.status(500).json({ errors: "Server error in updating recipe" });
    }
};

export const recipeDetails = async (req, res) => {
    const { recipeId } = req.params

    try {
        if (!recipeId) {
            console.log("Recipe not found")
            return res.status(400).json({ errors: "Recipe not found" })
        }

        const recipe = await Recipe.findByIdAndUpdate(
            recipeId,
            { $inc: { views: 1 } }, // increment views by 1
            { new: true }
        );

        console.log("Recipe fetched successfully")
        return res.status(200).json({ message: "Recipe fetched successfully", recipe })
    } catch (error) {
        console.log("Error in fetching recipe", error)
        return res.status(400).json({ errors: "Error in fetching recipe" })
    }
};

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        return res.status(200).json({ message: "Recipes fetched successfully", recipes })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Failed to fetch recipes" })
    }
};

export const getPopularRecipes = async (req, res) => {
    try {
        const popularRecipes = await Recipe.find({ views: { $gt: 1 } }).sort({ views: -1 });

        return res.status(200).json({
            message: "Popular recipes fetched successfully",
            popularRecipes
        });
    } catch (error) {
        console.log("Error fetching popular recipes:", error);
        return res.status(500).json({ errors: "Server error fetching popular recipes" });
    }
};

export const likeRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.userId;

    try {
        if (!recipeId) {
            return res.status(400).json({ errors: "Recipe ID is required" });
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ errors: "Recipe not found" });
        }

        const alreadyLiked = recipe.likedBy.includes(userId);

        if (alreadyLiked) {
            // Unlike
            recipe.likedBy.pull(userId);
            recipe.likes -= 1;
        } else {
            // Like
            recipe.likedBy.push(userId);
            recipe.likes += 1;
        }

        await recipe.save();

        return res.status(200).json({
            message: alreadyLiked ? "Unliked the recipe" : "Liked the recipe",
            totalLikes: recipe.likes,
            likedBy: recipe.likedBy
        });

    } catch (error) {
        console.error("Error liking/unliking recipe:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const recipeCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const recipes = await Recipe.find({
      category: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    });

    return res.status(200).json({ message: "Recipes fetched successfully", recipes });
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({ message: "Failed to fetch recipes" });
  }
};

