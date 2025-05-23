import React, { useContext } from "react";
import {AdminContext} from '../context/AdminContext';
import {NavLink} from 'react-router-dom';
import {assets} from '../assets/assets';
import { DoctorContext } from "../context/DoctorContext";

const SideMenuOptions = () =>{

    const {aToken} = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext);

    return(
        <div className="bg-white sm:mx-10 mr-2 md:min-h-[86vh] rounded-xl shadow-2xl pt-3">
            {
                aToken && <ul className="text-gray-600">
                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/dashboard'}>
                        <img src={assets.home_icon} alt="home icon" />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className="hidden md:block">All Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold':''}`} to={'/doctor-requests'}>
                        <img src={assets.add_icon} alt="" />
                        <p className="hidden md:block">Doctor Approval Requests</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/all-doctors'}>
                        <img src={assets.people_icon} alt="" />
                        <p className="hidden md:block">All Doctors</p>
                    </NavLink>
                </ul>
            }


            {
                dToken && <ul className="text-gray-600">
                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/doctor-dashboard'}>
                        <img src={assets.home_icon} alt="home icon" />
                        <p className="hidden md:block">Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/doctor-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className="hidden md:block">Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/doctor-profile'}>
                        <img src={assets.people_icon} alt="" />
                        <p className="hidden md:block">Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default SideMenuOptions;