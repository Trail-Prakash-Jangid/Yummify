import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../utils/utils';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState([])

    const userName = userInfo.userName

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("User"))
    const token = user?.token

    useEffect(() => {
        if (!token) {
            console.log("Logged in to continue");
            navigate("/login");
        }
    }, [token]);


    useEffect(() => {
        if (!token) return;

        const getUserInfo = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/user/userInfo`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data.user);
            } catch (error) {
                console.error("Error fetching user info:", error);
                navigate("/login");
            }
        };

        getUserInfo();
    }, [token, navigate]);



    const handleLogout = async () => {
        const response = await axios.get(`${BACKEND_URL}/user/logout`, {
            withCredentials: true
        })


        localStorage.removeItem("User")
        toast.success(response.data.message || "Logged out successfully")
        console.log("logged out successfully")
        navigate("/")
    }




    return (


        <div className='min-h-screen bg-stone-50'>
            {/* Header */}
            <Header />

            <div className="bg-white rounded-2xl shadow-lg p-8 mt-20 mx-auto max-w-md">
                <div className="flex flex-col items-center">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-emerald-500 shadow-sm"
                        src="https://i.pinimg.com/736x/02/bc/1d/02bc1ddfb478c7069ac1db5017955648.jpg"
                        alt="User profile"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">{userName}</h2>
                    <p className="text-gray-600">{userInfo.email}</p>
                    <p className="text-center font-bold text-gray-700 mt-4">Yummify's Foodie Ninja</p>
                    <button
                        onClick={handleLogout}
                        className="mt-6 bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-full transition duration-200">
                        Log out
                    </button>
                </div>
            </div>
            <div />


        </div>
    )
};

export default ProfilePage;
