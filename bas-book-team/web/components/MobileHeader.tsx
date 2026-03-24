"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Market",
    href: "/market",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 14l4-4 3 3 5-6 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Portfolio",
    href: "/portfolios",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "Signals",
    href: "/signals",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 10a5 5 0 0 1 5-5M15 10a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 10a8 8 0 0 1 8-8M18 10a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Academy",
    href: "/academy",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 7v6M18 7v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 8.5v4a5 5 0 0 0 10 0v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Vault",
    href: "/vault",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="1" fill="currentColor"/>
        <path d="M13 7l1-1M7 7L6 6M13 13l1 1M7 13l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="md:hidden flex items-center justify-between px-4 py-4 border-b border-[#21262d] bg-[#0D1117]">
        <div>
          <div className="text-[#BDFF00] font-black text-base tracking-wider leading-none">NEON LEDGER</div>
          <div className="text-[#8b949e] text-[10px] font-semibold tracking-widest mt-0.5">ELITE PRO</div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-[#8b949e] hover:text-white p-1"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-[260px] bg-[#0D1117] border-r border-[#21262d] flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#21262d]">
              <div>
                <div className="text-[#BDFF00] font-black text-lg tracking-wider leading-none">NEON LEDGER</div>
                <div className="text-[#8b949e] text-xs font-semibold tracking-widest mt-1">ELITE PRO</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#8b949e] hover:text-white p-1"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "border-l-2 border-[#BDFF00] text-white bg-[#161b22] pl-[10px]"
                        : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 py-6 border-t border-[#21262d]">
              <button className="w-full bg-[#BDFF00] text-black font-bold text-sm rounded-full py-2.5 hover:bg-[#d4ff33] transition-colors">
                DEPOSIT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
