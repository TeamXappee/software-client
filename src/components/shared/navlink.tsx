"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = (props: {
  children: string | React.ReactNode;
  href: string;
  className?: string;
}) => {
  const pathname = usePathname()
  return (
    <li className=" list-none">
      <Link
        className={cn(
          ` text-sm py-2 px-3 rounded-2xl flex gap-2 items-center ${
            pathname === props.href ? "bg-red-600/20 cursor-default  text-muted-foreground" : " hover:bg-secondary hover:-mt-1 ease-in-out duration-150"
          }`,
          props.className
        )}
        href={props.href}
      >
        {props.children}
      </Link>
    </li>
  );
};
