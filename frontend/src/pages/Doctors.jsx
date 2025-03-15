import React, { useContext } from "react";
import {useParams} from "react-router-dom";

const Doctors = () => {
    const {speciality} = useParams();

    // const {doctors} = useContext(AppContext);
    return(
        <div>
            <p>Here is the list of all trusted Doctors.<br/>You can simply search by applying filters.</p>
        </div>
    )
}

export default Doctors;