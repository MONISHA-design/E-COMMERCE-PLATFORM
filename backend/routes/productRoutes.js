import express from 'express';
import { createProduct, getProducts, deleteProduct, getAllProducts, getProductById , updateProduct} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { upload } from '../database/cloudinary.js'; // 1. Import the upload middleware

const router = express.Router();

// Public Route: Anyone can browse products
router.get('/', getProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected Route: Must be logged in AND have the role of 'admin'
//router.post('/admin/new', protect, authorizeRoles('admin'), createProduct);
router.post('/admin/new', protect, authorizeRoles('admin'), upload.single('image'), createProduct);

router.delete('/admin/:id', protect, authorizeRoles('admin'), deleteProduct);

router.put('/admin/:id', protect, authorizeRoles('admin'), upload.single('image'), updateProduct);

export default router;