import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Booking Agent Helper",
  description: "Manage your customer bookings easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-gray-50")}>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar / Header */}
          <header className="w-full md:w-64 bg-blue-600 text-white p-4 md:min-h-screen shadow-md">
            <div className="flex flex-row md:flex-col justify-between items-center md:items-start h-full">
              <div>
                <h1 className="text-xl font-bold mb-0 md:mb-8">Ticket Agent</h1>
                <p className="text-xs text-blue-100 hidden md:block mb-6">Aapka travel partner</p>
              </div>
              <nav className="flex flex-row md:flex-col gap-4 md:w-full">
                <Link href="/" className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">Dashboard</Link>
                <Link href="/tickets" className="px-3 py-2 rounded hover:bg-blue-700 transition-colors">Tickets</Link>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
