import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UpdateCampground from "@/components/UpdateCampground";
import getCampground from "@/libs/campgroundFunction/getCampground";

export default async function UpdateCampgroundPage({ params }: { params: { cid: string } }) {
  
  const { cid } = params;

  const campground = await getCampground(cid);

  const session = await getServerSession(authOptions)
      if(!session || !session.user.token) return null

  if(campground&&cid&&session)
  return(
    <main>
      <UpdateCampground cid={cid} token={session.user.token} campground={campground.data}/>
      {/* <div>
        {campground.name}
      </div> */}
    </main>
  );
}
