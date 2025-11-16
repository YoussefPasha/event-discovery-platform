'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { LOCALES, type Locale } from '@/constants/locales';
import { mapParamsToObject } from '@/lib/utils/query-params';
import { cn } from '@/lib/utils/cn';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLocale, setOptimisticLocale] = useState<Locale | null>(null);
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const announcementRef = useRef<HTMLDivElement>(null);
  const searchParamsObject = mapParamsToObject(searchParams);
  const t = useTranslations('common');

  // Track if component is mounted to avoid hydration mismatch
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // Use optimistic locale for immediate UI feedback
  const displayLocale = optimisticLocale || currentLocale;

  // Handle language change with optimistic updates
  const handleLanguageChange = useCallback(
    (newLocale: Locale) => {
      // Don't do anything if clicking the current locale
      if (newLocale === currentLocale || isPending) return;

      // Set optimistic state for immediate UI feedback
      setOptimisticLocale(newLocale);

      startTransition(() => {
        try {
          // Announce language change to screen readers
          if (announcementRef.current) {
            const newLanguageName = t(newLocale);
            announcementRef.current.textContent = `Language changed to ${newLanguageName}`;
            
            // Clear announcement after 1 second
            setTimeout(() => {
              if (announcementRef.current) {
                announcementRef.current.textContent = '';
              }
            }, 1000);
          }

          // Navigate to the same page with new locale, preserving query params
          router.replace(
            { pathname, query: searchParamsObject },
            { locale: newLocale, scroll: false }
          );
        } catch {
          // Reset optimistic state on error
          setOptimisticLocale(null);
          
          if (announcementRef.current) {
            announcementRef.current.textContent = 'Failed to change language. Please try again.';
            
            setTimeout(() => {
              if (announcementRef.current) {
                announcementRef.current.textContent = '';
              }
            }, 3000);
          }
        }
      });
    },
    [currentLocale, isPending, pathname, router, searchParamsObject, t]
  );

  // Reset optimistic locale when actual locale matches
  if (optimisticLocale === currentLocale) {
    // Use queueMicrotask to avoid synchronous state updates during render
    queueMicrotask(() => setOptimisticLocale(null));
  }

  // Get localized language name
  const getLocaleName = (locale: Locale) => t(locale);

  return (
    <>
      {/* Screen reader announcement for language changes */}
      <div
        ref={announcementRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />

      {/* Language switcher buttons */}
      <div 
        className={cn('inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg shadow-sm', className)}
        role="group"
        aria-label="Language selector"
      >
        {LOCALES.map((locale) => {
          const isActive = locale === displayLocale;
          const languageLabel = getLocaleName(locale);
          
          return (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              disabled={isPending}
              className={cn(
                'relative px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100',
                'disabled:cursor-wait',
                {
                  // Active state - prominent blue with shadow
                  'bg-blue-600 text-white shadow-md transform scale-105': isActive && !isPending,
                  // Inactive state - subtle with hover effects
                  'bg-transparent text-gray-700 hover:bg-white hover:shadow-sm': !isActive && !isPending,
                  // Pending state
                  'opacity-60 cursor-wait': isPending,
                }
              )}
              aria-label={`Switch to ${languageLabel}${isActive ? ' (current language)' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              aria-busy={isPending}
              title={isActive ? `Current language: ${languageLabel}` : `Switch to ${languageLabel}`}
            >
              <span className="flex items-center gap-1.5">
                {/* Language abbreviation */}
                <span className={cn('text-base', { 'font-bold': isActive })}>
                  {locale === 'en' ? 'EN' : 'ع'}
                </span>
                
                {/* Active indicator - checkmark */}
                {isActive && (
                  <svg 
                    className="w-4 h-4 animate-in fade-in zoom-in duration-200" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
                
                {/* Loading indicator */}
                {isPending && optimisticLocale === locale && (
                  <svg 
                    className="w-4 h-4 animate-spin" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
              </span>
              
              {/* Full language name for screen readers */}
              <span className="sr-only">{languageLabel}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

