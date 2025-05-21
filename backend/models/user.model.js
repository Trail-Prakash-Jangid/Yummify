import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    savedRecipes:[{
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
    }]

})

export const User = mongoose.model("User", userSchema)