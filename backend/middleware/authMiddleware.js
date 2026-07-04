import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware to protect routes and verify the JWT token
export const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token exists in the Request Headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token looks like: "Bearer eyJhbGciOi..." -> Split it by space and grab the string after "Bearer"
            token = req.headers.authorization.split(' ')[1];

            // 2. Decode and verify the token signature using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Fetch the user details from the database using the ID inside the payload
            // We use .select('-password') so we don't accidentally attach the hashed password to the request object
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Everything is valid! Move to the next controller function
            next();

        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token validation failed' });
        }
    }

    // If no token was found at all
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Middleware to restrict access based on roles (e.g., Admin Only)
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // req.user was attached by the 'protect' middleware right above!
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Role (${req.user.role}) is not authorized to access this resource` 
            });
        }
        next();
    };
};
