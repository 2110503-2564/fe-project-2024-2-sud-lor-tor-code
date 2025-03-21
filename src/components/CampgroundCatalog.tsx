import Link from "next/link";
import Card from "./Card";

export default async function CampgroundCatalog({campgroundsJson}: {campgroundsJson:Promise<CampgroundJson>}) {

    const campgroundsData:CampgroundJson = await campgroundsJson;

    return (
        <>
            Explore {campgroundsData.count} models in our catalog
            <div className="flex flex-row flex-wrap content-around justify-around w-full gap-6">
                {   
                    campgroundsData.data.map((campground:CampgroundItem) => (
                        <Link href={`/campground/${campground.id}`} className='w-1/5' key={campground.id}>
                            <Card
                                key={campground.name}
                                campgroundName={campground.name}
                                imgSrc={campground.picture}
                            />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}