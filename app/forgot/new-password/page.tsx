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
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

type FormData = {
  email: string;
  code: string;
  password: string;
};

type ReassignRes = {
  message: string;
};

export default function Forgot() {
  useEffect(() => {
    const userEmail = sessionStorage.getItem("forgotPass_Email") as string;
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [validating, setValidating] = useState(false);

  const router = useRouter();

  const formValidator = (data: FormData) => {
    if (!data.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(data.email.trim()))
      return toast.error("Invalid email!");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6) return toast.error("Invalid password");
    if (!data.code.trim()) return toast.error("Code is required");
    if (data.code.trim().length !== 5) return toast.error("Invalid code");
    return true;
  };

  async function handleForgotReassign(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = formValidator({ email, code, password });
    if (validation === true) {
      setValidating(true);
      try {
        const response = await axios.post<ReassignRes>(
          `${SERVER_URL}/api/auth/forgot/validate/reassign`,
          { email, code: Number(code), password }
        );
        if (response?.data.message) {
          toast.success(`${response.data.message}`);
          router.push("/login");
        }
      } catch (error: any) {
        const errorMsg =
          error?.response?.data?.error ?? "Can not reassign new password";
        console.log("Error in handleForgotreassign :: ", error);
        toast.error(errorMsg);
      } finally {
        setValidating(false);
        setEmail("");
        setPassword("");
        setCode("");
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
                Reset your account password
              </CardDescription>
              <CardDescription className="text-start text-sm text-gray-500 font-medium font-mono leading-relaxed">
                Enter the valid OTP and then reassign your account a new
                password.
              </CardDescription>
            </CardHeader>
            {/* card content */}
            <CardContent className="flex flex-col gap-5">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleForgotReassign}
              >
                {/* otp input */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="otpInput"
                    className="text-base font-mono font-semibold text-gray-700 ml-1"
                  >
                    OTP
                  </Label>
                  <Input
                    type="number"
                    placeholder="12345"
                    id="otpInput"
                    className="text-sm font-mono"
                    onChange={(e) => setCode(String(e.target.value))}
                    value={code ? Number(code) : ""}
                  />
                </div>
                {/* password Input */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="passwordInput"
                    className="text-base font-mono font-semibold text-gray-700 ml-1"
                  >
                    New Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="password"
                    id="passwordInput"
                    className="text-sm font-mono"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                {/* register */}
                <div className="flex flex-col w-full mt-3">
                  <Button
                    className="bg-gray-800 rounded-lg  text-white font-semibold font-mono hover:shadow-xl hover:shadow-gray-400 cursor-pointer active:bg-gray-950 transition-all duration-300"
                    type="submit"
                    disabled={validating}
                  >
                    {validating ? "Validating..." : "Update"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
