import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/contexts/sessionProvider";
import { ThemeProvider } from "@/contexts/themeProvider";
import Header from "@/components/layout/header/header";
import Sidebar from "@/components/layout/sidebar/sidebar";
import Footer from "@/components/layout/footer/footer";
import { getCurrentSession } from "../../auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xappee",
  description: "Xappee software development",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <Header />
            <div className="flex  w-full">
              <Sidebar user={session?.user} />
              <main className="min-h-[var(--container-height)] p-4 w-full">
                {children}
              </main>
            </div>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
