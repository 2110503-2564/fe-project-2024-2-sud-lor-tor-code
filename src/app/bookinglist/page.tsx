import BookingCatalog from "@/components/BookingCatalog"
import getBookings from "@/libs/bookingFunction/getBookings"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function MyBooking() {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null;

    const bookings = await getBookings(session.user.token);

    return (
        <main>
            <Suspense fallback={<p>loading... <LinearProgress /></p>}>
                <BookingCatalog bookingsJson={bookings}></BookingCatalog>
            </Suspense>

        </main>
    )
}