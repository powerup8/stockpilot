import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'StockPilot — Simple Inventory Tracking',
  description:
    'Track inventory, catch low stock before it runs out, and search your products instantly. Built for small teams who are done with spreadsheets.',
  openGraph: {
    title: 'StockPilot — Simple Inventory Tracking',
    description:
      'Track inventory, catch low stock before it runs out, and search your products instantly.',
    url: 'https://stockpilot-jade.vercel.app',
    siteName: 'StockPilot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StockPilot — Simple Inventory Tracking',
    description:
      'Track inventory, catch low stock before it runs out, and search your products instantly.',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
