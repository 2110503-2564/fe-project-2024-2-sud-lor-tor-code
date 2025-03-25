export default async function getUserProfile(token: string) {
    const response = await fetch(
      "/api/bookings",
      {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Cannot get all bookings");
    }
  
    return await response.json();
  }
  