import Link from "next/link";
import Card from "./Card";

export default async function CampgroundCatalog({campgroundsJson}: {campgroundsJson:Promise<CampgroundJson>}) {

    const campgroundsData:CampgroundJson = await campgroundsJson;

    return (
        <div className="my-2">
            <p className="text-lg text-gray-600 mb-8">
                Explore <span className="font-semibold text-amber-700">{campgroundsData.count}</span> campgrounds in our catalog
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {   
                    campgroundsData.data.map((campground:CampgroundItem) => (
                        <Link 
                            href={`/campground/${campground.id}`} 
                            className="transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 rounded-lg" 
                            key={campground.id}
                        >
                            <Card
                                key={campground.name}
                                campgroundName={campground.name}
                                imgSrc={campground.picture}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}