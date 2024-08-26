import { useEffect,useState,useContext } from 'react';
import logo from "../../assets/amplix-logo.svg";
import Ellipse from "../../assets/Ellipse 176.svg";
import avatar from "../../assets/avatar 1.svg";
import profile from "../../assets/profile.svg";
import dashboard from "../../assets/dashboard.svg";
import fi_more from "../../assets/fi_more-vertical.svg";
import logoutImg from "../../assets/logout-icon.svg";
import changepassword from "../../assets/change-password-icon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataWithToken } from '../../services/api';
import { LOGOUT,NOT_FOUND,CHANGE_PASSWORD, DASHBOARD , UPDATE_PROFILE} from "../../utils/constants";
import { clearAuth } from '../../store/authSlice.jsx';
import { AuthContext }  from '../../services/AuthContext.jsx';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { persistStore } from 'redux-persist';
import store from '../../store/store.jsx';
const persistor = persistStore(store);


function Header() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userObject = useSelector((state) => state.user);
  let userName = userObject?.name ? userObject?.name.charAt(0).toUpperCase() + userObject?.name.slice(1).toLowerCase() : '';
  let roleName = (userObject?.roles.length > 0) ? userObject?.roles[0].name.charAt(0).toUpperCase() + userObject?.roles[0].name.slice(1).toLowerCase() : '';
  const auth = useSelector((state) => state.auth);
  const client = useSelector((state) => state.client);
  const user = useSelector((state) => state.user);
  const path = location.pathname.slice(1);
  const { logout } = useContext(AuthContext);
  const toggleDropdown = () => {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.classList.contains("hidden")) {
      dropdownMenu.classList.remove("hidden");
    } else {
      dropdownMenu.classList.add("hidden");
    }
  };

  const userLogout = async() =>{
    try{
      const { status, data, error } = await fetchDataWithToken(client?.client_name, LOGOUT(user?.id) , auth.access_token , 'POST');
      if(status === 200){
        toast.success("Logout successfully.")
        dispatch(clearAuth());
        logout();
        dispatch({ type: 'RESET_ALL' });
        persistor.purge();
        navigate(`/${client?.client_name}`);
      }
    }catch (error) {
      console.error('Error caught in component:', error);
      if (error.message === '404 Not Found') {
        navigate(`/${path}${NOT_FOUND}`);
      }
    }
    
  }

  useEffect(() => { 
    userName = userObject?.name ? userObject?.name.charAt(0).toUpperCase() + userObject?.name.slice(1).toLowerCase() : '';
    roleName = (userObject?.roles.length > 0) ? userObject?.roles[0].name.charAt(0).toUpperCase() + userObject?.roles[0].name.slice(1).toLowerCase() : '';
  },[auth.access_token , user]);

  const closeDropdown = (event) => {
    if (!event.target.matches("#dropdownToggle")) {
      const dropdownMenu = document.getElementById("dropdownMenu");
      if (!dropdownMenu.classList.contains("hidden")) {
        dropdownMenu.classList.add("hidden");
      }
    }
  };

  window.onclick = closeDropdown;
  return (
    <header className="bg-customColor text-white px-5">
      <div className="flex justify-between items-center h-16">
        <div>
          <img src={logo} alt="Amplix Logo" />
        </div>
        <div className="flex items-center">
          <div className="flex items-center bg-white p-2 rounded-full max-w-xs h-10 gap-5">
            <img src={Ellipse} className="w-8 h-8" />
            <select
              name=""
              id="select-lang"
              className="outline-none border-none cursor-pointer text-gray-600 text-sm font-medium"
            >
              <option value="English" className="lang">English</option>
              <option value="Hindi" className="lang">Hindi</option>
            </select>
          </div>
          <div className="flex items-center pl-6 gap-7">
            <div className="flex items-center cursor-pointer">
              <img src={avatar} alt="User" className="w-10 h-10 mr-2" />
              <div className="flex flex-col">
                <span className="text-sm font-normal text-white">{userName}</span>
                <span className="text-xs font-normal text-gray-200">{roleName}</span>
              </div>
            </div>
            <div className="relative">
              <img
                src={fi_more}
                className="cursor-pointer"
                id="dropdownToggle"
                alt="More Options"
                onClick={toggleDropdown}
              />
              <div
                className="hidden absolute right-0 bg-white shadow-lg z-10 w-56 h-30 p-4 rounded-lg"
                id="dropdownMenu">
                  <Link to={`/${client?.client_name}${DASHBOARD}`} className="underline text-primary" id="backtologin">
                  <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100" >
                  <img
                    src={dashboard}
                    alt="Option 1 Icon"
                    className="w-5 h-4 mr-2"
                  />
                  <p className="text-gray-800">My Dashboard</p>
                </div>
                </Link>
                <Link to={`/${client?.client_name}/${UPDATE_PROFILE}`} className="underline text-primary" id="backtologin">
                  <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100" >
                  <img
                    src={profile}
                    alt="Option 1 Icon"
                    className="w-5 h-4 mr-2"
                  />
                  <p className="text-gray-800">My Profile</p>
                </div>
                </Link>
                <Link to={`/${client?.client_name}/${CHANGE_PASSWORD}`} className="underline text-primary" id="backtologin">
                  <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100" >
                    <img
                      src={changepassword}
                      alt="Option 1 Icon"
                      className="w-5 h-4 mr-2"
                    />
                    <p className="text-gray-800">Change Password</p>
                  </div>
                </Link>
                <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100" onClick={userLogout}>
                  <img src={logoutImg} alt="Option 2 Icon" className="w-5 h-4 mr-2" />
                  <p className="text-gray-800">Logout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header