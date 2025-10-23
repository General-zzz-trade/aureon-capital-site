import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "AUREON CAPITAL LIMITED",
  description: "Strategic intelligence and disciplined research for institutional investors navigating structural change.",
  openGraph: {
    title: "AUREON CAPITAL LIMITED",
    description: "Strategic intelligence and disciplined research for institutional investors navigating structural change.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-paper text-ink`}> 
        <Navbar />
        <main className="container-xl py-16 space-y-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
