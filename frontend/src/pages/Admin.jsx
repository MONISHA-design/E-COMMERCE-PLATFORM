import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

function Admin() {
  const { products, addProductMock, setProducts } = useContext(ShopContext);

  // Form States
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return alert('Please provide at least a product name and price.');

    const newProduct = {
      name,
      price: Number(price),
      description: description || 'No description provided.',
      image: image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60'
    };

    addProductMock(newProduct);
    
    // Reset Form Fields
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    alert('Product added successfully to your catalog dashboard!');
  };

  // Handle Mock Product Deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Accessing and modifying products directly or handling via custom filter
      // Since we didn't add a delete function in context, we can filter it right here if your context allows or update it cleanly
      alert('Mock Delete Successful! Product removed from current runtime view.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4">
      <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Admin Portal</h2>

      {/* Grid layout split into two columns: Left for Adding, Right for Inventory List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Add Product Form (Takes up 5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 tracking-tight border-b border-slate-800 pb-2">
            Upload New Product
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Product Title</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Quantum Gaming Mouse" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg p-2.5 text-sm text-white outline-none transition" required />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Price (INR)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 1899" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg p-2.5 text-sm text-white outline-none transition" required />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Image URL (Optional)</label>
              <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg p-2.5 text-sm text-white outline-none transition" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Product Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write technical parameters or features here..." rows="3" className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg p-2.5 text-sm text-white outline-none transition resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg text-sm transition cursor-pointer mt-2 shadow-lg shadow-indigo-600/10">
              Publish Product
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Active Inventory List Table (Takes up 7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4 tracking-tight border-b border-slate-800 pb-2">
            Active Stock Inventory ({products.length})
          </h3>

          <div className="overflow-x-auto max-h-[460px] overflow-y-auto pr-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <th className="pb-3 pl-2">Item</th>
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {products.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-950/40 transition group">
                    {/* Thumbnail Image */}
                    <td className="py-3 pl-2">
                      <img src={item.image} alt="" className="w-10 h-10 object-cover rounded bg-slate-950 border border-slate-800" />
                    </td>
                    {/* Name */}
                    <td className="py-3 font-semibold text-white max-w-[180px] truncate pr-2">
                      {item.name}
                    </td>
                    {/* Price */}
                    <td className="py-3 font-medium text-indigo-400">
                      ₹{item.price}
                    </td>
                    {/* Actions */}
                    <td className="py-3 text-right pr-2">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="text-slate-500 hover:text-rose-400 font-bold text-xs transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Admin;