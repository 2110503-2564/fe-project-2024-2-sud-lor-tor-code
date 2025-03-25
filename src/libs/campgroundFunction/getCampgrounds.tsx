export default async function getCampgrounds() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const response = await fetch(
      "http://campway-api-project-fe.us-east-1.elasticbeanstalk.com/api/v1/campgrounds"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch campgrounds.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching campgrounds:", error);
    throw error;
  }
}
