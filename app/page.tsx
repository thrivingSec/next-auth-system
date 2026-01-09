import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import redisImg from "@/public/redis_icon.png";
import nextImg from "@/public/next.svg";
import prismaImg from "@/public/prisma.png";
import nextAuthImg from "@/public/nextAuth.png";
import supabaseImg from "@/public/supabase.png";
import zodImg from "@/public/zod.jpeg";
// import { ArrowRight, Github, Lock, ShieldCheck, Zap } from "lucide-react"; // Uncomment if you have lucide-react installed

const HomePage = () => {
  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Dot/Grid Background Pattern */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-[10%] right-[0%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center pt-20 pb-16">
    
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
              🚀 Production Ready Auth
            </span>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <header className="font-mono font-bold text-5xl md:text-7xl tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-black to-gray-600 leading-[1.1] mb-6">
              The Ultimate Next.js <br className="hidden md:block" />
              Authentication System
            </header>

            <p className="font-sans text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              A secure, scalable, and type-safe authentication foundation. Built
              with modern tooling to handle users, sessions, and security so you
              don't have to.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto">
            <Button
              className="h-12 px-8 rounded-full bg-black text-white hover:bg-gray-800 transition-all shadow-xl shadow-black/5 w-full sm:w-auto"
              asChild
            >
              <Link href={"/register"}>
                Get Started
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-12 px-8 rounded-full border-gray-300 hover:bg-gray-100 transition-all w-full sm:w-auto"
              asChild
            >
              <Link href={"/login"}>Sign In</Link>
            </Button>
          </div>

          <div className="mt-20 w-full">
            <p className="text-center text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest">
              Powered by modern infrastructure
            </p>
            {/* Tech stack logos */}
            <div className="flex flex-wrap justify-center gap-x-30 gap-y-8">
              {/* Placeholders for logos */}
              <Link 
              href={"https://nextjs.org/"} 
              className="flex items-center justify-center"
              
              >
                <Image
                  src={nextImg}
                  alt="nextjs"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
              </Link>
              <Link href={"https://next-auth.js.org/"}>
                <Image
                  src={nextAuthImg}
                  alt="next auth"
                  width={75}
                  height={75}
                  className="cursor-pointer"
                />
              </Link>
              <Link href={"https://redis.io/"}>
                <Image
                  src={redisImg}
                  alt="redis icon"
                  width={75}
                  height={75}
                  className="cursor-pointer"
                />
              </Link>
              <Link href={"https://www.prisma.io/"}>
                <Image
                  src={prismaImg}
                  alt="prisma"
                  width={75}
                  height={75}
                  className="cursor-pointer"
                />
              </Link>
              <Link href={"https://supabase.com/"}>
                <Image
                  src={supabaseImg}
                  alt="supabase"
                  width={75}
                  height={75}
                  className="cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </div>

        <section className="py-24 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-mono">
                Under the hood
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We combined the best tools to create a seamless developer
                experience.
              </p>
            </div>

            {/* <BentoGrid /> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Security */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold">
                   🛡️
                </div>
                <h3 className="font-semibold text-xl mb-2">
                  Type-Safe Security
                </h3>
                <p className="text-gray-500">
                  End-to-end type safety with TypeScript.
                </p>
              </div>

              {/* Card 2: Performance */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600 font-bold">
                  ⚡
                </div>
                <h3 className="font-semibold text-xl mb-2">Lightning Fast</h3>
                <p className="text-gray-500">
                  Redis-powered caching via Upstash for high-performance session
                  management.
                </p>
              </div>

              {/* Card 3: Database */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600 font-bold">
                   🗄️
                </div>
                <h3 className="font-semibold text-xl mb-2">Scalable Storage</h3>
                <p className="text-gray-500">
                  PostgreSQL database managed by Supabase and orchestrated by
                  Prisma ORM.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-gray-500 border-t border-gray-100">
          <p>Built by Srijan using Next.js 16</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
