import LayoutHeader from "@/components/header";
import Logo from "@/components/shared/logo";
import ThemeTogglerBtn from "@/components/shared/theme/togglerBtn";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <header className="fixed w-full top-0 p-8  flex justify-between">
        <Logo />
        <ThemeTogglerBtn />
      </header>
      {children}
    </div>
  );
}
