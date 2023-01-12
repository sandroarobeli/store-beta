import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // test
import bcrypt from "bcryptjs";

import { connect, disconnect } from "../../../app/utils/db";
import User from "../../../app/models/User";

export const authOptions = {
  session: {
    strategy: "jwt", // Default is Database strategy (with adapter and jwt without)
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },

    async jwt({ token, user }) {
      // account, profile, isNewUser
      // user._id comes from the DB, token comes from NextAuth. Thus, we fill token with the data from DB
      // In other words, we personalize the token for the particular user
      if (user?.id) token.id = user.id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    // In turn token will customize the session for that particular user...
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await disconnect;
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // If there is a user with given email and password typed matches password in DB ==>
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "NA",
            isAdmin: user.isAdmin,
          };
        }
        // This returns Error(error) to the front end
        throw new Error("Invalid email or password");
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  events: {
    // Used for feedback and debugging
    // eslint-disable-next-line no-unused-vars
    async signIn(message) {
      await console.log("User has successfully signed in");
    },
    async signOut({ token }) {
      await console.log(`Session ${token} has ended`);
    },
  },
};

export default NextAuth(authOptions);
