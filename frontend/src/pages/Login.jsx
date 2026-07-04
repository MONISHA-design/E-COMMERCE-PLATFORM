import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 // Inside src/pages/Login.jsx - Replace your old handleLogin function with this:
const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);

  // Simulate a brief network lag, then let you in automatically!
  setTimeout(() => {
    localStorage.setItem('token', 'mock-secret-admin-jwt-token');
    setLoading(false);
    navigate('/admin');
    window.location.reload();
  }, 600);
};

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-slate-900 border border-slate-800 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-white">Welcome Back</h2>
        <p className="text-slate-400 mt-2 text-sm">Log in to manage your e-commerce platform</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400 text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Email Address
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com" 
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
            required 
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Password
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500 transition text-sm"
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold p-3 rounded transition cursor-pointer disabled:opacity-50 text-sm mt-2"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default Login;