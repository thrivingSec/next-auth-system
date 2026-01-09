import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import ProfileActions from "@/components/ui/profileActions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const userProfile = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  return (
    <div className="w-full h-dvh p-4 flex items-center justify-center bg-zinc-200">
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[0%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="flex justify-center items-center p-6 w-full flex-col gap-5">
          {/* Main Card Container */}
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Decorative Top Border/Banner */}
            <div className="h-2 w-full bg-linear-to-r from-blue-500 to-purple-600"></div>

            <div className="flex flex-col md:flex-row">
              {/* Left Side: Identity Info */}
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  {/* Fallback Avatar Placeholder */}
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-400">
                    {userProfile?.name?.charAt(0).toUpperCase() || "User"}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                      {userProfile?.name ?? "User"}
                    </h1>
                    <p className="text-gray-500 font-medium">
                      {userProfile?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-2 inline-flex">
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    Active Member
                  </span>
                </div>
              </div>

              {/* Right Side: Stats / Meta Data */}
              <div className="bg-gray-50 p-8 md:w-1/2 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-6">
                  {/* Stat Block 1 */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Account ID
                    </p>
                    <p
                      className="text-sm font-mono text-gray-700 bg-white border border-gray-200 p-2 rounded truncate"
                      title={userProfile?.id.toString()}
                    >
                      {userProfile?.id.toString()}
                    </p>
                  </div>
                  <div className="cursor-pointer">
                    <ProfileActions />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center leading-relaxed font-mono text-sm text-gray-500 max-w-1/4" >This is just a demo profile page, change it when using this authentication skeleton in your project.</div>
        </div>
      </div>
    </div>
  );
}
