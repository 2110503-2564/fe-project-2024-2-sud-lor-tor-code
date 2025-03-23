"use client";

import { useState, useEffect } from "react";
import getCampground from "@/libs/campgroundFunction/getCampground";
import { deleteBooking } from "@/libs/bookingFunction/delBooking";

export default function BookingListClient({ bookingsData, token }: { bookingsData: BookingJson, token: string }) {
    const [bookings, setBookings] = useState<BookingItem[]>(bookingsData.data);
    const [campgroundMap, setCampgroundMap] = useState<Record<string, CampgroundItem>>({});

    useEffect(() => {
        const fetchCampgrounds = async () => {
            const uniqueCampgroundIds = Array.from(new Set(
                bookingsData.data.map(booking => booking?.campground?._id).filter(Boolean)
            ));

            if (uniqueCampgroundIds.length > 0) {
                const responses = await Promise.all(uniqueCampgroundIds.map(id => getCampground(id)));
                const map = responses.reduce((acc, response) => {
                    if (response?.data?._id) acc[response.data._id] = response.data;
                    return acc;
                }, {} as Record<string, CampgroundItem>);

                setCampgroundMap(map);
            }
        };

        fetchCampgrounds();
    }, [bookingsData]);

    const handleDelete = async (bookingId: string) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        await deleteBooking(bookingId, token);
        setBookings(prev => prev.filter(b => b._id !== bookingId));
    };

    return (
        <main className="bg-white p-5 shadow-md">
            {bookings.length > 0 ? (
                bookings.map((bookItems) => {
                    const campground = campgroundMap[bookItems.campground?._id];
                    return (
                        <div className="bg-slate-100 rounded-lg px-6 py-4 mx-4 my-3 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                            key={bookItems._id}>
                            <div className="text-lg text-gray-800 font-semibold mb-2">
                                Name - LastName: {bookItems.fullname || '-'}
                            </div>
                            <div className="text-md text-gray-600 mb-1">Tel: {bookItems.tel || '-'}</div>
                            <div className="text-md text-gray-600 mb-1">
                                Campground: {campground ? campground.name : 'Unknown'}
                                {!campground && bookItems.campground?._id ? ` (ID: ${bookItems.campground._id})` : ''}
                            </div>
                            <div className="text-md text-gray-600 mb-1">
                                Location: {campground?.district || '-'}, {campground?.province || '-'} {campground?.postalcode || '-'}
                            </div>
                            <div className="text-md text-gray-600 mb-1">
                                Daily Rate: {campground?.dailyrate ? `${campground.dailyrate} THB` : '-'}
                            </div>
                            <div className="text-md text-gray-600 mb-4">
                                BookDate: {new Date(bookItems.bookingDate).toLocaleDateString('en-GB')}
                            </div>
                            <button className="bg-sky-600 hover:bg-indigo-600 hover:scale-105 text-white font-medium 
                            py-2 px-4 rounded-md shadow-md transition-transform duration-200 mt-4"
                                onClick={() => handleDelete(bookItems._id)}>
                                Delete
                            </button>
                        </div>
                    );
                })
            ) : (
                <div className="text-xl text-gray-500 text-center mt-8">No Booking</div>
            )}
        </main>
    );
}
