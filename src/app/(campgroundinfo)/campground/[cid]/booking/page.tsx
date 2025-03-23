import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/authFunction/getUserProfile";
import CreateCampground from "@/components/CreateCampground";
export default async function Booking() {

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    return(
        <CreateCampground profile={profile} token={session.user.token}/>
    );

}