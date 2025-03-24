'use client'
import { useRouter } from "next/router";
import { useState } from "react";
import { putCampground } from "@/libs/campgroundFunction/putCampground";
import { TextField, Button } from "@mui/material";

export default function UpdateCampground({cid,token,campground}:{cid:string,token:string,campground:CampgroundItem}) {
    
    //const router = useRouter();
    const [formData, setFormData] = useState<CampgroundItem | null>(()=> campground);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) =>
            prevData
                ? {
                    ...prevData,
                    [name]: name === "dailyrate" ? Number(value) || 0 : value, // 
                }
                : null
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        try {
            await putCampground(cid, formData, token);
            alert("Campground updated successfully!");
            //router.push("/campgroundinfo");
        } catch (error) {
            console.error("Error updating campground:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Campground</h2>

            {formData ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Name"
                        name="name"
                        defaultValue={campground.name}
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Postal Code"
                        name="postalcode"
                        value={formData.postalcode}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Telephone"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Picture URL"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Daily Rate"
                        name="dailyrate"
                        type="number"
                        value={formData.dailyrate}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Update
                    </Button>
                </form>
            ) : (
                <p>Loading campground data...</p>
            )}
        </div>
    );
}


