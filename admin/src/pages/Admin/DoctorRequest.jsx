import React from "react";
import { assets } from "../../assets/assets";

const DoctorRequest = () =>{

    const docreqlist = false;

    return(
        <div className="bg-white w-full mr-10 rounded-xl p-5 flex flex-col min-h-[80vh] gap-10">
            <h2 className="lg:text-xl text-lg font-semibold">Doctor Requests for Approval</h2>
            {
                docreqlist?
                <div className="flex flex-col gap-6">
                    {/* doctor image
                    then doctor name 
                    with details
                    then approve and reject button  */}
                    <div className="flex items-center justify-between w-full bg-slate-200 px-3 py-2 rounded-lg ">
                        <div className="flex items-center gap-7">
                            <img className="rounded-full w-[80px] h-[80px]" src={assets.dummyDoc} alt="Doctor profile image" />
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">Dr. Richard James</p>
                                <p className="text-sm">MBBS <span className="px-2 border rounded-lg border-gray-500">4 Years</span></p>
                                <p className="text-sm">456 Oak Avenue, Apartment 2B <br />Pleasantville, NY 10570</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-10 mr-3">
                            <button className="px-6 py-2 bg-[#7483bd] cursor-pointer hover:scale-105 hover:bg-[#241f35] transition-all duration-200 font-semibold text-white rounded-xl">Accept</button>
                            <button className="px-6 py-2 bg-red-800 cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-200 font-semibold text-white rounded-xl">Reject</button>
                        </div>
                        
                    </div>

                    <div className="flex items-center justify-between w-full bg-slate-200 px-3 py-2 rounded-lg ">
                        <div className="flex items-center gap-7">
                            <img className="rounded-full w-[80px] h-[80px]" src={assets.dummyDoc} alt="Doctor profile image" />
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-semibold">Dr. Richard James</p>
                                <p className="text-sm">MBBS <span className="px-2 border rounded-lg border-gray-500">4 Years</span></p>
                                <p className="text-sm">456 Oak Avenue, Apartment 2B <br />Pleasantville, NY 10570</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-10 mr-3">
                            <button className="px-6 py-2 bg-[#7483bd] cursor-pointer hover:scale-105 hover:bg-[#241f35] transition-all duration-200 font-semibold text-white rounded-xl">Accept</button>
                            <button className="px-6 py-2 bg-red-800 cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-200 font-semibold text-white rounded-xl">Reject</button>
                        </div>
                        
                    </div>

                </div>:
                <div className="flex mt-10 flex-col items-center gap-3 justify-center">
                    <img className="rounded-xl w-[400px]" src={assets.nothing} alt="" />
                    <p className="text-gray-600 font-bold">No pending requests found</p>
                </div>
            }

        </div>
    )
}

export default  DoctorRequest;