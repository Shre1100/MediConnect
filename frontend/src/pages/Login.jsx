import React, { useState } from "react";

const Login = () =>{

    const [state, setState] = useState('Sign Up'); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();
    }

    const handleClick = () =>{
        if(state === 'Sign Up' ){
            setState('Login');
        }else{
            setState('Sign Up');
        }
    }

    return(
        <div className="">
            <form className="min-h-[83vh] flex justify-center items-center" action="">
                <div className="bg-white flex flex-col gap-3 m-auto items-start p-8 min-w-[350px] sm:min-w-96 md:w-[400px] border rounded-lg text-black text-sm shadow-xl">
                    <p className="text-2xl lg:text-3xl font-semibold">{state === 'Sign Up' ? "Let's get Started" : "Welcome Back!"}</p>
                    <p className="text-gray-700 lg:text-sm pb-7">{state === 'Sign Up'? 
                    "Get ready to experience a simpler way to manage your health. From finding the right doctor to booking appointments in seconds, you're just a few clicks away from a more convenient healthcare experience. Let's explore!"
                    :"We're happy to have you here. Your appointments and healthcare management are just a click away."}</p>

                    {state === 'Sign Up' &&
                        <div className="w-full">
                        <p className="font-semibold pb-2 text-base text-gray-800">Full Name</p>
                        <input className="border-b-2 border-gray-700 w-full outline-none" required onChange={(e)=>setName(email.target.name)} type="text" value={name} name="" id="" />
                    </div>
                    }
                    

                    <div className="w-full">
                        <p className="font-semibold pb-2 text-base text-gray-800">Email</p>
                        <input className="border-b-2 border-gray-700 w-full outline-none" required onChange={(e)=>setEmail(email.target.email)} type="email" value={email} name="" id="" />
                    </div>

                    <div className="w-full">
                        <p className="font-semibold pb-2 text-base text-gray-800">Password</p>
                        <input className="border-b-2 border-gray-700 w-full outline-none" required onChange={(e)=>setPassword(email.target.password)} type="password" value={password} name="" id="" />
                    </div>

                    <button className=" bg-primary p-2 md:p-3 w-full text-base font-bold text-white hover:scale-105 shadow-lg transition-all rounded-md hover:bg-[#241f35] duration-300">{state === 'Sign Up'? "Create Account" : "Login"}</button>
                    <p>{state === 'Sign Up'? "Already have an account?":"Don't have an account?"} <span onClick={handleClick} className="cursor-pointer text-primary underline">{state==='Sign Up'?"Login":"Sign Up"}</span></p>
                </div>
            </form>
            
        </div>
    )
}

export default Login;