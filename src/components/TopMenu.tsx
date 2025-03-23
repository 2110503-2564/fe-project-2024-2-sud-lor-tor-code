import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-16 w-full flex items-center justify-between bg-white shadow-md px-1 md:px-1.5 lg:px-4 xl:px-6 border-b-2 border-gray-300">
      <div className="flex-shrink-0 mr-6">
        <div className="h-44 w-56 relative">
          <Image 
            src={'/img/logo.png'} 
            alt='logo' 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      <div className="hidden md:flex flex-grow items-center">
        <nav className="flex space-x-9 lg:space-x-12">
          <TopMenuItem title='Home' pageRef='/' />
          <TopMenuItem title='All Campground' pageRef='/campground' />
          <TopMenuItem title='Booking List' pageRef='/bookinglist' />
        </nav>
      </div>
      
      <div className="flex items-center space-x-4 lg:space-x-6 px-2 md:px-3 lg:px-8 xl:px-12">
        {session ? (
          <div className="flex items-center">
            {/** ใส่ href /api/auth/signout หลังทำ page เสร็จ */}
            <Link href='/' className="flex items-center mr-12">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-medium text-sm">
                  {session.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            </Link>
            <TopMenuItem title='Sign out' pageRef='/api/auth/signout' />
          </div>
        ) : (
          <TopMenuItem title='Sign in' pageRef='/api/auth/signin' />
        )}
      </div>
    </div>
  );
}
