"use client";

import { useState, useEffect } from 'react';
import TopMenu from './TopMenu';
import MobileMenu from './MobileMenu';

export default function TopMenuWrapper({ session }: { session: any }) {
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
      />
      <MobileMenu 
        session={session}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}