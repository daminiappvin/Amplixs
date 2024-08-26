import { Link } from "react-router-dom";
import welcome from "../../assets/welcome.png";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "../ui/input-otp";

export default function OtpForm() {
  return (
    <div className="flex flex-col items-center gap-8 px-4">
      <img src={welcome} alt="Image" className="w-[80%]" />
      <Card className="mx-auto max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">Reset password</CardTitle>
          <CardDescription className="text-xs leading-5 text-neutral-700">
            {`Please enter 6 digit code we just sent to `}
            <span className="font-medium  text-primary">example@email.com</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Link to={"/new-password"}>
              <Button type="submit" className="w-full bg-primary text-white">
                Verify
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <Link to={"/"} className="underline text-primary">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
