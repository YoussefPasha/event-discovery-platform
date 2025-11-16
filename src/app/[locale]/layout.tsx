import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import QueryProvider from "@/components/providers/QueryProvider";
import { routing } from "@/i18n/routing";
import { dir } from "@/lib/utils/dir";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const ibmPlexArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={isRTL ? ibmPlexArabic.className : poppins.className}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ui-avatars.com" />
      </head>
      <body
        className={`${
          isRTL ? "font-ibm-plex-arabic" : "font-poppins"
        } flex min-h-screen min-w-full flex-col scroll-smooth antialiased bg-gray-50`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
