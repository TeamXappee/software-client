import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle({ children, className }: { children: React.ReactNode, className?: string}) {
  return <h1 className={cn("font-medium text-lg", className)}>{children}</h1>;
}
