import Link from "next/link";
import { ToggleThemeBtn } from "@/components/shared/theme/toggleThemeBtn";
import Image from "next/image";
import { HeaderAvatarMenu } from "./menu";
import { getCurrentSession } from "../../../../auth";

export default async function Header() {
  const session = await getCurrentSession();
  return (
    <div className="h-[var(--header-height)] ">
      <div className="fixed w-full h-[var(--header-height)] bg-background z-50 border-b border-input px-4 py-2 flex justify-between items-center ">
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
          <ToggleThemeBtn />
          <HeaderAvatarMenu user={session?.user} />
        </div>
      </div>
    </div>
  );
}
