"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/calendar", label: "Calendar" },
  { href: "/practice", label: "Practice" },
  { href: "/teams", label: "Teams" },
  { href: "/community", label: "Community" },
  { href: "/leaderboard", label: "Ranks" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="nav-elevated sticky top-0 z-50 border-b-[3px] border-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="logo-mark flex h-10 w-10 items-center justify-center font-sketch text-lg font-bold transition-transform group-hover:-rotate-3">
            C
          </div>
          <div className="hidden sm:block">
            <span className="font-sketch text-2xl font-bold leading-none text-ink">
              CaseCompHub
            </span>
            <span className="block text-xs font-bold text-muted">
              casecomphub.com
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 font-hand text-sm font-bold transition-colors",
                  active
                    ? "border-b-[3px] border-black"
                    : "text-muted hover:text-black"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="sketch-btn p-2 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="surface-muted border-t-2 border-dashed border-black/20 px-4 py-3 md:hidden">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2.5 font-hand text-sm font-bold",
                  active ? "underline decoration-2" : "text-muted"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}