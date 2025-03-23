import getCampground from "@/libs/campgroundFunction/getCampground";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/authFunction/getUserProfile";
import CreateBooking from "@/components/CreateBooking";
import CampgroundDetail from "@/components/CampgroundDetail";

export default async function CampgroundDetailPage(
    { params } :
    { params: {cid:string}}
) {
    const campgroundDetail = await getCampground(params.cid);

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)

    return (
        <main className="text-center p-5">
            <div className="flex flex-row gap-5">
                <CampgroundDetail campgroundDetail={campgroundDetail}></CampgroundDetail>
                <CreateBooking campgroundDetail={campgroundDetail} token={session.user.token}></CreateBooking>
            </div>
        </main>
    )
}
