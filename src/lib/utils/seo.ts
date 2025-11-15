import { Event } from '@/types/event';

/**
 * Generates JSON-LD structured data for an event
 * Following schema.org Event specification for rich snippets
 * @param event - Event object
 * @returns JSON-LD object
 */
export function generateEventJsonLd(event: Event) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.location.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        addressCountry: event.location.country,
      },
    },
    image: [event.imageUrl],
    organizer: {
      '@type': 'Organization',
      name: event.organizer.name,
      url: event.organizer.avatar,
    },
    offers: {
      '@type': 'Offer',
      price: event.price === 'free' ? '0' : event.price.toString(),
      priceCurrency: 'USD',
      availability: event.attendeeCount < event.maxAttendees 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/SoldOut',
      validFrom: event.createdAt,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${event.slug}`,
    },
    performer: {
      '@type': 'Organization',
      name: event.organizer.name,
    },
  };
}

/**
 * Generates meta description from event details
 * @param event - Event object
 * @returns SEO-optimized meta description
 */
export function generateMetaDescription(event: Event): string {
  const location = `${event.location.city}, ${event.location.country}`;
  const price = event.price === 'free' ? 'Free entry' : `From $${event.price}`;
  return `${event.description} ${price}. ${location}. Book your tickets now!`;
}

/**
 * Generates keywords from event data
 * @param event - Event object
 * @returns Comma-separated keywords string
 */
export function generateKeywords(event: Event): string {
  const keywords = [
    event.title,
    event.category,
    ...event.tags,
    event.location.city,
    event.location.country,
  ];
  return keywords.join(', ');
}

