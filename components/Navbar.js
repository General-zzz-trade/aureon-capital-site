'use client';
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/company", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);
  const mobileClasses = open
    ? "absolute left-0 right-0 top-full bg-zinc-950 border-t border-zinc-800 px-6 py-4 space-y-3"
    : "hidden";

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-50 backdrop-blur">
      <div className="container-xl flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-lg tracking-wide" onClick={closeMenu}>
          AUREON CAPITAL LIMITED
        </Link>
        <button
          className="sm:hidden border border-zinc-700 rounded-md px-3 py-1 text-sm text-gray-200"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <nav
          className={`${mobileClasses} sm:flex sm:relative sm:top-auto sm:left-auto sm:right-auto sm:bg-transparent sm:border-0 sm:p-0 sm:space-y-0 sm:gap-6`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              className="block text-gray-200 hover:text-primary"
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}