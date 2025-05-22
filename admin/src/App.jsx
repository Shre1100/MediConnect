import React, { useContext } from "react"
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideMenuOptions from "./components/SideMenuOptions";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorRequest from './pages/Admin/DoctorRequest';
import AllDoctors from'./pages/Admin/AllDoctors';
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {

  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  return aToken || dToken ? (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className="flex items-start w-full">
        <SideMenuOptions/>
        <Routes>
          {/* for admin  */}
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/all-appointments" element={<AllAppointments/>}></Route>
          <Route path="/doctor-requests" element={<DoctorRequest/>}></Route>
          <Route path="/all-doctors" element={<AllDoctors/>}></Route>

          {/* for doctor  */}

          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}></Route>
          <Route path="/doctor-appointments" element={<DoctorAppointment/>}></Route>
          <Route path="/doctor-profile" element={<DoctorProfile/>}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App;
