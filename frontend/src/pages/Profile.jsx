import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () =>{
    const {userData, setUserData, token, backendurl, loadUserProfile} = useContext(AppContext);
    const [edit, setEdit] = useState(false);
    const [image, setImage] = useState(false);

    const updateUserProfile = async () =>{
        try {
            const formData = new FormData();
            formData.append('name',userData.name)
            formData.append('phone',userData.phone)
            formData.append('address',JSON.stringify(userData.address))
            formData.append('gender',userData.gender)
            formData.append('DOB',userData.DOB)

            image && formData.append('image',image);

            const {data} = await axios.post(backendurl + '/api/user/update-profile',formData, {headers:{token}});
            if(data.success){
                toast.success(data.message);
                await loadUserProfile();
                setImage(false);
                setEdit(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    


    return userData && (
        <div className="h-[82vh]">
            <div className="h-[15vh] md:h-[15vh] lg:h-[30vh] bg-primary"></div>
            <div className="mt-[-20%] md:mt-[-8%] flex flex-col md:flex-row gap-5 ">
                <div className="shadow-lg w-[150px] h-[180px] bg-white ml-3 p-3 flex flex-col items-center lg:ml-5 lg:h-[320px] md:h-[200px] md:w-1/4">
                    {
                        edit?
                        <label htmlFor="image">
                            <div className="bg-primary inline-block relative cursor-pointer rounded-lg">
                                <img className="w-36 rounded opacity-75 lg:w-[200px] lg:max-h-[200px] max-h-[150px]" src={image ? URL.createObjectURL(image): userData.image} alt="" />
                                <img className="w-10 absolute bottom-3 right-3" src={image ? "" : assets.upload_icon} alt="" />
                            </div>

                            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
                            
                        </label>:
                        <img className="lg:max-h-[200px] max-h-[150px] lg:max-w-[200px] rounded-full" src={userData.image} alt="user profile picture" />
                    }
                    
                    {edit ?
                    <input className="outline-none border-b-2 w-full text-center lg:text-2xl border-gray-700" onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} value={userData.name} type="text"/>
                    :
                    <p className="lg:text-2xl font-semibold m-3">{userData.name}</p>
                    }

                </div>

                <div className="bg-white shadow-lg ml-3 md:ml-0 mr-5 md:w-3/4  flex flex-col items-start p-6">
                    <h2 className="md:text-xl font-semibold text-gray-700">Account Settings</h2>
                    <hr className="border-solid border w-full border-gray-800"/>
                    <div className="flex flex-col justify-start items-start">
                        <p className="text-gray-700 my-3 underline">Contact Information</p>
                        <div className="flex gap-3">
                            <p className="font-semibold">Email Id:</p>
                            <p>{userData.email}</p>
                        </div>

                        <div className="flex gap-3">
                            <p className="font-semibold">Phone:</p>
                            {edit ?
                                <input className="outline-none border-b-2 border-gray-800" onChange={e => setUserData(prev => ({...prev, phone:e.target.value}))} value={userData.phone} type="text"/>
                                :
                                <p>{userData.phone}</p>
                            }
                        </div>

                        <div className="flex gap-3">
                            <p className="font-semibold">Address:</p>
                            {edit?
                            <p>
                                <input className="outline-none border-b-2 border-gray-800" onChange={(e)=>setUserData(prev=>({...prev, address: {...prev,line1: e.target.value}}))} value={userData.address.line1} type="text" /><br />
                                <input className="outline-none border-b-2 border-gray-800" onChange={(e)=>setUserData(prev=>({...prev, address: {...prev,line2: e.target.value}}))} value={userData.address.line2} type="text" />
                            </p>
                            :
                            <p>{userData.address?.line1} <br /> {userData.address?.line2}</p>
                            }
                        </div>

                        <div className="cursor-default flex flex-col">
                            <p className="text-gray-700 my-3 underline">Basic Information</p>
                            <div className="flex gap-3">
                                <p className="font-semibold">Gender:</p>
                                {edit?
                                <select className="bg-gray-200" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>:
                                <p>{userData.gender}</p>}
                                
                            </div>
                            <div className="flex gap-3 mt-2">
                                <p className="font-semibold">DOB:</p>
                                {edit?
                                <input className="bg-gray-200" type='date' onChange={(e) => setUserData(prev => ({ ...prev, DOB: e.target.value }))} value={userData.DOB}/>:
                                <p>{userData.DOB}</p>}
                                
                            </div>
                        </div>
                        <div>
                            {
                                edit
                                ? <button className="py-2 hover:bg-[#241f35] px-10 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold  my-10 bg-primary rounded-2xl" onClick={updateUserProfile}>Save Changes</button>
                                : <button className="py-2 hover:bg-[#241f35] px-10 text-[1rem] text-white hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold  my-10 bg-primary rounded-2xl" onClick={()=>setEdit(true)}>Edit Information</button>
                            }
                        </div>

                    </div>
                </div>
            </div>
            <hr className="border-b border-solid border-gray-600 my-10"/>

        </div>
    )
}

export default Profile;