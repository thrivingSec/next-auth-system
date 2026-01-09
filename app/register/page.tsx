"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

type RegisterRes = {
  email: string;
};

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [registering, setRegistring] = useState(false);
  const router = useRouter();
  const formValidator = (data: FormData) => {
    if (!data.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(data.email.trim()))
      return toast.error("Invalid email!");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6)
      return toast.error("Password must be atleast 6 characters long!");
    return true;
  };
  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = formValidator(formData);
    if (validation === true) {
      setRegistring(true);
      try {
        const response = await axios.post<RegisterRes>(
          `${SERVER_URL}/api/auth/register`,
          formData
        );
        if (response.data.email) {
          sessionStorage.setItem("registration_email", response.data.email);
          router.push("/verify", { scroll: false });
        }
      } catch (error) {
        console.log("Error in handleRegister :: ", error);
        toast.error("Error in registring user");
      } finally {
        setRegistring(false);
        setFormData({ email: "", password: "" });
      }
    } else {
      return;
    }
  }
  return (
    <div className="w-full h-dvh p-4 flex items-center justify-center bg-zinc-200">
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[0%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="mx-auto w-full max-w-md flex flex-col">
          <Card className="w-full bg-white">
            {/* card header */}
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-mono text-gray-900 leading-tight text-center mb-7">
                Next Authentication System
              </CardTitle>
              <CardDescription className="leading-tight text-start text-md font-semibold font-mono text-gray-800">
                Register your account
              </CardDescription>
              <CardDescription className="text-start text-sm text-gray-500 font-medium font-mono leading-relaxed">
                Enter you valid email and password(more than 6 chars long) to
                register
              </CardDescription>
            </CardHeader>
            {/* card content */}
            <CardContent className="flex flex-col gap-5">
              <form className="flex flex-col gap-5" onSubmit={handleRegister}>
                {/* email Input */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="emailInput"
                    className="text-base font-mono font-semibold text-gray-700 ml-1"
                  >
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="john@doe.com"
                    id="emailInput"
                    className="text-sm font-mono"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    value={formData.email}
                    required
                  />
                </div>
                {/* password Input */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="passwordInput"
                    className="text-base font-mono font-semibold text-gray-700 ml-1"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="password"
                    id="passwordInput"
                    className="text-sm font-mono"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    value={formData.password}
                    required
                  />
                </div>
                {/* register */}
                <div className="flex flex-col w-full mt-3">
                  <Button
                    className="bg-gray-800 rounded-lg  text-white font-semibold font-mono hover:shadow-xl hover:shadow-gray-400 cursor-pointer active:bg-gray-950 transition-all duration-300"
                    type="submit"
                    disabled={registering}
                  >
                    {registering ? "Registring..." : "Register"}
                  </Button>
                </div>
              </form>
            </CardContent>
            {/* card footer */}
            <CardFooter className="flex justify-center">
              <p className="text-center text-sm font-mono text-gray-500">
                Already have an account?{" "}
                <Link className="text-gray-700 font-bold" href={"/login"}>
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
