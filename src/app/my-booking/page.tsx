import MyBookings from "@/components/MyBookings";
import getBookings from "@/libs/bookingFunction/getBookings"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getUserProfile from "@/libs/authFunction/getUserProfile";
import getMyBookings from "@/libs/bookingFunction/getMyBookings";

export default async function MyBooking() {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null

    const bookings = await getMyBookings(session.user.token);

    return (
        <main>
            <Suspense fallback={<p>loading... <LinearProgress /></p>}>
                <MyBookings bookingsJson={bookings} token={session.user.token}></MyBookings>
            </Suspense>
        </main>
    );
}
