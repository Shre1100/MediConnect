import React from "react";
import { specialityData } from "../assets/assets";
import {Link} from 'react-router-dom';

const Speciality = () =>{
    return(
        <div id="speciality" className="flex flex-col items-center gap-3 py-14 text-slate-600">
            <h1 className="text-3xl md:text-4xl font-semibold">Browse by Specialities</h1>
            <p className="text-center w-1/2 text-lg">Reliable healthcare, right when you need it. Connect with trusted doctors, effortlessly.</p>
            
            {/* conatiner to browse doctors by speciality  */}
            <div className="flex sm:justify-center gap-5 pt-5 w-full overflow-scroll">
                {specialityData.map((item,index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className="flex flex-col items-center cursor-pointer flex-shrink-0 text-sm hover:translate-y-[-9px] transition-all duration-500 hover:drop-shadow-lg" key={index} to={`/doctors/${item.speciality}`}>
                        <img className="w-[4.5rem] sm-w-24 mb-2 rounded-full" src={item.image} alt="speciality image" />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>

        </div>
    );
}

export default Speciality;