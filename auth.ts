import { NextAuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Array of authentication providers.
 * Each provider object contains the necessary configuration for authentication.
 */
const providers = [
  Google({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    authorization: {
      params: {
        scope:
          "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      },
    },
  }),
];
const pages = {
  signIn: "/login",
  signOut: "/signout",
  newUser: "/register",
};
const callbacks = {};

export const AuthOptions = {
  providers: providers,
  callbacks: callbacks,
  pages: pages,
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export const getCurrentSession = () => getServerSession(AuthOptions);
export type TUser =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;
