import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const categories = ["Dessert", "Juices", "Breakfast", "Healthy", "Snacks"]
    const navLinks = ["Home", "Favorites", "Categories", "Profile"];
    return (
        <div>
            <header className='flex items-center justify-between bg-stone-50 py-4 px-4 sm:px-6 md:px-10 shadow-sm relative'>
                <h1 className='text-lg ml-4 md:text-2xl font-bold text-[#3a3535]'>Yummify</h1>

                <ul className='hidden sm:flex space-x-6 mr-4 items-center'>
                    <a href='/' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Home</a>
                    <a href='/favorites' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Favorites</a>
                    <a href='/recipe/allrecipes' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Categories</a>
                    <a href='/profile' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Profile</a>
                </ul>

                <button
                    className='block sm:hidden text-2xl'
                    onClick={() => setIsOpen(!isOpen)}>
                    <i className="fas fa-bars"></i>
                </button>

                {isOpen && (
                    <div className='absolute w-full bg-white px-6 py-4 md:hidden top-full left-0 z-50'>
                        <ul className='flex flex-col space-y-4'>
                            {navLinks.map((link) => {
                                if (link === "Categories") {
                                    return (
                                        <li key={link} className='relative'>
                                            <button
                                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                                className='font-semibold hover:text-orange-500 w-full text-left'
                                            >
                                                Categories <i className="fa-solid fa-caret-down"></i>
                                            </button>

                                            {showCategoryDropdown && (
                                                <ul className='mt-2 ml-4 space-y-2 flex flex-col text-sm text-gray-700'>
                                                    <Link to={"/recipe/allrecipes"}>
                                                        <button>All Recipes</button>
                                                    </Link>
                                                    {categories.map((category) => (
                                                        <Link
                                                            onClick={() => setIsOpen(!isOpen)}
                                                            key={category.title} to={`/recipe/category/${category}`}>{category}</Link>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                }

                              if(link === "Home"){
                                  return(
                                     <li key={link}>
                                        <a href="/" className='hover:text-orange-500 font-semibold'>
                                            Home
                                        </a>
                                    </li>
                                  )
                              }

                                return (
                                    <li key={link}>
                                        <a href={`/${link.toLowerCase().replace(" ", "")}`} className='hover:text-orange-500 font-semibold'>
                                            {link}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                )}
            </header>
        </div>
    )
}

export default Header