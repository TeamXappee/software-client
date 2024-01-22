import { cn } from "@/lib/utils";
import React from "react";

export default function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-lg font-semibold  text-secondary-foreground flex items-center gap-2",
        className
      )}
    >
      {children}
    </h1>
  );
}
