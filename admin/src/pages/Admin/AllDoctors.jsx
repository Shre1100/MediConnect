import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";


const AllDoctors = () =>{

    const {doctors, aToken, getAllDoctors} = useContext(AdminContext);

    useEffect(()=>{
        if(aToken){
            getAllDoctors();
        }

    },[aToken]);

    return(
        // displaying all doctors list 
        <div className="flex flex-col items-start bg-white w-full mr-10 rounded-xl p-5 min-h-[90vh] gap-10">
            <h1 className="underline text-lg font-semibold px-5 md:text-xl">Doctors List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-cols-[1fr 1fr 1fr 1fr] gap-3 ">
                {doctors.map((item,index)=>(
                    <div className="hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-200 bg-slate-200 p-3 rounded-lg flex flex-col" key={index}>
                      <img className=" bg-white rounded-lg mb-2" src={item.image} alt="" />  
                      <p className="text-gray-800 text-base font-semibold">{item.name}</p>
                      <p className="mb-5 text-gray-700 text-sm">{item.speciality}</p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}


export default AllDoctors;