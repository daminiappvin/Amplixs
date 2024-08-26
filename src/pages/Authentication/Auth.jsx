import React, { useEffect, useState,useContext } from 'react';
import AuthLayout from "../../components/auth/AuthLayout";
import GlobalLoader from '../../components/shared/GlobalLoader.jsx';
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {OAUTH_TOKEN , API_BASE_URL , CLIENT_BASE_URL , DASHBOARD} from "../../utils/constants";
import axios from 'axios';
import { setAuth,clearAuth } from '../../store/authSlice.jsx';
import { AuthContext } from '../../services/AuthContext.jsx';
import { toast } from 'react-toastify';
import { useLoader } from '../../services/LoaderContext.jsx';

const Auth = () => {
  const [code, setCode] = useState(null);
  const [state, setState] = useState(null);
  const auth = useSelector((state) => state.auth);
  const client = useSelector((state) => state.client);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useContext(AuthContext);
  const { showLoader, hideLoader } = useLoader();
  useEffect(() => {
    async function validateAuth() {
        try {
            // Access the current URL
            const url = new URL(window.location.href);
            // Get the query parameters
            const params = new URLSearchParams(url.search);
            // Extract the parameters
            const codeParam = params.get('code');
            const stateParam = params.get('state');
    
            // Update state with the parameters
            setCode(codeParam);
            setState(stateParam);
            const error = params.get('error');
            if(error != undefined && error == 'access_denied'){
                navigate(`/${client?.client_name}/server-error`);
            }
            if (codeParam && stateParam) {
                if (stateParam === auth.state_value) {
                  const params = {
                    grant_type: 'authorization_code',
                    client_id: client?.client_id,
                    redirect_uri: `${CLIENT_BASE_URL}${client?.client_name}/auth`,
                    code_verifier: auth.verifier_value,
                    code:codeParam,
                  };
                  let url = `${API_BASE_URL}${client?.client_name}${OAUTH_TOKEN}`
                  showLoader();
                  const resp = await axios.post(url, params); 
                  if (resp.status === 200) {
                    // Status 200 indicates a successful request
                    toast.success('Login successfully.');
                    hideLoader();
                    const data = resp.data;
                    dispatch(setAuth({
                        'expires_in':data.expires_in,
                        'refresh_token':data.refresh_token,
                        'access_token':data.access_token,
                        'token_type':data.token_type,
                        'isAuthenticated':true
                    }));
                    login(data.access_token)
                    navigate(`/${client?.client_name}${DASHBOARD}`);
                    // Process the data
                  } else if (resp.status === 204) {
                    // Status 204 indicates no content
                    dispatch(clearAuth());
                  } else {
                    // Handle other status codes if needed
                    dispatch(clearAuth());
                  }
                    
                }
              }
        }catch(error){ 
            dispatch(clearAuth());
            navigate(`/${client?.client_name}/server-error`);
        }
      }
      validateAuth();
  }, []);

  return (
    <AuthLayout>
      <GlobalLoader />
    </AuthLayout>
  );
};

export default Auth;
