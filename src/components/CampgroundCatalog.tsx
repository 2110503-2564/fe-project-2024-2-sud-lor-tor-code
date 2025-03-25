import Link from "next/link";
import Card from "./Card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default async function CampgroundCatalog({campgroundsJson}: {campgroundsJson:Promise<CampgroundJson>}) {
    
    const campgroundsData:CampgroundJson = await campgroundsJson;
    const session = await getServerSession(authOptions)
        if(!session || !session.user.token) return null
    
    return (
        <div className="my-2">
            <p className="text-lg text-gray-600 mb-8">
                Explore <span className="font-semibold text-amber-700">{campgroundsData.count}</span> campgrounds in our catalog
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {   
                    campgroundsData.data.map((campground:CampgroundItem, index) => (
                        <Link 
                            href={`/campground/${campground._id}`} 
                            className="transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 rounded-lg" 
                            key={index}
                        >
                            {/* <h1>{campground._id}</h1> */}
                            
                            <Card
                                token={session.user.token}
                                id={campground._id as string}
                                key={campground.name}
                                campgroundName={campground.name}
                            />
                        </Link>
                    ))
                }
            </div>
            <Link 
                href="/campground/manage" 
                className="fixed bottom-6 right-6 z-50"
            >
                <Fab 
                    color="primary" 
                    aria-label="add" 
                    className="bg-teal-700 hover:bg-teal-600 shadow-lg"
                >
                    <AddIcon />
                </Fab>
            </Link>
        </div>
    )
}