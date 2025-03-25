'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MyBookingsClient from "@/components/MyBookingsClient";
import getMyBookings from "@/libs/bookingFunction/getMyBookings";
import getCampgrounds from "@/libs/campgroundFunction/getCampgrounds";

export default async function MyBookings({ token }: { token: string }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Please log in to view your bookings</div>;
  }

  try {
    const [bookingsResponse, campgroundsResponse] = await Promise.all([
      getMyBookings(token),
      getCampgrounds()
    ]);

    const bookings = bookingsResponse.data || [];
    const campgrounds = campgroundsResponse.data || [];

    return (
      <MyBookingsClient 
        bookingsData={bookings} 
        campgroundsData={campgrounds} 
        token={token} 
      />
    );
  } catch (error) {
    console.error("Error fetching bookings or campgrounds:", error);
    return <div>Error loading bookings</div>;
  }
}