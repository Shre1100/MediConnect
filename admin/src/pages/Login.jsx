import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios';
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () =>{

    const [state,setstate] = useState("Admin");

    const {setAToken, backendurl} = useContext(AdminContext);

    const {setDToken, backendUrl} = useContext(DoctorContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        try{
            if (state === 'Admin') {

                const {data} = await axios.post(backendurl + '/api/admin/login', {email,password});
                if(data.success){
                    //storing the token
                    localStorage.setItem('aToken',data.token);
                    setAToken(data.token);
                } else{
                    toast.error(data.message);
                }
                
            } else {
                const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password});
                if(data.success){
                    //storing the token
                    localStorage.setItem('dToken',data.token);
                    setDToken(data.token);
                } else{
                    toast.error(data.message);
                }
            }

        }catch(err){
            toast.error(err.message);
        }
    }



    return(
        <form onSubmit={onSubmitHandler} className="gap-5 flex flex-col items-center justify-center">
            <div className="justify-center rounded-lg flex gap-10 bg-white min-w-[320px] sm:min-w-[30rem] mt-36">
                <p onClick={()=>setstate('Admin')} className={`text-xl my-1 transition-all duration-150 py-2 cursor-pointer rounded-lg  px-4 ${state === 'Admin'? 'bg-slate-300 shadow-lg font-semibold':' hover:bg-slate-100 '}`}>Admin</p>
                <p className="text-xl my-3">|</p>
                <p onClick={()=>setstate('Doctor')} className={`text-xl my-1 transition-all duration-150 py-2 cursor-pointer rounded-lg px-4 ${state === 'Doctor'? 'bg-slate-300 shadow-lg font-semibold':' hover:bg-slate-100 '}`}>Doctor</p>
            </div>
            <div className="text-gray-700 flex flex-col gap-3 m-auto items-start p-8 min-w-[320px] sm:min-w-[30rem]  shadow-lg rounded-xl bg-white">
                <p className="text-3xl font-semibold text-black">Welcome <span> {state}</span>!</p>
                <p className="text-base">Please enter the following details to sign in.</p>
                <div className="mt-5 flex flex-col gap-2 w-full">
                    <p className="font-semibold">Email:</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border-b-2 outline-none" type="email" required />
                </div>

                <div className="mt-3 flex flex-col gap-2 w-full">
                    <p className="font-semibold">Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border-b-2 outline-none" type="password" required />
                </div>

                <button className="cursor-pointer self-center w-full mt-5 text-white text-lg font-semibold py-2 bg-[#7483bd] hover:scale-105 shadow-lg transition-all rounded-md hover:bg-[#241f35] duration-300">Sign In</button>
                {
                    state === 'Doctor'? 
                    <p>Don't have an account? <span className="text-[#7483bd] cursor-pointer">Register here</span></p>:
                    <p></p>
                }
            </div>
        </form>
    )
}

export default Login;