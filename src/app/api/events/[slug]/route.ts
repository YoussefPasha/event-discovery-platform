import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/lib/api/events";
import { Locale } from "@/constants/locales";
import { getLocale } from "next-intl/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = request.nextUrl;
    const localeParam = searchParams.get("locale");
    
    // Use locale from query param if provided, otherwise get from next-intl
    const locale = localeParam || (await getLocale());
    const { slug } = await params;

    const event = await getEventBySlug(slug, locale as Locale);

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
