import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Event } from '@/types/event';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils/date';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const t = useTranslations('events');
  
  const availableSpots = event.maxAttendees - event.attendeeCount;
  const isSoldOut = availableSpots <= 0;

  return (
    <Card variant="bordered" className="hover:shadow-lg transition-shadow">
      <Link href={`/events/${event.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {event.featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="warning" size="sm">
                {t('featured')}
              </Badge>
            </div>
          )}
          {isSoldOut && (
            <div className="absolute top-2 right-2">
              <Badge variant="danger" size="sm">
                {t('soldOut')}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="primary" size="sm">
            {event.category}
          </Badge>
        </div>

        <Link href={`/events/${event.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date, 'PPP')}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location.city}, {event.location.country}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {event.price === 'free' ? t('free') : `$${event.price}`}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <span>{event.attendeeCount}</span>
            <span className="mx-1">/</span>
            <span>{event.maxAttendees}</span>
            <span className="ml-1">{t('attendees')}</span>
          </div>
        </div>

        <Link href={`/events/${event.slug}`} className="block mt-4">
          <Button className="w-full" disabled={isSoldOut}>
            {isSoldOut ? t('soldOut') : t('viewDetails')}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

