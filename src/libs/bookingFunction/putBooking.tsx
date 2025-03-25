export const putBooking = async (
    booking_ID: string,
    bookingData: {
      bookingDate: string;
      campground: string;
    },
    token: string
  ): Promise<any> => {
    try {
      const response = await fetch(
        `https://campway-api-project-fe.us-east-1.elasticbeanstalk.com/api/v1/bookings/${booking_ID}`,
        {
          method: "PUT",
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
      return result;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  };