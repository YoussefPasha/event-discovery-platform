import { Locale } from "@/constants/locales";
import { getCategories } from "@/lib/api/events";
import { getLocale } from "next-intl/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const locale = await getLocale();
    const categories = await getCategories(locale as Locale);

    return NextResponse.json(
      {
        success: true,
        categories,
        count: categories.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

