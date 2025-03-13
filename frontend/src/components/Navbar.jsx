import React from "react";
import {assets} from '../assets/assets';
import { NavLink } from "react-router-dom";

const Navbar = () =>{
    return(
        <div className="flex bg-white items-center justify-between mt-2 rounded-lg text-sm py-4 pr-7 mb-5 border-b border-b-gray-400 h-[100px] shadow-lg shadow-slate-900/20 shadow-b-3 shadow-r-[3px] -shadow-spread-2">
          <img className="h-[80px]" src={assets.logo} alt="mediConnect logo" />  
          <ul>
            <NavLink>
                <li>Home</li>
                <hr />
                <li>Doctors</li>
                <hr />
                <li>About Us</li>
                <hr />
                <li>Contact</li>
                <hr />
            </NavLink>
          </ul>
          <div>
            <button>Login/Sign Up</button>
          </div>
        </div>
    );
}

export default Navbar;