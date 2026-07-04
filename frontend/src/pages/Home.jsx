import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx'; // Ensure exact case and .jsx extension

function Home() {
  const { products, loading } = useContext(ShopContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          Latest Collections
        </h1>
        <p className="text-slate-400 mt-2">Discover premium products running directly from your mock context state.</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800">
          <p className="text-slate-400 text-lg">No products found. Head to the Admin Dashboard to upload some!</p>
        </div>
      ) : (
        /* Responsive Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
    /* Wrap the entire card component inside a Link tag pointing to its ID path */
    <Link 
      to={`/product/${product._id}`}
      key={product._id} 
      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:border-slate-700 transition flex flex-col group cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="h-48 w-full bg-slate-950 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-slate-800">
          <span className="text-xl font-black text-indigo-400">
            ₹{product.price}
          </span>
          <span className="bg-indigo-600 group-hover:bg-indigo-500 text-white font-semibold text-xs px-3 py-2 rounded-lg transition">
            View Details
          </span>
        </div>
      </div>
    </Link>
  ))}
        </div>
      )}
    </div>
  );
}

export default Home;