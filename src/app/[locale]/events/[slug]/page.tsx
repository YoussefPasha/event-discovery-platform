import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getEventBySlug } from '@/lib/api/events';
import { generateEventJsonLd, generateMetaDescription } from '@/lib/utils/seo';
import { formatDate, formatTime } from '@/lib/utils/date';
import { Link } from '@/i18n/routing';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { LocalizedEvent } from '@/types/event';

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  // Import the localized events directly to get all slugs
  const { default: localizedEvents } = await import('@/data/mock-events.json') as { default: LocalizedEvent[] };
  const slugs: { slug: string; locale: string }[] = [];
  
  // Generate params for both AR and EN slugs
  localizedEvents.forEach((event) => {
    slugs.push({ slug: event.slug.en, locale: 'en' });
    slugs.push({ slug: event.slug.ar, locale: 'ar' });
  });
  
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const event = await getEventBySlug(slug, locale as 'ar' | 'en');
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  const description = generateMetaDescription(event);

  return {
    title: `${event.title} | Event Discovery Platform`,
    description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: 'website',
      images: [
        {
          url: event.imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description,
      images: [event.imageUrl],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const event = await getEventBySlug(slug, locale as 'ar' | 'en');
  
  if (!event) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'eventDetail' });
  const jsonLd = generateEventJsonLd(event);
  const availableSpots = event.maxAttendees - event.attendeeCount;
  const isSoldOut = availableSpots <= 0;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {event.featured && (
              <Badge variant="warning">
                {t('featured')}
              </Badge>
            )}
            <Badge variant="primary">
              {event.category}
            </Badge>
            {isSoldOut && (
              <Badge variant="danger">
                {t('soldOut')}
              </Badge>
            )}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{event.title}</h1>
          
          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">{t('dateTime')}</span>
              </div>
              <p className="text-gray-900 font-medium">{formatDate(event.date, 'PPPP')}</p>
              <p className="text-gray-700">{formatTime(event.date)}</p>
              {event.endDate && (
                <p className="text-sm text-gray-600 mt-1">
                  {t('until')} {formatDate(event.endDate, 'PPP')}
                </p>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold">{t('location')}</span>
              </div>
              <p className="text-gray-900 font-medium">{event.location.venue}</p>
              <p className="text-gray-700">{event.location.city}, {event.location.state}</p>
              <p className="text-gray-700">{event.location.country}</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">{t('price')}</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {event.price === 'free' ? t('free') : `$${event.price}`}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-semibold">{t('attendees')}</span>
              </div>
              <p className="text-gray-900">
                <span className="font-bold">{event.attendeeCount}</span> / {event.maxAttendees}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {availableSpots > 0 ? `${availableSpots} ${t('spotsLeft')}` : t('soldOut')}
              </p>
            </div>
          </div>
          
          {/* Description */}
          <div className="prose prose-lg max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('aboutEvent')}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.longDescription}
            </p>
          </div>
          
          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <Badge key={tag} variant="default">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Organizer */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
            <Image
              src={event.organizer.avatar}
              alt={event.organizer.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-gray-600">{t('organizedBy')}</p>
              <p className="font-semibold text-gray-900 text-lg">{event.organizer.name}</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="sticky bottom-4 bg-white border-t border-gray-200 pt-4 -mx-4 px-4">
            <Link href={`/events/${event.slug}/book`}>
              <Button 
                size="lg" 
                className="w-full"
                disabled={isSoldOut}
              >
                {isSoldOut ? t('soldOut') : t('bookTicket')}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

