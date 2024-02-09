import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="min-h-[var(--container-height)] w-full">{children}</div>
      <Footer />
    </div>
  );
}
