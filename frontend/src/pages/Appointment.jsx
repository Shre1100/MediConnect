import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { doctors } from "../assets/assets";

const Appointment = () =>{

    const {docId} = useParams();
    // const {doctors} = useContext(AppContext);

    const [docInfo, setDocInfo] = useState("doc1");

    const fetchDocInfo = async ()=>{
        // console.log(docId)
        // console.log(doctors);
        // console.log(docInfo);
        const docinfo = doctors.find((doc) => doc._id === docId);
        // console.log(docinfo)
        setDocInfo(docinfo);
        // console.log(docInfo);
    }

    useEffect(()=>{
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    },[doctors,docId])

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
                </div>
            </div>
        </div>
    );
}

export default Appointment;