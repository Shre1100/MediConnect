import React from "react";

function Notification(props){
    return props.isvisible &&(
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-200 text-green-800 p-4 rounded-md shadow-lg z-50">
        {props.message}
        </div>
    );
}

export default Notification;