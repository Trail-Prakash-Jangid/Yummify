import React from "react"
import { Route, Router, Routes } from "react-router-dom"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import RecipeDetails from "./pages/RecipeDetails.jsx"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import RecipeCategories from "./pages/RecipeCategories.jsx"
import AllRecipes from "./pages/AllRecipes.jsx"
import ProfilePage from "./pages/Profile.jsx"
import FavoriteRecipes from "./pages/FavoriteRecipes.jsx"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/recipe/category/:categoryName" element={<RecipeCategories />} />

        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        <Route path="/recipe/allrecipes" element={<AllRecipes />} />
        <Route path="/profile" element={<ProfilePage />} />
        


      </Routes>
      <Toaster
        toastOptions={{
          duration: 3000,
        }} />
    </>
  )
}

export default App
