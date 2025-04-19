import React from "react";
import { assets } from "../assets/assets";

const HowItWorks = () => {
    return(
        <div className="my-7 bg-white p-3 py-7 mx-[-3%] flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold underline mb-3 md:text-2xl">How It Works?</h2>

            {/* step by step procedure  */}
            <div className="flex gap-2 flex-wrap justify-center items-center w-[70%] md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-2 lg:w-[97%]">
                <div className="my-4 flex flex-col justify-center items-center">
                    <div className="drop-shadow-xl mb-2 h-[60px] lg:h-[80px] lg:w-[80px] w-[60px] p-3 bg-slate-300 rounded-full flex justify-center items-center">
                        <img className="w-[90%] h-[90%] flex justify-center items-center" src={assets.SignUp} alt="sign up icon" />
                    </div>
                    <p className="font-semibold text-md">Sign Up/LogIn</p>
                    <p className="text-sm text-wrap">Create an account if not already created</p>
                </div>

                <div className="my-4 flex flex-col justify-center items-center">
                    <div className="drop-shadow-xl mb-2 h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] p-3 bg-slate-300 rounded-full flex justify-center items-center">
                        <img className="w-[90%] h-[90%] flex justify-center items-center" src={assets.Search} alt="search icon" />
                    </div>
                    <p className="font-semibold text-md">Search for Doctors</p>
                    <p className="text-sm text-wrap">Browse through a list of trusted doctors</p>

                </div>

                <div className="my-4 flex flex-col justify-center items-center">
                    <div className="drop-shadow-xl mb-2 h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] p-3 bg-slate-300 rounded-full flex justify-center items-center">
                        <img className="w-[90%] h-[90%] flex justify-center items-center" src={assets.Schedule} alt="calendar icon" />
                    </div>
                    <p className="font-semibold text-md">Schedule appointment</p>
                    <p className="text-sm text-wrap">Schedule appointments according to your needs</p>

                </div>

                <div className="my-4 flex flex-col justify-center items-center">
                    <div className="drop-shadow-xl mb-2 h-[60px] lg:h-[80px] lg:w-[80px] w-[60px] p-3 bg-slate-300 rounded-full flex justify-center items-center">
                        <img className="w-[90%] h-[90%] flex justify-center items-center" src={assets.healthcare} alt="healthcare icon" />
                    </div>
                    <p className="font-semibold text-md">Get Solutions</p>
                    <p className="text-sm text-wrap">Get personalized healthcare and digital health record</p>

                </div>

                <div className="my-4 flex flex-col justify-center items-center">
                    <div className="drop-shadow-xl mb-2 lg:h-[80px] lg:w-[80px] h-[60px] w-[60px] p-3 bg-slate-300 rounded-full flex justify-center items-center">
                        <img className="w-[90%] h-[90%] flex justify-center items-center" src={assets.rate} alt="rate icon" />
                    </div>
                    <p className="font-semibold text-md">Rate your Experience</p>
                    <p className="text-sm text-wrap">Rate your overall experience of the appointment</p>

                </div>
            </div>
        </div>
    )
}

export default HowItWorks;