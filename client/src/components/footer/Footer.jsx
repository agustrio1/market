import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-blue-700 text-white py-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h3 className="text-2xl font-semibold">Toko Kita</h3>
          <p className="text-sm">Kami memberikan pelayanan terbaik untuk Anda.</p>
        </div>
        <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-center lg:text-left">
          <li>
            <Link to={'/'} className="hover:text-gray-500">Home</Link>
          </li>
          <li>
            <Link to={'/profile'} className="hover:text-gray-500">Your Profile</Link>
          </li>
          <li>
            <Link to={'/about'} className="hover:text-gray-500">About Us</Link>
          </li>
          <li>
            <Link to={'/contact'} className="hover:text-gray-500">Contact Us</Link>
          </li>
        </ul>
        <div className="text-center lg:text-left mt-4 lg:mt-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Toko Kita</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
