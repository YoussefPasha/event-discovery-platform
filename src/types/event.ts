export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  endDate?: string;
  location: {
    venue: string;
    city: string;
    state: string;
    country: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  price: number | 'free';
  attendeeCount: number;
  maxAttendees: number;
  organizer: {
    name: string;
    avatar: string;
  };
  featured: boolean;
  createdAt: string;
}

export interface EventFilters {
  search?: string;
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  priceRange?: 'free' | 'paid' | 'all';
}

