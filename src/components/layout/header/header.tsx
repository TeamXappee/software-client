import Link from "next/link";
import { ToggleThemeBtn } from "@/components/shared/theme/toggleThemeBtn";
import Image from "next/image";
import { HeaderAvatarMenu } from "./menu";
import { getCurrentSession } from "../../../../auth";
import { File, NotebookText, Table2 } from "lucide-react";
import SidebarLink, { SideBarLinkText } from "../sidebar/sidebarLink";

export default async function Header() {
  const session = await getCurrentSession();
  return (
    <div className="h-[var(--header-height)] ">
      <div className="fixed w-full h-[var(--header-height)] bg-background z-50 border-b border-input px-4 py-2 flex justify-between items-center ">
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
            <SidebarLink href="/">
              <Table2 size={20} /> <SideBarLinkText>Dashboard</SideBarLinkText>
            </SidebarLink>
            <SidebarLink href="/orders">
              <NotebookText size={20} />{" "}
              <SideBarLinkText>Import/Export</SideBarLinkText>
            </SidebarLink>
            <SidebarLink href="/uploaded-files">
              <File size={20} /> <SideBarLinkText>Files</SideBarLinkText>
            </SidebarLink>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ToggleThemeBtn />
          <HeaderAvatarMenu user={session?.user} />
        </div>
      </div>
    </div>
  );
}
