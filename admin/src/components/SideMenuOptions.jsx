import React, { useContext } from "react";
import {AdminContext} from '../context/AdminContext';
import {NavLink} from 'react-router-dom';
import {assets} from '../assets/assets';

const SideMenuOptions = () =>{

    const {aToken} = useContext(AdminContext);

    return(
        <div className="bg-white sm:mx-10 min-h-[86vh] rounded-xl shadow-2xl pt-3">
            {
                aToken && <ul className="text-gray-600">
                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/dashboard'}>
                        <img src={assets.home_icon} alt="home icon" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>All Appointments</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold':''}`} to={'/doctor-requests'}>
                        <img src={assets.add_icon} alt="" />
                        <p>Doctor Approval Requests</p>
                    </NavLink>

                    <NavLink className={({isActive})=>`flex items-center gap-5 py-3.5 px-3 md:px-9 transition-all duration-150 md:min-w-72 cursor-pointer ${isActive?'bg-[#e2eaff] border-b-2 border-b-[#241f35] text-[#241f35] font-semibold md:text-lg':''}`} to={'/all-doctors'}>
                        <img src={assets.people_icon} alt="" />
                        <p>All Doctors</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default SideMenuOptions;