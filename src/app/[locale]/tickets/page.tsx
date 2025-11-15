import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getMyTickets } from '@/lib/api/bookings';
import TicketTable from '@/components/tickets/TicketTable';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tickets' });
  
  return {
    title: `${t('title')} | Event Discovery Platform`,
    description: t('subtitle'),
  };
}

export default async function MyTicketsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tickets' });
  const tickets = await getMyTickets();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 text-lg">{t('subtitle')}</p>
      </div>

      {/* Tickets Table - Client Component */}
      <TicketTable tickets={tickets} />
    </div>
  );
}

