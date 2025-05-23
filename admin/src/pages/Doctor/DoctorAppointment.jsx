import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const DoctorAppointment = () =>{

    const {dToken, getAppointments, appointments, completeAppointment, cancelAppointment} = useContext(DoctorContext);
    const {calcAge,  currency} = useContext(AppContext);

    const months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sept", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) =>{
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])-1] + " " + dateArray[2];
    }

    useEffect(()=>{
        if(dToken){
            getAppointments();
        }

    },[dToken])

    return(
        <div className="bg-white p-5 rounded-2xl w-full mr-10">
            <p className="text-lg font-semibold">All Appointments</p>
            <div className="text-sm max-h-[85vh] overflow-y-scroll min-h-[50vh]">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_2fr] gap-2 p-2 mt-2 font-semibold text-white bg-[#7483bd] items-center border-b-2 border-b-black">
                    <p>S.no</p>
                    <p>Patient Name</p>
                    <p>Payment Method</p>
                    <p>Age</p>
                    <p>Date and Time</p>
                    <p>Fee</p>
                    <p>Action</p>
                </div>

                {appointments.reverse().map((item,index)=>(
                    <div className="flex flex-wrap justify-between hover:bg-slate-200 md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_2fr] gap-2 py-2 border-b px-2  items-center" key={index}>
                        <p className="max-sm:hidden text-center">{index+1}</p>
                        <div className="flex gap-2 items-center">
                            <img className="w-[40px] h-[40px] rounded-full" src={item.userData.image} alt="Patient image" />
                            <p>{item.userData.name}</p>
                        </div>
                        <p>{item.payment? 'Online' : 'Cash'}</p>
                        <p>{calcAge(item.userData.DOB)}</p>
                        <p>{slotDateFormat(item.slotDate)} at {item.slotTime}</p>
                        <p>{currency} {item.amount}</p>
                        {
                            item.cancelled ?
                            <p className="text-red-700 cursor-default font-bold text-center">Cancelled</p>:
                            item.isCompleted?
                            <p className="text-green-700 cursor-default font-bold text-center">Completed</p>:
                             <div className="flex gap-2">
                            <button onClick={()=>cancelAppointment(item._id)}  className="px-2 py-1 rounded-2xl bg-red-600 cursor-pointer hover:scale-105 duration-150 text-white font-semibold">Cancel</button>
                            <button  onClick={()=>completeAppointment(item._id)} className="px-2 py-1 rounded-2xl bg-green-600 cursor-pointer hover:scale-105 duration-150 text-white font-semibold">Completed</button>
                        </div>
                        }
                       
                    </div>
                ))}

            </div>

        </div>
    )
}

export default DoctorAppointment;