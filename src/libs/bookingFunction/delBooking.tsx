"use server";

export async function makeBooking(item: any) {
  const response = await fetch(
    "http://campway-api-ver-001.us-east-1.elasticbeanstalk.com/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to log-in");
  }

  return await response.json();
}
