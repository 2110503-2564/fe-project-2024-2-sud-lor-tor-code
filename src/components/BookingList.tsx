'use client'
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeBooking } from "@/redux/features/bookSlice"

export default function BookingList() {

    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <main className="bg-white p-5 shadow-md">
            <>
                {bookItems.length > 0 ?
                    bookItems.map((bookItems, index) => (
                        <div className="bg-slate-100 rounded-lg px-6 py-4 mx-4 my-3 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
                            key={index}>
                            <div className="text-lg text-gray-800 font-semibold mb-2">Name - LastName: {bookItems.nameLastname}</div>
                            <div className="text-md text-gray-600 mb-1">Tel: {bookItems.tel}</div>
                            <div className="text-md text-gray-600 mb-1">Campground: {bookItems.campground}</div>
                            <div className="text-md text-gray-600 mb-4">BookDate: {bookItems.bookDate}</div>
                            <button className="bg-sky-600 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-md transform transition-all hover:scale-105"
                            onClick={() => dispatch(removeBooking(bookItems))}>
                                Remove from BookingList
                            </button>
                        </div>
                    )) : 
                    <div className="text-xl text-gray-500 text-center mt-8">No Campground Booking</div>
                }
            </>
        </main>
    )
}
