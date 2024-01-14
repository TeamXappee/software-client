"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRightCircle } from "lucide-react";
import { Input } from "../ui/custom/labeled-input";
import { SignInWithGoogle } from "../shared/buttons/signinWithGoogle";
import { useEffect } from "react";

export function RegisterModal({
  handleTogggleRegisterInstead,
}: {
  handleTogggleRegisterInstead: () => void;
}) {
  useEffect(() => {
    return () => {
      handleTogggleRegisterInstead();
    }
  }, []);

  return (
    <DialogContent className="sm:max-w-[400px] flex flex-col space-y-4 ">
      <DialogHeader className="px-1">
        <DialogTitle className="font-medium text-xl">Register</DialogTitle>
      </DialogHeader>
      <div className="grid gap-6 ">
        <Input
          id="email"
          type="email"
          label="Email"
          labelClassName="bg-background"
          className="h-14"
        />
        <Button
          type="submit"
          size={"xl"}
          className=" bg-primary  text-primary-foreground w-full text-lg h-14 font-semibold flex items-center gap-2 "
        >
          Continue <ArrowRightCircle size={18} />
        </Button>
      </div>
      <hr className="w-[30%] ml-[35%] border-2 rounded-full" />
      <SignInWithGoogle />
      <div className="space-y-2 flex flex-col items-center">
        <button
          onClick={handleTogggleRegisterInstead}
          className="flex  w-fititems-center gap-2 justify-center  hover:underline font-medium"
        >
          Log in instead
        </button>
      </div>
    </DialogContent>
  );
}
