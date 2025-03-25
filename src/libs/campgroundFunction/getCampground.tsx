export default async function getCampground(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const response = await fetch(
      `/api/campgrounds/${id}`
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch campground.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching campground:", error);
    throw error;
  }
}
