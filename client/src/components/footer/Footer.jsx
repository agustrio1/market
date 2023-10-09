import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className="bg-blue-700 text-white py-6 bottom-0">
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
        </ul>
        <div className="text-center lg:text-left mt-4 lg:mt-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Toko Kita</p>
          <div className="flex space-x-2 mt-2">
            <a href="tel:+1234567890" className="text-white hover:text-gray-500">
              <FontAwesomeIcon icon={faPhone} /> +1234567890
            </a>
            <a href="mailto:info@example.com" className="text-white hover:text-gray-500">
              <FontAwesomeIcon icon={faEnvelope} /> info@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
