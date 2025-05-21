import { Category } from "../models/category.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import { Blog } from "../models/blog.model.js";


export const createCategories = async (req, res) => {
    const { title } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ errors: "All fields are required" }); // fixed status & json typo
        }

        if (!req.file) {
            return res.status(400).json({ errors: "Image file is required" }); // fixed json typo
        }

        const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];

        if (!allowedFormats.includes(req.file.mimetype)) {
            return res.status(400).json({
                errors: "Invalid image format. Only PNG and JPG are allowed",
            });
        }

        // Upload to cloudinary
        const cloud_response = await cloudinary.uploader.upload(req.file.path, {
            folder: "recipes",
        });

        // Delete local file after uploading
        fs.unlinkSync(req.file.path);

        // Save to MongoDB
        const category = new Category({
            title,
            image: cloud_response.secure_url,
        });

        await category.save();

        return res.status(201).json({ message: "Category created", category });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to create category" });
    }
};


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        console.log("Recipes fetched successfully")
        return res.status(200).json({ message: "Categories fetched successfully", categories })
    } catch (error) {
        console.log("Error", error)
        return res.status(400).json({ errors: "Failed to fetched categories" })
    }
}

export const CreateBlog = async (req, res) => {
    const { title, description, publishedDate } = req.body

    try {
        if (!title || !description || !publishedDate) {
            return res.status(400).json({ errors: "All fields are required" })
        }

        if (!req.file) {
            return res.status(400).json({ errors: "Image file is required" })
        }

        const allowedFormat = ["image/png", "image/jpg", "image/jpeg"]

        if (!allowedFormat.includes(req.file.mimetype)) {
            return res.status(400).json({
                errors: "Invalid image format. Only PNG and JPG are allowed",
            });
        }

        const cloud_response = await cloudinary.uploader.upload(req.file.path, {
            folder: "recipes",
        });

        fs.unlinkSync(req.file.path);


        const blog = new Blog({
            title,
            description,
            publishedDate,
            image: cloud_response.secure_url
        })

        await blog.save();

        return res.status(201).json({ message: "Blog created", blog });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to create blog" });
    }
}

export const getBlogs = async (req, res) => {

    try {
        const blogs = await Blog.find()
        console.log("Blogs fetched successfully")
        return res.status(200).json({ message: "Blogs fetched successfully", blogs })
    } catch (error) {
        console.log("Error", error)
        return res.status(400).json({ errors: "Failed to fetched blogs" })
    }

}