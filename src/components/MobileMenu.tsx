"use client";

import Link from 'next/link';
import TopMenuItem from './TopMenuItem';

export default function MobileMenu({ 
  session, 
  isOpen, 
  onClose 
}: { 
  session: any, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  return (
    <div 
      className={`
        fixed inset-0 bg-white z-40 pt-16 transition-transform duration-300 ease-in-out transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:hidden
      `}
    >
      <nav className="flex flex-col items-center p-4 mt-4">
        <TopMenuItem 
          title='Home' 
          pageRef='/' 
          isMobile={true} 
          onClick={onClose} 
        />
        <TopMenuItem 
          title='All Campground' 
          pageRef='/campground' 
          isMobile={true} 
          onClick={onClose} 
        />
        
        {/* Conditionally render Booking List for admin */}
        {session?.user?.role === 'admin' && (
          <TopMenuItem 
            title='Booking List' 
            pageRef='/bookinglist' 
            isMobile={true} 
            onClick={onClose} 
          />
        )}
        
        {/* Conditionally render My Bookings for non-admin users */}
        {session?.user?.role !== 'admin' && (
          <TopMenuItem 
            title='My Bookings' 
            pageRef='/my-booking' 
            isMobile={true} 
            onClick={onClose} 
          />
        )}
        
        <div className="w-full border-t border-gray-200 my-4"></div>
        
        {session ? (
          <>
            <Link 
              href='/profile' 
              className="flex items-center justify-center w-full py-3 border-b border-gray-100"
              onClick={onClose}
            >
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-500 font-medium text-sm">
                  {session.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="ml-2 text-gray-700">
                {session.user?.name}
              </span>
            </Link>
            <TopMenuItem 
              title='Sign out' 
              pageRef='/api/auth/signout' 
              isMobile={true} 
              onClick={onClose} 
            />
          </>
        ) : (
          <TopMenuItem 
            title='Sign in' 
            pageRef='/api/auth/signin' 
            isMobile={true} 
            onClick={onClose} 
          />
        )}
      </nav>
    </div>
  );
}