import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from "react-router-dom"
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils.js';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const { categoryName } = useParams()
    const location = useLocation()

    const isAllSelected = location.pathname === "/recipe/allrecipes"

     useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
    

    useEffect(() => {
        const getAllRecipes = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/recipe/recipes`, {
                    withCredentials: true
                })
                setRecipes(response.data.recipes)
                console.log(response.data.recipes)
            } catch (error) {
                console.log("Error in fetching recipes", error)
            }
        }
        getAllRecipes()
    }, [])

    const categories = ["Dessert", "Juices", "Breakfast", "Healthy", "Snacks"]

    return (
        <div className=' h-screen w-full'>
            <Header />

            <div className='flex h-screen'>
                {/* Sidebar */}
                <div className="w-40 hidden sm:block bg-white h-screen p-6 shadow-md border-r border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
                    <nav className="flex flex-col gap-3">
                        <Link to={`/recipe/allrecipes`}>
                            <button className={`w-full text-left px-4 py-2 font-medium cursor-pointer rounded-lg transition duration-200
                                 ${isAllSelected ? 'bg-black text-white' : 'text-gray-700'}`}>
                                All Recipes
                            </button>
                        </Link>
                        {categories.map((category, index) => {
                            return (
                                <Link key={index} to={`/recipe/category/${category.toLowerCase()}`}>
                                    <button className="w-full text-left px-4 py-2 text-gray-700 font-medium cursor-pointer rounded-lg">
                                        {category}
                                    </button>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Main Content Wrapper */}

                {recipes.length > 0 ? (
                    <div className="flex-1 p-6  overflow-y-auto">
                        {/* Recipe Card */}
                        <h1 className=' font-bold text-center text-2xl mb-5 '>All Recipes</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 '>
                            {recipes.map((recipe) => (
                                <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                                    <div className="bg-white mx-auto rounded-2xl shadow-md overflow-hidden border  border-gray-200 md:w-80  lg:w-70 h-auto cursor-pointer hover:shadow-xl transform transition duration-300 hover:scale-[1.02]">
                                        <img
                                            src={recipe.image}
                                            alt="Delicious Dish"
                                            className="w-full h-30 object-cover"
                                        />

                                        <div className="p-3">
                                            <h2 className="text-md font-bold ">{recipe.title}</h2>
                                            <p className='text-yellow-500 text-xl'>★ ★ ★ ★ ☆<span className='text-sm ml-2'>(4.5)</span></p>


                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {recipe.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>
                ) : (
                    <div className='flex justify-between mx-auto min-h-screen mt-40'>
                        <p className='text-sm font-semibold text-red-400 '>Recipes are not available of this category</p>
                    </div>
                )}
            </div>



        </div>


    )
}

export default AllRecipes