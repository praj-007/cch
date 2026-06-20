import type { Metadata } from "next";
import { Caveat, Patrick_Hand } from "next/font/google";
import { NavbarShell } from "@/components/navbar-shell";
import { Footer } from "@/components/footer";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CaseCompHub — Practice Ground for Case Competitions",
  description:
    "The dedicated practice ground for case competitions — where MBA and B-school students build real capability before competing in real events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${patrickHand.variable} h-full`}
    >
      <body className="paper-bg flex min-h-full flex-col font-hand antialiased">
        <NavbarShell />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}