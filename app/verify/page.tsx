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

type FormData = {
  email: string;
  code: number;
};

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

type VerificationRes = {
  message: string;
};

const OtpVerificaion = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    const userEmail = sessionStorage.getItem("registration_email");
    if (userEmail) {
      setEmail(userEmail.toString().trim());
    }
  }, []);
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();
  function formValidator(data: FormData) {
    if (!data.email.trim()) return false;
    if (!/\S+@\S+\.\S+/.test(data.email.trim())) return false;
    if (data.code.toString().trim().length !== 5) return false;
    return true;
  }
  async function handleOtpVerification(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = formValidator({ email, code: Number(code) });
    if (validation === true) {
      setVerifying(true);
      try {
        const response = await axios.post<VerificationRes>(
          `${SERVER_URL}/api/auth/verify-email`,
          { email, code: Number(code) }
        );
        if (response?.data.message) {
          toast.success(`${response.data.message}`);
          router.push("/login");
        }
      } catch (error) {
        console.log("Error in handleVerification :: ", error);
        toast.error("Error in OTP verification!");
      } finally {
        setVerifying(false);
        setCode("");
      }
    } else {
      toast.error("Invalid OTP");
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
                Verify Your Email
              </CardDescription>
              <CardDescription className="text-start text-sm text-gray-500 font-medium font-mono leading-relaxed">
                Enter the otp sent on your registered email.
              </CardDescription>
            </CardHeader>
            {/* card content */}
            <CardContent className="flex flex-col gap-5">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleOtpVerification}
              >
                {/* otp Input */}
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
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                  />
                </div>

                {/* register */}
                <div className="flex flex-col w-full mt-3">
                  <Button
                    className="bg-gray-800 rounded-lg  text-white font-semibold font-mono hover:shadow-xl hover:shadow-gray-400 cursor-pointer active:bg-gray-950 transition-all duration-300"
                    type="submit"
                    disabled={verifying}
                  >
                    {verifying ? "Verifying OTP..." : "Verify"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificaion;
