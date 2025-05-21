import mongoose from "mongoose";
import { number, string } from "zod";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        }
    ],
    steps: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    serves: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],

    views: {
        type: Number,
        default: 0
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }


})

export const Recipe = mongoose.model("Recipe", recipeSchema)