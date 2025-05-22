import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// changing the availability status of doctors 

const changeAvailablity = async (req,res) =>{
    try {
        const {docId} = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available});
        res.json({success:true, message:"Availability changed"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// getting doctor list 

const doctorList = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({success:true, doctors});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

//doctor login

const loginDoctor = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const doctor = await doctorModel.findOne({email});
        if(!doctor){
            return res.json({success:false,message:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if(!isMatch){
            res.json({success:false,message:"Incorrect password"})
        }else{
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
            res.json({success:true,token})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

export {changeAvailablity, doctorList, loginDoctor};