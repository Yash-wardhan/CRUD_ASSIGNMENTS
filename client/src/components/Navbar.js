// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onUpdateClick, onLogoutClick }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold">
                    Dashboard
                </Link>
                <div className="space-x-4">
                    <button
                        onClick={onUpdateClick}
                        className="text-white bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Update Profile
                    </button>
                    <button
                        onClick={onLogoutClick}
                        className="text-white bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;