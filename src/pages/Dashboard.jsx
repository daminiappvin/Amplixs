
import { useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import userImg from "../assets/user-img.svg";
import results from "../assets/results-img.svg";
import Populations from "../assets/Populations-img.svg";
import orgaizationImg from "../assets/org.svg";
import customer from "../assets/customer-img.svg";
import email from "../assets/email-img.svg";
import { fetchDataWithToken } from '../services/api';
import { NOT_FOUND,GET_MODULES} from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { setModule } from '../store/userSlice.jsx';
import { useLoader } from '../services/LoaderContext.jsx';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";

function Dashboard() {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const client = useSelector((state) => state.client);
  const [modules , setModules] = useState(useSelector((state) => state.user.modules || []));
  const [loading, setLoading] = useState(true);
  const { showLoader, hideLoader } = useLoader();
  

  useEffect(() => {
    const getModules = async () => {
      const path = location.pathname.slice(1);
      showLoader();
      try { 
        if(path){  
            const { status, data, error } = await fetchDataWithToken(client?.client_name, GET_MODULES(user?.id) , auth.access_token,'GET');
            if (status === 200) {
              dispatch(setModule({modules:data}));
              setModules(data)
              hideLoader();
            }
        }
      } catch (error) {
        hideLoader();
          console.error('Error caught in component:', error);
          if (error.message === '404 Not Found') {
              navigate(`/${path}${NOT_FOUND}`);
          }
      }finally {
        hideLoader();
        setLoading(false); 
      }
  };
  if (user?.id && modules.length === 0) {
    getModules();
  } 
  if(modules.length > 0){
    setLoading(false); 
  }
  },[user.id, modules.length]);
  return (
    <>
      <main className="flex flex-wrap justify-center p-5">
        {loading ? (
          <div>Loading...</div>
        ) : modules.length === 0 ? (
          <div className="shadow-lg rounded-md p-5 m-2 flex flex-col justify-between cursor-pointer w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] h-[225px] relative items-start cursor-pointer transition-transform duration-200 hover:translate-y-1 w-96 h-56">
            <Card className="mx-auto max-w-sm shadow-2xl">
              <CardTitle>No modules assigned yet.</CardTitle>
            </Card>
          </div>
        ) : (
          modules.map((module, index) => {
            let imageSrc;
            let colorCode;
            let url_link;
            switch (module.name) {
              case 'Users':
                imageSrc = userImg;
                colorCode = '#dcf3ed';
                url_link = "/user-management"
                break;
              case 'Results':
                imageSrc = results;
                colorCode = '#fceae0';
                break;
              case 'Population Manager':
                imageSrc = Populations;
                colorCode = '#f3e4df';
                break;
              case 'Organisation Model':
                imageSrc = orgaizationImg;
                colorCode = '#dcdfe8';
                break;
              case 'Customer Journey':
                imageSrc = customer;
                colorCode = '#fbf4e0';
                break;
              case 'Email & Survey':
                imageSrc = email;
                colorCode = '#e0e8fb';
                break;
              default:
                imageSrc = '';
            }

            return (
              
              <div
                className="shadow-lg rounded-md p-5 m-2 flex flex-col justify-between cursor-pointer w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] h-[225px] relative items-start cursor-pointer transition-transform duration-200 hover:translate-y-1 w-96 h-56"
                style={{ backgroundColor: colorCode }}
                key={index}
              >
               <Link to={`/${client?.client_name}${url_link}`} className=" text-primary" id={module.name}> 
                <Card>
                  <CardHeader className="flex flex-col">
                    <CardTitle className="m-0 self-start text-[#525252] text-[28px] font-semibold leading-7">
                      {module.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={imageSrc}
                      alt={module.name}
                      className="absolute w-[184px] h-[130px] bg-white right-0 top-[95px] p-5 rounded-tl-[50px]"
                    />
                  </CardContent>
                </Card>
                </Link>
              </div>
              
            );
          })
        )}
      </main>
    </>
  )
}

export default Dashboard