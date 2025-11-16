"use client";

import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/date";
import { Ticket } from "@/types/booking";
import { useTranslations } from "next-intl";

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
  const t = useTranslations("tickets");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success">{t("statusConfirmed")}</Badge>;
      case "pending":
        return <Badge variant="warning">{t("statusPending")}</Badge>;
      case "cancelled":
        return <Badge variant="danger">{t("statusCancelled")}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("noTickets")}
        </h3>
        <p className="text-gray-600">
          You haven&apos;t booked any tickets yet. Browse events to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("ticketNumber")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("eventName")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("eventDate")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("bookingDate")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("status")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">
                  {ticket.ticketNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {ticket.eventTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(ticket.eventDate, "PP")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(ticket.bookingDate, "PP")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(ticket.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">
                {t("ticketNumber")}
              </span>
              <span className="text-sm font-mono font-medium text-gray-900">
                {ticket.ticketNumber}
              </span>
            </div>

            <div>
              <span className="text-xs font-medium text-gray-500 block mb-1">
                {t("eventName")}
              </span>
              <span className="text-sm text-gray-900">{ticket.eventTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-gray-500 block mb-1">
                  {t("eventDate")}
                </span>
                <span className="text-sm text-gray-700">
                  {formatDate(ticket.eventDate, "PP")}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 block mb-1">
                  {t("status")}
                </span>
                {getStatusBadge(ticket.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
