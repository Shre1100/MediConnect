import React from "react";

const UserAppointments = () =>{
    return(
        <div className="mx-20 bg-slate-200 flex flex-col items-center">
            <div className="flex justify-center items-center my-5">
                <h2 className="font-semibold text-3xl">My Appointments</h2>
            </div>
            <div className="flex bg-white w-full my-5 items-center justify-center gap-10">
                <div>
                    <p className="text-xl">Upcoming</p>
                </div>
                <p>|</p>
                <div>
                    <p className="text-xl">Completed</p>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default UserAppointments;