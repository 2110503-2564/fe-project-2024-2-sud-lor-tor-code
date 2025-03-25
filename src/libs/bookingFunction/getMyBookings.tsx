export default async function getMyBookings(token: string) {
    const response = await fetch(
      "http://campway-api-project-fe.us-east-1.elasticbeanstalk.com/api/v1/bookings/my-bookings",
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
  