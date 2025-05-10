import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false);

    const curr = 'Rs. ';

    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([])

    // calling the api 

    const getDoctorsData = async () =>{
        try {
            const {data} = await axios.get(backendurl + '/api/doctor/list');
            if(data.success){
                setDoctors(data.doctors);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        doctors, curr,
        token, setToken,
        backendurl
    }

    useEffect(()=>{
        getDoctorsData();
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;