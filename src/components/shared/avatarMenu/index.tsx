"use client";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./userAvatar";
import { UserData } from "../../../../auth";
import { ArrowRight, Check } from "lucide-react";
import { signOut } from "next-auth/react";

export function WriterDropdownAvatarMenu({ user }: { user: UserData }) {
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const toggleSheetOpen = (e?: boolean) => setSheetOpen(e ?? !sheetOpen);
  if (!user) return null;


  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button>
            <UserAvatar user={user} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup className="">
            <DropdownMenuItem
              onClick={() => {
                toggleSheetOpen();
              }}
              className=" font-bold rounded-xl flex justify-between w-full"
            >
              <button className=" font-bold rounded-xl flex justify-between w-full">
                Stage blog <Check strokeWidth={2.5} size={18} />
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <button onClick={() => signOut()} className="w-full">
              <DropdownMenuItem className=" font-bold rounded-xl flex justify-between w-full ">
                Logout <ArrowRight size={18} />
              </DropdownMenuItem>
            </button>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
