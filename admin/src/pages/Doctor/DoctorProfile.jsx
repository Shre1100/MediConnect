import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () =>{

    const {dToken, getProfileDocData, profileData, setProfileData, backendUrl} = useContext(DoctorContext);
    const {currency} = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                summary: profileData.summary,
                fee : profileData.fee,
                available : profileData.available
            }

            const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}});
            if(data.success){
                toast.success(data.message);
                setIsEdit(false);
                getProfileDocData();
            }else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(dToken){
            getProfileDocData();
        }

    },[dToken]);

    return profileData && (
        <div className="mr-10 w-full bg-white rounded-2xl min-h-[86vh] p-5">
            <div>
                <div className="flex gap-5 bg-slate-200 rounded-2xl items-center">
                    <img className="h-32 rounded-full bg-white m-2" src={profileData.image} alt="Profile Picture" />
                    <p className="text-2xl font-semibold">{profileData.name}</p>
                    <div className="ml-auto gap-2 w-[300px] flex flex-col">
                        {
                        isEdit?
                        <button className="ml-auto md:mr-20 mr-5 px-4 py-2 bg-white rounded-3xl cursor-pointer hover:scale-105 hover:bg-[#7483bd] hover:text-white font-semibold duration-200" onClick={updateProfile}>Save Changes</button>:
                        <button className="ml-auto md:mr-20 mr-5 px-4 py-2 bg-white rounded-3xl cursor-pointer hover:scale-105 hover:bg-[#7483bd] hover:text-white font-semibold duration-200" onClick={()=>setIsEdit(true)}>Edit Profile</button>
                        }
                        {
                            isEdit && <p className="text-wrap text-xs font-semibold px-3 py-1 rounded-2xl bg-amber-300 mb-[-35px]">You can now edit your summay, address, Consultation fee and Availability status</p>
                        }

                    </div>
                    
                    
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <p className="text-lg font-semibold w-full border-b">Personal Details</p>
                    <p className="text-base my-1 font-semibold">Email address : <span className="font-normal text-slate-500 px-3 bg-slate-200 py-1 rounded-lg cursor-not-allowed">{profileData.email}</span></p>

                    <div className="flex gap-3">
                        <p className="text-base my-1 font-semibold">Address : </p>
                        
                        <div className="flex flex-col gap-1">
                            
                            {isEdit?
                            <input type="text" className="border-2 bg-slate-200 rounded-md drop-shadow-xl px-2" value={profileData.address.line1} onChange={(e)=>setProfileData(prev=>({...prev, address:{...prev.address,line1:e.target.value}}))}/>
                            :<p>{profileData.address?.line1}</p>
                            }

                            {isEdit?
                            <input type="text" className="border-2 bg-slate-200 rounded-md drop-shadow-xl px-2" value={profileData.address.line2} onChange={(e)=>setProfileData(prev=>({...prev, address:{...prev.address,line2:e.target.value}}))}/>
                            :<p>{profileData.address?.line2}</p>
                            }
                            
                            
                        </div>
                        
                        
                    </div>
                    <div>
                        <p className="text-base my-1 font-semibold">Summary : </p>
                        {
                            isEdit? 
                            <textarea type="text" className="w-full h-20 text-wrap border-2 bg-slate-200 rounded-md drop-shadow-xl px-2" value={profileData.summary} onChange={(e)=>setProfileData(prev=>({...prev, summary: e.target.value}))} />
                            :<p className="font-normal my-2 px-3 bg-slate-200 py-3 rounded-lg">{profileData.summary}</p>
                        }
                        
                    </div>
                    
                </div>

                <div className="flex flex-col gap-2 my-2">
                    <p className="text-lg font-semibold w-full border-b">Professional Information</p>
                    <p className="text-base font-semibold">Degree : <span className="font-normal px-3 py-1 rounded-lg">{profileData.degree}</span></p>
                    <p className="text-base font-semibold">Speciality : <span className="font-normal px-3 py-1 rounded-lg">{profileData.speciality}</span></p>
                    <p className="text-base font-semibold">Experience : <span className="font-normal px-3 py-1 rounded-lg">{profileData.experience}</span></p>
                    <p className="text-base font-semibold">Consultation Fee : <span className="font-normal px-3 py-1 rounded-lg">{currency}{isEdit? <input className="border-2 bg-slate-200 rounded-md drop-shadow-xl" type="number" value={profileData.fee} onChange={(e)=>setProfileData(prev=>({...prev, fee:e.target.value}))} /> : profileData.fee}</span></p>
                    <div className="flex gap-2">
                        <p className="text-base font-semibold">Available</p>
                        <input onChange={()=> isEdit && setProfileData(prev=>({...prev, available: !prev.available}))} className="cursor-pointer" checked={profileData.available} type="checkbox" />
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default DoctorProfile;