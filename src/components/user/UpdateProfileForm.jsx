import { useEffect,useState,useContext } from 'react';
import welcome from "../../assets/welcome.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {useNavigate,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataWithToken } from '../../services/api';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_URL , DASHBOARD,SERVER_ERROR} from "../../utils/constants";
import { setProfile } from '../../store/userSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { useLoader } from '../../services/LoaderContext';
import { AuthContext }  from '../../services/AuthContext';

export default function UpdateProfileForm() {
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
        const { status, data: responseData, error } = await fetchDataWithToken(client?.client_name, UPDATE_PROFILE_URL(user?.id), auth.access_token, 'PUT', formData);
      if (status === 200) {
          toast.success("Profile has been changed successfully.");
          dispatch(setProfile({
            name:formData.name,
            email:formData.email
          }));
          navigate(`/${client?.client_name}${DASHBOARD}`);
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
          <CardTitle className="text-3xl">Update your profile</CardTitle>
          <CardDescription className="text-xs leading-5 text-neutral-700">
            {`Update your profile here.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
          <div className="grid gap-2">
              <div className="flex items-center flex-wrap">
                <Label htmlFor="name">Name</Label>
              </div>
              <Input
              {...register("name", { required: "Name is required." })}
              aria-invalid={errors.email ? "true" : "false"}
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                defaultValue={user?.name}
              />
              {errors.name?.type === 'required' && <p role="alert" className="errorMsg">Name is required.</p>}
              {errors.name?.type === 'server' && <p role="alert" className="errorMsg">{errors.name?.message}</p>}
            </div>
          <div className="grid gap-2">
              <div className="flex items-center flex-wrap">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
              {...register("email", { required: "Email is required." })}
              aria-invalid={errors.email ? "true" : "false"}
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                defaultValue={user?.email}
              />
              {errors.email?.type === 'required' && <p role="alert" className="errorMsg">Email is required.</p>}
              {errors.email?.type === 'server' && <p role="alert" className="errorMsg">{errors.email?.message}</p>}
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
