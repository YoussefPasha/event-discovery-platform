import { Event, EventFilters, LocalizedEvent } from "@/types/event";
import { Locale } from "@/constants/locales";
import mockEvents from "@/data/mock-events.json";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Localizes an event by flattening localized fields to a specific locale
 * @param event - The localized event from JSON
 * @param locale - The target locale ('ar' or 'en')
 * @returns Flattened event with locale-specific strings
 */
function localizeEvent(event: LocalizedEvent, locale: Locale): Event {
  return {
    id: event.id,
    slug: event.slug[locale],
    title: event.title[locale],
    description: event.description[locale],
    longDescription: event.longDescription[locale],
    date: event.date,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      venue: event.location.venue[locale],
      city: event.location.city[locale],
      state: event.location.state[locale],
      country: event.location.country[locale],
    },
    category: event.category[locale],
    tags: event.tags[locale],
    imageUrl: event.imageUrl,
    price: event.price,
    attendeeCount: event.attendeeCount,
    maxAttendees: event.maxAttendees,
    organizer: {
      name: event.organizer.name[locale],
      avatar: event.organizer.avatar,
    },
    featured: event.featured,
    createdAt: event.createdAt,
  };
}

/**
 * Fetches events with optional filtering
 * @param filters - Optional filters for search, category, country, and price
 * @param locale - The locale for localized content (defaults to 'en')
 * @returns Filtered and sorted array of events
 */
export async function getEvents(
  filters?: EventFilters,
  locale: Locale = "en"
): Promise<Event[]> {
  await delay(300);

  const localizedEvents = mockEvents as LocalizedEvent[];
  let events = localizedEvents.map((event) => localizeEvent(event, locale));

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    events = events.filter(
      (event) =>
        event.title.toLowerCase().includes(search) ||
        event.description.toLowerCase().includes(search) ||
        event.tags.some((tag) => tag.toLowerCase().includes(search)) ||
        event.category.toLowerCase().includes(search)
    );
  }

  if (filters?.category && filters.category !== "all") {
    events = events.filter((event) => event.category === filters.category);
  }

  if (filters?.location) {
    const location = filters.location.toLowerCase();
    events = events.filter(
      (event) =>
        event.location.city.toLowerCase().includes(location) ||
        event.location.country.toLowerCase().includes(location) ||
        event.location.venue.toLowerCase().includes(location)
    );
  }

  if (filters?.country && filters.country !== "all") {
    events = events.filter((event) => {
      const countryKey = filters.country!;
      // Map country keys to their possible English and Arabic names
      const countryNames: Record<string, string[]> = {
        egypt: ["egypt", "مصر"],
        saudi: ["saudi arabia", "المملكة العربية السعودية"],
        uae: ["united arab emirates", "الإمارات العربية المتحدة"],
        qatar: ["qatar", "قطر"],
        kuwait: ["kuwait", "الكويت"],
        bahrain: ["bahrain", "البحرين"],
        jordan: ["jordan", "الأردن"],
        lebanon: ["lebanon", "لبنان"],
        morocco: ["morocco", "المغرب"],
        tunisia: ["tunisia", "تونس"],
      };

      const eventCountry = event.location.country.toLowerCase();
      return (
        countryNames[countryKey]?.some((name) =>
          eventCountry.includes(name.toLowerCase())
        ) || false
      );
    });
  }

  if (filters?.priceRange === "free") {
    events = events.filter((event) => event.price === "free");
  } else if (filters?.priceRange === "paid") {
    events = events.filter((event) => event.price !== "free");
  }

  events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return events;
}

export async function getEventBySlug(
  slug: string,
  locale: Locale = "en"
): Promise<Event | null> {
  await delay(200);

  const localizedEvents = mockEvents as LocalizedEvent[];
  const event = localizedEvents.find(
    (e) =>
      decodeURIComponent(e.slug.ar) === decodeURIComponent(slug) ||
      decodeURIComponent(e.slug.en) === decodeURIComponent(slug)
  );

  if (!event) return null;

  return localizeEvent(event, locale);
}

/**
 * Fetches all featured events
 * @param locale - The locale for localized content (defaults to 'en')
 * @returns Array of featured events
 */
export async function getFeaturedEvents(
  locale: Locale = "en"
): Promise<Event[]> {
  await delay(200);

  const localizedEvents = mockEvents as LocalizedEvent[];
  return localizedEvents
    .filter((e) => e.featured)
    .map((event) => localizeEvent(event, locale));
}

/**
 * Gets all unique categories from events
 * @param locale - The locale for localized content (defaults to 'en')
 * @returns Sorted array of category names in the specified locale
 */
export async function getCategories(locale: Locale = "en"): Promise<string[]> {
  const localizedEvents = mockEvents as LocalizedEvent[];
  const categories = [
    ...new Set(localizedEvents.map((e) => e.category[locale])),
  ];
  return categories.sort();
}

/**
 * Gets all unique locations (cities) from events
 * @param locale - The locale for localized content (defaults to 'en')
 * @returns Sorted array of city names in the specified locale
 */
export async function getLocations(locale: Locale = "en"): Promise<string[]> {
  const localizedEvents = mockEvents as LocalizedEvent[];
  const cities = [
    ...new Set(localizedEvents.map((e) => e.location.city[locale])),
  ];
  return cities.sort();
}
