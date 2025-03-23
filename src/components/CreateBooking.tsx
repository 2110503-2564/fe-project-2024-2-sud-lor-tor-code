'use client'

import { useState } from 'react'
import DateReserve from '@/components/DateReserve'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { createBooking } from '@/libs/bookingFunction/postBooking'

export default function CreateBooking({campgroundDetail, token}:{campgroundDetail:any, token:string}) {

    const [nameLastname, setNameLastname] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  
    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      
      if (name === "nameLastname") {
        setNameLastname(value);
      } else if (name === "tel") {
        setContact(value);
      }
    };
  
    const handleDateChange = (date: Dayjs | null) => {
      setBookDate(date);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const bookingData:any = {
        fullname: nameLastname,
        tel: contact,
        bookingDate: bookDate
        };
        
        const result = await createBooking(campgroundDetail.data._id, bookingData, token);
        console.log("Campground created:", result);

        setNameLastname('');
        setContact('');
        setBookDate(null);

      event.preventDefault();
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg border-l-4 border-amber-300 overflow-hidden relative h-full">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-bl-full"></div>
        
        <div className="p-6 relative z-10">
          <h1 className="text-2xl font-semibold text-amber-800 mb-4">
            Book a Campground
          </h1>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="nameLastname" className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="nameLastname"
                name="nameLastname"
                value={nameLastname}
                onChange={handleTextFieldChange}
                required
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="tel" className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                id="tel"
                name="tel"
                value={contact}
                onChange={handleTextFieldChange}
                required
                className="w-full px-3 py-2 border-b border-gray-300 focus:border-amber-700 focus:outline-none transition-colors"
              />
            </div>
            
            <div className="my-6">
              <DateReserve onDateChange={handleDateChange} />
            </div>
            
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-amber-800 hover:bg-amber-600 text-white rounded relative overflow-hidden transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
            >
              Book Campground
            </button>
          </form>
        </div>
      </div>
    )
}