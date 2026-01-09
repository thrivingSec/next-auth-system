import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { RedisTempUser } from "../email/route";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request:NextRequest){
  try {
    const {email, code, password} = await request.json()
    if(!email || !code || typeof code !== 'number' || String(code).trim().length !== 5 || typeof password !== 'string' || password.length < 6){
      return NextResponse.json({error:'Invalid request'}, {status:400})
    }
    const redisData = await redis.get<RedisTempUser>(`forgot_password:${email}`)
    if(!redisData){
      return NextResponse.json({error:'Invalid request'}, {status:400})
    }
    if(redisData.otp !== Number(code)){
      return NextResponse.json({error:'Invalid OTP'}, {status:400})
    }
    const hashedPass = await bcrypt.hash(password, 10)

    const updatedUser = await prisma.user.update({
      where:{
        email
      },
      data:{
        password:hashedPass
      }
    })

    return NextResponse.json({message:'Password updated successfully'}, {status:200})

  } catch (error) {
    console.log('Error in reassign :: ',error);
    return NextResponse.json({error:'Something went wrong'}, {status:400})
  }
}