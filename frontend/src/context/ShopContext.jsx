import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

// Adjust this to match your backend port if different (e.g., http://localhost:4000)
const BACKEND_URL = 'http://localhost:3000';

export function ShopContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [cartItems, setCartItems] = useState({});

  // 1. Fetch live products from backend database & map schema layout
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Calls your GET /api/products route
      const response = await axios.get(`${BACKEND_URL}/api/products`);
      
      if (response.data.success) {
        // Map backend 'images' array to the single 'image' string field expected by your UI
        const formattedProducts = response.data.products.map(product => ({
          ...product,
          image: product.images && product.images.length > 0 
            ? product.images[0].url 
            : "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60"
        }));

        setProducts(formattedProducts);
      } else {
        console.error("Failed to load products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Load user cart data from backend persistent storage
  const loadUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/cart/get`, 
        {}, 
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Run on initial component mount to populate local frontend context
  useEffect(() => {
    fetchProducts();
    if (token) {
      loadUserCart(token);
    }
  }, [token]);

  // 3. Add to Cart with Backend sync
  const addToCart = async (itemId) => {
    // Optimistic UI state update locally first
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    // If logged in, save data permanently to database state
    if (token) {
      try {
        await axios.post(
          `${BACKEND_URL}/api/cart/add`, 
          { itemId }, 
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating remote cart:", error);
      }
    }
  };

  // 4. Completely removes an item with Backend sync
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          `${BACKEND_URL}/api/cart/remove`, 
          { itemId }, 
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from remote cart:", error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const login = (authToken) => {
    localStorage.setItem('token', authToken);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCartItems({}); // Purge clear active state context view on disconnect
  };

  const value = {
    products,
    loading,
    token,
    cartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    getCartAmount,
    login,
    logout,
    BACKEND_URL
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}