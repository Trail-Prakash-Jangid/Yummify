import axios from 'axios';
import React, { useState } from 'react';
import toast from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import Header from '../components/Header';
import { BACKEND_URL } from '../utils/utils.js';

const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const verifyUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/user/login`, {
                email,
                password
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            })
            localStorage.setItem("User", JSON.stringify(response.data))
            toast.success(response.data.message || "logged in successfully")
            console.log(response.data)
            navigate("/")
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message || error.response.data.errors
                toast.error(message || "Error in logging you")
            }
        }

    }




    return (
        <div className='bg-[#ffffff] w-full min-h-screen'>
            <Header />
            <div className='mx-auto flex flex-col items-center justify-center text-[#3a3535] px-4'>

                {/* Header/Navbar */}


                {/* Login Form */}
                <div className='text-center bg-[#3a3535] p-8 rounded-lg shadow-lg w-full max-w-[90vw] md:max-w-md mt-20 mb-16'>

                    <h2 className='text-white font-bold text-2xl'>
                        Login To <span className='text-[#eba51e]'>Yummify</span>
                    </h2>
                    <p className='mt-2 text-sm md:text-[16px] text-[#a9a0a0]'>Login to bless your tongue with flavours</p>

                    <form onSubmit={verifyUser}>
                        <div className='flex flex-col mt-5 mb-5'>
                            <label htmlFor="email" className='text-[#a9a0a0] mb-1 text-left'>Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter Email'
                                className='w-full p-3 bg-[#a9a0a0] text-[#3a3535] rounded-md border focus:outline-none focus:ring-2 focus:ring-[#eba51e]'
                            />
                        </div>
                        <div className='flex flex-col mt-3'>
                            <label htmlFor="password" className='text-[#a9a0a0] mb-1 text-left'>Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter Password'
                                className='w-full p-3 bg-[#a9a0a0] text-[#3a3535] rounded-md border focus:outline-none focus:ring-2 focus:ring-[#eba51e]'
                            />
                        </div>

                        <button type='submit' className='bg-[#eba51e] cursor-pointer hover:bg-[#d8930e] text-white font-semibold w-full py-3 mt-5 rounded-lg transition-colors'>
                            Login
                        </button>
                        <p className='text-white mt-5 '>Don't have an account? <Link className='text-blue-400' to={"/signup"}>Signup</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
