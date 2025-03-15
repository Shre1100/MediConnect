import React from "react";
import {useNavigate} from "react-router-dom";

const CreateAccount = () =>{
    const navigate = useNavigate();
    return(
        <div className="bg-white rounded-xl flex px-6 sm:px-10 md:px-14 lg:px-12 my-10 md:mx-10 items-center gap-5">
            {/* left container with button  */}
            <div className="w-1/4 lg:w-1/3 flex items-center justify-center">
                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-primary text-sm sm:text-base text-white px-8 py-2 rounded-2xl font-semibold hover:scale-105 hover:translate-y-[-5px] transition-all drop-shadow-lg hover:font-bold ">Create Account</button>
            </div>

            {/* right container with the content.  */}
            <div className="flex-1 py-8 sm:py-10 md:py-14 lg:py-18">
                <p className="text-primary font-semibold text-xl md:text-3xl lg:text-4xl">Tech-powered appointments for a healthier you.</p>
                <p className="mt-4 text-primary text-lg md:text-xl lg:text-2xl">Now your next appointment is just a click away with <strong className="underline">mediConnect</strong>.</p>
            </div>
        </div>
    );
}

export default CreateAccount;