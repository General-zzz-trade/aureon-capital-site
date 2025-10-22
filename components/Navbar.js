'use client';
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/70 sticky top-0 z-50 backdrop-blur">
      <div className="container-xl flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-lg">AUREON CAPITAL LIMITED</Link>
        <button className="sm:hidden border border-zinc-700 rounded-md px-3 py-1" onClick={()=>setOpen(!open)}>Menu</button>
        <nav className={`sm:flex gap-6 ${open ? 'block mt-3' : 'hidden sm:flex'}`}>
          <Link className="hover:text-primary" href="/about">About</Link>
          <Link className="hover:text-primary" href="/services">Services</Link>
          <Link className="hover:text-primary" href="/insights">Insights</Link>
          <Link className="hover:text-primary" href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}