"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-cream-300 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-cream-300">
            <Link href="/admin" className="font-serif text-xl font-bold text-emerald">
              Admin Panel
            </Link>
            <p className="text-xs text-charcoal-500 mt-1">Ahmad Rafay Handwork</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all",
                    isActive
                      ? "bg-emerald text-white"
                      : "text-charcoal-600 hover:bg-cream-200"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-cream-300 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-charcoal-600 hover:bg-cream-200 transition-all"
            >
              <Home className="h-5 w-5" />
              View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-terracotta hover:bg-terracotta/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
