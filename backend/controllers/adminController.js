import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import RequestModel from "../models/doctorRequest.js";

//api for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      fee,
      summary,
      address,
    } = req.body;
    const imageFile = req.file;

    //checking for data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !fee ||
      !summary ||
      !address
    ) {
      return res.json({ success: false, message: "Details Missing" });
    }

    //validation for email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Email format invalid" });
    }

    //validation for password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password length>8",
      });
    }

    //hashing

    const salt = await bcrypt.genSalt(9);
    const hashPass = await bcrypt.hash(password, salt);

    //uploading image to cloudinary
    const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imgUpload.secure_url;

    const doctorInfo = {
      name,
      email,
      image: imageUrl,
      password: hashPass,
      speciality,
      degree,
      experience,
      summary,
      fee,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoc = new doctorModel(doctorInfo);
    await newDoc.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//admin login api

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Wrong admin credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api for getting all doctors list for control panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({success:true, doctors});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//for getting appointments list

const appointmentsAdmin = async (req,res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({success:true, appointments});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//cancelling appointment by admin

const cancelAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);


    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //now that slot will be available

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//to get data for admin dashboard
const adminDashboard = async (req,res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments =  await appointmentModel.find({});

    const dashboardData = {
      doctors : doctors.length,
      appointments : appointments.length,
      patients : users.length,
      latestAppointments: appointments.reverse().slice(0,5)


    }

    res.json({success:true, dashboardData})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//to get all requests 
const getDoctorRequest = async (req,res) => {
  try {
    const requests = await RequestModel.find({ isApproved: false });
    res.json({success:true, requests});

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//to reject requests

const rejectRequest = async(req,res)=>{
  try {
    const { requestId } = req.body;

    if (!requestId) {
      return res.json({ success: false, message: "Request ID is required to reject a request." });
    }

    const result = await RequestModel.findByIdAndDelete(requestId);

    res.json({ success: true, message: "Doctor request rejected" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//to accept incoming request

const acceptRequest = async (req,res) => {
  try {
    const {requestId} = req.body;

    const acceptedRequest = await RequestModel.findByIdAndUpdate(
      requestId,
      { isApproved: true },
      { new: true }
    );

    const newDoctor = new doctorModel({
            name: acceptedRequest.name,
            email: acceptedRequest.email,
            password: acceptedRequest.password,
            speciality: acceptedRequest.speciality,
            experience: acceptedRequest.experience,
            degree: acceptedRequest.degree,
            address: acceptedRequest.address,
            summary: acceptedRequest.summary,
            image: acceptedRequest.image,
            available: acceptedRequest.available,
            fee: acceptedRequest.fee,
            date: acceptedRequest.date,
            slots_booked: acceptedRequest.slots_booked
        });

        await newDoctor.save();
        await RequestModel.findByIdAndDelete(requestId);
        res.json({ success: true, message: "Doctor request accepted and doctor added!" });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export { addDoctor, acceptRequest ,getDoctorRequest, adminLogin, allDoctors, appointmentsAdmin, cancelAppointmentByAdmin, adminDashboard, rejectRequest };
