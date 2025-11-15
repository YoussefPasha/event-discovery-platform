import { Event, EventFilters } from '@/types/event';
import mockEvents from '@/data/mock-events.json';

// Simulate API delay for realistic behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches events with optional filtering
 * @param filters - Optional filters for search, category, location, date, and price
 * @returns Filtered and sorted array of events
 */
export async function getEvents(filters?: EventFilters): Promise<Event[]> {
  await delay(300); // Simulate network latency
  
  let events = mockEvents as Event[];
  
  // Apply search filter
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    events = events.filter(event => 
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search) ||
      event.tags.some(tag => tag.toLowerCase().includes(search)) ||
      event.category.toLowerCase().includes(search)
    );
  }
  
  // Apply category filter
  if (filters?.category && filters.category !== 'all') {
    events = events.filter(event => event.category === filters.category);
  }
  
  // Apply location filter
  if (filters?.location) {
    const location = filters.location.toLowerCase();
    events = events.filter(event => 
      event.location.city.toLowerCase().includes(location) ||
      event.location.country.toLowerCase().includes(location) ||
      event.location.venue.toLowerCase().includes(location)
    );
  }
  
  // Apply start date filter
  if (filters?.startDate) {
    events = events.filter(event => new Date(event.date) >= new Date(filters.startDate!));
  }
  
  // Apply end date filter
  if (filters?.endDate) {
    events = events.filter(event => new Date(event.date) <= new Date(filters.endDate!));
  }
  
  // Apply price range filter
  if (filters?.priceRange === 'free') {
    events = events.filter(event => event.price === 'free');
  } else if (filters?.priceRange === 'paid') {
    events = events.filter(event => event.price !== 'free');
  }
  
  // Sort by date (upcoming events first)
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return events;
}

/**
 * Fetches a single event by its slug
 * @param slug - The event slug
 * @returns Event object or null if not found
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  await delay(200);
  
  const event = (mockEvents as Event[]).find(e => e.slug === slug);
  return event || null;
}

/**
 * Fetches all featured events
 * @returns Array of featured events
 */
export async function getFeaturedEvents(): Promise<Event[]> {
  await delay(200);
  
  return (mockEvents as Event[]).filter(e => e.featured);
}

/**
 * Gets all unique categories from events
 * @returns Sorted array of category names
 */
export async function getCategories(): Promise<string[]> {
  const events = mockEvents as Event[];
  const categories = [...new Set(events.map(e => e.category))];
  return categories.sort();
}

/**
 * Gets all unique locations (cities) from events
 * @returns Sorted array of city names
 */
export async function getLocations(): Promise<string[]> {
  const events = mockEvents as Event[];
  const cities = [...new Set(events.map(e => e.location.city))];
  return cities.sort();
}

