import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-20">
      <div className="container-xl py-10 text-sm text-gray-400 space-y-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="text-white font-semibold text-base">AUREON CAPITAL LIMITED</div>
            <p className="text-gray-400">
              Strategic intelligence, quantitative engineering, and governance advisory for institutional digital asset mandates.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-white font-semibold text-base">Company</div>
            <p>Registered in Hong Kong</p>
            <p>Business Registration No. 78966763</p>
            <p>Unit 2A, 17/F, Glenealy Tower<br />No.1 Glenealy, Central, Hong Kong</p>
          </div>
          <div className="space-y-3">
            <div className="text-white font-semibold text-base">Contact</div>
            <p>contact@aureoncapitallimited.com</p>
            <p>partnerships@aureoncapitallimited.com</p>
            <p>+852 3106 3896</p>
          </div>
          <div className="space-y-3">
            <div className="text-white font-semibold text-base">Key Links</div>
            <ul className="space-y-2">
              <li><Link className="hover:text-primary" href="/company">Company Framework</Link></li>
              <li><Link className="hover:text-primary" href="/services">Services</Link></li>
              <li><Link className="hover:text-primary" href="/insights">Insights</Link></li>
              <li><Link className="hover:text-primary" href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} AUREON CAPITAL LIMITED — All rights reserved.
        </div>
      </div>
    </footer>
  );
}