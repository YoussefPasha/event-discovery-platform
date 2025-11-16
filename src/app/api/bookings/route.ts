import { BookingFormData } from "@/types/booking";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.email ||
      !body.mobile ||
      !body.date ||
      !body.eventId
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success response with booking details
    const booking = {
      id: Math.random().toString(36).substring(7),
      ...body,
      ticketNumber: `TKT-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`,
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking confirmed successfully!",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking",
      },
      { status: 500 }
    );
  }
}
