"use client";

import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';

export default function TopMenu({ 
  session, 
  scrolled 
}: { 
  session: any, 
  scrolled: boolean 
}) {
  return (
    <>
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 bg-white
          h-16 w-full flex items-center justify-between shadow-md
          px-4 sm:px-6 transition-all duration-300
          ${scrolled ? 'shadow-lg' : 'shadow-md'} border-b-2 border-gray-300
        `}
      >
        <div className="flex-shrink-0 mr-8 sm:mr-12 ">
          <div className="h-16 sm:h-16 md:h-16 w-40 sm:w-44 md:w-48 relative">
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
          <nav className="flex space-x-4 lg:space-x-8">
            <TopMenuItem title='Home' pageRef='/' />
            <TopMenuItem title='All Campground' pageRef='/campground' />
            
            {/* Conditionally render Booking List for admin */}
            {session?.user?.role === 'admin' && (
              <TopMenuItem title='Booking List' pageRef='/bookinglist' />
            )}
            
            {/* Conditionally render My Bookings for non-admin users */}
            {session?.user?.role !== 'admin' && (
              <TopMenuItem title='My Bookings' pageRef='/my-booking' />
            )}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {session ? (
            <div className="flex items-center space-x-4">
              <Link href='/profile' className="flex items-center">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-medium text-sm">
                    {session.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="ml-2 text-gray-700 hidden lg:inline">
                  {session.user?.name}
                </span>
              </Link>
              <TopMenuItem title='Sign out' pageRef='/api/auth/signout' />
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <TopMenuItem title='Sign in' pageRef='/api/auth/signin' />
              <TopMenuItem title='Register' pageRef='/register' />
            </div>
          )}
        </div>
        
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none"
          onClick={() => { /* Toggle menu logic will be handled in parent */ }}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-amber-800"></span>
          <span className="block w-6 h-0.5 bg-amber-800 mt-1"></span>
          <span className="block w-6 h-0.5 bg-amber-800 mt-1"></span>
        </button>
      </header>
      
      <div className="h-16"></div>
    </>
  );
}