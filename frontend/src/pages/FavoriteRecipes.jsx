import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, Star, Plus } from "lucide-react";
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils.js';
import Footer from '../components/Footer.jsx';



const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([])

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("User"))
  const token = user?.token

  useEffect(() => {
    if (!token) {
      console.log("Logged in to continue")
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  const handleLogout = async () => {
    const response = await axios.get(`${BACKEND_URL}/user/logout`, {
      withCredentials: true
    })


    localStorage.removeItem("User")
    toast.success(response.data.message || "Logged out successfully")
    console.log("logged out successfully")
    navigate("/")
  }


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/saved-recipes`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        })
        setRecipes(response.data)
        console.log(recipes)
      } catch (error) {
        console.log(error)
      }

    }
    getRecipes()
  }, [recipes.length])

  const unSaveRecipe = async (recipeId) => {
    try {
      await axios.delete(`${BACKEND_URL}/user/unsave/${recipeId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      })
      const response = await axios.get(`${BACKEND_URL}/user/saved-recipes`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      })
      setRecipes(response.data)
      toast.success(response.data.message || "Recipe removed from favorites");

      console.log(recipes)
    } catch (error) {
      toast.error("Internal server error")
      console.log("Error in unsaving recipe", error)

    }
  }


  return (
    <div className='min-h-screen w-full  bg-stone-50'>
      {/* Header */}

      <Header />

      <section className='flex'>
        <div className='bg-white hidden md:block w-45 h-screen shadow-md'>
          {/* Profile section */}
          <div className='flex flex-col items-center'>
            <div className='flex items-center mt-5 px-3 py-2 rounded-lg shadow-md bg-stone-100'>
              <img
                className='w-12 h-12 rounded-md shadow-sm border-2 border-emerald-200'
                src="https://i.pinimg.com/736x/02/bc/1d/02bc1ddfb478c7069ac1db5017955648.jpg"
                alt="profile"
              />
              <p className='ml-4 font-semibold text-orange-800'>Naruto Uzumaki</p>
            </div>
            <div className='bg-gray-300 mt-5 w-48 h-[2px]'></div>
          </div>

          {/* Navigation links */}
          <div className='mt-6 px-4'>
            <ul className='space-y-4'>
              <li>
                <a href="/dashboard" className='flex items-center text-gray-700 hover:text-emerald-500 font-medium'>
                  <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
                </a>
              </li>
              <li>
                <a href="/my-recipes" className='flex items-center text-gray-700 hover:text-emerald-500 font-medium'>
                  <i className="fas fa-utensils mr-3"></i> My Recipes
                </a>
              </li>
              <li>
                <a href="/favorites" className='flex items-center text-gray-700 hover:text-emerald-500 font-medium'>
                  <i className="fas fa-heart mr-3"></i> Favorites
                </a>
              </li>
              <li>
                <a href="/settings" className='flex items-center text-gray-700 hover:text-emerald-500 font-medium'>
                  <i className="fas fa-cog mr-3"></i> Settings
                </a>
              </li>
              <li>
                <button  onClick={handleLogout} className='flex items-center cursor-pointer text-red-500 hover:text-red-600 font-medium'>
                  <i className="fas fa-sign-out-alt mr-3"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>


        <div className="flex-1 p-6  overflow-y-auto">
          {/* Recipe Card */}
          {recipes.length > 0 ? (
            <div>
              <h1 className=' font-bold text-center text-2xl mb-5 '>My Favorite Recipes</h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 '>
                {recipes.map((recipe) => (

                  <div key={recipe._id} className="bg-white mx-auto rounded-2xl shadow-md overflow-hidden border  border-gray-200 md:w-80  lg:w-70 h-auto cursor-pointer hover:shadow-xl transform transition duration-300 hover:scale-[1.02]">
                    <Link to={`/recipe/${recipe._id}`}>
                      <img
                        src={recipe.image}
                        alt="Delicious Dish"
                        className="w-full h-30 object-cover"
                      />
                    </Link>

                    <div className="p-3">
                      <div className='flex items-center justify-between'>
                        <Link to={`/recipe/${recipe._id}`}>
                          <h2 className="text-md font-bold ">{recipe.title}</h2>
                        </Link>
                        <i onClick={(e) => {
                          e.stopPropagation;
                          e.preventDefault();
                          unSaveRecipe(recipe._id)
                        }} className="fa-solid fa-bookmark text-lg text-orange-300"></i>
                      </div>
                      <p className='text-yellow-500 text-xl'>★ ★ ★ ★ ☆<span className='text-sm ml-2'>(4.5)</span></p>


                      <Link to={`/recipe/${recipe._id}`}>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {recipe.description}
                        </p>
                      </Link>

                    </div>
                  </div>
                ))}

              </div>
            </div>
          ) : (
            <div className='flex flex-col  items-center'>
              <h2 className="text-2xl mt-10 font-semibold mb-2">No Favorite Recipes Yet!</h2>
              <p className="mb-4 text-center max-w-md">
                Looks like your favorites list is still empty. Tap on any recipe you love and we’ll save it here for quick access!
              </p>
              <Link to={"/recipe/allrecipes"}>
                <button className="flex cursor-pointer items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-full transition">
                  <Plus className="w-4  h-4" /> Browse Recipes
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>


<Footer/>
    </div>
  )
}

export default FavoriteRecipes