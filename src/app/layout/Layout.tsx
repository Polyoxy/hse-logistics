"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
