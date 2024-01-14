"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { Input } from "../ui/custom/labeled-input";
import { SignInWithGoogle } from "../shared/buttons/signinWithGoogle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterModal } from "./registerModalContent";

export function LoginModal() {
  const [registerInstead, setRegisterInstead] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleTogggleRegisterInstead = () => {
    setRegisterInstead(!registerInstead);
  };

  return (
    <Dialog onOpenChange={() => setRegisterInstead(false)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => router.push(pathname + "?callback=" + pathname)}
          size={"xl"}
          variant={"default"}
          className="flex justify-between items-center hover:bg-primary-hover shadow-md w-full h-12 text-lg font-medium"
        >
          Sign in <ArrowRight size={18} />
        </Button>
      </DialogTrigger>
      {registerInstead ? (
        <RegisterModal
          handleTogggleRegisterInstead={handleTogggleRegisterInstead}
        />
      ) : (
        <DialogContent className="sm:max-w-[400px] flex flex-col space-y-4 ">
          <DialogHeader className="px-1">
            <DialogTitle className="font-medium text-xl">Sign In</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 ">
            <Input
              id="email"
              type="email"
              label="Email"
              labelClassName="bg-background"
              className="h-14"
            />
            <Input
              labelClassName="bg-background"
              id="password"
              type="password"
              label="Password"
              className="h-14"
            />
            <Button
              type="submit"
              size={"xl"}
              className="w-full text-base h-14 "
            >
              Sign In
            </Button>
          </div>
          <hr className="w-[30%] ml-[35%] border-2 rounded-full" />
          <SignInWithGoogle />
          <div className="space-y-2 flex flex-col items-center">
            <button
              onClick={handleTogggleRegisterInstead}
              className="flex  w-fititems-center gap-2 justify-center  hover:underline font-medium"
            >
              Create a new account
            </button>
            <Link
              href="/register"
              className="flex  w-fititems-center gap-2 justify-center  hover:underline font-medium"
            >
              Forgot password{" "}
            </Link>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
