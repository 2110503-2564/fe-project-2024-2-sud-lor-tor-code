

export const createCampground = async (campgroundData: CampgroundItem, token: string): Promise<any> => {
  try {
    const response = await fetch(
      "/api/campgrounds",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(campgroundData),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null); // Handle non-JSON errors
      console.error("Error:", response.status, errorData || response.statusText);
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error creating campground:", error);
    throw error;
  }
};