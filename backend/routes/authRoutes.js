import express from 'express';
import { registerUser } from '../controllers/authController.js';
import {loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Map POST requests hitting /api/auth/register to our register controller
router.post('/register', registerUser);
router.post('/login',loginUser);

router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: "Welcome to your private profile dashboard!",
        user: req.user // Contains the user details fetched by the middleware
    });
});


export default router;