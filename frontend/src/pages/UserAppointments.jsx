import React, { useContext, useEffect, useState } from "react";
import {AppContext} from '../context/AppContext';
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const UserAppointments = () =>{

    const [state, setState] = useState('Upcoming');

    const [completedAppointments, setCompletedAppointments] = useState([]);

    const {backendurl,getDoctorsData, token} = useContext(AppContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);

    const months = ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sept", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) =>{
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])-1] + " " + dateArray[2];
    }

    const getUserAppointments = async () => {
        try {
            const {data} = await axios.get(backendurl + "/api/user/appointments", {headers:{token}});

            if(data.success){
                
                const completed = data.appointments.filter(item => item.isCompleted).reverse();
                const upcoming = data.appointments.filter(item => !item.isCompleted);
                setCompletedAppointments(completed.reverse());
                setAppointments(upcoming.reverse());
                // console.log(completedAppointments);
                // console.log(appointments)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appointmentId) => {
       try {
        const {data} = await axios.post(backendurl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}});

        if(data.success) {
            toast.success(data.message);
            getUserAppointments();
            getDoctorsData();

        }else{
            toast.error(data.message)
        }
        
       } catch (error) {
            console.log(error);
            toast.error(error.message);
       } 
    }


    const displayAppointments = () => {
        const appointmentsToDisplay = state === 'Upcoming' ? appointments : completedAppointments;

        return appointmentsToDisplay.map((item, index) => (
            <div key={index} className="flex w-full items-center justify-between border-b-2">
                <div className="bg-slate-200 rounded-full my-2 mx-3 border border-solid border-gray-700">
                    <img className="rounded-full hidden sm:block sm:h-[100px] lg:h-[130px] lg:w-[130px]" src={item.docData ? item.docData.image : ''} alt="Doctor image" />
                </div>
                <div className="flex flex-col flex-1 justify-start">
                    <p className="font-semibold text-lg">{item.docData ? item.docData.name : 'Doctor Name Unavailable'}</p>
                    <p className="text-sm text-gray-600">{item.docData ? item.docData.speciality : 'Speciality Unavailable'}</p>
                    <p className="font-semibold">Address :</p>
                    <p>{item.docData ? `${item.docData.address.line1} ${item.docData.address.line2}` : 'Address Unavailable'}</p>
                    <p><span className="font-semibold">Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                </div>
                <div></div>

                <div className="flex items-center flex-col lg:flex-row gap-5 mx-6">
                    {!item.cancelled && item.payment && <button className="font-semibold text-sm lg:text-base px-5 py-2 bg-slate-300 rounded-2xl">Pre-Paid</button>}
                    {!item.cancelled && !item.payment && state === 'Upcoming' && <button onClick={()=>payOnline(item._id)} className="hover:scale-105 transition-all duration-300 font-semibold text-sm lg:text-base px-5 py-2 bg-slate-300 rounded-2xl">Pay Online</button>}
                    {!item.cancelled && !item.payment && state === 'Upcoming' ?
                        <button onClick={() => cancelAppointment(item._id)} className="hover:scale-105 transition-all duration-300 font-semibold text-sm lg:text-base px-5 py-2 bg-red-600 rounded-2xl text-white">Cancel</button> :
                        <div></div>
                    }
                    {item.cancelled && <button className=" border border-gray-500 text-gray-400 cursor-not-allowed hover:text-red-600 px-3 py-2 max-w-32 lg:max-w-48">Appointment Cancelled</button>}
                    {state === 'Completed' && <span className="text-green-500 font-semibold">Completed</span>}
                </div>
            </div>
        ));
    };

    const payOnline = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendurl + '/api/user/online-payment', {appointmentId}, {headers:{token}})
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(token){
            getUserAppointments();
        }
    },[token])



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
                displayAppointments()
                }
            </div>

        </div>
    )
}

export default UserAppointments;