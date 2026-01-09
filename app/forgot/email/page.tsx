"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

type FormData = {
  email: string;
};

type ValidateEmailResponse = {
  message: string;
};

export default function Forgot() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  const formValidator = (data: FormData) => {
    if (!data.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(data.email.trim()))
      return toast.error("Invalid email!");
    return true;
  };

  const [validating, setValidating] = useState(false);

  async function handleForgotEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = formValidator({ email });
    if (validation === true) {
      setValidating(true);
      try {
        const response = await axios.post<ValidateEmailResponse>(
          `${SERVER_URL}/api/auth/forgot/validate/email`,
          { email }
        );
        if (response?.data.message) {
          sessionStorage.setItem("forgotPass_Email", email);
          router.push("/forgot/new-password");
        }
      } catch (error) {
        toast.error("email validation failed");
        console.log("Error in handleForgotEmail :: ", error);
      } finally {
        setValidating(false);
        setEmail("");
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
                Enter you registerd email, once validated, we'll send you an
                otp, enter that as well and set new password for your account.
              </CardDescription>
            </CardHeader>
            {/* card content */}
            <CardContent className="flex flex-col gap-5">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleForgotEmail}
              >
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                {/* register */}
                <div className="flex flex-col w-full mt-3">
                  <Button
                    className="bg-gray-800 rounded-lg  text-white font-semibold font-mono hover:shadow-xl hover:shadow-gray-400 cursor-pointer active:bg-gray-950 transition-all duration-300"
                    type="submit"
                    disabled={validating}
                  >
                    {validating ? "Validating..." : "Validate"}
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
