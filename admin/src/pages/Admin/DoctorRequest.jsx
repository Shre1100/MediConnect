import React from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useState } from "react";

const DoctorRequest = () =>{

    const {getAllRequest, requests, setRequests, aToken, rejection, acceptRequest} = useContext(AdminContext);

    const [viewMore, setViewMore] = useState(false);

    useEffect(()=>{
        getAllRequest();
        
    },[aToken])


    return (
        <div className="bg-white w-full md:mr-10 rounded-xl md:p-5 p-3 flex flex-col min-h-[86vh] gap-5">
            <h2 className="lg:text-xl text-md md:text-lg font-semibold">Doctor Requests for Approval</h2>
            {viewMore? 
                <button onClick={()=>setViewMore(false)} className="px-3 w-28 md:w-36 cursor-pointer py-1 bg-slate-400 text-white mx-2 rounded-2xl text-sm md:text-base">Hide Details</button>
                :<button onClick={()=>setViewMore(true)} className="px-3 w-28 md:w-36 cursor-pointer py-1 bg-slate-400 text-white mx-2 rounded-2xl text-sm md:text-base">View Details </button>
            }
            {
                requests ?
                requests.map((item,index)=>(
                    <div key={index} className="bg-slate-200 rounded-lg">
                        <div className="flex flex-wrap items-center justify-between w-full px-3 py-2 ">
                            <div className="flex items-center gap-7">
                                <img className="rounded-full w-[50px] h-[50px] md:w-[73px] md:h-[70px] bg-white" src={item.image} alt="Doctor profile image" />
                                <div className="flex flex-col gap-1">
                                    <p className=" md:text-lg font-semibold">{item.name}</p>
                                    <p className=" text-xs md:text-sm">{item.degree} <span className="px-2 border rounded-lg border-gray-500">{item.experience}</span></p>
                                    <p className="text-xs md:text-sm">{item.address.line1} <br />{item.address.line2}</p>
                                </div>
                            </div>
                        
                            <div className="flex gap-10 mr-3">
                                <button onClick={()=>acceptRequest(item._id)} className="md:px-6 px-2 md:py-2 py-1 bg-[#7483bd] cursor-pointer hover:scale-105 hover:bg-[#241f35] transition-all duration-200 font-semibold text-white rounded-2xl">Accept</button>
                                <button onClick={()=>rejection(item._id)} className="md:px-6 px-2 md:py-2 py-1 bg-red-800 cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-200 font-semibold text-white rounded-2xl">Reject</button>
                            </div>
                        
                        </div>

                        {
                            viewMore ?
                            <div className="mx-3 my-2">
                                <p className="text-sm font-medium">Email : <span className="font-normal">{item.email}</span></p>
                                <p className="text-sm font-medium">Fee : <span className="font-normal">{item.fee}</span></p>
                                <p className="text-sm font-medium">Speciality : <span className="font-normal">{item.speciality}</span></p>
                                <p className="text-sm font-medium">Summary : <span className="text-xs font-normal md:text-sm">{item.summary}</span></p>
                            </div>:
                            <div></div>
                        }
                        

                    </div>
                ))
                
                :
                <div className="flex mt-10 flex-col items-center gap-3 justify-center">
                    <img className="rounded-xl w-[400px]" src={assets.nothing} alt="" />
                    <p className="text-gray-600 font-bold">No pending requests found</p>
                </div>
            }

        </div>
    )
}

export default  DoctorRequest;