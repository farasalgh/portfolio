import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faraz Alghani | Full Stack Developer",
  description: "Portfolio website of Faraz Alghani, a Full Stack Developer specializing in React, Node.js, and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Node.js", "Next.js", "TypeScript", "Portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
