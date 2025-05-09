import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

//api for registering new users

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
        return res.json({success:false, message:"Missing details"});
    }

    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Enter valid email address"});

    }

    if(password.length < 8){
        return res.json({success:false,message:"Enter a strong password"});
    }

    //hashing the password
    const salt = await bcrypt.genSalt(9);

    const hashPassword = await bcrypt.hash(password,salt);

    const userData = {
        name,
        email,
        password : hashPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save();
    
    //creating token
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.json({success:true, token});

    

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message});
  }
};

//for user login

const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user =  await userModel.findOne({email});

        if(!user){
           return res.json({success:false, message:"User Does Not Exist"}) 
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//getting user data for profile display

const getProfile = async (req,res) =>{
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId).select('-password');
        res.json({success:true,userData});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {registerUser, loginUser, getProfile};
