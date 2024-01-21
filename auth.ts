import { NextAuthOptions, Session, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";

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
};
const callbacks = {};

export const AuthOptions = {
  providers: providers,
  callbacks: callbacks,
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export const getCurrentSession = () => getServerSession(AuthOptions);

export type UserData =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;
