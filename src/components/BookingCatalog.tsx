import getCampground from "@/libs/campgroundFunction/getCampground";

export default async function BookingList({ bookingsJson }: { bookingsJson: Promise<BookingJson> }) {
    const bookingsData: BookingJson = await bookingsJson;
    
    console.log(bookingsData.data)
    const uniqueCampgroundIds = Array.from(new Set(
        bookingsData.data.filter(booking => booking?.campground?._id)
            .map(booking => booking.campground?._id) || []
    ));

    const campgroundMap = uniqueCampgroundIds.length > 0 ? 
        (await Promise.all(uniqueCampgroundIds.map(id => getCampground(id))))
            .reduce((map, response) => {
                if (response?.data?._id) map[response.data._id] = response.data;
                return map;
            }, {} as Record<string, CampgroundItem>) : {};

    return (
        <main className="bg-white p-5 shadow-md">
            {bookingsData.count > 0 && bookingsData.data?.length > 0 ? (
                bookingsData.data.map((bookItems: BookingItem, index) => {
                    const campground = campgroundMap[bookItems.campground?._id];
                    return (
                        <div className="bg-slate-100 rounded-lg px-6 py-4 mx-4 my-3 border border-gray-200 shadow-sm hover:shadow-lg transition-all" key={index}>
                            <div className="text-lg text-gray-800 font-semibold mb-2">Name - LastName: {bookItems.fullname || '-'}</div>
                            <div className="text-md text-gray-600 mb-1">Tel: {bookItems.tel || '-'}</div>
                            <div className="text-md text-gray-600 mb-1">
                                Campground: {campground ? campground.name : 'Unknown'}
                                {!campground && bookItems.campground?._id ? ` (ID: ${bookItems.campground._id})` : ''}
                            </div>
                            {campground && (
                                <>
                                    <div className="text-md text-gray-600 mb-1">
                                        Location: {campground.district}, {campground.province} {campground.postalcode}
                                    </div>
                                    <div className="text-md text-gray-600 mb-1">
                                        Daily Rate: {campground.dailyrate} THB
                                    </div>
                                </>
                            )}
                        <div className="text-md text-gray-600 mb-4">
                            BookDate: {new Date(bookItems.bookingDate).toLocaleDateString('en-GB')}
                        </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-xl text-gray-500 text-center mt-8">No Booking</div>
            )}
        </main>
    );
}
