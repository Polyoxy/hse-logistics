"use client";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <main className="flex-grow">
      {children}
    </main>
  );
} 