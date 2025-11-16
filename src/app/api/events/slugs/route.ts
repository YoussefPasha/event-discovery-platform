import { NextResponse } from "next/server";
import { LocalizedEvent } from "@/types/event";
import mockEvents from "@/data/mock-events.json";

export async function GET() {
  try {
    const localizedEvents = mockEvents as LocalizedEvent[];
    const slugs: { slug: string; locale: string }[] = [];

    // Generate params for both AR and EN slugs
    localizedEvents.forEach((event) => {
      slugs.push({ slug: event.slug.en, locale: "en" });
      slugs.push({ slug: event.slug.ar, locale: "ar" });
    });

    return NextResponse.json(
      {
        success: true,
        slugs,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching event slugs:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch event slugs",
      },
      { status: 500 }
    );
  }
}

