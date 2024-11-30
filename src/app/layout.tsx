import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";



export const metadata: Metadata = {
  title: 'Hacker News Clone',
  description: 'A modern Hacker News clone built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
        {children}
      </body>
    </html>
  );
}

// Add cache control headers
export function generateHeaders() {
  return {
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=599'
  };
}