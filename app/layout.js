import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "AUREON CAPITAL LIMITED",
  description: "Strategic Intelligence for the Digital Asset Era.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container-xl py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}