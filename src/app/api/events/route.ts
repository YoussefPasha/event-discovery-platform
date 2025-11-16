import { Locale } from "@/constants/locales";
import { getEvents } from "@/lib/api/events";
import { EventFilters } from "@/types/event";
import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const locale = await getLocale();

    const filters: EventFilters = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      location: searchParams.get("location") || undefined,
      country: searchParams.get("country") || undefined,
      priceRange:
        (searchParams.get("priceRange") as "free" | "paid" | "all") ||
        undefined,
    };

    const events = await getEvents(filters, locale as Locale);

    return NextResponse.json(
      {
        success: true,
        events,
        count: events.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}
