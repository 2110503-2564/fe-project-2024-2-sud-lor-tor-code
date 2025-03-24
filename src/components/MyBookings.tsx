'use server'
import MyBookingsClient from "./MyBookingsClient";

export default async function BookingList({ bookingsJson, token }: { bookingsJson: Promise<BookingJson>, token: string }) {
    const bookingsData = await bookingsJson;
    return <MyBookingsClient bookingsData={bookingsData} token={token} />;
}