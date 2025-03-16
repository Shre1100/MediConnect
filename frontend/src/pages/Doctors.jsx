import React, { useContext, useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {assets, specialityData, doctors} from "../assets/assets";
// import {AppContext} from '../context/AppContext';
import { useNavigate } from "react-router-dom";

const Doctors = () => {
    const navigate = useNavigate();
    const {speciality} = useParams();
    const [filterDoctor, setfilterDoctor] = useState([]);
    // const {doctors} = useContext(AppContext);

    const appyfilter = () =>{
        if(speciality){
            setfilterDoctor(doctors.filter(doc = doc.speciality === speciality))
        } else {
            setfilterDoctor(doctors);
        }
    }

    useEffect(()=>{
        appyfilter()
    }, [doctors,speciality])

    return(
        <div>
            {/* head   */}
            <p>Here is the list of all trusted Doctors.<br/>You can simply search by applying filters.</p>
            <div>

                {/* display the specialities to browse with  */}
                <ul>
                    {specialityData.map((item,index)=>(
                        <li key={index}>{item.speciality}</li>
                    ))}
                </ul>
                
                {/* container for displaying all doctors/ filtered doctors  */}
                <div className="grid grid-cols-4 grid-cols-[1fr 1fr 1fr 1fr] gap-3">
                    {
                        filterDoctor.map((item,index)=>(
                            <div className="flex flex-col ">
                                <img className="bg-white" src={item.image} alt="doctor's image" />
                                <div onClick={()=>navigate(`/appointment/${item._id}`)} className="border-t-0 border-l-2 border-r-2 border-b-2 border-slate-300 bg-slate-200">
                                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                        <p className="w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
                                    </div>
                                    <p className="text-gray-900 text-lg font-medium">
                                    {item.name}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {item.speciality}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Doctors;