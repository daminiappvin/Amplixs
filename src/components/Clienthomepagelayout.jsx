import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import welcome from "../assets/welcome.png";
import { Button } from "../components/ui/button";
import {FETCH_CLIENT_ID , API_BASE_URL , CLIENT_BASE_URL , DASHBOARD , NOT_FOUND , SERVER_ERROR} from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { setClient } from '../store/clientIdSlice.jsx';
import { setVerifier , setAuth , clearAuth } from '../store/authSlice.jsx';
import { fetchData } from '../services/api.js';
import crypto from 'crypto-js';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  CardContent,
  CardHeader
} from "./ui/card";
export default function Clienthomepagelayout() { 
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const client = useSelector((state) => state.client);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const path = location.pathname.slice(1);

    const LoginBtnClient = () => {
        let state = createRandomString(40);
        let verifier = createRandomString(128);
        let challenge = base64Url(crypto.SHA256(verifier));
        dispatch(setVerifier({'state_value':state, 'verifier_value':verifier}));
        const clientId = client?.client_id;
        const redirectUri = `${CLIENT_BASE_URL}${client?.client_name}/auth`;
        const responseType = 'code';
        const scope = '*';
        const prompt = 'login';
        const codeChallengeMethod = 'S256';
        const url = `${API_BASE_URL}${client?.client_name}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}&code_challenge=${challenge}&code_challenge_method=${codeChallengeMethod}&prompt=${prompt}`;
        window.location.href = url;
      };
      const createRandomString = (num) => {
        return [...Array(num)].map(() => Math.random().toString(36)[2]).join('')
      }
      const base64Url = (string) => {
        return string.toString(crypto.enc.Base64)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      }
      useEffect(() => { 
        const fetchClientId = async () => {
        try {
            const result = await fetchData(path, FETCH_CLIENT_ID);
            console.log("www" , result)
            if(result.status === 500 || result.status === 404){
              navigate(`/${path}${NOT_FOUND}`);
            }
            if(client?.client_name !== path)
            dispatch(setClient({'client_name':result?.data?.name, 'client_id':result?.data?.client_id}));
        } catch (error) {
            console.error('Error caught in component:', error);
            if (error.message === '404 Not Found') {
                navigate(`/${path}${NOT_FOUND}`);
            }
        }
    };
    if (!isAuthenticated) {
        fetchClientId();
      }
      if(isAuthenticated) {
        navigate(`/${client?.client_name}${DASHBOARD}`);
      }
    //fetchClientId();
    }, [dispatch,location.pathname]);
    return (
        <div className="flex flex-col items-center gap-8">
          <img
            src={welcome}
            alt="Image"
            className="w-[80%]"
          />
          <Card className="mx-auto max-w-sm shadow-2xl">
            <CardHeader>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
              <Button type="button" className="w-full bg-primary text-white" onClick={LoginBtnClient}>
                    Login
                  </Button>
              </div>
              <div className="mt-4 text-center text-sm">
              <Link to={"forgot-password"} className="underline text-primary">
                  Forget password
                </Link>{" | "}
                <Link to={"register"} className="underline text-primary">
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
}
