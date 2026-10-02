"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={`flex min-h-screen flex-col ${isHome ? "bg-ink" : "bg-dark"}`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
