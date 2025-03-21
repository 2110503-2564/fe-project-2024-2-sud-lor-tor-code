export default async function getCampground(id:string) {

    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
        const response = await fetch(`http://bookingcampground.us-east-1.elasticbeanstalk.com/api/v1/campgrounds/${id}`);

        if(!response.ok) {
            throw new Error("Failed to fetch campground.")
        }

        return await response.json();
        
    } catch (error) {

        console.error("Error fetching campground:", error);
        throw error;
    }
}
