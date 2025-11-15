import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Discovery Platform",
  description: "Discover and book amazing events in your area",
};

// Root layout with HTML structure
// Locale-specific attributes are handled by the [locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}

