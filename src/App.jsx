import { useEffect,useState,useContext } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import { fetchDataWithToken } from './services/api';
import { NOT_FOUND,GET_USER,SERVER_ERROR} from "./utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./components/shared/Header";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import NewPassword from "./pages/Authentication/NewPassword";
import UpdateProfile from "./pages/User/UpdateProfile";
import Otp from "./pages/Authentication/Otp";
import PasswordStatus from "./pages/Authentication/PasswordStatus";
import Register from "./pages/Authentication/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/Homepage";
import Clienthomepage from "./pages/Clienthomepage";
import Auth from "./pages/Authentication/Auth";
import Error500 from "./pages/Error500";
import PrivateRoute from './routes/PrivateRoute';
import AuthProvider,{ AuthContext }  from './services/AuthContext.jsx';
import { setUser } from './store/userSlice.jsx';
import {clearAuth} from './store/authSlice.jsx'
import UserManagement from './pages/User/UserManagement.jsx';

const App = () => ( 
  
  <Router>
     <AuthProvider>
      <MainLayout />
    </AuthProvider>
  </Router>
);

const MainLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const client = useSelector((state) => state.client);
  const [Tokenstatus , setTokenstatus] = useState();
  const { login, logout } = useContext(AuthContext);
  // Check if the current path is the dashboard route
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => { 
   
    const getUser = async () => {
      const path = location.pathname.slice(1);
      try { 
        if(path && auth.access_token){
            const { status, data, error } = await fetchDataWithToken(client?.client_name, GET_USER , auth.access_token,'GET');
            if (status === 200) { 
              setTokenstatus(status)
              dispatch(setUser({
                id:data?.user?.id,
                name:data?.user?.name,
                email:data?.user?.email,
                roles:data?.user?.roles
              }));
            }
            if (status == 401) {
              dispatch(clearAuth()); 
              console.log("Unauthorized, navigating to login page");
              dispatch({ type: 'RESET_ALL' });
              navigate(`/${client?.client_name}`);
            }
        }
      } catch (error) {
          console.error('Error caught in component:', error);
          if (error.message === '404 Not Found') {
              navigate(`/${path}${NOT_FOUND}`);
          }
          
      }
  };
    getUser();
  },[auth.access_token]);

  return (
    <>
    {auth?.isAuthenticated === true && <Header />}
    
    
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:name/register" element={<Register />} />
        <Route path="/:name/forgot-password" element={<ForgotPassword />} />
        <Route path="/:name/otp" element={<Otp />} />
        
        <Route path="/:name/password-status" element={<PasswordStatus />} />
        <Route path="/:name" element={<Clienthomepage />} />
        <Route path="/:name/auth" element={<Auth />} />
         {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/:name/dashboard" element={<Dashboard />} />
          <Route path="/:name/change-password" element={<NewPassword />} />
          <Route path="/:name/update-profile" element={<UpdateProfile />} />
          <Route path="/:name/user-management" element={<UserManagement />} />
        </Route>
        <Route path="/:name/server-error" element={<Error500 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
