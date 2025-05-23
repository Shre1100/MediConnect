import express from 'express';
import { addDoctor, adminLogin, allDoctors, appointmentsAdmin, cancelAppointmentByAdmin, adminDashboard, getDoctorRequest, rejectRequest, acceptRequest } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/AuthAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailablity)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin, cancelAppointmentByAdmin)
adminRouter.get('/dashboard',authAdmin, adminDashboard)
adminRouter.get('/doctor-requests', authAdmin, getDoctorRequest)
adminRouter.post('/reject-request',authAdmin, rejectRequest);
adminRouter.post('/accept-request', authAdmin, acceptRequest);

export default adminRouter;
