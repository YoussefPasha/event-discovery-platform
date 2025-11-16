import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/api/events";
import { Locale } from "@/constants/locales";
import { getLocale } from "next-intl/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const locale = await getLocale();

    const event = await getEventBySlug(params.slug, locale as Locale);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: "Event not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        event,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch event",
      },
      { status: 500 }
    );
  }
}
