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
        <div className="flex flex-col justify-center items-center">
            {/* head   */}
            <p className="text-lg my-3 text-slate-600 font-medium underline">Browse through our trusted doctors simply by specialities.</p>
            <div className="flex flex-col items-center justify-center">

                {/* display the specialities to browse with  */}
                <div>
                    <p>General Physician</p>
                    <p>Gynecologist</p>
                    <p>Neurologist</p>
                    <p>Dermatologist</p>
                    <p>Psychiatry</p>
                    <p>Dentist</p>
                    <p>Orthopaedics</p>
                    <p>Urologist</p>
                    <p>Cardiologist</p>
                    <p>Pediatricians</p>
                    <p>Gastroenterologist</p>
                </div>
                
                {/* container for displaying all doctors/ filtered doctors  */}
                <div className="grid grid-cols-4 grid-cols-[1fr 1fr 1fr 1fr] gap-3">
                    {
                        filterDoctor.map((item,index)=>(
                            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                                <img className='bg-[#EAEFFF]' src={item.image} alt="" />
                                <div className='p-4'>
                                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
                                    </div>
                                    <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                                    <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
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