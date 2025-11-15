import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import { Toaster } from "sonner";
import SessionProvider from "@/components/SessionProvider";

import "./globals.css";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibstedGrotesk",
  subsets: ["latin"],
});

const geistMono = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexEvent",
  description: "",
  icons: {
    icon: "/icons/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${schibstedGrotesk.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <Toaster position="top-center" richColors />
          <div className="absolute inset-0 top-0 z-[-1] min-h-screen light-rays-container">
            <LightRays
              raysOrigin="top-center"
              raysColor="#a855f7"
              raysSpeed={1.0}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0}
              distortion={0.01}
            />
          </div>

          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
