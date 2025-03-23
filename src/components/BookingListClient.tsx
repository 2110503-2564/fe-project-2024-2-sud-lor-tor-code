"use client";

import { useState, useEffect } from "react";
import getCampground from "@/libs/campgroundFunction/getCampground";
import getCampgrounds from "@/libs/campgroundFunction/getCampgrounds";
import { deleteBooking } from "@/libs/bookingFunction/delBooking";
import { putBooking } from "@/libs/bookingFunction/putBooking";
import { Dayjs } from "dayjs";
import DateReserve from "./DateReserve";

export default function BookingListClient({
  bookingsData,
  token,
}: {
  bookingsData: BookingJson;
  token: string;
}) {
  const [bookings, setBookings] = useState<BookingItem[]>(bookingsData.data);
  const [campgroundMap, setCampgroundMap] = useState<
    Record<string, CampgroundItem>
  >({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [editForm, setEditForm] = useState<{
    bookingDate: string;
    campground: string;
  }>({
    bookingDate: "",
    campground: "",
  });
  const [allCampgrounds, setAllCampgrounds] = useState<CampgroundItem[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        if (response && response.data) {
          setAllCampgrounds(response.data);
          const map = response.data.reduce((acc: Record<string, CampgroundItem>, campground: CampgroundItem) => {
            if (campground._id) acc[campground._id] = campground;
            return acc;
          }, {} as Record<string, CampgroundItem>);
          setCampgroundMap(map);
        }
      } catch (error) {
        console.error("Error fetching all campgrounds:", error);
      }
    };

    fetchAllCampgrounds();
  }, []);

  useEffect(() => {
    const fetchMissingCampgrounds = async () => {
      const uniqueCampgroundIds = Array.from(
        new Set(
          bookingsData.data
            .map((booking) => booking.campground._id)
            .filter(Boolean)
        )
      );

      const missingCampgroundIds = uniqueCampgroundIds.filter(
        (id) => !campgroundMap[id]
      );

      if (missingCampgroundIds.length > 0) {
        const responses = await Promise.all(
          missingCampgroundIds.map((id) => getCampground(id))
        );

        const newMap = { ...campgroundMap };
        responses.forEach((response) => {
          if (response?.data?._id) newMap[response.data._id] = response.data;
        });

        setCampgroundMap(newMap);
      }
    };

    if (Object.keys(campgroundMap).length > 0) {
      fetchMissingCampgrounds();
    }
  }, [bookingsData, campgroundMap]);

  useEffect(() => {
    if (bookDate) {
      setEditForm(prev => ({
        ...prev,
        bookingDate: bookDate.format('YYYY-MM-DD')
      }));
    }
  }, [bookDate]);

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    await deleteBooking(bookingId, token);
    setBookings((prev) => prev.filter((b) => b._id !== bookingId));
  };

  const handleEdit = (booking: BookingItem) => {
    setEditingId(booking._id);
    const bookingDateStr = new Date(booking.bookingDate).toISOString().split("T")[0];
    setEditForm({
      bookingDate: bookingDateStr,
      campground: booking.campground?._id || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      bookingDate: "",
      campground: "",
    });
    setBookDate(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setBookDate(date);
  };

  const handleSubmit = async (bookingId: string) => {
    try {
      if (!editForm.bookingDate) {
        alert("Please select a booking date");
        return;
      }

      if (!editForm.campground) {
        alert("Please select a campground");
        return;
      }

      const updateData = {
        bookingDate: new Date(editForm.bookingDate).toISOString(),
        campground: editForm.campground,
      };

      await putBooking(bookingId, updateData, token);
      
      const selectedCampground = campgroundMap[editForm.campground];
      
      setBookings((prev) =>
        prev.map((booking) => {
          if (booking._id === bookingId) {
            return {
              ...booking,
              bookingDate: new Date(updateData.bookingDate),
              campground: {
                _id: updateData.campground,
                name: selectedCampground?.name || "",
                address: selectedCampground?.address || "",
                district: selectedCampground?.district || "",
                province: selectedCampground?.province || "",
                postalcode: selectedCampground?.postalcode || "",
                tel: selectedCampground?.tel || "",
                region: selectedCampground?.region || "",
                picture: selectedCampground?.picture || "",
                dailyrate: selectedCampground?.dailyrate || 0,
              }
            };
          }
          return booking;
        })
      );
      
      setEditingId(null);
      setEditForm({
        bookingDate: "",
        campground: "",
      });
      setBookDate(null);
      setSnackbarMessage("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking. Please try again.");
      setSnackbarMessage("Error updating booking.");
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      {bookings.length > 0 ? (
        bookings.map((bookItems) => {
          const campground = campgroundMap[bookItems.campground?._id];
          const isEditing = editingId === bookItems._id;

          return (
            <div
              className="bg-white rounded-xl px-6 py-5 mx-0 my-4 border border-gray-100 shadow-md 
                hover:shadow-xl transition-all duration-300 max-w-2xl"
              key={bookItems._id}
            >
              {isEditing ? (
                <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Edit Booking</h3>
                
                <div className="my-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Date
                  </label>
                  <DateReserve 
                    onDateChange={handleDateChange}
                    initialDate={bookItems.bookingDate}
                  />
                  {editForm.bookingDate && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected date: {new Date(editForm.bookingDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
           
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campground
                  </label>
                  <select
                    name="campground"
                    value={editForm.campground}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Campground</option>
                    {allCampgrounds.map((camp) => (
                      <option key={camp._id} value={camp._id}>
                        {camp.name} - {camp.district}, {camp.province}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-green-600 hover:bg-green-700 hover:scale-105 text-white font-medium 
                      py-2 px-4 rounded-md shadow-md transition-transform duration-200"
                    onClick={() => handleSubmit(bookItems._id)}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 hover:scale-105 text-white font-medium 
                      py-2 px-4 rounded-md shadow-md transition-transform duration-200"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xl text-gray-900 font-semibold border-b border-gray-100 pb-2">
                    {bookItems.fullname || "Guest"}
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-gray-700">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">Tel:</span>
                      <span>{bookItems.tel || "-"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">User ID:</span>
                      <span>{bookItems.user || "Unknown"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">Campground:</span>
                      <span>
                        {campground ? campground.name : "Unknown"}
                        {!campground && bookItems.campground?._id
                          ? ` (ID: ${bookItems.campground._id})`
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">Date:</span>
                      <span>{new Date(bookItems.bookingDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4 border-t border-gray-100">
                    <button
                      className="bg-amber-500 hover:bg-amber-600 hover:scale-105 text-white font-medium 
                        py-2 px-4 rounded-md shadow-md transition-transform duration-200 mt-4"
                      onClick={() => handleEdit(bookItems)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bookItems._id)}
                      className="bg-sky-600 hover:bg-sky-700 hover:scale-105 text-white font-medium 
                        py-2 px-4 rounded-md shadow-md transition-transform duration-200 mt-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg font-medium bg-white rounded-lg 
            p-4 inline-block shadow-md">
            No bookings available yet
          </p>
        </div>
      )}

      {snackbarMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
          bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-xl 
          animate-fade-in flex items-center space-x-2">
          <span>{snackbarMessage}</span>
        </div>
      )}
    </main>
  );
}
