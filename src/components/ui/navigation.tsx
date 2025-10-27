"use client";

import { useState, useEffect } from 'react';
import { JetBrains_Mono } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navigation when scrolled more than 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header - Top Left and Top Right */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center p-6">
          <div className={`text-sm ${jetBrainsMono.className}`}>
            OSCAR SALERNO PRODUCTIONS
          </div>
          <div className={`flex gap-4 text-sm ${jetBrainsMono.className}`}>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              Contact
            </a>
            <span>|</span>
            <a href="https://www.linkedin.com/in/oscar-salerno-406423341/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">LinkedIn</a>
            <span>|</span>
            <a href="mailto:oscarasalerno@icloud.com" className="hover:opacity-70 transition-opacity">Email</a>
          </div>
        </div>
      </div>

      {/* Footer - Bottom Left */}
      <div
        className={`fixed bottom-0 left-0 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`p-6 text-sm ${jetBrainsMono.className}`}>
          LET&apos;S WORK TOGETHER
        </div>
      </div>
    </>
  );
};

export default Navigation;

