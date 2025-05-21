import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import recipeRoute from "./routes/recipe.route.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import adminRoute from "./routes/category.route.js"

const app = express();
dotenv.config();

// middleware
app.use(express.json());

// 🛑 CORS should come before routes
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["PUT", "GET", "DELETE", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Database connection
try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connected successfully✅");
} catch (error) {
    console.error("Error in connecting to database❌", error.message);
    process.exit(1); // stop the server if DB not connected
}


// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/recipe", recipeRoute);
app.use("/api/v1/admin", adminRoute);


// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
