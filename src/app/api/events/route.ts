import { NextRequest, NextResponse } from 'next/server';
import { getEvents } from '@/lib/api/events';
import { EventFilters } from '@/types/event';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract and parse filters from query parameters
    const filters: EventFilters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      location: searchParams.get('location') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      priceRange: (searchParams.get('priceRange') as 'free' | 'paid' | 'all') || undefined,
    };
    
    const events = await getEvents(filters);
    
    return NextResponse.json({ 
      success: true,
      events, 
      count: events.length 
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch events' 
      },
      { status: 500 }
    );
  }
}

