"use client";

import { useState, useEffect } from 'react';
import TopMenu from './TopMenu';
import MobileMenu from './MobileMenu';

export default function TopMenuWrapper({ session,role }: { session: any,role?:string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleBodyOverflow = () => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    };

    window.addEventListener('scroll', handleScroll);
    handleBodyOverflow();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  

  return (
    <>
      <TopMenu 
        session={session} 
        scrolled={scrolled}
        role={role}
      />
      <MobileMenu 
        session={session}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}