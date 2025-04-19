import React, { useContext, useEffect, useState } from "react";
import {AppContext} from '../context/AppContext';
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
    const {speciality} = useParams();

    const [filterDoctor, setfilterDoctor] = useState([]);
    const [showopt,setshowopt] = useState(false);
    const {doctors} = useContext(AppContext);

    const navigate = useNavigate();

    const applyfilter = () =>{
        if(speciality){
            setfilterDoctor(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setfilterDoctor(doctors)
        }
    }

    useEffect(()=>{
        applyfilter()
    }, [doctors,speciality])

    return(
        <div className="flex flex-col justify-center items-center">
            {/* head   */}
            <div className="flex flex-col gap-3 items-center">
                <p className="text-lg my-3 text-slate-600 font-medium lg:text-2xl">Browse through our trusted doctors simply by specialities.</p>
                <button onClick={()=>{showopt? setshowopt(false) : setshowopt(true)}} className={showopt?"bg-gray-300 text-gray-500 transition-all duration-75 px-5 py-1 text-md font-medium border border-solid border-gray-400 w-[25%] my-3":"bg-[white] px-5 py-1 text-md font-medium text-slate-800 border drop-shadow-md w-[25%] my-3"}>Filters</button>
            </div>
            
            <div className="flex flex-col items-center justify-center ">

                {/* display the specialities to browse with  */}
                <div className= { (showopt) ? "  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5 my-4 bg-white p-6 rounded-lg border border-solid border-gray-400" : "hidden"}>
                    <p onClick={()=>speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General Physician')} className={`"text-center py-1 cursor-pointer px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950" ${speciality === 'General Physician' ? 'text-black bg-white':''}`}>General Physician</p>
                    <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`"text-center py-1 px-3 cursor-pointer border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 "${speciality === 'Gynecologist' ? 'text-black bg-white':''}`}>Gynecologist</p>
                    <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`"text-center py-1 px-3 cursor-pointer border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Neurologist' ? 'text-black bg-white':''}`}>Neurologist</p>
                    <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`" text-center py-1 cursor-pointer px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Dermatologist' ? 'text-black bg-white':''}`}>Dermatologist</p>
                    <p onClick={()=>speciality === 'Psychiatry' ? navigate('/doctors'): navigate('/doctors/Psychiatry')} className={`" text-center py-1 px-3 cursor-pointer border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Psychiatry' ? 'text-black bg-white':''}`}>Psychiatry</p>
                    <p onClick={()=>speciality === 'Dentist' ? navigate('/doctors'): navigate('/doctors/Dentist')} className={`"py-1 text-center px-3 border cursor-pointer rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Dentist' ? 'text-black bg-white':''}`}>Dentist</p>
                    <p onClick={()=>speciality === 'Orthopaedics' ? navigate('/doctors'): navigate('/doctors/Orthopaedics')} className={`"py-1 text-center cursor-pointer px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Orthopaedics' ? 'text-black bg-white':''}`}>Orthopaedics</p>
                    <p onClick={()=>speciality === 'Urologist' ? navigate('/doctors'): navigate('/doctors/Urologist')} className={`"py-1 px-3 text-center  cursor-pointer border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Urologist' ? 'text-black bg-white':''}`}>Urologist</p>
                    <p onClick={()=>speciality === 'Cardiologist' ? navigate('/doctors'): navigate('/doctors/Cardiologist')} className={`"py-1 text-center cursor-pointer px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Cardiologist' ? 'text-black bg-white':''}`}>Cardiologist</p>
                    <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`"py-1 text-center cursor-pointer px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Pediatricians' ? 'text-black bg-white':''}`}>Pediatricians</p>
                    <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`"py-1 text-center  cursor-pointer px-3 border rounded-md bg-slate-200 drop-shadow-lg border-slate-500 text-md text-slate-950 " ${speciality === 'Gastroenterologist' ? 'text-black bg-white':''}`}>Gastroenterologist</p>
                </div>
                
                {/* container for displaying all doctors/ filtered doctors  */}
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 grid-cols-[1fr 1fr 1fr 1fr 1fr] gap-3">
                    {
                        filterDoctor.map((item,index)=>(
                            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='my-3 border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[101%]' key={index}>
                                <img className='bg-white h-[300px] w-[100%] lg:h-auto' src={item.image} alt="" />
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