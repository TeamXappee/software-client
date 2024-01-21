"use client";
import { SigninDrawer } from "../auth/signin";
import { useState } from "react";
import { SignupDrawer } from "./signup";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

export default function AuthManager() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const RenderSelectedFlow = () => {
    const [whichFlowToRender, setWhichFlowToRender] = useState<
      "signup" | "signin"
    >("signin");

    const handleSetWhichFlowToRender = (
      whichFlowToRender: "signup" | "signin"
    ) => {
      setWhichFlowToRender(whichFlowToRender);
    };
    return (
      <>
        {whichFlowToRender === "signin" ? (
          <SigninDrawer
            handleSetWhichFlowToRender={handleSetWhichFlowToRender}
          />
        ) : (
          <SignupDrawer
            handleSetWhichFlowToRender={handleSetWhichFlowToRender}
          />
        )}
      </>
    );
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:bg-primary-hover" size={"sm"}>
            Sign In <ArrowRight size={15} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <RenderSelectedFlow />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="hover:bg-primary-hover" size={"sm"}>
          Sign In <ArrowRight size={15} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[32rem] ">
        <RenderSelectedFlow />
      </DrawerContent>
    </Drawer>
  );
}
