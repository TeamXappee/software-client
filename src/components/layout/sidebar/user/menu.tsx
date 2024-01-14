import { AvatarMenuTrigger } from "./menuTrigger";
import {
  Loader2,
  LogOut,
  Menu,
  Settings,
  User as UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function UserSideBarMenu({
  user,
  handleSideBarMin,
  sideBarMin,
}: {
  user: any | undefined;
  handleSideBarMin: () => void;
  sideBarMin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [signoutStatus, setSignoutStatus] = useState("idle");
  const loading = signoutStatus === "loading";

  const handleSignOut = async () => {
    setSignoutStatus("loading");
    try {
      await signOut();
      setSignoutStatus("success");
    } catch (err) {
      setSignoutStatus("failed");
    }
  };
  return (
    <DropdownMenu modal={false} open={open}>
      <DropdownMenuTrigger onClick={() => setOpen(true)} asChild>
        <button className={`${sideBarMin ? "" : "w-full"}`}>
          <AvatarMenuTrigger sideBarMin={sideBarMin} user={user} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={() => setOpen(false)}
        loop
        className="w-60"
        align="center"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => setOpen(false)}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpen(false)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <button className="w-full" onClick={() => {handleSideBarMin(); setOpen(false)}}>
            <DropdownMenuItem>
              <Menu className="mr-2 h-4 w-4" />
              <span>{sideBarMin ? "Maximaize" : "Minimize"} sidebar</span>
            </DropdownMenuItem>
          </button>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <button className="w-full" disabled={loading} onClick={handleSignOut}>
            <DropdownMenuItem className=" justify-between">
              <div className="flex items-center">
                <LogOut className=" rotate-180 mr-2 h-4 w-4" />
                <span>Sign out</span>
              </div>
              {loading && <Loader2 size={16} className="animate-spin" />}
            </DropdownMenuItem>
          </button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
