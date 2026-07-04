import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please enter a product price'],
        default: 0.0
    },
    category: {
        type: String,
        required: [true, 'Please select a category for this product'],
        enum: {
            values: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Books', 'Clothes'],
            message: 'Please select a valid category'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0
    },
    // We will store the Cloudinary URL and public_id here later!
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;