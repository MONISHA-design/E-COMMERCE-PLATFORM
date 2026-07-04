import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', // Points straight to your local Node.js backend port
});

// This automatically attaches your JWT token to your requests if the admin is logged in
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;