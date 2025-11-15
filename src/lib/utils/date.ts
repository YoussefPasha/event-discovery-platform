import { format, formatDistance, isPast, isFuture, parseISO } from 'date-fns';

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @param formatStr - Format pattern (defaults to 'PPP' - e.g., "April 29, 1453")
 * @returns Formatted date string
 */
export function formatDate(dateString: string, formatStr: string = 'PPP'): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Formats a date string to a readable date and time
 * @param dateString - ISO date string
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'PPP p'); // e.g., "April 29, 1453 at 12:00 PM"
  } catch (error) {
    console.error('Error formatting date time:', error);
    return dateString;
  }
}

/**
 * Gets relative time from now (e.g., "in 5 days", "2 hours ago")
 * @param dateString - ISO date string
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return formatDistance(date, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
}

/**
 * Checks if an event is in the past
 * @param dateString - ISO date string
 * @returns True if date is in the past
 */
export function isEventPast(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return isPast(date);
  } catch (error) {
    console.error('Error checking if past:', error);
    return false;
  }
}

/**
 * Checks if an event is in the future
 * @param dateString - ISO date string
 * @returns True if date is in the future
 */
export function isEventUpcoming(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    return isFuture(date);
  } catch (error) {
    console.error('Error checking if upcoming:', error);
    return false;
  }
}

/**
 * Formats time only from a date string
 * @param dateString - ISO date string
 * @returns Time string (e.g., "2:30 PM")
 */
export function formatTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'p');
  } catch (error) {
    console.error('Error formatting time:', error);
    return dateString;
  }
}

