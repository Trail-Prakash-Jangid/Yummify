import React, { useEffect, useState } from 'react';
import chef from "../images/mainchef.png";
import Slider from "react-slick";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../components/CustomArrows";
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils.js';
import Footer from '../components/Footer.jsx';
import Skeleton from '../components/Skeleton.jsx';
import Blogsskeli from '../components/blogsskeli.jsx';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([])
    const [blogs, setBlogs] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/recipe/recipes`, {
                    withCredentials: true,
                });
                console.log("Fetched Recipes:", response.data.recipes);
                setRecipes(response.data.recipes);
                setIsFetched(true)
            } catch (error) {
                console.error("Error fetching recipes:", error.response?.data || error.message);
            }
        };

        const getCategoryRecipes = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/fetch-category`, {
                    withCredentials: true
                })

                console.log(response.data.categories)
                setCategories(response.data.categories)
            } catch (error) {

            }
        }

        const getBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/admin/fetch-blogs`, {
                    withCredentials: true
                })

                console.log(response.data.blogs)
                setBlogs(response.data.blogs)
            } catch (error) {

            }
        }
        fetchRecipes();
        getCategoryRecipes()
        getBlogs()
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,


                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,

                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    const navLinks = ["Home", "Favorites", "Categories", "Blogs", "Profile"];



    const featuredBlog = blogs[0];
    const miniBlogs = blogs.slice(1)

    return (
        <div className='min-h-screen bg-stone-50'>
            {/* Header */}
            <header className='flex items-center justify-between bg-stone-50 py-4 px-4 sm:px-6 md:px-10 shadow-sm relative'>
                <h1 className='text-lg md:text-2xl font-bold text-gray-900'>Yummify</h1>

                {/* Search bar in center */}

                {/* Desktop nav (right aligned) */}
                <div className='hidden sm:flex space-x-6 items-center'>
                    <a href='/' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Home</a>
                    <a href='/favorites' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Favorites</a>
                    <a href='#categories' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Categories</a>
                    <a href='#blogs' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Blogs</a>
                    <a href='/profile' className='font-semibold list-none hover:text-orange-400 cursor-pointer'>Profile</a>
                </div>

                <button
                    className='block sm:hidden text-2xl  '
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
                                                Categories <i class="fa-solid fa-caret-down"></i>
                                            </button>

                                            {showCategoryDropdown && (
                                                <ul className='mt-2 ml-4 space-y-2 flex flex-col text-sm text-gray-700'>
                                                    {categories.map((category) => (
                                                        <Link key={category.title} to={`recipe/category/${category.title}`}>{category.title}</Link>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                }

                                if (link === "Favorites") {
                                    return (
                                        <li key={link}>
                                            <a href="/favorites" className='hover:text-orange-500 font-semibold'>
                                                Favorites
                                            </a>
                                        </li>
                                    )
                                }

                                return (
                                    <li key={link}>
                                        <a href={`#${link.toLowerCase().replace(" ", "")}`} className='hover:text-orange-500 font-semibold'>
                                            {link}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                )}

            </header>




            {/* Hero Section */}
            <section className='flex flex-col lg:flex-col items-center justify-between px-10 lg:px-20 py-10 w-full'>

                {/* SEARCH BAR */}
                <div className='w-full flex justify-center'>
                    <div className='w-2xl relative'>
                        <input
                            className='w-full bg-gray-200 text-gray-900 border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400'
                            type="text"
                            placeholder='Search any recipe here'
                        />
                        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600'>
                            <i className="fas fa-search"></i>
                        </span>
                        <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600'>
                            <i className="fas fa-filter"></i>
                        </span>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className='flex flex-col lg:flex-row justify-between items-center w-full mt-10'>
                    <div className='max-w-2xl text-center lg:text-left'>
                        <h1 className='text-5xl lg:text-6xl font-bold leading-tight text-gray-900'>
                            Cook Like a Pro With
                            <br />
                            Our <span className='text-orange-500'>Easy</span> and <span className='text-orange-500'>Tasty</span>
                            <br />
                            Recipes
                        </h1>
                        <p className='mt-6 text-lg text-gray-700'>
                            Discover mouthwatering dishes and improve your cooking skills with step-by-step guides and expert tips.
                        </p>
                        <Link to={"/recipe/allrecipes"}>
                            <button className='mt-6 bg-orange-500 cursor-pointer font-semibold text-white rounded-md px-6 py-3 hover:bg-orange-600'>
                                Explore All Recipes
                            </button>
                        </Link>
                    </div>
                    <div className='w-full max-w-md mt-10 lg:mt-0'>
                        <img src={chef} alt="Chef" className='w-full h-auto' />
                    </div>
                </div>

            </section>


            {/* Popular Recipes Section */}
            <section className='bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-20'>
                <div className='text-center max-w-3xl mx-auto mb-8'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900'>
                        <span className='text-orange-500'>Our Popular</span> Recipes
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <Slider {...settings}>
                        {
                            isFetched ? (
                                recipes.map((recipe) => (
                                    <Link key={recipe._id} to={`/recipe/${recipe._id}`}>
                                        <div className="px-2 sm:px-3">
                                            <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
                                                <img
                                                    src={recipe.image}
                                                    alt={recipe.title}
                                                    className="w-full h-55 sm:h-56 object-cover"
                                                />
                                                <div className="p-2 flex flex-col justify-between h-full">
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
                                                        {recipe.title}
                                                    </h3>
                                                    <div className="text-center">
                                                        <button className="bg-orange-500 cursor-pointer text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-300">
                                                            Get Recipe
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <Skeleton />
                            )
                        }
                    </Slider>
                </div>
            </section>



            <section id='categories' className='bg-stone-50 py-10 px-4 sm:px-6 md:px-10 lg:px-20'>
                <div className='text-center max-w-3xl mx-auto mb-8'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900'>
                        <span className='text-orange-500'>Our Popular</span> Categories
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <Slider {...settings}>
                        {isFetched ? (categories.map((category) => (
                            <Link key={category._id} to={`recipe/category/${category.title}`}>
                                <div className="px-2 sm:px-3">
                                    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-full">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            className="w-full h-55 sm:h-56 object-cover"
                                        />
                                        <div className="p-2 flex flex-col justify-between h-full">
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
                                                {category.title}
                                            </h3>
                                            <div className="text-center">
                                                <button className="bg-orange-500 cursor-pointer text-white py-2 px-6 rounded-full hover:bg-orange-600 transition duration-300">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))) : (
                            <Skeleton />
                        )}
                    </Slider>
                </div>
            </section>

            <section id='blogs' className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Read Latest <span className='text-orange-500'>Blogs</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left - Featured Blog */}
                    {featuredBlog && (
                        <div key={featuredBlog._id} className="md:col-span-2 bg-white rounded-lg shadow-lg p-4">
                            <img src={featuredBlog.image} alt={featuredBlog.title} className="rounded-lg w-full h-64 object-cover object-center mb-4" />
                            <p className="text-xs text-gray-500">{featuredBlog.publishedDate} • Lorem ipsum dolor sit.</p>
                            <h3 className="text-xl font-semibold mt-1 text-gray-900">{featuredBlog.title}</h3>
                            <p className="text-gray-700 text-sm mt-2">{featuredBlog.description}</p>
                            <a href="" className="text-orange-500 mt-3 inline-block font-semibold">Read Now →</a>
                        </div>
                    )}

                    {/* Right - Mini Blogs */}
                    <div className="space-y-4">
                        {isFetched ? (miniBlogs.map((blog) => (
                            <div key={blog._id} className="flex gap-4 bg-white rounded-lg shadow-md p-3 items-center">
                                <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-md" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500">{blog.publishedDate} • Lorem ipsum dolor sit.</p>
                                    <h4 className="text-sm font-semibold text-gray-900">{blog.title}</h4>
                                    <a href="" className="text-orange-500 text-xs font-semibold">Read Now →</a>
                                </div>
                            </div>
                        ))) : (
                            <Blogsskeli />
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );

};

export default Home;
