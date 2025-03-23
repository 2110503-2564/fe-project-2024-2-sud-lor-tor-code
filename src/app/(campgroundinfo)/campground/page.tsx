import { Suspense } from 'react';
import getCampgrounds from "@/libs/campgroundFunction/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { LinearProgress } from '@mui/material';

export default async function Campground() {
    const campgrounds = await getCampgrounds();

    return (
        <main className="text-center p-8 bg-slate-50 min-h-screen">
            <div className="text-2xl font-semibold text-amber-800 mb-2"> 
                Select Your Campground 
            </div>
            <Suspense fallback={<p>loading... <LinearProgress /></p>}>
                <CampgroundCatalog campgroundsJson={campgrounds}/>
            </Suspense>
        </main>
    )
}