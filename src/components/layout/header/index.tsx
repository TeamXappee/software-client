import Logo from "@/components/shared/logo";
import { HeaderAvatarMenu } from "./menu";
import ThemeTogglerBtn from "@/components/shared/theme/togglerBtn";
import Nav from "./nav";
import AuthManager from "@/components/auth/authManager";

export default function Header({ session }: Readonly<{ session: any }>) {
  return (
    <header className="flex justify-between  p-6 items-center">
      <div className="flex justify-between w-1/3 gap-8 ">
        <Logo />
        <Nav />
      </div>
      <section className="flex gap-4 items-center">
        <ThemeTogglerBtn />
        {session ? (
          <HeaderAvatarMenu user={session?.user} />
        ) : (
         <AuthManager/>
        )}
      </section>
    </header>
  );
}
