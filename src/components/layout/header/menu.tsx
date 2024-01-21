"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { UserAvatar } from "@/components/shared/avatarMenu/userAvatar";
import { UserData } from "../../../../auth";
import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export function HeaderAvatarMenu({ user }: { user: UserData }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button>
          <UserAvatar user={user} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <p className="text-xs font-semibold">{user?.name}</p>
            <p className="text-xs font-normal text-muted-foreground">
              {user?.email?.length! >= 25
                ? `${user?.email?.slice(0, 25)}..`
                : user?.email}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" justify-between">
            Profile <User size={19} />
          </DropdownMenuItem>
          <button className="w-full" onClick={() => signOut()}>
            <DropdownMenuItem className=" justify-between">
              Sign out <LogOut size={17} />
            </DropdownMenuItem>
          </button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
