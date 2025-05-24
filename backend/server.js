import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';


//app config
const app = express();
// const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'dToken', 'aToken' 'Authorization'],
    credentials: true
}));

//api end point

app.use('/api/admin', adminRouter)
//localhost:4000/api/admin

// for doctor 
app.use('/api/doctor', doctorRouter)

//for user
app.use('/api/user', userRouter);

app.get('/',(req,res)=>{
    res.send('API WORKING');
})

// app.listen(port,()=>{
//     console.log("Server listening on port ", port);
// })
