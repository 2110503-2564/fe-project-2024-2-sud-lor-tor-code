import getCampground from "@/libs/getCampground";
import Image from "next/image";
import Link from "next/link";

export default async function CampgroundDetailPage(
    { params } :
    { params: {cid:string}}
) {
    const campgroundDetail = await getCampground(params.cid);

    return (
        <main className="text-center p-5">
            <div>
                <h1 className="text-lg font-medium"> {campgroundDetail.data.name} </h1>
                <div className="flex flex-row my-5">
                    {/* <Image src={ campgroundDetail.data.picture }
                        alt={ campgroundDetail.data.name }
                        width={0} height={0} sizes="100vw"
                        className="rounded-lg w-[30%]"
                    /> */}
                    <div className="text-left">
                        <div className="text-md mx-5">Name: {campgroundDetail.data.name}</div>
                        <div className="text-md mx-5">Address: {campgroundDetail.data.address}</div>
                        <div className="text-md mx-5">District: {campgroundDetail.data.district}</div>
                        <div className="text-md mx-5">Postal Code: {campgroundDetail.data.postalcode}</div>
                        <div className="text-md mx-5">Tel: {campgroundDetail.data.tel}</div>
                    </div>
                </div> 
                <div>
                    <Link href={`/campground/${params.cid}/booking`}>
                        <button>here</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
