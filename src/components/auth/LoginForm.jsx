import { Link } from "react-router-dom";
import google from "../../assets/google.svg";
import microsoft from "../../assets/microsoft.svg";
import welcome from "../../assets/welcome.png";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../ui/card";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-8">
      <img
        src={welcome}
        alt="Image"
        className="w-[80%]"
      />
      <Card className="mx-auto max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center flex-wrap">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/forgot-password"}
                  className="ml-auto inline-block text-sm underline text-primary"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Link to={"/dashboard"}>
              <Button type="submit" className="w-full bg-primary text-white">
                Login
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              <img
                src={google}
                alt="Image"
                width={24}
                //  className="mr-1"
              />
              Login with Google
            </Button>
            <Button variant="outline" className="w-full">
              <img src={microsoft} alt="Image" width={14} className="mr-2" />
              Login with Microsoft
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="underline text-primary">
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
