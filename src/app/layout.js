"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/component/Navbar/Navbar";
import { Footer } from "@/component/componentindex";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "./providers";
import dotenv from "dotenv";
dotenv.config();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NextUIProvider>
            <Navbar />
            {children}
            <Footer />
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
