import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(typeof credentials.password, "yoo");
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client: MongoClient = clientPromise;
        const db = client.db(); // Get the default database

        // Find user by email in the 'users' collection
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });

        if (!user) {
          return null;
        }

        // Validate password
        const passwordsMatch = await bcrypt.compare(
          credentials.password.toString(),
          user.password // The hashed password from the database
        );

        if (!passwordsMatch) {
          return null;
        }

        // Return the user object (without the password)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
});
