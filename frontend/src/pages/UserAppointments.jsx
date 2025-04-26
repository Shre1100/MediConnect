import React, { useContext, useState } from "react";
import {AppContext} from '../context/AppContext';

const UserAppointments = () =>{

    const [state, setState] = useState('Upcoming');

    const {doctors} = useContext(AppContext);

    return(
        // h-[100vh]
        <div className=" md:mx-3 lg:mx-20 bg-white flex flex-col items-center">
            <div className="flex justify-center items-center my-3 md:my-5">
                <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl">My Appointments</h2>
            </div>
            <div className="flex p-3 h-[60px] bg-slate-200 w-full mt-2 mb-3 md:my-5 items-center justify-center gap-8">
                <div className="cursor-pointer" onClick={()=>setState('Upcoming')} >
                    <p className={`text-base transition-all duration-300 text-gray-700 font-semibold md:text-xl ${state === 'Upcoming'? "bg-white px-4 py-1 rounded-lg shadow-md":""}`}>Upcoming</p>
                </div>
                <p>|</p>
                <div className="cursor-pointer" onClick={()=>setState('Completed')}>
                    <p className={`text-base transition-all duration-300 text-gray-700 font-semibold md:text-xl ${state === 'Completed'? "bg-white px-4 py-1 rounded-lg shadow-md":""}`}>Completed</p>
                </div>
            </div>

            {/* displaying appointments  */}
            <div className="flex flex-col gap-10 w-full">
                {
                doctors.slice(0,2).map((item,index)=>(
                    <div key={index} className="flex w-full items-center justify-between border-b-2">
                        <div className="bg-slate-200 rounded-full my-2 mx-3 border border-solid border-gray-700">
                            <img className="rounded-full hidden sm:block sm:h-[100px] lg:h-[130px] lg:w-[130px]" src={item.image} alt="Doctor image" />
                        </div>
                        <div className="flex flex-col flex-1 justify-start">
                            <p className="font-semibold text-lg">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.speciality}</p>
                            <p className="font-semibold">Address :</p>
                            <p>{item.address.line1} {item.address.line2}</p>
                            <p><span className="font-semibold">Date & Time: </span>12 june 2024</p>
                        </div>
                        <div></div>

                        <div className="flex flex-col lg:flex-row gap-5 mx-6">
                            <button className="hover:scale-105 transition-all duration-300 font-semibold text-sm lg:text-base px-5 py-2 bg-slate-300 rounded-2xl">Pay Online</button>
                            <button className="hover:scale-105 transition-all duration-300 font-semibold text-sm lg:text-base px-5 py-2 bg-red-600 rounded-2xl text-white">Cancel</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default UserAppointments;