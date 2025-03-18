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
            <div className="flex flex-col items-center justify-center ">

                {/* display the specialities to browse with  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5 my-3">
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">General Physician</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Gynecologist</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Neurologist</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Dermatologist</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Psychiatry</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Dentist</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Orthopaedics</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Urologist</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Cardiologist</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Pediatricians</p>
                    <p className="py-1 px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950">Gastroenterologist</p>
                </div>
                
                {/* container for displaying all doctors/ filtered doctors  */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-cols-[1fr 1fr 1fr 1fr 1fr] gap-3">
                    {
                        filterDoctor.map((item,index)=>(
                            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className=' border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                                <img className='bg-white h-[300px] lg:h-auto' src={item.image} alt="" />
                                <div className='p-4 bg-slate-300'>
                                    <div className={`flex text-sm text-center ${item.available ? 'text-green-500 drop-shadow-lg' : "text-gray-500"}`}>
                                        <div className="py-2 px-2 border flex items-center gap-2 rounded-2xl bg-[#f4f2f2]">
                                        <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                                        <p>{item.available ? 'Available' : "Not Available"}</p>
                                        </div>
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