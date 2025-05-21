import React from "react"
import { Route, Router, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import RecipeDetails from "./pages/RecipeDetails"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import RecipeCategories from "./pages/RecipeCategories"
import AllRecipes from "./pages/AllRecipes"
import ProfilePage from "./pages/Profile"
import FavoriteRecipes from "./pages/FavoriteRecipes"
import Header from "./components/Header"

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
        <Route path="/header" element={<Header />} />


      </Routes>
      <Toaster
        toastOptions={{
          duration: 3000,
        }} />
    </>
  )
}

export default App
