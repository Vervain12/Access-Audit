import {
  Geist,
  Geist_Mono,
  Inter,
  Outfit,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Access Audit",
  description: "AI-Powered Accessibility Auditing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`h-full flex flex-col ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${outfit.variable} antialiased font-inter`}
      >
        <Header />
        <main className="flex-1 bg-white">
          {children}          
        </main>
      </body>
    </html>
  );
}
