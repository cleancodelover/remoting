import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts/providersContext";
import { ToastContainer } from "react-toastify";
import PopOver from "@/components/shared/pullover";
import PDFViewer from "@/components/shared/pdf-viewer";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Book Store",
  description: "Remoting book store. Discover the secrets in books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader />
        <Providers>
          {children}
          <ToastContainer />
          <PDFViewer />
          <PopOver />
        </Providers>
      </body>
    </html>
  );
}
