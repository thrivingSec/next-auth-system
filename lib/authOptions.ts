import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Error from authorize :: All fields are required");
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
            },
          });
          if (!user) {
            throw new Error("Please provide valid credentials");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Please provide valid credentials");
          }
          return {
            id: user.id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log("Error from authorize :: ", error);
          throw error;
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id = user.id.toString()
      }
      return token
    },
    async session({session, token}){
      if(session.user){
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages:{
    signIn:'/login',
    error:'/login'
  },
  session:{
    strategy:'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret:process.env.NEXTAUTH_SECRET
};
