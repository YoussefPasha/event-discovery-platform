import EventFilters from "@/components/events/EventFilters";
import EventGrid from "@/components/events/EventGrid";
import { EventGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { Event } from "@/types/event";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });

  return {
    title: `${t("title")} | Event Discovery Platform`,
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    priceRange?: "free" | "paid" | "all";
  }>;
}

async function getEvents(
  filters: Record<string, string>,
  locale: string
): Promise<Event[]> {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const url = `${baseUrl}/api/events?${decodeURIComponent(
      queryParams.toString()
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["events"],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch events: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch events");
    }

    return data.events;
  } catch (error) {
    console.error("Error fetching events from API:", error);
    return [];
  }
}

export default async function EventsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const filters = await searchParams;
  const t = await getTranslations({ locale, namespace: "events" });

  const [events] = await Promise.all([
    getEvents(filters as Record<string, string>, locale),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("title")}</h1>
        <p className="text-gray-600 text-lg">{t("subtitle")}</p>
      </div>

      <Suspense
        fallback={
          <div className="bg-white p-6 rounded-lg shadow mb-8 animate-pulse h-40" />
        }
      >
        <EventFilters />
      </Suspense>

      <Suspense fallback={<EventGridSkeleton />}>
        <EventGrid events={events} />
      </Suspense>
    </div>
  );
}
