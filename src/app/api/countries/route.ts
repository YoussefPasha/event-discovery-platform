import { Locale } from "@/constants/locales";
import { getCountries } from "@/lib/api/events";
import { getLocale } from "next-intl/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locale = await getLocale();
    const countries = await getCountries(locale as Locale);

    return NextResponse.json(
      {
        success: true,
        countries,
        count: countries.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch countries",
      },
      { status: 500 }
    );
  }
}

