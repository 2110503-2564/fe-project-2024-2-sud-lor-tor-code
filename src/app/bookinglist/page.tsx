import BookingList from "@/components/BookingList"
import getBookings from "@/libs/bookingFunction/getBookings"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getUserProfile from "@/libs/authFunction/getUserProfile";

export default async function MyBooking() {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)

    if (profile.data.role !== 'admin') {
        return <p>You do not have permission to access this page.</p>;
    }

    const bookings = await getBookings(session.user.token);

    return (
        <main>
            <Suspense fallback={<p>loading... <LinearProgress /></p>}>
                <BookingList bookingsJson={bookings} token={session.user.token}></BookingList>
            </Suspense>
        </main>
    );
}
