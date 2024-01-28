"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function MinimalThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className=" focus:outline-none active:outline-none z-20 w-8 h-8 relative  rounded-full shadow-none"
      variant={"ghost"}
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunIcon className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
