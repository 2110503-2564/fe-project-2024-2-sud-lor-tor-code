import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UpdateCampground from "@/components/UpdateCampground";
import getCampground from "@/libs/campgroundFunction/getCampground";
import UserRegister from "@/components/UserRegister";

export default async function register() {

  return(
    <main>
      <UserRegister/>
    </main>
  );
}
