import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";
import { dir } from "@/lib/utils/dir";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const ibmPlexArabic = localFont({
  src: [
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexSansArabic-Text.otf",
      weight: "450",
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
      className={locale === "ar" ? ibmPlexArabic.className : poppins.className}
    >
      <body className="flex min-h-screen min-w-full flex-col scroll-smooth antialiased">
        <NextIntlClientProvider messages={messages}>
          <div
            className={`${poppins.variable} ${ibmPlexArabic.variable} ${
              isRTL ? "font-ibm-plex-arabic" : "font-poppins"
            } min-h-screen flex flex-col bg-gray-50`}
          >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
