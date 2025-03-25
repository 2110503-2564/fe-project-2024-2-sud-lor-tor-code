import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenuWrapper from "@/components/TopMenuWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import getUserProfile from "@/libs/authFunction/getUserProfile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camp Way",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)
        if(!session) return (
          <html lang="en">
            <body className={inter.className}>
              {/* <ReduxProvider> */}
                <NextAuthProvider session={session}>
                  <TopMenuWrapper session={session}/>
                  {children}
                </NextAuthProvider>
              {/* </ReduxProvider> */}
            </body>
          </html>
        );
  const profile = await getUserProfile(session.user.token)

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProvider> */}
          <NextAuthProvider session={session}>
            <TopMenuWrapper session={session} role={profile.data.role}/>
            {children}
          </NextAuthProvider>
        {/* </ReduxProvider> */}
      </body>
    </html>
  );
}
