export const createBooking = async (campground_ID: string,bookingData:BookingItem, token: string): Promise<any> => {
  try {
    const response = await fetch(
      `/api/campgrounds/${campground_ID}/bookings`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Error:", response.status, errorData || response.statusText);
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};