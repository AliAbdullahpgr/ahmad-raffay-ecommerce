"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";
import { AdminSidebar } from "~/components/layout/AdminSidebar";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();
  
  // Don't check auth for login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-cream">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
