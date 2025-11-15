import { MetadataRoute } from 'next';
import { getEvents } from '@/lib/api/events';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // Static pages for both locales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en/events`,
          ar: `${baseUrl}/ar/events`,
        },
      },
    },
    {
      url: `${baseUrl}/en/tickets`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/tickets`,
          ar: `${baseUrl}/ar/tickets`,
        },
      },
    },
  ];

  // Event detail pages for both locales
  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/en/events/${event.slug}`,
    lastModified: new Date(event.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/en/events/${event.slug}`,
        ar: `${baseUrl}/ar/events/${event.slug}`,
      },
    },
  }));

  // Event booking pages for both locales
  const bookingPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/en/events/${event.slug}/book`,
    lastModified: new Date(event.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${baseUrl}/en/events/${event.slug}/book`,
        ar: `${baseUrl}/ar/events/${event.slug}/book`,
      },
    },
  }));

  return [...staticPages, ...eventPages, ...bookingPages];
}

