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
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
const allowedOrigins = [
  process.env.FRONTEND_URL,
  
  "https://medi-connect-admin-doctor.vercel.app/",         
  "http://localhost:5174",                         
];

app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed from this origin: ' + origin), false);
    }
  },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'dToken', 'aToken', 'token', 'Authorization'],
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

export default app;
