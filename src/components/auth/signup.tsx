import * as React from "react";

import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignInWithGoogle } from "../shared/buttons/signinWithGoogle";

export function SignupDrawer({
  handleSetWhichFlowToRender,
}: {
  handleSetWhichFlowToRender?: (whichFlow: "signin" | "signup") => void;
}) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="pt-2 flex flex-col items-center">
        <h1 className="font-semibold text-xl">Sign Up</h1>
        <p className="font-sm">Create a new account.</p>
      </div>
      <form className="py-6 space-y-4 flex flex-col items-center px-10">
        <Input placeholder="Email" type="email" required />
        <Button className="font-semibold flex justify-center  w-full ">
          Continue
        </Button>
      </form>
      <hr className=" mb-6  mx-20 border-2 rounded-full" />
      <div className="px-10">
        <SignInWithGoogle />
      </div>
      <div className="flex flex-col  gap-2 items-center mt-4 text-muted-foreground">
        {handleSetWhichFlowToRender ? (
          <button
            onClick={() => handleSetWhichFlowToRender("signin")}
            className="gap-1 m-0 flex items-center text-sm hover:text-secondary-foreground"
          >
            Sign In instead
          </button>
        ) : (
          <Link href="/auth/signin" className="hover:text-secondary-foreground">Sign In instead</Link>
        )}
      </div>
    </div>
  );
}
