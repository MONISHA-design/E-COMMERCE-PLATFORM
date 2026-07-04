import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useContext(ShopContext);
  const [addedMessage, setAddedMessage] = useState(false);

  // Cross-reference the route parameter ID against our product list
  const product = products.find((item) => item._id === id);

  if (!product) {
    return (
      <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800">
        <p className="text-slate-400 text-lg">Product not found.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // This explicitly passes the underscore id string ("prod_1") to the context engine
    addToCart(product._id);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <button 
        onClick={() => navigate('/')} 
        className="mb-6 flex items-center text-sm font-semibold text-slate-400 hover:text-white transition cursor-pointer"
      >
        ← Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-xl">
        
        {/* Product Image */}
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800/50 max-h-[450px]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
              In Stock
            </span>
            <h1 className="text-3xl font-black text-white mt-4 tracking-tight leading-tight md:text-4xl">
              {product.name}
            </h1>
            <p className="text-2xl font-black text-indigo-400 mt-3">
              ₹{product.price}
            </p>
            
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Description
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Button Interface */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold p-3.5 rounded-xl transition cursor-pointer text-sm shadow-lg shadow-indigo-600/10 text-center"
            >
              {addedMessage ? '✅ Added to Cart!' : 'Add to Shopping Cart'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Product;