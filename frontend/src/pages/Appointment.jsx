import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Appointment = () =>{

    const {docId} = useParams();
    const {doctors, curr} = useContext(AppContext);

    const [docInfo, setDocInfo] = useState(null);
    // for appointment slot booking 
    const [slots, setSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const fetchDocInfo = async ()=>{
        const docinfo = doctors.find((doc) => doc._id === docId);
        // console.log(docinfo)
        setDocInfo(docinfo);
        // console.log(docInfo);
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
                let formattedTime = currdate.toLocaleTimeString([], {hour: '2-digit', digit: '2-digit'});
                //add slots to arr
                timeslots.push({
                    datetime: new Date(currdate),
                    time: formattedTime
                })

                currdate.setMinutes(currdate.getMinutes()+30);
            }
            setSlots(prev => ([...prev,timeslots]));
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

    useEffect(()=>{
        console.log(slots);
    },[slots]);

    if (!docInfo) {
        return <div>Doctor not found or unavailable.</div>;
      }

    return docInfo &&(
        <div>
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
                        <p className="text-center md:text-lg xl:mb-2">{docInfo.about}</p>
                    </div>
                    <p className="p-2 lg:text-[1.01rem] text-center font-semibold bg-green-300 border border-solid border-green-600 py-2 text-sm md:text-md md:w-1/3 w-1/2 lg:w-1/4 rounded-xl">Consultation Fee : {curr}<span>{docInfo.fees}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Appointment;