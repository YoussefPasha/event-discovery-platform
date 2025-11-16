'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingSchema } from '@/lib/validations/booking';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SuccessModal from '@/components/booking/SuccessModal';

export default function BookTicketPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('booking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventId: params.slug as string,
    },
  });

  const onSubmit = async (data: BookingSchema) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-locale': locale,
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setShowSuccess(true);
        
        // Redirect after 2.5 seconds
        setTimeout(() => {
          router.push('/tickets');
        }, 2500);
      } else {
        setError(result.error || t('errorMessage'));
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Booking Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <Input
              {...register('name')}
              label={t('name')}
              placeholder={t('namePlaceholder')}
              error={errors.name?.message}
              disabled={isSubmitting}
            />
            
            {/* Email */}
            <Input
              {...register('email')}
              type="email"
              label={t('email')}
              placeholder={t('emailPlaceholder')}
              error={errors.email?.message}
              disabled={isSubmitting}
            />
            
            {/* Mobile */}
            <Input
              {...register('mobile')}
              type="tel"
              label={t('mobile')}
              placeholder={t('mobilePlaceholder')}
              error={errors.mobile?.message}
              disabled={isSubmitting}
              helperText={t('mobileHelper')}
            />
            
            {/* Date */}
            <Input
              {...register('date')}
              type="date"
              label={t('selectDate')}
              error={errors.date?.message}
              disabled={isSubmitting}
            />

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                <p className="font-medium">{t('error')}</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>{t('note')}</strong> {t('demoNote')}
          </p>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccess}
        title={t('success')}
        message={t('successMessage')}
        redirectingText={t('redirecting')}
      />
    </div>
  );
}

