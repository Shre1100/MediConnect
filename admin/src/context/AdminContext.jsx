import { createContext, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) =>{

    const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'): ''); 

    // for storing doctors data 
    const [doctors, setDoctors] = useState([])

    const backendurl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () =>{
        try{
            const {data} = await axios.post(backendurl + "/api/admin/all-doctors",{},{headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors);
                console.log(data.doctors);
            }else{
                toast.error(data.message);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    // funtion for doctors to change their availability 
    const changeAvailability =  async (docId) => {
        try {
            const {data} = await axios.post(backendurl + "/api/admin/change-availability",{docId}, {headers:{aToken}});
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        aToken,setAToken,
        backendurl, doctors,
        getAllDoctors, changeAvailability
    }

    return(
        
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;