import React, { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from 'axios';


const Appointment = () =>{

    const {docId} = useParams();
    const {doctors, curr, backendurl, getDoctorsData, token} = useContext(AppContext);
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    // for appointment slot booking 
    const [slots, setSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = async ()=>{
        const docinfo = doctors.find((doc) => doc._id === docId);
        // console.log(docinfo)
        setDocInfo(docinfo);
        console.log(docInfo);
    }

    const getSlots = async ()=>{
        setSlots([]);
        //getting current date
        let today = new Date();
        for(let i = 0; i<7; i++){
            let currdate = new Date(today);
            currdate.setDate(today.getDate() + i);
            //Set end time of the particular day with index
            let endTime = new Date();
            endTime.setDate(today.getDate()+i);
            endTime.setHours(21,0,0,0)

            //setHours
            if(today.getDate() === currdate.getDate()){
                currdate.setHours(currdate.getHours()>10? currdate.getHours() + 1 : 10);
                currdate.setMinutes(currdate.getMinutes()>30? 30 : 0);
            } else{
                currdate.setHours(10);
                currdate.setMinutes(0)
            }
            let timeslots = [];
            while(currdate < endTime){
                let formattedTime = currdate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

                let day = currdate.getDate();
                let month = currdate.getMonth() + 1;
                let year = currdate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTime = formattedTime;

                const isAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

                if (isAvailable){
                    //add slots to arr
                timeslots.push({
                    datetime: new Date(currdate),
                    time: formattedTime
                })
                }
                

                currdate.setMinutes(currdate.getMinutes() + 30);
            }
            setSlots(prev => ([...prev,timeslots]));
        }
}

const bookAppointment = async () =>{
    if (!token) {
        toast.warn("Sign in to book an appointment");
        return navigate('/login');
    }

    try {
        const date = slots[slotIndex][0].datetime
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year
        // console.log(slotDate);

        const {data} = await axios.post(backendurl + '/api/user/book-appointment',{docId, slotDate, slotTime}, {headers:{token}});
        if(data.success){
            toast.success(data.message);
            getDoctorsData();
            navigate('/userAppointments')
        }else{
            toast.error(data.message);
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}
    useEffect(()=>{
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    },[doctors,docId])

    useEffect(()=>{
        getSlots();
    },[docInfo])


    if (!docInfo) {
        return <div>Doctor not found or unavailable.</div>;
      }

    return docInfo &&(
        <div className="mb-5">
            {/* Details of the selected doctor  */}
            <div className="flex flex-col gap-5 lg:gap-2 items-center md:mt-12 xl:flex-row">
                <div className="rounded-full bg-slate-300 mx-[4.3rem] drop-shadow-2xl xl:w-[60%] lg:mx-5">
                    <img className="w-fit h-fit rounded-full"
                        src={docInfo.image} 
                        alt={docInfo.name + " image"}/>
                </div>

                <div className="flex flex-col gap-5 xl:border xl:border-solid xl:border-gray-500 xl:p-4 xl:bg-gray-200 xl:rounded-lg">
                    {/* Information of the selected doctor */}
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-semibold text-center md:text-2xl">{docInfo.name}</h2>
                        <div className="text-center">
                            <p className="text-gray-600 md:text-lg">{docInfo.degree} - {docInfo.speciality}</p>
                            <div className="flex justify-center"><p className="text-gray-600 md:text-lg border border-solid border-gray-400 w-20 rounded-2xl">{docInfo.experience}</p></div>

                        </div>
                    </div>

                    {/* about doctor */}
                    <div className="flex-col flex justify-center items-center border border-solid border-[#7483bd] rounded-lg bg-gray-100 p-3 xl:drop-shadow-md">
                        <p className="font-semibold text-lg md:text-xl md:my-2">ABOUT</p>
                        <p className="text-center md:text-lg xl:mb-2">{docInfo.summary}</p>
                    </div>
                    <p className="p-2 lg:text-[1.01rem] text-center font-semibold bg-green-300 border border-solid border-green-600 py-2 text-sm md:text-md md:w-1/3 w-1/2 lg:w-1/4 rounded-xl">Consultation Fee : {curr}<span>{docInfo.fee}</span></p>
                </div>
            </div>

            {/* slot booking options  */}

            <div className="w-full flex items-center flex-col md:flex-row sm:ml-2 lg:ml-11 mt-4 font-medium text-gray-700">
                <p className="lg:text-lg mb-3 mr-5 xl:mr-24">Available Appointment Slots : </p>
                <div className="lg:w-[75%] flex flex-col items-start">
                    <div className="flex gap-5 lg:gap-10 justify-center items-center">
                        {/* for day and  date display  */}
                        {slots.length && slots.map((item,idx)=>{return(
                            <div className="flex flex-col justify-center items-center gap-3" key={idx}>
                                <p className="text-gray-900">{item[0] && days[item[0].datetime.getDay()]}</p>
                                <div onClick={()=> setSlotIndex(idx)} className={` cursor-pointer text-black border border-solid border-black p-2 lg:p-4 rounded-full h-1/2 ${slotIndex === idx? 'bg-primary text-white border-purple-600 font-bold duration-100 drop-shadow-md translate-y-[-5px] transition-none ease-linear' : 'bg-slate-200 hover:bg-slate-300 hover:border-2'}`}>
                                    <p>{item[0] && item[0].datetime.getDate()}</p>
                                </div>
                            </div>
                        )})}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3 overflow-x-scroll">
                        {slots.length && slots[slotIndex].map((item,idx)=>{
                            return(
                                <p onClick={()=>setSlotTime(item.time)} className={`flex-shrink-0 cursor-pointer border border-solid border-gray-600 px-2 py-1 rounded-lg ${item.time === slotTime? 'bg-primary text-white font-bold': 'hover:bg-slate-200'}`} key={idx}>
                                    {item.time.toLowerCase()}
                                </p>
                            )
                        })}
                    </div>

                    <div className="my-8">
                        <button onClick={bookAppointment} className="bg-primary hover:font-semibold hover:scale-105 hover:translate-y-[-5px] transition-all text-white px-7 rounded-lg py-2">Book Now</button>
                    </div>
                </div>

            </div>
            <hr className="border border-solid border-gray-400 mx-8" />
        </div>
    );
}

export default Appointment;