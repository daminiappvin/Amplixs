import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import arrowLeft from '../../assets/arrowLeft.svg';
import sidebarLogo from "../../assets/sidebarLogo.svg";
import dashboardIcon from "../../assets/dashboardIcon.svg";



const Sidebar = ({ open, setOpen }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const location = useLocation();

  return (
    <div className="w-full shadow-lg">
      <div className={`bg-[#FFFFFF] h-screen p-5 pt-8 relative duration-300`}>
        <img
          src={arrowLeft}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle Sidebar"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={sidebarLogo}
            className={`cursor-pointer duration-500 ${open && "hidden"}`}
            alt="Sidebar Logo"
          />
        </div>
        <ul className="pt-14">
          <Link
            to="/"
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-[#00000] text-sm items-center gap-x-4 ${location.pathname === "/" ? "bg-[#3FA9A9] text-white" : ""}`}
            onClick={() => setSelectedItem('/')}
          >
            <img src={dashboardIcon} alt="Dashboard Icon" className='w-6 h-6'/>
            <span className={`${open && "hidden"} origin-left duration-200 text-[16px]`}>
              Dashboard
            </span>
          </Link>
          <Link
            to="/user"
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-[#00000] text-sm items-center gap-x-4 ${location.pathname === "/user" ? "bg-[#3FA9A9] text-white" : ""}`}
            onClick={() => setSelectedItem('/user')}
          >
            <img src={dashboardIcon} alt="User Icon"  className='w-6 h-6'/>
            <span className={`${open && "hidden"} origin-left duration-200`}>
              Users
            </span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
