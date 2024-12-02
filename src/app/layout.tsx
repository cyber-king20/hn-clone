import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";



export const metadata: Metadata = {
  title: 'Hacker News Clone',
  description: 'A modern Hacker News clone built with Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Header pathname={pathname} />
        {children}
      </body>
    </html>
  );
}

