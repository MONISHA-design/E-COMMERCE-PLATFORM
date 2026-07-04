import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

function Navbar() {
  const { token, logout, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="text-xl font-black text-white tracking-wider hover:text-indigo-400 transition">
          TECH<span className="text-indigo-500">CRAFT</span>
        </Link>

        {/* Links Panel */}
        <div className="flex items-center space-x-6 text-sm font-semibold text-slate-300">
          <Link to="/" className="hover:text-white transition">Shop</Link>
          
          {token && (
            <Link to="/admin" className="hover:text-white transition text-amber-400">Admin Dashboard</Link>
          )}

          {/* 🛒 CLICKABLE CART LINK */}
          <Link to="/cart" className="relative flex items-center cursor-pointer hover:text-white text-indigo-400 transition">
            <span>Cart</span>
            {getCartCount() > 0 && (
              <span className="ml-1.5 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {getCartCount()}
              </span>
            )}
          </Link>

          {token ? (
            <button 
              onClick={() => { logout(); navigate('/login'); }}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition cursor-pointer text-xs"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition text-xs"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;