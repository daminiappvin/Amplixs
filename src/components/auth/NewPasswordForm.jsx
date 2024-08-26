import { useEffect,useState,useContext } from 'react';
import { Link } from "react-router-dom";
import welcome from "../../assets/welcome.png";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {useNavigate,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataWithToken } from '../../services/api';
import { toast } from 'react-toastify';
import { CHANGE_PASSWORD_URL} from "../../utils/constants";
import { clearAuth } from '../../store/authSlice.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { useLoader } from '../../services/LoaderContext.jsx';
import { AuthContext }  from '../../services/AuthContext.jsx';

export default function NewPasswordForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.slice(1);
  const client = useSelector((state) => state.client);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors },setError } = useForm();
  const { showLoader, hideLoader } = useLoader();
  const { logout } = useContext(AuthContext);
  const onSubmit = async (formData) => {
    showLoader();
    try {
        const { status, data: responseData, error } = await fetchDataWithToken(client?.client_name, CHANGE_PASSWORD_URL(user?.id), auth.access_token, 'PUT', formData);
      if (status === 200) {
          toast.success("Password has been changed successfully.");
          dispatch(clearAuth());
          logout();
          navigate(`/${client?.client_name}`);
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
        hideLoader();
        navigate(`/${path}/${SERVER_ERROR}`);
    }finally {
      hideLoader();
    }
};
  return (
    <div className="flex flex-col items-center gap-8 px-4">
      <img src={welcome} alt="Image" className="w-[80%]" />
      <form onSubmit={handleSubmit(onSubmit)} method="post">
      <Card className="mx-auto max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Change password</CardTitle>
          <CardDescription className="text-xs leading-5 text-neutral-700">
            {`Change your password here`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
          <div className="grid gap-2">
              <div className="flex items-center flex-wrap">
                <Label htmlFor="password">Current Password</Label>
              </div>
              <Input
              {...register("current_password", { required: "Current password is required." })}
              aria-invalid={errors.current_password ? "true" : "false"}
                id="current_password"
                name="current_password"
                type="password"
                placeholder="Enter your current password"
              />
              {errors.current_password?.type === 'required' && <p role="alert" className="errorMsg">Current password is required.</p>}
              {errors.current_password?.type === 'server' && <p role="alert" className="errorMsg">{errors.current_password?.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center flex-wrap">
                <Label htmlFor="password">New Password</Label>
              </div>
              <Input
              {...register("password", { required: "Password is required." })}
              aria-invalid={errors.password ? "true" : "false"}
                id="password"
                type="password"
                placeholder="Enter your new password"
              />
              {errors.password?.type === 'required' && <p role="alert" className="errorMsg">Password is required.</p>}
              {errors.password?.type === 'server' && <p role="alert" className="errorMsg">{errors.password?.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center flex-wrap">
                <Label htmlFor="password">Confirm New Password</Label>
              </div>
              <Input
              {...register("password_confirmation", { required: "Password is required." })}
              aria-invalid={errors.password_confirmation ? "true" : "false"}
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="Enter your new password again"
              />
              {errors.password_confirmation?.type === 'required' && <p role="alert" className="errorMsg">Confirm password is required.</p>}
              {errors.password_confirmation?.type === 'server' && <p role="alert" className="errorMsg">{errors.password_confirmation?.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary text-white">
                Submit
              </Button>
          </div>
        </CardContent>
      </Card>
      </form>
    </div>
  );
}
