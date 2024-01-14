"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Dot } from "lucide-react";

interface SidebarLinkProps extends LinkProps {
  children: ReactNode | string;
  className?: string;
  sideBarMin: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  children,
  className,
  sideBarMin,
  ...props
}) => {
  const pathname = usePathname();
  const isActiveRoute = pathname === props.href;
  return (
    <Link
      className={cn(
        `w-full flex items-center rounded-lg py-2 px-4 text-base font-medium  
       ${
         isActiveRoute
           ? "bg-muted text-muted-foreground cursor-auto shadow-sm"
           : "hover:bg-muted "
       }
       ${sideBarMin ? " justify-center" : "justify-between "} `,
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2 ">{children}</span>
      {isActiveRoute && <Dot size={20} className="text-green-500" />}
    </Link>
  );
};

export default SidebarLink;

export const SideBarLinkText = ({
  children,
  sideBarMin,
}: {
  children: string;
  sideBarMin: boolean;
}) => {
  if (sideBarMin) return null;
  return <span>{children}</span>;
};
