import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-3xl font-bold tracking-wide">
        FundMate
      </Link>

      <nav className="flex items-center gap-6 font-medium">
        <Link
          to="/about"
          className="hover:text-yellow-300 transition-all duration-200"
        >
          About
        </Link>

        <div className="relative group">
          <button className="hover:text-yellow-300 transition-all">
            Fundraise For ▾
          </button>
          <ul className="absolute hidden group-hover:block bg-white text-gray-700 border rounded-md shadow-lg mt-2 w-48 z-50">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/fundraise/medical">Medical Purpose</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/fundraise/education">Education Purpose</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/fundraise/other">Other</Link>
            </li>
          </ul>
        </div>

        <Link to="/register" className="hover:text-yellow-300 transition-all">
          Register
        </Link>
        <Link to="/login" className="hover:text-yellow-300 transition-all">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
