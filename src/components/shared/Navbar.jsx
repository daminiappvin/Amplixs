import React from 'react';
import avatar from "../../assets/avatar.svg";
import country from "../../assets/country.svg";
import moreVertical from "../../assets/moreVertical.svg";

const Navbar = () => {
  return (
    <nav className="bg-[#3fa9a9] p-4 flex items-center justify-end">
      <div className="flex items-center space-x-4 ">
        <div className="flex items-center bg-white py-1 px-2 rounded-[44px] max-w-[186px] h-[43px] gap-5 border-none outline-none">
          <img src={country} alt="Language" />
          <select name="language" id="select-lang" className="border-none outline-none cursor-pointer">
            <option value="English" className="lang">
              English
            </option>
            <option value="Hindi" className="lang">
              Hindi
            </option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <img src={avatar} alt="Profile" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            <span className="text-[14px] leading-5 text-[#fff] font-normal">
              HeMan
            </span>
            <span className="text-[13px] leading-4 text-[#e8e8e8] font-normal">
              Admin
            </span>
          </div>
        </div>
        <div className="cursor-pointer">
          <img src={moreVertical} className="more-vertical" id="dropdownToggle" alt="More Options" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
