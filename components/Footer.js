import Link from "next/link";

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Capabilities" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/10 bg-[#14100E] text-white">
      <div className="container-xl py-16 grid gap-12 lg:grid-cols-[2fr,1fr,1fr]">
        <div className="space-y-4">
          <p className="eyebrow text-white/70">Aureon Capital Limited</p>
          <h2 className="heading-md text-white">Building resilient advantage through disciplined research.</h2>
          <p className="text-sm text-white/70 max-w-lg">
            A Hong Kong–incorporated advisory firm providing strategic intelligence, digital asset capability development, and
            risk advisory for global institutions.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-white transition-colors" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Contact</h3>
          <p>
            Unit 2A, 17/F, Glenealy Tower<br />No.1 Glenealy, Central, Hong Kong
          </p>
          <p>
            <a href="mailto:contact@aureoncapitallimited.com" className="hover:text-white">contact@aureoncapitallimited.com</a>
            <br />
            <a href="mailto:partnerships@aureoncapitallimited.com" className="hover:text-white">
              partnerships@aureoncapitallimited.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-xl py-6 text-xs text-white/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span>© {new Date().getFullYear()} AUREON CAPITAL LIMITED. All rights reserved.</span>
          <span>Business Registration No. 78966763 • Registered in Hong Kong</span>
        </div>
      </div>
    </footer>
  );
}
