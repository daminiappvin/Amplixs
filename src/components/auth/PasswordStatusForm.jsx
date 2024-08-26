import { Link } from "react-router-dom";
import welcome from "../../assets/welcome.png";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PasswordStatusForm() {
  return (
    <div className="flex flex-col items-center gap-8 px-4">
      <img src={welcome} alt="Image" className="w-[80%]" />
      <Card className="mx-auto max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">
            Password reset succesfull
          </CardTitle>
          <CardDescription className="text-xs leading-5 text-neutral-700">
            {`Your account password reset successfully now you can login with new password`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Link to={"/"}>
              <Button type="submit" className="w-full bg-primary text-white">
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
