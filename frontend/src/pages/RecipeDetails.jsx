import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils.js';



const RecipeDetails = () => {
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState([])


  const user = JSON.parse(localStorage.getItem("User"))
  const token = user?.token


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/recipe/${recipeId}`, {
          withCredentials: true
        })
        setRecipe(response.data.recipe)
        console.log(response.data.recipe)
      } catch (error) {
        console.log(error)
      }
    }
    getRecipeDetails()

  }, [recipeId])


  const handleFavorite = async () => {
    try {
      if (!token) {
        console.log("user not logged in")
        return
      }

      const response = await axios.post(`${BACKEND_URL}/user/save/${recipeId}`, {
        recipeId
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })
      toast.success(response.data.message || "Recipe Saved Successfully")
      console.log(response.data.message)
      console.log("Success")
    } catch (error) {
      console.log(error)
    }
  }






  let maintitle = "";
  let lastword = "";


  if (recipe?.title) {
    const words = recipe.title.trim().split(" ");
    maintitle = words.length > 1 ? words.slice(0, -1).join(' ') : recipe.title;
    lastword = words.length > 1 ? words[words.length - 1] : '';
  }






  return (
    <div className='bg-[#ffffff] w-full min-h-screen'>
      {/* Header/Navbar */}
      <Header />

      {/* Main Section */}
      <main className='w-full px-4 sm:px-6 md:px-10'>
        <section className='w-full flex justify-center'>
          <div className='w-full max-w-screen-xl mx-auto flex flex-col items-center'>

            <h1 className='text-2xl font-bold text-[#3a3535] py-10 text-center'>
              {maintitle} <span className='text-[#eba51e]'>{lastword}</span>
            </h1>

            <div className='flex flex-col md:flex-row items-start justify-between gap-6 bg-[#f0f0f0] md:w-[80vw] w-full shadow-lg p-6 rounded-xl'>
              <img
                src={recipe.image}
                alt="Chiz Burst Pizza"
                className='shadow-lg w-full md:w-[50%] h-64 object-cover rounded-md'
              />

              <div className='text-left text-[#3a3535] flex-1 md:ml-6'>
                <h3 className='text-2xl font-semibold mb-2'>{recipe.title}</h3>
                <p className='text-[#eba51e]'>⭐⭐⭐⭐⭐ 500 Ratings</p>
                <p className='mt-2 text-xl'>
                  {recipe.description}
                </p>

                {/* Cook Time and Serves */}
                <div className='mt-6 space-y-4'>
                  <div className='flex items-center'>
                    <span className='mr-2 font-semibold'>Cook Time:</span> <span>{recipe.duration}</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='mr-2 font-semibold'>Serves:</span> <span>{recipe.serves}</span>
                  </div>
                  <button onClick={handleFavorite} className='bg-[#eba51e] py-2 px-5 cursor-pointer rounded-md text-white'>
                    Add to Favorite
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients and Steps */}
            <div className='flex flex-col md:flex-row justify-between gap-6 md:w-[80vw] w-full mt-10'>
              <div className='flex-1'>
                <h3 className='text-[#eba51e] font-semibold text-xl mb-5'>Ingredients</h3>
                <ul className='list-disc pl-6 space-y-2'>
                  {recipe.ingredients?.map((item, index) => (
                    <li key={item._id}>{item.name} of {item.quantity}</li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className='hidden md:block w-[2px] bg-[#eba51e]'></div>

              <div className="flex-1">
                <h3 className="text-[#eba51e] font-semibold text-xl mb-5">Steps</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  {recipe.steps?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>


            </div>

            {/* Comments Section */}
            <section className="w-full bg-white mt-10 px-4 sm:px-6 md:px-10 py-10">
              <div className="max-w-screen-md mx-auto flex flex-col gap-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#3a3535] text-center border-b pb-4">
                  Comments & Rate
                </h2>

                {/* Comment List */}
                <div className="flex flex-col gap-4">
                  <div className="w-full bg-[#eba51e] rounded-lg shadow-xl p-4 flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Avatar and Comment */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#3a3535] text-white flex items-center justify-center font-bold text-lg">
                        N
                      </div>
                      <div className="text-[#3a3535] text-sm sm:text-base">
                        <span className="font-semibold">Naruto:</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam veritatis dolores accusamus aperiam, asperiores optio eos ratione assumenda. Error, quibusdam?</p>
                      </div>
                    </div>
                    {/* Like Icon */}
                    <div className="self-end sm:self-start sm:ml-auto text-white text-xl">
                      <i className="fa-regular fa-thumbs-up"></i>
                    </div>
                  </div>
                </div>

                {/* Input Box */}
                <form className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                  <input
                    type="text"
                    placeholder="Your comment here..."
                    className="flex-1 border border-[#a9a0a0] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eba51e]"
                  />
                  <button
                    type="submit"
                    className="bg-[#eba51e] text-white px-6 py-2 rounded-md hover:bg-[#f79e1b] transition"
                  >
                    Send
                  </button>
                </form>
              </div>
            </section>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#3a3535] text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2 text-[#eba51e]">Yummify</h1>
            <div className="flex space-x-4 mt-4">
              <a href="#"><FaFacebook className="text-2xl hover:text-[#eba51e] transition-colors duration-200" /></a>
              <a href="#"><FaInstagram className="text-2xl hover:text-[#eba51e] transition-colors duration-200" /></a>
              <a href="#"><FaTwitter className="text-2xl hover:text-[#eba51e] transition-colors duration-200" /></a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-[#a9a0a0]">
              <li className="hover:text-white cursor-pointer transition">Why Yummify</li>
              <li className="hover:text-white cursor-pointer transition">Partner with us</li>
              <li className="hover:text-white cursor-pointer transition">About us</li>
              <li className="hover:text-white cursor-pointer transition">FAQ</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-[#a9a0a0]">
              <li className="hover:text-white cursor-pointer transition">Account</li>
              <li className="hover:text-white cursor-pointer transition">Support center</li>
              <li className="hover:text-white cursor-pointer transition">Feedback</li>
              <li className="hover:text-white cursor-pointer transition">Contact</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-[#a9a0a0]">
              <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Refund Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecipeDetails;