import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/contact`,
      languages: {
        en: `/en/contact`,
        ar: `/ar/contact`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
      alternateLocale: locale === "en" ? "ar" : "en",
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 mb-12">{t("intro")}</p>

      <div className="space-y-12">
        {/* General Inquiries */}
        <section className="border-b pb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("generalInquiries")}</h2>
          <a
            href={`mailto:${t("generalEmail")}`}
            className="text-blue-600 hover:text-blue-800 text-lg font-medium"
          >
            {t("generalEmail")}
          </a>
          <p className="text-gray-700 mt-2">{t("generalDescription")}</p>
        </section>

        {/* Customer Support */}
        <section className="border-b pb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("supportTitle")}</h2>
          <a
            href={`mailto:${t("supportEmail")}`}
            className="text-blue-600 hover:text-blue-800 text-lg font-medium"
          >
            {t("supportEmail")}
          </a>
          <p className="text-gray-700 mt-2">{t("supportDescription")}</p>
        </section>

        {/* Business & Partnerships */}
        <section className="border-b pb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("businessTitle")}</h2>
          <a
            href={`mailto:${t("businessEmail")}`}
            className="text-blue-600 hover:text-blue-800 text-lg font-medium"
          >
            {t("businessEmail")}
          </a>
          <p className="text-gray-700 mt-2">{t("businessDescription")}</p>
        </section>

        {/* Business Hours */}
        <section className="border-b pb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("hoursTitle")}</h2>
          <p className="text-gray-700">{t("hoursContent")}</p>
        </section>

        {/* Social Media */}
        <section className="border-b pb-8">
          <h2 className="text-2xl font-semibold mb-4">{t("socialTitle")}</h2>
          <p className="text-gray-700">{t("socialDescription")}</p>
        </section>

        {/* Alternative Contact Methods */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("alternativeTitle")}</h2>
          <p className="text-gray-700">{t("alternativeDescription")}</p>
        </section>
      </div>
    </div>
  );
}

