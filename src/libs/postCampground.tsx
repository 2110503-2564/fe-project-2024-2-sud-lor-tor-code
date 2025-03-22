import React, { useState } from "react";

interface CampgroundData {
  name: string;
  location: string;
  description: string;
}

const CreateCampground: React.FC = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCampground = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "http://campway-api-ver-001.us-east-1.elasticbeanstalk.com/api/v1/campgrounds",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            location,
            description,
          } as CampgroundData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create campground.");
      }

      const data = await response.json();
      console.log("Campground created:", data);
      alert("Campground created successfully!");
      setName("");
      setLocation("");
      setDescription("");
    } catch (error) {
      console.error("Error creating campground:", error);
      setError("Failed to create campground. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create New Campground</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCampground();
        }}
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Campground"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampground;
