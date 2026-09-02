import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SD Negeri Sumber Waru 2",
  description: "Situs resmi SD Negeri Sumber Waru 2",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1f2937" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
