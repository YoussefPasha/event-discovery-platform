import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  other: {
    "preconnect": "https://images.unsplash.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
