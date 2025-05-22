import { Category } from "../models/category.model.js";
import { Blog } from "../models/blog.model.js";


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