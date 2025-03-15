import React from "react";
import {assets} from "../assets/assets";
import { useNavigate } from "react-router-dom";

const BannerHelp = () => {
    const navigate = useNavigate();
    return(
        <div className="bg-primary flex flex-col  md:flex-row justify-center rounded-3xl px-6 md:px-10 lg:px-20 drop-shadow-2xl">
            {/* left container containing content for help */}
            <div className="flex flex-col justify-center mx-3 my-5 md:w-1/3 xl:w-1/2">
                <h1 className="text-white text-3xl md:text-4xl lg:text-[40px] font-semibold my-4">No idea which specialist to consult to?</h1>
                <p className="text-slate-200 text-2xl md:3xl lg:4xl">Don't worry we have got your back.</p>
                <p className="text-slate-200 text-xl"> Simply describe your problem and we will find the Doctors who can help you.</p>

                {/* right now it is routing to doctors but will update it after ai integration  */}
                <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className="bg-[#E5E4E2] rounded-2xl w-1/3 md:w-[70%] lg:w-1/2 xl:w-1/3 self-center my-1 px-4 py-2 flex gap-2 hover:font-semibold hover:scale-105 transition-all duration-200">Let's Get Started <img className="w-3" src={assets.arrow_icon} alt="arrow icon" /></button>
            </div>

            {/* right container containing doctor image*/}
            <div className="xl:w-1/2 flex justify-center">
                <img className="h-[250px] md:h-[350px] lg:h-[450px]" src={assets.DoctorHelp} alt="Doctor Image" />
            </div>
        </div>
    );
}

export default BannerHelp;