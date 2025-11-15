import { BookingFormData, Ticket } from '@/types/booking';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates booking creation via API
 * @param bookingData - The booking form data
 * @returns Ticket object with confirmation details
 */
export async function createBooking(bookingData: BookingFormData): Promise<Ticket> {
  await delay(1000); // Simulate API processing time
  
  // Simulate potential API errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to create booking. Please try again.');
  }
  
  // Generate ticket
  const ticket: Ticket = {
    id: Math.random().toString(36).substring(7),
    eventTitle: bookingData.eventId, // In real app, would fetch event title
    eventDate: bookingData.date,
    bookingDate: new Date().toISOString(),
    attendeeName: bookingData.name,
    attendeeEmail: bookingData.email,
    ticketNumber: `TKT-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    status: 'confirmed',
  };
  
  return ticket;
}

/**
 * Gets mock tickets for demonstration
 * In a real app, this would fetch from a database or API
 * @returns Array of mock tickets
 */
export async function getMyTickets(): Promise<Ticket[]> {
  await delay(300);
  
  // Mock ticket data
  const mockTickets: Ticket[] = [
    {
      id: '1',
      eventTitle: 'Tech Summit Dubai 2025',
      eventDate: '2025-12-15T09:00:00Z',
      bookingDate: '2025-11-10T14:30:00Z',
      attendeeName: 'Ahmed Mohammed',
      attendeeEmail: 'ahmed@example.com',
      ticketNumber: 'TKT-1731597234-AB3D5',
      status: 'confirmed',
    },
    {
      id: '2',
      eventTitle: 'Arabic Music Festival',
      eventDate: '2025-12-20T19:00:00Z',
      bookingDate: '2025-11-12T10:15:00Z',
      attendeeName: 'Fatima Ali',
      attendeeEmail: 'fatima@example.com',
      ticketNumber: 'TKT-1731683421-XY9K2',
      status: 'confirmed',
    },
    {
      id: '3',
      eventTitle: 'Dubai Fashion Week',
      eventDate: '2025-12-03T19:00:00Z',
      bookingDate: '2025-11-08T16:45:00Z',
      attendeeName: 'Sara Hassan',
      attendeeEmail: 'sara@example.com',
      ticketNumber: 'TKT-1731425678-LM7P4',
      status: 'confirmed',
    },
  ];
  
  return mockTickets;
}

