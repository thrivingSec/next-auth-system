import { generateOtp } from "@/lib/generateOtp";
import { sendOtpMail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export type RedisTempUser = {
  email:string;
  otp:number
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    // verify if the email exists in db
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    // generate new otp for verification
    const otp = generateOtp();
    // set the user in upstash/redis memeory
    const tempUser:RedisTempUser = {
      email: user.email,
      otp,
    };
    await redis.set(`forgot_password:${user.email}`, JSON.stringify(tempUser), {
      ex: 300,
    });
    await sendOtpMail(user.email.trim(), otp);
    return NextResponse.json(
      { message: "OTP sent on the registered email" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in email-vlaidation :: ", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
