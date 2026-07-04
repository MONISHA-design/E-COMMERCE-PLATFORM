import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { products, cartItems, removeFromCart, getCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const totalAmount = getCartAmount();

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Your Shopping Cart</h2>

      {totalAmount === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 mb-4">Your cart is currently empty.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items List Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 shadow-xl">
            {products.map((product) => {
              // Explicitly checking using the underscore _id key matching our context
              if (cartItems[product._id] > 0) {
                return (
                  <div key={product._id} className="p-5 flex items-center justify-between gap-4 bg-slate-900">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-lg bg-slate-950 border border-slate-800" 
                      />
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-indigo-400 font-semibold text-sm mt-0.5">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="text-slate-300 text-sm font-medium bg-slate-950 px-3 py-1 rounded border border-slate-800">
                        Qty: {cartItems[product._id]}
                      </span>
                      <button 
                        onClick={() => removeFromCart(product._id)}
                        className="text-rose-500 hover:text-rose-400 font-semibold text-xs tracking-wide uppercase transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Cart Pricing Calculation Footer Dashboard */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 ml-auto max-w-sm shadow-xl space-y-4">
            <div className="flex justify-between text-sm border-b border-slate-800 pb-3">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white font-semibold">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-slate-800 pb-3">
              <span className="text-slate-400">Shipping</span>
              <span className="text-emerald-400 font-medium">FREE</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-1">
              <span className="text-white">Total</span>
              <span className="text-indigo-400 font-black">₹{totalAmount}</span>
            </div>
            <button 
              onClick={() => alert('Checkout demo complete! Your mock system works flawlessly.')}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold p-3 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-indigo-600/10"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;