"use client";

import { useState, useEffect } from "react";
import getMyBookings from "@/libs/bookingFunction/getMyBookings";
import { Dayjs } from "dayjs";
import DateReserve from "./DateReserve";

export default function MyBookings({
  bookingsData,
  token,
}: {
  bookingsData: BookingJson;
  token: string;
}) {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getMyBookings(token);
        setBookings(response.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        showSnackbar("An error occurred while fetching bookings", true);
      }
    };

    fetchBookings();
  }, [token]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const showSnackbar = (message: string, isError = false) => {
    setSnackbarMessage(message);
    setTimeout(() => setSnackbarMessage(null), 3000);
  };

  const renderBookingItem = (booking: BookingItem) => (
    <div className="space-y-3 h-full flex flex-col justify-between">
      <div>
        <div className="text-xl text-gray-900 font-semibold border-b border-gray-100 pb-2">
          {booking.fullname || "Guest"}
        </div>
        <div className="grid grid-cols-1 gap-2 text-gray-700 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Phone Number:</span>
            <span>{booking.tel || "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">User ID:</span>
            <span>{booking.user || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Location:</span>
            <span>{booking.campground?.name || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Date:</span>
            <span>{formatDate(booking.bookingDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Bookings
        </h1>

        {bookings.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {bookings.map((booking) => (
              <div
                className="bg-white rounded-xl px-4 sm:px-6 py-5 border border-gray-100 shadow-md 
                hover:shadow-xl transition-all duration-300 w-full sm:w-[calc(50%-1rem)] 
                lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] flex flex-col"
                key={booking._id}
              >
                {renderBookingItem(booking)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p
              className="text-gray-500 text-lg font-medium bg-white rounded-lg 
            p-4 inline-block shadow-md"
            >
              No bookings available
            </p>
          </div>
        )}
      </div>
      {snackbarMessage && (
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
          bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl z-50
          animate-fade-in flex items-center space-x-2 max-w-xs sm:max-w-sm md:max-w-md text-center"
        >
          <span>{snackbarMessage}</span>
        </div>
      )}
    </main>
  );
}
