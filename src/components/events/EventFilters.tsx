'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface EventFiltersProps {
  categories: string[];
}

export default function EventFilters({ categories }: EventFiltersProps) {
  const t = useTranslations('filters');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for form inputs
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'all',
    location: searchParams.get('location') || '',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    priceRange: searchParams.get('priceRange') || 'all',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      location: '',
      startDate: '',
      endDate: '',
      priceRange: 'all',
    });
    
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== '' && value !== 'all'
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('selectCategory')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <Input
            type="text"
            placeholder={t('locationPlaceholder')}
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>

        {/* Start Date */}
        <div>
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            label={t('startDate')}
          />
        </div>

        {/* End Date */}
        <div>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            label={t('endDate')}
          />
        </div>

        {/* Price Range */}
        <div>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('priceRange')}: All</option>
            <option value="free">Free Events</option>
            <option value="paid">Paid Events</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={applyFilters} disabled={isPending}>
          {isPending ? 'Applying...' : t('applyFilters')}
        </Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} disabled={isPending}>
            {t('clearFilters')}
          </Button>
        )}
      </div>
    </div>
  );
}

