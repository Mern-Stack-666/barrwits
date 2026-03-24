import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatDisplay.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
