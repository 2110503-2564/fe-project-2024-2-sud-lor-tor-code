import { Suspense } from 'react';
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { LinearProgress } from '@mui/material';

export default async function Campground() {
    const campgrounds = await getCampgrounds();

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium"> Select Your Campground </h1>
            <Suspense fallback={<p>loading... <LinearProgress /></p>}>
                <CampgroundCatalog campgroundsJson={campgrounds}/>
            </Suspense>
        </main>
    )
}