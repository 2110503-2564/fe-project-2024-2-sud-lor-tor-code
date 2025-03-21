import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[] }

export const bookSlice = createSlice ({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const existingBookingIndex = state.bookItems.findIndex(
              item => item.campground === action.payload.campground && item.bookDate === action.payload.bookDate
            );
            
            if (existingBookingIndex !== -1) {
              state.bookItems[existingBookingIndex] = action.payload;
            } else {
              state.bookItems.push(action.payload);
            }
          },
        removeBooking: (state, action:PayloadAction<BookingItem>) => {
            const remainItems = state.bookItems.filter( obj => {
                return ( (obj.nameLastname !== action.payload.nameLastname) 
                ||(obj.tel !== action.payload.tel) 
                ||(obj.campground !== action.payload.campground) 
                ||(obj.bookDate !== action.payload.bookDate) )
            })
            state.bookItems = remainItems
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer