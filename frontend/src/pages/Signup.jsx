import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import Header from '../components/Header';
import { BACKEND_URL } from '../utils/utils';

const Signup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${BACKEND_URL}/user/signup`, {
                userName,
                email,
                password
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            })
            console.log(response.data)
            toast.success(response.data.message || "User registered successfully")
            navigate("/login")
        } catch (error) {
            if (error.response) {
                const errors = error.response.data.errors;

                if (Array.isArray(errors)) {
                    errors.forEach((err) => toast.error(err));
                } else {
                    const message = error.response.data.message || "Something went wrong";
                    toast.error(message);
                }
            } else {
                toast.error("Server error or no response");
            }
        }
    }

    return (
        <div className='bg-[#ffffff] w-full min-h-screen'>

            <Header />

            <div className='mx-auto flex flex-col items-center justify-center text-[#3a3535] px-4'>

                {/* Signup Form */}
                <div className='text-center bg-[#3a3535] p-6 rounded-lg shadow-lg w-full max-w-[90vw] md:max-w-md mt-20  md:mt-25 lg:mt-6 mb-16'>

                    <h2 className='text-white font-bold text-2xl'>
                        Signup To <span className='text-[#eba51e]'>Yummify</span>
                    </h2>
                    <p className='mt-2 text-[#a9a0a0]'>Signup to bless your tongue with flavours</p>

                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col mt-3 mb-5'>
                            <label htmlFor="username" className='text-[#a9a0a0] mb-1 text-left'>Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder='Enter Username'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className='w-full p-3 bg-[#a9a0a0] text-black rounded-md border focus:outline-none focus:ring-2 focus:ring-[#eba51e]'
                            />
                        </div>
                        <div className='flex flex-col mt-3 mb-5'>
                            <label htmlFor="email" className='text-[#a9a0a0] mb-1 text-left'>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-3 bg-[#a9a0a0] text-[#3a3535] rounded-md border focus:outline-none focus:ring-2 focus:ring-[#eba51e]'
                            />
                        </div>
                        <div className='flex flex-col mt-3'>
                            <label htmlFor="password" className='text-[#a9a0a0] mb-1 text-left'>Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-3 bg-[#a9a0a0] text-[#3a3535] rounded-md border focus:outline-none focus:ring-2 focus:ring-[#eba51e]'
                            />
                        </div>

                        <button type='submit' className='bg-[#eba51e] cursor-pointer hover:bg-[#d8930e] text-white font-semibold w-full py-3 mt-5 rounded-lg transition-colors'>
                            Signup
                        </button>
                        <p className='text-gray-300 mt-5 '>Already have an account? <Link className='text-blue-400' to={"/login"}>Login</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
