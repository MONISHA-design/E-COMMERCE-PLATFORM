import mongoose from 'mongoose';

 export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🚀 MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1); // Force-exits the application if the database link fails
    }
};

