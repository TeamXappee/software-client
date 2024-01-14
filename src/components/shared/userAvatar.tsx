import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { TUser } from "@/auth";

export default function UserAvatar({
  user,
  className,
}: {
  user: TUser;
  className?: string;
}) {
  return (
    <Avatar className={cn("cursor-pointer h-[1.7rem] w-[1.7rem]", className)}>
      <AvatarImage
        className={className}
        src={user?.image ?? ""}
        alt={user?.name ?? ""}
      />
      <AvatarFallback
        className={cn(
          "bg-secondary text-secondary-foreground text-sm ",
          className
        )}
      >
        {user?.name?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
