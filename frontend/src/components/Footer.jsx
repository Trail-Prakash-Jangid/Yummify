import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
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
    )
}

export default Footer