"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { motion } from 'framer-motion';
import { JetBrains_Mono } from 'next/font/google';
import SimpleStickerPeel from '../SimpleStickerPeel';
import StickerEditor from './sticker-editor';

// Configure JetBrains Mono font
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// Register GSAP plugin
gsap.registerPlugin(ScrambleTextPlugin);

// About Me Header Component
const AboutMeHeader = () => {
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
    <div ref={headerRef} className="absolute top-12 right-12 z-10 w-full max-w-xl">
      <motion.h2 
        ref={textRef}
        className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-black leading-none text-left ${jetBrainsMono.className}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      >
        ABOUT ME
      </motion.h2>
    </div>
  );
};

// About Me Content Component
const AboutMeContent = () => {
  return (
    <div className="absolute top-1/2 right-12 transform -translate-y-1/2 max-w-xl z-10">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        className={`text-black text-left ${jetBrainsMono.className}`}
      >
        <div className="space-y-8">
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Hi, I&apos;m Oscar Salerno, a web designer passionate about crafting minimal, 
            interactive websites that tell compelling stories through thoughtful design.
          </p>
          
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            I specialize in creating digital experiences that balance visual beauty 
            with functional simplicity, helping brands connect with their audiences 
            through clean, modern web design.
          </p>
          
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Based in New York, I work with clients worldwide to bring their 
            digital visions to life through carefully crafted user experiences.
          </p>
          
          <div className="pt-6">
            <p className="text-sm md:text-base lg:text-lg text-gray-600 uppercase tracking-wide">
              Available for freelance projects
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Sticker Components for left side
interface StickerPosition {
  src: string;
  rotate: number;
  x: number;
  y: number;
}

const AboutMeStickers = ({ stickerPositions }: { stickerPositions: StickerPosition[] }) => {
  const stickers = stickerPositions.length > 0 ? stickerPositions : [
    { src: "/sticker1.png", rotate: 15, x: 80, y: 100 },
    { src: "/sticker2.png", rotate: -10, x: 240, y: 220 },
    { src: "/sticker3.png", rotate: 20, x: 120, y: 380 },
    { src: "/sticker4.png", rotate: -5, x: 320, y: 320 },
    { src: "/sticker5.png", rotate: 25, x: 60, y: 560 },
    { src: "/sticker6.png", rotate: -15, x: 280, y: 500 },
    { src: "/sticker7.png", rotate: 10, x: 440, y: 120 },
    { src: "/sticker8.png", rotate: -20, x: 400, y: 280 },
    { src: "/sticker9.png", rotate: 5, x: 520, y: 420 },
    { src: "/sticker10.png", rotate: -12, x: 460, y: 560 },
    { src: "/sticker11.png", rotate: 18, x: 560, y: 240 },
    { src: "/sticker12.png", rotate: 8, x: 200, y: 680 },
    { src: "/sticker13.png", rotate: -25, x: 380, y: 640 }
  ];

  return (
    <div className="absolute left-0 top-0 h-full z-20" style={{ 
      overflow: 'visible',
      maxWidth: '45%',
      width: '650px'
    }}>
      {stickers.map((sticker, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: sticker.x,
            top: sticker.y,
            width: '200px',
            height: '250px',
            overflow: 'visible'
          }}
        >
          <SimpleStickerPeel
            imageSrc={sticker.src}
            width={200}
            rotate={sticker.rotate}
            peelBackHoverPct={20}
            peelBackActivePct={40}
            shadowIntensity={0.8}
            lightingIntensity={0.12}
          />
        </div>
      ))}
      
    </div>
  );
};

// Corner Elements for About Me section (removed - now in Navigation component)
const AboutMeCornerElements = () => {
  return null;
};

// Main About Me Component
const AboutMe = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [stickerPositions, setStickerPositions] = useState<StickerPosition[]>([]);

  const handleSaveLayout = (positions: StickerPosition[]) => {
    setStickerPositions(positions);
    setShowEditor(false);
    // Here you could also save to localStorage or send to a backend
    localStorage.setItem('stickerPositions', JSON.stringify(positions));
  };

  const handleCancelEditor = () => {
    setShowEditor(false);
  };

  // Load saved positions on component mount
  useEffect(() => {
    const saved = localStorage.getItem('stickerPositions');
    if (saved) {
      setStickerPositions(JSON.parse(saved));
    }
  }, []);

  if (showEditor) {
    return <StickerEditor onSaveLayout={handleSaveLayout} onCancel={handleCancelEditor} />;
  }

  return (
    <div className="relative w-full h-full overflow-visible">
      <AboutMeHeader />
      <AboutMeContent />
      <AboutMeStickers stickerPositions={stickerPositions} />
      <AboutMeCornerElements />
    </div>
  );
};

export default AboutMe;
