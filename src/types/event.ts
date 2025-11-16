export type LocalizedString = {
  ar: string;
  en: string;
};

export type LocalizedStringArray = {
  ar: string[];
  en: string[];
};

// Raw event structure with localized fields (as stored in JSON)
export interface LocalizedEvent {
  id: string;
  slug: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  longDescription: LocalizedString;
  date: string;
  endDate?: string;
  location: {
    venue: LocalizedString;
    city: LocalizedString;
    state: LocalizedString;
    country: LocalizedString;
  };
  category: LocalizedString;
  tags: LocalizedStringArray;
  imageUrl: string;
  price: number | 'free';
  attendeeCount: number;
  maxAttendees: number;
  organizer: {
    name: LocalizedString;
    avatar: string;
  };
  featured: boolean;
  createdAt: string;
}

// Flattened event structure for a specific locale (returned by API)
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

