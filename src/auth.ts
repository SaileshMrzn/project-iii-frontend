import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "database", // Store sessions in MongoDB
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a strong secret here
  pages: {
    signIn: "/signup",
  },
});
