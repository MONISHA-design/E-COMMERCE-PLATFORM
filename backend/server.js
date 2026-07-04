import express from 'express'
import 'dotenv/config'
import cors from 'cors';
import {connectDB} from './database/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'


const app = express()
app.use(express.json());

app.use(cors());

app.use('/api/auth',authRoutes);

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on ${PORT}`) ;
})

