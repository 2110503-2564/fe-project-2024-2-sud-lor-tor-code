"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';

export default function TopMenu({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleMobileMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

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
            <TopMenuItem title='Booking List' pageRef='/bookinglist' />
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
            <TopMenuItem title='Sign in' pageRef='/api/auth/signin' />
          )}
        </div>
        
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-amber-800 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-amber-800 mt-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-amber-800 mt-1 transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </header>
      
      <div className="h-16"></div>
      
      <div 
        className={`
          fixed inset-0 bg-white z-40 pt-16 transition-transform duration-300 ease-in-out transform 
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:hidden
        `}
      >
        <nav className="flex flex-col items-center p-4 mt-4">
          <TopMenuItem 
            title='Home' 
            pageRef='/' 
            isMobile={true} 
            onClick={handleMobileMenuItemClick} 
          />
          <TopMenuItem 
            title='All Campground' 
            pageRef='/campground' 
            isMobile={true} 
            onClick={handleMobileMenuItemClick} 
          />
          <TopMenuItem 
            title='Booking List' 
            pageRef='/bookinglist' 
            isMobile={true} 
            onClick={handleMobileMenuItemClick} 
          />
          
          <div className="w-full border-t border-gray-200 my-4"></div>
          
          {session ? (
            <>
              <Link 
                href='/profile' 
                className="flex items-center justify-center w-full py-3 border-b border-gray-100"
                onClick={handleMobileMenuItemClick}
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
                onClick={handleMobileMenuItemClick} 
              />
            </>
          ) : (
            <TopMenuItem 
              title='Sign in' 
              pageRef='/api/auth/signin' 
              isMobile={true} 
              onClick={handleMobileMenuItemClick} 
            />
          )}
        </nav>
      </div>
    </>
  );
}