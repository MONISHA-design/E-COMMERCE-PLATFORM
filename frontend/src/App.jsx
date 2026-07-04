import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Product from './pages/Product';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* The Navbar stays fixed at the top of the screen structure */}
        <Navbar />
        
        {/* Main Content Area where pages will swap */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
           <Route path="/admin" element={<Admin />} />
           <Route path="/product/:id" element={<Product />} />
           <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;