import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/privacy`,
      languages: {
        en: `/en/privacy`,
        ar: `/ar/privacy`,
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

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-sm text-gray-600 mb-8">{t("lastUpdated")}</p>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <p className="text-lg leading-relaxed">{t("intro")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("section1Title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("section1Content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("section2Title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("section2Content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("section3Title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("section3Content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("section4Title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("section4Content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{t("section5Title")}</h2>
          <p className="text-gray-700 leading-relaxed">{t("section5Content")}</p>
        </section>
      </div>
    </div>
  );
}

