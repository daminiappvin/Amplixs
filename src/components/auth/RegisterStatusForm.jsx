import { Link } from "react-router-dom";
import welcome from "../../assets/welcome.png";
import { Button } from "../ui/button";
import {useNavigate,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function RegisterStatusForm() {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const client = useSelector((state) => state.client);
  return (
    <div className="flex flex-col items-center gap-8 px-4">
      <img src={welcome} alt="Image" className="w-[80%]" />
      <Card className="mx-auto max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl mb-2">Registration successful.</CardTitle>
          <CardDescription className="text-xs leading-5 text-neutral-700">
            {`Thank you for your registration. Use the below button to login.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Link to={`/${client?.client_name}`}>
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
