// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js'; // Stays the same

// 1. Define the URL for your new marketplace app
const MARKETPLACE_APP_URL = 'http://localhost:5174';

function Navbar() {
  // 2. Get the 'token' from the useAuth hook
  const { isAuthenticated, user, logout, token } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-blue-600 dark:text-blue-400">Sarthi</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAuthenticated && (
                <>
                  <Link 
                    to="/carpool" 
                    className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  >
                    Carpool
                  </Link>

                  {/* 3. THIS IS THE BIG CHANGE */}
                  {/* Replace <Link> with <a> tag */}
                  <a 
                    href={`${MARKETPLACE_APP_URL}/?token=${token}`}
                    className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  >
                    Marketplace
                  </a>
                </>
              )}
            </div>
          </div>

          {/* 4. Show Login/Logout buttons based on state (no change here) */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user?.name || user?.email}!
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;