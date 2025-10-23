"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Capabilities" },
  { href: "/network", label: "Network" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Connect" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-black/10 bg-paper/80">
      <div className="bg-primary text-white text-xs tracking-[0.25em] uppercase">
        <div className="container-xl py-2 text-center sm:text-left">Structural Change. Disciplined Perspective.</div>
      </div>
      <div className="container-xl flex items-center justify-between py-5">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg sm:text-xl font-semibold tracking-[0.25em] uppercase text-primary">
            Aureon Capital
          </Link>
          <p className="hidden lg:block text-xs text-muted max-w-sm leading-relaxed">
            Insight-led advisory and research for institutions operating at the intersection of technology and capital markets.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden border border-black/20 rounded-full px-4 py-2 text-sm"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="primary-navigation"
          >
            Menu
          </button>
          <nav
            id="primary-navigation"
            className={`${
              open
                ? "block absolute left-0 right-0 top-full bg-paper/95 border-t border-black/5 shadow-lg sm:shadow-none sm:border-0 sm:bg-transparent"
                : "hidden"
            } sm:flex sm:static sm:translate-y-0 sm:gap-8 text-sm font-medium text-muted`}
          >
            <ul className={`sm:flex sm:gap-8 ${open ? "p-6 space-y-4" : ""}`}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className="block hover:text-primary transition-colors duration-200"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/contact"
            className="hidden sm:inline-flex btn btn-primary text-xs tracking-wide uppercase"
          >
            Speak With Us
          </Link>
        </div>
      </div>
    </header>
  );
}
