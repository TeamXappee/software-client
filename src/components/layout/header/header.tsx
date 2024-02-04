import Link from "next/link";
import { ToggleThemeBtn } from "@/components/shared/theme/toggleThemeBtn";
import Image from "next/image";
import { HeaderAvatarMenu } from "./menu";
import { getCurrentSession } from "../../../../auth";
import {
  DownloadCloud,
  File,
  NotebookText,
  Package,
  PoundSterling,
  Table2,
  Users2,
} from "lucide-react";
import NavLink, { NavLinkText } from "./navLink";
import { Button } from "@/components/ui/button";
import AuthManager from "@/components/auth/authManager";

export default async function Header() {
  const session = await getCurrentSession();
  return (
    <div className="h-[var(--header-height)] ">
      <div className=" w-full h-[var(--header-height)] bg-background z-50 border-b border-input px-4 py-2 flex justify-between items-center ">
        <div className="flex gap-4">
          <Link href="/">
            <Image
              priority
              className="text-center w-[35%]  relative top-[2px]"
              src="/xappee_logo_large.png"
              alt="xappee"
              width="200"
              height="200"
            />
          </Link>
          <div className="flex items-center gap-2">
            <NavLink href="/">
              <Table2 size={17} /> <NavLinkText>Dashboard</NavLinkText>
            </NavLink>
            <NavLink href="/items">
              <Package size={17} />
              <NavLinkText>Items</NavLinkText>
            </NavLink>
            <NavLink href="/uploaded-files">
              <Users2 size={15} /> <NavLinkText>Clients</NavLinkText>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ToggleThemeBtn />
          {session ? (
            <HeaderAvatarMenu user={session?.user} />
          ) : (
            <AuthManager />
          )}
        </div>
      </div>
    </div>
  );
}
