export const putCampground = async (id: string, campgroundData: CampgroundItem, token: string): Promise<any> => {
    try {
      const response = await fetch(
        `http://campway-api-project-fe.us-east-1.elasticbeanstalk.com/api/v1/campgrounds/${id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(campgroundData),
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
      console.error("Error updating campground:", error);
      throw error;
    }
  };
  