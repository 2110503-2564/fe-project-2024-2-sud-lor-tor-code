export const deleteBooking = async (booking_ID:string, token: string): Promise<any> => {
    try {
      const response = await fetch(
        `http://campway-api-ver-001.us-east-1.elasticbeanstalk.com/api/v1/bookings/${booking_ID}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
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
      console.error("Error deleting booking:", error);
      throw error;
    }

  };