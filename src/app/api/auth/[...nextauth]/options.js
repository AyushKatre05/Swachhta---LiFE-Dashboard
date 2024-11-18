import { connect } from "@/database/mongo.config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User as UserModel } from "@/models/User";

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      connect();
      try {
        const findUser = await UserModel.findOne({ email: user.email });
        if (findUser) {
          return true;
        }
        await UserModel.create({
          email: user.email,
          name: user.name,
          role: "User",
        });
        return true;
      } catch (error) {
        console.log("The error is ", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...user,
          id: user._id.toString(), // Convert ObjectId to string
        };
      }
      return token;
    },

    async session({ session, token }) {
      // Add the user's ObjectId (id) to the session
      session.user = {
        ...token.user,
        id: token.user.id, // Add the ObjectId (converted to string) here
      };
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Welcome Back",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        connect();
        const user = await UserModel.findOne({ email: credentials?.email });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
