import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";


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

//getting doctor's all appointments

const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//to mark the appointments as completed

const appointmentsComplete = async (req,res) => {
    try {
        const {docId, appointmentId} = req.body;
        const appointmentsData = await appointmentModel.findById(appointmentId);
        if(appointmentsData && appointmentsData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
            return res.json({success:true,message:"Appointment Completed"})
        }else{
            return res.json({success:false, message:"Mark Failed"});
        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//to cancel appointment
const appointmentsCancel = async (req,res) => {
    try {
        const {docId, appointmentId} = req.body;
        const appointmentsData = await appointmentModel.findById(appointmentId);
        if(appointmentsData && appointmentsData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
            return res.json({success:true,message:"Appointment Cancelled"});
        }else{
            return res.json({success:false, message:"Unable to Cancel Appointment"});
        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//to get doctor dashboard data

const doctorDashboard = async (req,res) => {
    try {
        const {docId} = req.body;
        const appointments = await appointmentModel.find({docId});
        
        let totalEarning = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                totalEarning += item.amount;
            }
        })
        let patients = [];
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })

        const dashData = {
            totalEarning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData});
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//to get doctor profile

const getDoctorProfile = async (req,res) => {
    try {
        const {docId} = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');

        res.json({success:true,profileData});
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//to edit doctor's data

const updateDoctorProfile = async (req,res) => {
    try {
        const {docId, fee, address, available, summary} = req.body;
        await doctorModel.findByIdAndUpdate(docId,{fee,available, address, summary});
        res.json({success:true,message:"Profile Updated"});
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentsComplete, appointmentsCancel, doctorDashboard, updateDoctorProfile, getDoctorProfile};