'use server'
import BookingListClient from "./BookingListClient";

export default async function BookingList({ bookingsJson, token }: { bookingsJson: Promise<BookingJson>, token: string }) {
    const bookingsData = await bookingsJson;
    return <BookingListClient bookingsData={bookingsData} token={token} />;
}