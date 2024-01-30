"use client";
import { SigninDrawer } from "../auth/signin";
import { useState } from "react";
import { SignupDrawer } from "./signup";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "../ui/button";
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
          <Button size={"sm"} className="font-medium rounded-2xl text-sm">
            Get Started
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
        <Button size={"sm"} className="font-medium rounded-2xl text-sm">
          Get Started
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[32rem] ">
        <RenderSelectedFlow />
      </DrawerContent>
    </Drawer>
  );
}
