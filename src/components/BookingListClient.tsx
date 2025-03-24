"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [campgroundMap, setCampgroundMap] = useState<Record<string, CampgroundItem>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [editForm, setEditForm] = useState({ bookingDate: "", campground: "" });
  const [allCampgrounds, setAllCampgrounds] = useState<CampgroundItem[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        if (response?.data) {
          setAllCampgrounds(response.data);
          
          const map = response.data.reduce((acc:any, camp:any) => 
            camp._id ? { ...acc, [camp._id]: camp } : acc, 
          {});
          
          setCampgroundMap(map);
        }
      } catch (error) {
        console.error("Error fetching campgrounds:", error);
      }
    };

    fetchAllCampgrounds();
  }, []);

  useEffect(() => {
    const fetchMissingCampgrounds = async () => {
      const missingIds = Array.from(
        new Set(
          bookings
            .map(booking => booking.campground?._id)
            .filter(id => id && !campgroundMap[id])
        )
      );

      if (missingIds.length > 0) {
        const responses = await Promise.all(
          missingIds.map(id => getCampground(id))
        );

        setCampgroundMap(prev => {
          const newMap = { ...prev };
          responses.forEach(res => {
            if (res?.data?._id) newMap[res.data._id] = res.data;
          });
          return newMap;
        });
      }
    };

    if (Object.keys(campgroundMap).length > 0) {
      fetchMissingCampgrounds();
    }
  }, [bookings, campgroundMap]);

  useEffect(() => {
    if (bookDate?.format) {
      setEditForm(prev => ({
        ...prev,
        bookingDate: bookDate.format('YYYY-MM-DD')
      }));
    }
  }, [bookDate]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  const handleDelete = async (bookingId: string) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบการจองนี้?")) return;

    try {
      await deleteBooking(bookingId, token);
      setBookings(prev => prev.filter(b => b._id !== bookingId));
      showSnackbar("ลบการจองสำเร็จ");
    } catch (error) {
      console.error("Error deleting booking:", error);
      showSnackbar("เกิดข้อผิดพลาดในการลบการจอง", true);
    }
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
    setEditForm({ bookingDate: "", campground: "" });
    setBookDate(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (bookingId: string) => {
    try {
      if (!editForm.bookingDate || !editForm.campground) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      const updateData = {
        bookingDate: new Date(editForm.bookingDate).toISOString(),
        campground: editForm.campground,
      };

      await putBooking(bookingId, updateData, token);
      
      const selectedCampground = campgroundMap[editForm.campground];
      
      setBookings(prev =>
        prev.map(booking => {
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
      
      resetForm();
      showSnackbar("อัพเดตการจองสำเร็จ");
    } catch (error) {
      console.error("Error updating booking:", error);
      showSnackbar("เกิดข้อผิดพลาดในการอัพเดตการจอง", true);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setEditForm({ bookingDate: "", campground: "" });
    setBookDate(null);
  };

  const showSnackbar = useCallback((message: string, isError = false) => {
    setSnackbarMessage(message);
    setTimeout(() => setSnackbarMessage(null), 3000);
  }, []);

  const renderBookingItem = (booking: BookingItem) => {
    const campground = campgroundMap[booking.campground?._id];
    const isEditing = editingId === booking._id;

    if (isEditing) {
      return renderEditForm(booking);
    }

    return (
      <div className="space-y-3">
        <div className="text-xl text-gray-900 font-semibold border-b border-gray-100 pb-2">
          {booking.fullname || "ผู้เยี่ยมชม"}
        </div>
        <div className="grid grid-cols-1 gap-2 text-gray-700">
          <InfoRow label="เบอร์โทร" value={booking.tel || "-"} />
          <InfoRow label="รหัสผู้ใช้" value={booking.user || "ไม่ทราบ"} />
          <InfoRow 
            label="สถานที่" 
            value={campground ? campground.name : booking.campground?._id ? `(ID: ${booking.campground._id})` : "ไม่ทราบ"} 
          />
          <InfoRow label="วันที่" value={formatDate(booking.bookingDate)} />
        </div>
        <div className="flex space-x-3 pt-4 border-t border-gray-100">
          <button
            className="bg-amber-500 hover:bg-amber-600 hover:scale-105 text-white font-medium 
              py-2 px-4 rounded-md shadow-md transition-transform duration-200 mt-4"
            onClick={() => handleEdit(booking)}
          >
            แก้ไข
          </button>
          <button
            className="bg-sky-600 hover:bg-sky-700 hover:scale-105 text-white font-medium 
              py-2 px-4 rounded-md shadow-md transition-transform duration-200 mt-4"
            onClick={() => handleDelete(booking._id)}
          >
            ลบ
          </button>
        </div>
      </div>
    );
  };

  const renderEditForm = (booking: BookingItem) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">แก้ไขการจอง</h3>
      
      <div className="my-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">วันที่จอง</label>
        <DateReserve 
          onDateChange={setBookDate}
          initialDate={booking.bookingDate}
        />
        {editForm.bookingDate && (
          <p className="mt-2 text-sm text-gray-600">
            วันที่เลือก: {formatDate(editForm.bookingDate)}
          </p>
        )}
      </div>
     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">สถานที่</label>
        <select
          name="campground"
          value={editForm.campground}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">เลือกสถานที่</option>
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
          onClick={() => handleSubmit(booking._id)}
        >
          บันทึก
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 hover:scale-105 text-white font-medium 
            py-2 px-4 rounded-md shadow-md transition-transform duration-200"
          onClick={handleCancel}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-500">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            className="bg-white rounded-xl px-6 py-5 mx-0 my-4 border border-gray-100 shadow-md 
              hover:shadow-xl transition-all duration-300 max-w-2xl"
            key={booking._id}
          >
            {renderBookingItem(booking)}
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg font-medium bg-white rounded-lg 
            p-4 inline-block shadow-md">
            ยังไม่มีการจอง
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