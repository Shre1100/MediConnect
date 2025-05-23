import React, { useContext } from "react";
import {assets} from '../assets/assets';
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom';
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () =>{

    const {aToken, setAToken} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);

    const navigate = useNavigate();


    const logOut = () =>{
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken('');
        dToken && localStorage.removeItem('dToken');
    }

    return(
        <div className="flex bg-white items-center justify-between px-2 mt-2 rounded-lg text-sm md:pr-7 mb-5 border-b border-b-gray-400 h-[60px] shadow-lg shadow-slate-900/20 shadow-b-3 shadow-r-[3px] sm:mx-10">
            <div className="h-full flex justify-center items-center gap-1 sm:gap-2 sm:mx-5">
                <img className="cursor-pointer h-[70%] w-36  sm:h-[80%] sm:w-44" src={assets.admin_logo} alt="" />
                <p className="text-lg sm:text-xl">{aToken ? '(Admin)' : '(Doctor)'}</p>
            </div>

            <button onClick={logOut} className="cursor-pointer self-center my-5 text-white text-lg font-semibold py-1 px-4 bg-[#7483bd] hover:scale-105 shadow-lg transition-all rounded-3xl hover:bg-[#241f35] duration-300">Log out</button>

        </div>
    )
}

export default Navbar;