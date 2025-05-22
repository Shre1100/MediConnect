import React, { useContext, useState } from "react";
import {assets} from '../assets/assets';
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () =>{

  const navigate = useNavigate();

  // for change in login button when user logs in 
  const [menu, setMenu] =  useState(false);
  const {token, setToken, userData} = useContext(AppContext);

  const logout = () =>{
    setToken(false);
    localStorage.removeItem('token');
  }

    return(
        <div className=" flex bg-white items-center justify-between mt-2 rounded-lg text-sm py-4 md:pr-7 mb-5 border-b border-b-gray-400 h-[60px] shadow-lg shadow-slate-900/20 shadow-b-3 shadow-r-[3px] -shadow-spread-2">
          <NavLink to='/'><img className="h-[50px] md:h-[60px] cursor-pointer w-44" src={assets.logo} alt="mediConnect logo" /> </NavLink>
          <div className="flex gap-14 items-center">
          <ul className="hidden md:flex justify-evenly gap-14 items-start font-semibold">
            {/* navigation links in the navbar  */}
            <NavLink to='/'>
                <li className="py-1 text-[1.04rem] rounded-md hover:shadow-xl hover:scale-100 transition-all hover:bg-slate-200 px-2">Home</li>
                <hr className="border-none outline-none h-0.5 bg-primary mt-1 m-auto hidden"/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className="py-1 text-[1.04rem] rounded-md hover:shadow-xl hover:scale-100 transition-all hover:bg-slate-200 px-2">Doctors</li>
                <hr className="border-none outline-none h-0.5 bg-primary mt-1 m-auto hidden"/>
            </NavLink>
            <NavLink to='/about'>
                <li className="py-1 text-[1.04rem] rounded-md hover:shadow-xl hover:scale-100 transition-all hover:bg-slate-200 px-2">About Us</li>
                <hr className="border-none outline-none h-0.5 bg-primary mt-1 m-auto hidden"/>
            </NavLink>
            <NavLink to='/contact'>
                <li className="py-1 text-[1.04rem] rounded-md hover:shadow-xl hover:scale-100 transition-all hover:bg-slate-200 px-2">Contact</li>
                <hr className="border-none outline-none h-0.5 bg-primary mt-1 m-auto hidden"/>
            </NavLink>
          </ul>
          <div className="flex items-center md:mr-8">
            {
              // is user logged in or not 
              token && userData?

              // if yes then display profile and dropdown 
              <div className="pl-3 flex items-center gap-2 group relative">
                <img className="w-10 rounded-full" src={userData.image} alt="profile picture" />
                <img className="w-3 h-2" src={assets.dropdown_icon} alt="dropdown icon" />
                <div className="absolute top-0 left-0 pt-14 text-base font-medium text-slate-600 z-20 hidden group-hover:block">
                  <div className="min-w-full px-4 py-2 bg-[#ffffff] shadow-md rounded flex flex-col gap-4">
                    <p onClick={()=>navigate('profile')}className="hover:text-black cursor-pointer">Profile </p><hr className="h-0.5 bg-slate-400"/>
                    <p onClick={()=>navigate('userAppointments')}className="hover:text-black cursor-pointer">Scheduled Appointments </p><hr className="h-0.5 bg-slate-400"/>
                    <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                  </div>
                </div>
              </div>

              // else login button 
              :<button onClick={()=>navigate('/login')} className="bg-primary text-white px-6 py-2 rounded-full font-semibold hidden md:block hover:shadow-lg hover:shadow-slate-900/25 hover:shadow-b-2 hover:shadow-r-[4px] hover:-shadow-spread-2">Login/Sign Up</button>
            }
          </div>
          <img onClick={()=>setMenu(true)} className="w-6 md:hidden h-[30px]" src={assets.menu_icon} alt="" />
          {/* menu for small screens  */}
          <div className={`${menu? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className="flex  items-center justify-between px-5 py-6">
              <img className="w-28 ml-[-8%]" src={assets.logo} alt="" />
              <img className="w-7" onClick={()=>setMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className="flex flex-col items-start gap-2 mt-5 px-8">
              <NavLink onClick={()=>setMenu(!menu)} to={'/'} className={'flex text-base font-semibold  transition-all gap-2'}> <img className="w-5" src={assets.rightArrow} alt="right arrow" /><p className="px-3">Home</p></NavLink>
              <NavLink onClick={()=>setMenu(!menu)} to={'/doctors'} className={'flex text-base  font-semibold transition-all gap-2'}> <img className="w-5" src={assets.rightArrow} alt="right arrow" /> <p className="px-3">Doctors</p> </NavLink>
              <NavLink onClick={()=>setMenu(!menu)} to={'/about'} className={'flex text-base  font-semibold transition-all gap-2'}> <img className="w-5" src={assets.rightArrow} alt="right arrow" /> <p className="px-3">About</p></NavLink>
              <NavLink onClick={()=>setMenu(!menu)} to={'/contact'} className={'flex text-base  font-semibold transition-all gap-2'}> <img className="w-5" src={assets.rightArrow} alt="right arrow" /> <p className="px-3">Contact</p></NavLink>
            </ul>
          </div>
          </div> 
        </div>
    );
}

export default Navbar;