import mongoose, { model } from "mongoose";

const RequestSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    image:{type:String, required:true},
    speciality:{type:String, required:true},
    degree:{type:String, required:true},
    experience:{type:String, required:true},
    summary:{type:String, required:true},
    available:{type:Boolean, default:true},
    fee:{type:Number, required:true},
    address:{type:Object, required:true},
    date:{type:Date, required:true},
    slots_booked:{type:Object,default:{}},
    isApproved:{type:Boolean,default:false}

},{minimize:false})

const RequestModel =mongoose.models.request ||  mongoose.model('request', RequestSchema);

export default RequestModel;