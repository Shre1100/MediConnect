import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

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

export { addDoctor, adminLogin };
