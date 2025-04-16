import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Example font
import "./globals.css";

// Optional: Load a font like Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hex AI Game",
  description: "Play Hex against an AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* Apply font class if using one */}
      <body className={`${inter.className} h-full bg-background text-text-primary`}>
        {/* The main container enforcing viewport height and no scroll */}
        {/* Using flex flex-col ensures children can correctly use flex-grow */}
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Optional Navbar could go here */}
          {/* <Navbar /> */}

          {/* Main content area that takes up remaining space */}
          {/* overflow-hidden here might be redundant if page.tsx handles it, but reinforces the constraint */}
          <main className="flex-grow overflow-hidden">
            {children} {/* page.tsx content will be rendered here */}
          </main>

          {/* Optional Footer could go here */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
