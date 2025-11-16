import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  CalendarIcon,
  CurrencyIcon,
  LocationIcon,
  UsersIcon,
} from "@/components/ui/Icons";
import type { Locale } from "@/constants/locales";
import { Link } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/api/base-url";
import { getAllEventSlugs, getEventBySlug } from "@/lib/api/events";
import { formatDate, formatTime } from "@/lib/utils/date";
import { generateEventJsonLd, generateMetaDescription } from "@/lib/utils/seo";
import type { Event } from "@/types/event";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export const dynamic = "force-static";

export const dynamicParams = false;

const getEvent = cache(
  async (slug: string, locale: string): Promise<Event | null> => {
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(
        `${baseUrl}/api/events/${encodeURIComponent(slug)}?locale=${locale}`,
        {
          cache: "force-cache",
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.event as Event;
      }
    } catch {
      try {
        return await getEventBySlug(slug, locale as Locale);
      } catch (fallbackError) {
        console.error("Error in fallback getEventBySlug:", fallbackError);
      }
    }

    return null;
  }
);

export async function generateStaticParams() {
  try {
    const slugs = getAllEventSlugs();
    const locales: Locale[] = ["en", "ar"];

    const params = locales.flatMap((locale) =>
      slugs.map((item) => ({
        locale,
        slug: item.slug,
      }))
    );

    return params;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const event = await getEvent(slug, locale);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const description = generateMetaDescription(event);

  return {
    title: `${event.title} | Event Discovery Platform`,
    description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "website",
      images: [
        {
          url: event.imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;

  const event = await getEvent(slug, locale);

  if (!event) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "eventDetail" });
  const jsonLd = generateEventJsonLd(event);
  const availableSpots = event.maxAttendees - event.attendeeCount;
  const isSoldOut = availableSpots <= 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {event.featured && <Badge variant="warning">{t("featured")}</Badge>}
            <Badge variant="primary">{event.category}</Badge>
            {isSoldOut && <Badge variant="danger">{t("soldOut")}</Badge>}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CalendarIcon />
                <span className="font-semibold">{t("dateTime")}</span>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(event.date, "PPPP")}
              </p>
              <p className="text-gray-700">{formatTime(event.date)}</p>
              {event.endDate && (
                <p className="text-sm text-gray-600 mt-1">
                  {t("until")} {formatDate(event.endDate, "PPP")}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <LocationIcon />
                <span className="font-semibold">{t("location")}</span>
              </div>
              <p className="text-gray-900 font-medium">
                {event.location.venue}
              </p>
              <p className="text-gray-700">
                {event.location.city}, {event.location.state}
              </p>
              <p className="text-gray-700">{event.location.country}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CurrencyIcon />
                <span className="font-semibold">{t("price")}</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {event.price === "free" ? t("free") : `$${event.price}`}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <UsersIcon />
                <span className="font-semibold">{t("attendees")}</span>
              </div>
              <p className="text-gray-900">
                <span className="font-bold">{event.attendeeCount}</span> /{" "}
                {event.maxAttendees}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {availableSpots > 0
                  ? `${availableSpots} ${t("spotsLeft")}`
                  : t("soldOut")}
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t("aboutEvent")}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.longDescription}
            </p>
          </div>

          {event.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("tags")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <Image
              src={event.organizer.avatar}
              alt={event.organizer.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-gray-600">{t("organizedBy")}</p>
              <p className="font-semibold text-gray-900 text-lg">
                {event.organizer.name}
              </p>
            </div>
          </div>

          <div className="sticky bottom-4 bg-white border-t border-gray-200 pt-4 -mx-4 px-4">
            <Link href={`/events/${event.slug}/book`}>
              <Button size="lg" className="w-full" disabled={isSoldOut}>
                {isSoldOut ? t("soldOut") : t("bookTicket")}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
