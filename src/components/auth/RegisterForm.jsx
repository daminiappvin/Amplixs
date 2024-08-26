import { useEffect,useState,useContext } from 'react';
import { Link } from "react-router-dom";
import welcome from "../../assets/welcome.png";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { fetchDataWithToken } from '../../services/api';
import { SERVER_ERROR,USER_REGISTER} from "../../utils/constants";
import {useNavigate,useLocation} from "react-router-dom";
import { toast } from 'react-toastify';
import { useLoader } from '../../services/LoaderContext.jsx';
import RegisterStatusForm from "../../components/auth/RegisterStatusForm";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


export default function RegisterForm() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const client = useSelector((state) => state.client);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors },setError } = useForm();
  const [accountStatus , setAccountStatus] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  const onSubmit = async (formData) => {
        showLoader();
        try {
          if(validateCaptcha(formData.user_captcha_input,false) == false){
            setError("user_captcha_input", {
              type: "server",
              message: "Captcha Does Not Match."
            });
            return false
          }
          
            const { status, data: responseData, error } = await fetchDataWithToken(client?.client_name, USER_REGISTER, auth.access_token, 'POST', formData);
          if (status === 200) {
              setAccountStatus(true)
              toast.success("Registration successful.");
              hideLoader();
            } else if (error) {
              const errorObj = JSON.parse(error);
                if (errorObj.errors) {
                    Object.keys(errorObj.errors).forEach((key) => {
                        setError(key, {
                            type: "server",
                            message: errorObj.errors[key][0]
                        });
                    });
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }
        } catch (error) {
            navigate(`/${path}/${SERVER_ERROR}`);
        }finally {
          hideLoader();
        }
    };
  useEffect(()=>{
    loadCaptchaEnginge(6)
  },[]);  
    return (
      <div className="flex flex-col items-center gap-8 px-4">
        {accountStatus ? (
          <RegisterStatusForm />
        ) : (
          <>
            <img src={welcome} alt="Image" className="w-[80%]" />
            <Card className="mx-auto max-w-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-3xl mb-2">Register for an Account.</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        {...register("name", { required: "This input is required." })}
                        aria-invalid={errors.name ? "true" : "false"}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                      />
                      {errors.name?.type === 'required' && <p role="alert" className="errorMsg">Name is required.</p>}
                      {errors.name?.type === 'server' && <p role="alert" className="errorMsg">{errors.name?.message}</p>}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        {...register("email", { required: true,pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex for email validation
                          message: "Please enter a valid email address"
                        } })}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                      {errors.email?.type === 'required' && <p role="alert" className="errorMsg">Email is required.</p>}
                      {errors.email?.type === 'server' && <p role="alert" className="errorMsg">{errors.email?.message}</p>}
                      {errors.email?.type === 'pattern' && <p role="alert" className="errorMsg">{errors.email?.message}</p>}
                    </div>
  
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        {...register("password", { required: true })}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                      />
                      {errors.password?.type === 'required' && <p role="alert" className="errorMsg">Password is required.</p>}
                      {errors.password?.type === 'server' && <p role="alert" className="errorMsg">{errors.password?.message}</p>}
                    </div>
  
                    <div className="grid gap-2">
                      <Label htmlFor="password_confirmation">Confirm password</Label>
                      <Input
                        {...register("password_confirmation", { required: true })}
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirm your password"
                      />
                      {errors.password_confirmation?.type === 'required' && <p role="alert" className="errorMsg">Confirm password is required.</p>}
                      {errors.password_confirmation?.type === 'server' && <p role="alert" className="errorMsg">{errors.password_confirmation?.message}</p>}
                    </div>
                    <div>
                    < LoadCanvasTemplate reloadText="↺" />
                    </div>
                    <Input
                        {...register("user_captcha_input", { required: true })}
                        id="user_captcha_input"
                        name="user_captcha_input"
                        type="text"
                        placeholder="Enter Captcha Value"
                      />
                    {errors.user_captcha_input?.type === 'required' && <p role="alert" className="errorMsg">Captcha is required.</p>}
                    {errors.user_captcha_input?.type === 'server' && <p role="alert" className="errorMsg">{errors.user_captcha_input?.message}</p>}
                    <Button type="submit" className="w-full bg-primary text-white" id="register">
                      Register
                    </Button>
                  </div>
                </form>
                <div className="mt-4 text-center text-sm">
                  <Link to={`/${client?.client_name}`} className="underline text-primary" id="backtologin">
                    Back to Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
}
