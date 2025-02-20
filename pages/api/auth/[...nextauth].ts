import prisma from "@/lib/prisma.client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials!.email || !credentials!.password)
          return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        });
        if (!user) return null;
        if (await bcrypt.compare(credentials.password, user.password))
          return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session) throw Error("No session found!");
      if (token) session.user!.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
