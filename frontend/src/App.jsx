import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from './pages/Login';
import About from "./pages/About";
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import UserAppointments from './pages/UserAppointments';
import Appointment from './pages/Appointment.jsx';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () =>{
  return(
    <div className="mx-3 sm:mx-[3%]">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* displays appointments scheduled by the user */}
        <Route path="/userAppointments" element={<UserAppointments/>}/>
        {/* to schedule an appoint with a particular doctor page  */}
        <Route path="/appointment/:doctId" element={<Appointment/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;