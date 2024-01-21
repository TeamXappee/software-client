"use client";
import { Btn } from "@/components/ui/btn";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SignInWithGoogle = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const url = searchParams.get("callbackUrl ");

  useEffect(() => {
    return setLoading(false);
  }, []);
  return (
    <button
      className="flex items-center justify-center w-full rounded-2xl   h-12 font-normal relative gap-2  overflow-hidde bg-blue-700 text-white hover:text-white hover:bg-blue-800"
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: url || "/" });
      }}
    >
      {loading ? (
        <span className="flex gap-2 text-md sm:text-xl items-center">
          <Loader2Icon className=" animate-spin" /> Signing you in
        </span>
      ) : (
        <>
          <Image
            src={"/google.svg"}
            width={16}
            height={16}
            priority
            alt="G"
            className=" bg-white w-[24%] border border-input border-r-0 sm:w-[20%order-input borde] h-12  p-2 absolute -left-[1px] rounded-l-2xl  "
          />
          <span className="text-center sm:block text-base font-medium ml-[24%]">
            Continue with Google
          </span>
        </>
      )}
    </button>
  );
};
