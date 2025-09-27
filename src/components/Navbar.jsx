import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('Apple TV+');

  return (
    <div className="w-full h-[66px] bg-black flex items-center justify-between px-10">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center border border-white rounded-md px-2 py-[2px] overflow-hidden">
          <img src={logo} alt="Logo" className="h-8 scale-150" />
        </div>
        <span className="text-gray-400 text-base">Open TV ↗</span>
      </div>

      {/* Middle Section */}
      <div className="flex gap-10">
        <span
          onClick={() => setActive('Apple TV+')}
          className={`cursor-pointer font-bold text-xl ${
            active === 'Apple TV+' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Link to="/">Apple TV+</Link>
        </span>
        <span
          onClick={() => setActive('MLS')}
          className={`cursor-pointer font-bold text-xl ${
            active === 'MLS' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Link to="/MLS">MLS</Link>
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gray-500 rounded px-3 py-1">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white text-sm outline-none w-40"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
