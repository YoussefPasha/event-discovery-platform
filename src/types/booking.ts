export interface BookingFormData {
  name: string;
  email: string;
  mobile: string;
  date: string;
  eventId: string;
}

export interface Ticket {
  id: string;
  eventTitle: string;
  eventDate: string;
  bookingDate: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketNumber: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

