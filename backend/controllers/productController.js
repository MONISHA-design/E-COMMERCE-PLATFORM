import Product from '../models/product.js';
import { cloudinary } from '../database/cloudinary.js';
import DataUriParser from 'datauri/parser.js';
import path from 'path';
// @desc    Create new product (Admin Only)
// @route   POST /api/products/admin/new


// @desc    Create new product with Image Upload (Admin Only)
// @route   POST /api/products/admin/new
// @route   POST /api/products/admin/new
export const createProduct = async (req, res) => {
    try {

        console.log("--- DEBUGGING REQ.FILE ---", req.file); // 👈 ADD THIS LINE

        // 1. Check if an image file was actually uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a product image' });
        }

        // 2. Use DataUriParser to safely generate a flawless Data URI string from the buffer
        const parser = new DataUriParser();
        // This dynamically extracts the correct format, even if the filename lacks an extension!
        const extName = path.extname(req.file.originalname) || '.jpg'; 
        const file = parser.format(extName, req.file.buffer);
        const fileUrl = file.content;

        // 3. Upload straight to Cloudinary as an image
        const uploadResponse = await cloudinary.uploader.upload(fileUrl, {
            folder: 'ecom_products',
            resource_type: 'image' 
        });

        // 4. Extract data from request body and inject Cloudinary details
        const productData = {
            ...req.body,
            images: [
                {
                    public_id: uploadResponse.public_id,
                    url: uploadResponse.secure_url
                }
            ]
        };

        // 5. Save into MongoDB
        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            message: "Product added with cloud image upload successfully!",
            product
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all products (Public)
// @route   GET /api/products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a product (Admin Only)
// @route   DELETE /api/products/admin/:id
export const deleteProduct = async (req, res) => {
    try {
        // 1. Find the product in MongoDB first
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // 2. Loop through the images array and delete each asset from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                if (img.public_id) {
                    await cloudinary.uploader.destroy(img.public_id);
                }
            }
        }

        // 3. Delete the product document from MongoDB
        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Product and associated cloud images deleted successfully!'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all products
// @route   GET /api/products
export const getAllProducts = async (req, res) => {
    try {
        // Fetch every single product from MongoDB
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product details
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        // Find product by its unique MongoDB _id
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   PUT /api/products/admin/:id
export const updateProduct = async (req, res) => {
    try {
        // 1. Find the existing product first
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // 2. Check if a brand new image file is being uploaded
        if (req.file) {
            // Delete the old image from Cloudinary first to prevent clutter
            if (product.images && product.images[0]?.public_id) {
                await cloudinary.uploader.destroy(product.images[0].public_id);
            }

            // Convert the new incoming file buffer to a Data URI
            const parser = new DataUriParser();
            const extName = path.extname(req.file.originalname) || '.jpg';
            const file = parser.format(extName, req.file.buffer);
            
            // Upload the new image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(file.content, {
                folder: 'ecom_products',
                resource_type: 'image'
            });

            // Inject the new cloud media payload into the incoming request body
            req.body.images = [{
                public_id: uploadResponse.public_id,
                url: uploadResponse.secure_url
            }];
        }

        // 3. Update the product document in MongoDB with the modified fields
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Returns the fresh updated document back to us
            runValidators: true // Ensures schema rules (like min price) still apply
        });

        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            product
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
