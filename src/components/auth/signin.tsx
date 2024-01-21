import * as React from "react";
import { Input } from "../ui/input";
import { SignInWithGoogle } from "../shared/signinWithGoogle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SigninDrawer({
  handleSetWhichFlowToRender,
}: {
  handleSetWhichFlowToRender?: (whichFlow: "signin" | "signup") => void;
}) {
  return (
    <div className="mx-auto w-full max-w-sm ">
      <div className="pt-2 flex flex-col items-center">
        <h1 className="font-semibold text-xl">Sign In</h1>
        <p className="text-sm">Welcome back sign in to your account.</p>
      </div>
      <form className="py-6 space-y-4 flex flex-col items-center px-10">
        <Input placeholder="Email" type="email" required />
        <Input placeholder="Password" type="password" required />
        <Button className="font-semibold flex justify-center hover:bg-primary-hover text-lg w-full ">
          Sign In
        </Button>
      </form>
      <hr className=" mb-6  mx-20 border-2 rounded-full" />
      <div className="px-10">
        <SignInWithGoogle />
      </div>
      <div className="flex flex-col  gap-2 items-center mt-4 text-muted-foreground">
        {handleSetWhichFlowToRender ? (
          <button
            onClick={() => handleSetWhichFlowToRender("signup")}
            className="gap-1 m-0 flex items-center text-sm hover:text-secondary-foreground"
          >
            Create a new account
          </button>
        ) : (
          <Link href="/auth/signup" className="hover:text-secondary-foreground">
            Create a new account
          </Link>
        )}

        <button className="gap-1 m-0 flex items-center text-sm hover:text-secondary-foreground">
          <span>Forgot password</span>
        </button>
      </div>
    </div>
  );
}
