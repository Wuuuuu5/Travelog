import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/navbar-wrapper";

export const metadata: Metadata = {
  title: "Travelog",
  description: "Compare New Zealand hotel prices in one search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
