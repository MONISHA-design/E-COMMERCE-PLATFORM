import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is strictly required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is strictly required'],
        unique: true, // Prevents duplicate email accounts in your database
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer' // New registrations default to buyers
    }
}, { timestamps: true }); // Automatically injects createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);
export default User;