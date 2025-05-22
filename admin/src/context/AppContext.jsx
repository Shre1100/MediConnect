import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const calcAge = (dob) =>{
        const today = new Date();
        const birthDate = new Date(dob);
        

        let age = today.getFullYear() - birthDate.getFullYear();

        return age;
    }
    const currency = "Rs. "

    const value = {
        calcAge, currency
    }

    return(
        
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;