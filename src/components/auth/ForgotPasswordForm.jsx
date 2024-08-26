import { Link } from "react-router-dom";
import welcome from "../../assets/welcome.png";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

export default function ForgotPasswordForm() {
  const client = useSelector((state) => state.client);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log("www=>",errors)
  }
  return (
    <div className="flex flex-col items-center gap-8 px-4">
      <img src={welcome} alt="Image" className="w-[80%]" />
      <Card className="mx-auto max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">Forgot password</CardTitle>
          <CardDescription className="text-xs leading-5 text-neutral-700">
            {`Please enter you email address to continue the forgot password process.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address"
                }
                })}
                aria-invalid={errors.email ? "true" : "false"} 
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              {errors.email?.type === 'required' && <p role="alert" className="errorMsg">{errors.email?.message}</p>}
              {errors.email?.type === 'pattern' && (
                <p role="alert" className="errorMsg">{errors.email?.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-primary text-white">
              Continue
            </Button>
          </div>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link to={`/${client?.client_name}`} className="underline text-primary">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
