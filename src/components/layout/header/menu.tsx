"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/shared/userAvatar";
import { TUser } from "../../../../auth";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export function HeaderAvatarMenu({ user }: { user: TUser }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button>
          <UserAvatar className="rounded-full" user={user} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent   align={"end"}>
        <DropdownMenuGroup>
          <DropdownMenuItem >
            <button
              className="flex w-full justify-between"
              onClick={() => signOut()}
            >
              Sign out <LogOutIcon size={17} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
