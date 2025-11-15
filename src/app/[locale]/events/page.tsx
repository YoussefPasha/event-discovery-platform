import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getEvents, getCategories } from '@/lib/api/events';
import EventGrid from '@/components/events/EventGrid';
import EventFilters from '@/components/events/EventFilters';
import { Suspense } from 'react';
import { EventGridSkeleton } from '@/components/ui/LoadingSkeleton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });
  
  return {
    title: `${t('title')} | Event Discovery Platform`,
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    priceRange?: 'free' | 'paid' | 'all';
  }>;
}

export default async function EventsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const filters = await searchParams;
  const t = await getTranslations({ locale, namespace: 'events' });
  
  // Fetch events and categories in parallel
  const [events, categories] = await Promise.all([
    getEvents(filters),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 text-lg">{t('subtitle')}</p>
      </div>
      
      <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow mb-8 animate-pulse h-40" />}>
        <EventFilters categories={categories} />
      </Suspense>
      
      <Suspense fallback={<EventGridSkeleton />}>
        <EventGrid events={events} />
      </Suspense>
    </div>
  );
}

