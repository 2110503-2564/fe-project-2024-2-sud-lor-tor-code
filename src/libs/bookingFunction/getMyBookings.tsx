export default async function getMyBookings(token: string) {
    const response = await fetch(
      "/api/bookings/my-bookings",
      {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Cannot get own bookings");
    }
  
    return await response.json();
  }
  