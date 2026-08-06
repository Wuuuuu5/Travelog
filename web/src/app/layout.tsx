import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/navbar-wrapper";
import ThemeProvider from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <NavbarWrapper />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
