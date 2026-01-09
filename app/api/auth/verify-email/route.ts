import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { TempUser } from "../register/route";
import { error } from "console";
import prisma from "@/lib/prisma";


export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();
    const redisData:TempUser|null = await redis.get(`temp_registration:${email}`);
    if (!redisData) {
      return NextResponse.json(
        { error: "Registration expired. Please register again!" },
        { status: 400 }
      );
    }
    if(redisData?.otp !== Number(code)){
      return NextResponse.json({
        error:'Invalid otp'
      }, {
        status:400
      })
    }
    // valid user save to db
    const newUser = await prisma.user.create({
      data:{
        email:redisData.email,
        password:redisData.password
      }
    })
    return NextResponse.json({message:'User registration completed'}, {status:201})
  } catch (error) {
    console.log("Error from verify-email :: ", error);
    return NextResponse.json({error:'Email verification failed!'}, {status:400})
  }
}
