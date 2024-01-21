"use client";

import { Button } from "@/components/ui/button";
import { Dot, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export default function ThemeTogglerBtn() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex border border-input rounded-xl h-8">
      <Button
        onClick={() => setTheme("light")}
        size={"icon"}
        className=" rounded-xl w-8 h-8  aspect-square dark:bg-transparent dark:hover:bg-secondary"
      >
        <SunIcon size={18} strokeWidth={1.8} />
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        size={"icon"}
        variant={"ghost"}
        className=" rounded-xl w-8 h-8  aspect-square dark:bg-primary dark:hover:bg-primary-hover"
      >
        <MoonIcon size={18} strokeWidth={1.8} />
      </Button>
    </div>
  );
}
