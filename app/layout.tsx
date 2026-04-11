import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import AuthProvider from "@/components/AuthProvider";
import CustomCursor from "./components/CustomCursor";

const redHatDisplay = localFont({
  src: [
    {
      path: "../public/Red_Hat_Display/RedHatDisplay-VariableFont_wght.ttf",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../public/Red_Hat_Display/RedHatDisplay-Italic-VariableFont_wght.ttf",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  title: "Barrwit - International Consulting & Investment",
  description: "An organization where you find growth, not just for businesses but for people who live in something big.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We can't access pathname in root layout, so we'll use a different approach
  // Header and Footer will be included here, but admin layout will override them
  return (
    <html lang="en">
      <body className={`${redHatDisplay.variable} font-sans antialiased`}>
        <AuthProvider>
          <CustomCursor />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
