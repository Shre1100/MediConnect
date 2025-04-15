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
            <div>
                <div>
                <img
                    src={docInfo.image} 
                    alt="Doctor's image"
                />
                </div>

                <div></div>
            </div>
        </div>
    );
}

export default Appointment;