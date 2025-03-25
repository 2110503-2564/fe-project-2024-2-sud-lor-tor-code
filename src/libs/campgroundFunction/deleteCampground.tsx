export const deleteCampground = async (id:string, token: string): Promise<any> => {
    try {
      const response = await fetch(
        `http://campway-api-project-fe.us-east-1.elasticbeanstalk.com/api/v1/campgrounds/${id}`,
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
        const errorData = await response.json().catch(() => null); // Handle non-JSON errors
        console.error("Error:", response.status, errorData || response.statusText);
        throw new Error(`Request failed with status ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error deleting campground:", error);
      throw error;
    }

  };