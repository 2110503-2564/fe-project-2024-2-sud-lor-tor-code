import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import BookingListClient from "@/components/BookingListClient";
import getBookings from "@/libs/bookingFunction/getBookings";
import getCampgrounds from "@/libs/campgroundFunction/getCampgrounds";

export default async function BookingsList({ token }: { token: string }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Please log in to view all bookings</div>;
  }

  try {
    const [bookingsResponse, campgroundsResponse] = await Promise.all([
      getBookings(token),
      getCampgrounds()
    ]);

    return (
      <BookingListClient 
        bookingsData={bookingsResponse} 
        campgroundsData={campgroundsResponse.data || []} 
        token={token} 
      />
    );
  } catch (error) {
    console.error("Error fetching bookings or campgrounds:", error);
    return <div>Error loading bookings</div>;
  }
}