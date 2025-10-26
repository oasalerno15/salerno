"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { JetBrains_Mono } from 'next/font/google';

// Configure JetBrains Mono font
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8 contact-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium text-black mb-2 ${jetBrainsMono.className}`}>
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-gray-300 rounded-none bg-transparent text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors ${jetBrainsMono.className}`}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium text-black mb-2 ${jetBrainsMono.className}`}>
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-gray-300 rounded-none bg-transparent text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors ${jetBrainsMono.className}`}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className={`block text-sm font-medium text-black mb-2 ${jetBrainsMono.className}`}>
            SUBJECT
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 border border-gray-300 rounded-none bg-transparent text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors ${jetBrainsMono.className}`}
            placeholder="Project inquiry"
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className={`block text-sm font-medium text-black mb-2 ${jetBrainsMono.className}`}>
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 border border-gray-300 rounded-none bg-transparent text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors resize-none ${jetBrainsMono.className}`}
            placeholder="Tell me about your project..."
            required
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className={`px-8 py-4 bg-black text-white border border-black hover:bg-transparent hover:text-black transition-all duration-300 font-medium ${jetBrainsMono.className}`}
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    </motion.div>
  );
};

// Social Links Component
const SocialLinks = () => {
  const socialLinks = [
    { name: 'EMAIL', url: 'mailto:oscarasalerno@icloud.com', icon: '✉' },
    { name: 'PHONE', url: 'tel:+19292552086', icon: '📞' },
    { name: 'INSTAGRAM', url: 'https://instagram.com/oscar', icon: '📷' },
    { name: 'LINKEDIN', url: 'https://linkedin.com/in/oscar', icon: '💼' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
      className="space-y-8"
    >
      <h3 className={`text-xl font-bold text-black ${jetBrainsMono.className}`}>
        CONNECT
      </h3>
      <div className="space-y-6">
        {socialLinks.map((link) => (
          <motion.div
            key={link.name}
            className="mb-4"
          >
            <motion.a
              href={link.url}
              target={link.name === 'EMAIL' || link.name === 'PHONE' ? '_self' : '_blank'}
              rel={link.name === 'EMAIL' || link.name === 'PHONE' ? '' : 'noopener noreferrer'}
              className={`block text-base hover:text-gray-600 transition-colors social-link ${jetBrainsMono.className}`}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Get in Touch Header Component
const GetInTouchHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { 
          opacity: 0,
          y: 50 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <div ref={headerRef} className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
      <motion.h2 
        ref={textRef}
        className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-black leading-none text-center ${jetBrainsMono.className}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        GET IN TOUCH
      </motion.h2>
    </div>
  );
};


// Corner Elements for Get in Touch section
const GetInTouchCornerElements = () => {
  return (
    <aside className="corner-elements">
      <div className="corner-item top-right">
        <div className="corner-square"></div>
      </div>
      <div className="corner-item bottom-left">
        LET&apos;S WORK TOGETHER
      </div>
      <div className="corner-item bottom-right">
        <div className="corner-square"></div>
      </div>
    </aside>
  );
};

// Main Get in Touch Component
const GetInTouch = () => {
  return (
    <div className="relative w-full h-full overflow-visible bg-white get-in-touch-container">
      <GetInTouchHeader />
      
      {/* Main content area */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-10 z-10 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center lg:justify-center items-center">
            <SocialLinks />
          </div>
        </div>
      </div>
      
      <GetInTouchCornerElements />
    </div>
  );
};

export default GetInTouch;
