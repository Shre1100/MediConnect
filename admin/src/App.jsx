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

const App = () => {

  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className="flex items-start w-full">
        <SideMenuOptions/>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/all-appointments" element={<AllAppointments/>}></Route>
          <Route path="/doctor-requests" element={<DoctorRequest/>}></Route>
          <Route path="/all-doctors" element={<AllDoctors/>}></Route>
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
