import { z } from 'zod';

/**
 * Validation schema for booking form
 * Uses Zod for type-safe validation with custom error messages
 */
export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, 'Name can only contain letters and spaces'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  mobile: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Please enter a valid phone number (e.g., +1234567890)'
    ),
  
  date: z
    .string()
    .min(1, 'Please select a date')
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Please select a future date'),
  
  eventId: z.string().min(1, 'Event ID is required'),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

/**
 * Helper function to validate booking data
 * @param data - Booking form data
 * @returns Validation result
 */
export function validateBooking(data: unknown) {
  return bookingSchema.safeParse(data);
}

