import { generateOtp } from "@/lib/generateOtp";
import { sendOtpMail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export interface TempUser {
  email:string;
  password:string
  otp:number
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    if(password.length < 6){
      return NextResponse.json({
        error:"Password must be more than 6 characters"
      }, {
        status:400
      })
    }
    // TODO: Use zod for email validation
    const user = await prisma.user.findUnique({
      where:{
        email
      },
      select:{
        email:true
      }
    })
    if(user?.email){
      return NextResponse.json({error:"Invalid credentials"},{status:400})
    }

    const encryptPass = await bcrypt.hash(password, 10)
    const otp = generateOtp()

    // temporary user for redis
    const tempUser:TempUser = {
      email,
      password:encryptPass,
      otp:otp
    }

    await redis.set(`temp_registration:${email}`, JSON.stringify(tempUser), {ex:300})

    //resend email verification
    await sendOtpMail(email, otp)
    return NextResponse.json({email},{status:201})

  } catch (error) {
    console.log('Error from register :: ', error);
    NextResponse.json({error:"User registration failed!"}, {status:400})
  }
}
