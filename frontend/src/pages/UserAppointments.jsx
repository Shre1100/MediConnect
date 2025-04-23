import React, { useState } from "react";

const UserAppointments = () =>{

    const [state, setState] = useState('Upcoming');

    return(
        <div className="h-[100vh] md:mx-3 lg:mx-20 bg-white flex flex-col items-center">
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
            <div>

            </div>

        </div>
    )
}

export default UserAppointments;