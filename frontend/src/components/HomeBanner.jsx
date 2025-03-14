import React from "react";
import {assets} from "../assets/assets";

const HomeBanner = () =>{
    return(
        <div className="bg-primary justify-center flex flex-col md:flex-row flex-wrap rounded-xl px-6 md:px-10 lg:px-20">

            {/* left sub container  */}
            <div className="flex justify-center items-end">
                <img className="h-[320px] md:h-[470px] lg:drop-shadow-[0_35px_35px_rgba(255,255,255,1)]" src={assets.doctorsGroup} alt="" />
            </div>

            {/* right sub container  */}
            <div className="mt-0 pt-2 w xl:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] xl:ml-10" >
                <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold">Manage your healthcare appointments with ease, anytime, anywhere.</p>
                <div>
                    <p className="text-[#E5E4E2] text-lg">Find doctors, schedule appointments, and manage your health <br/> records effortlessly, all in one place.</p>
                </div>
                <a className="bg-[#E5E4E2] rounded-2xl px-4 py-2 flex gap-2 hover:font-semibold hover:scale-105 transition-all duration-200" href="#speciality">
                    Book an Appointment <img className="w-3" src={assets.arrow_icon} alt="arrow icon" />
                </a>
            </div>

        </div>
    );
}

export default HomeBanner;