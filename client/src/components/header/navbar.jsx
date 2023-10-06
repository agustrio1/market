import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAccountDropdown = () => {
    setAccountOpen(!accountOpen);
  };

  return (
    <nav className="bg-blue-700 p-4 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Kita store</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/cart" className="text-white">Cart</Link>
          
          {/* Account Dropdown (Desktop) */}
          <div className="relative inline-block text-left">
            <button
              onClick={toggleAccountDropdown}
              className="text-white"
            >
              Account
            </button>
            <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${accountOpen ? 'block' : 'hidden'}`}>
              <div className="py-1 bg-white rounded-md">
                <Link to="//profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Profile</Link>
                <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Login</Link>
                <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Register</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white z-10 text-xl"
          onClick={toggleMenu}
        >
          =
        </button>
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`md:hidden w-64 bg-blue-700 h-800 fixed top-0 right-0 rounded-left-sm transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className=" px-4 pt-14">
          <Link to="/" className="block text-white py-2">Home</Link>
          <Link to="/cart" className="block text-white py-2">Cart</Link>
        </div>
        {/* Account Dropdown (Mobile) */}
        <div className="pb-4 px-4">
          <button
            onClick={toggleAccountDropdown}
            className="text-white py-2"
          >
            Account
          </button>
          <div className={`origin-top-right absolute right-9 mt-1 w-48 rounded-md shadow-lg ${accountOpen ? 'block' : 'hidden'}`}>
            <div className="py-1 bg-white rounded-md">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Profile</Link>
              <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Login</Link>
              <Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
