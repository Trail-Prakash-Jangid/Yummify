import { User } from "../models/user.model.js";
import z from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config.js";
import mongoose from 'mongoose';

export const Signup = async (req, res) => {
    const { userName, email, password } = req.body;

    const userSchema = z.object({
        userName: z.string().min(3, { message: "Username must be atleast 3 character long" }),
        email: z.string().email(),
        password: z.string().min(4, { message: "Password must be atleast 4 character long" })
    })

    const validateData = userSchema.safeParse(req.body)

    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map((err) => err.message) })
    }

    if (!userName || !email || !password) {
        console.log("All feilds are required")
        return res.status(400).json({ errors: "All feilds are required" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const verifyUser = await User.findOne({ email: email })
    if (verifyUser) {
        console.log("User already registered")
        return res.status(400).json({ errors: "User already registered" })
    }

    try {
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

        await newUser.save()
        console.log("User registered successfully")
        return res.status(200).json({ message: "User registered successfully", newUser })
    } catch (error) {
        console.log("Error", error)
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            console.log("All fields required");
            return res.status(400).json({ errors: "All fields required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid credentials");
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("Invalid credentials");
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            config.JWT_USER_PASSWORD,
            { expiresIn: "1d" }
        );

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        };

        res.cookie("jwt", token, cookieOptions);
        console.log("User logged in successfully");
        return res.status(200).json({ message: "logged in successfully", token, user });

    } catch (error) {
        console.log("Error in logging user:", error);
        return res.status(500).json({ errors: "Server error in logging user" });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: true
        })

        console.log("User logged out successfully")
        return res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        console.log("Error in logging out user")
        return res.status(400).json({ errors: "Error in logging out user" })
    }
}

export const saveRecipe = async (req, res) => {
    const userId = req.userId;
    const { recipeId } = req.params;

    try {
        const user = await User.findById(userId)

        if (!user) {
            console.log("User not found")
            return res.status(400).json({ errors: "User not found" })
        }

        if (!user.savedRecipes.includes(recipeId)) {
            user.savedRecipes.push(recipeId)
            await user.save()
        }
        console.log("Recipe saved successfully")
        return res.status(200).json({ message: "Recipe saved successfully", user })

    } catch (error) {
        console.log("Already saved")
        return res.status(400).json({ errors: "Already saved" })
    }

}

export const unsaveRecipe = async (req, res) => {
    const userId = req.userId;
    const { recipeId } = req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(recipeId)) {
            return res.status(400).json({ error: "Invalid recipe ID" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }


        const initialLength = user.savedRecipes.length;
        user.savedRecipes = user.savedRecipes.filter(
            (id) => id.toString() !== recipeId
        );

        if (user.savedRecipes.length === initialLength) {
            return res.status(404).json({ error: "Recipe not found in saved list" });
        }

        await user.save();

        console.log("Unsaved recipe");
        return res.status(200).json({ message: "Recipe removed from favorites" });
    } catch (error) {
        console.error("Unsave error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getSavedRecipes = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).populate("savedRecipes")

        return res.status(200).json(user.savedRecipes)

    } catch (error) {
        console.log("Error in fetching saved recipes")
        return res.status(400).json({ errors: "Error in fetching saved recipes" })
    }
}

export const getUserInfo = async (req, res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ errors: "User not found" })
        }

        return res.status(200).json({ message: "User info fetched successfully", user })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ errors: "Error in fetching user info" })
    }
}


