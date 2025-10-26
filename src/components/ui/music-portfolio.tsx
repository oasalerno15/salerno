"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { motion, useAnimation } from 'framer-motion';
import { JetBrains_Mono } from 'next/font/google';
// Removed Masonry import - using simple hover images instead

// Configure JetBrains Mono font for the header
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

// Register GSAP plugin
gsap.registerPlugin(ScrambleTextPlugin);

// Web Design Header Component
const WebDesignHeader = () => {
  const textControls = useAnimation();
  
  useEffect(() => {
    // Same animation style as OSAL
    textControls.start(i => ({
      y: "0%",
      transition: {
        delay: i * 0.03 + 0.2, // Slightly faster entry than OSAL
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }));
  }, [textControls]);

  const headline = "WEB DESIGN";
  
  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 w-full">
      <div className="overflow-hidden text-center">
        <h2 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide text-slate-900 leading-[0.85] select-none font-bold whitespace-nowrap ${jetBrainsMono.className}`}>
          {headline.split("").map((char, i) => (
            <motion.span 
              key={i} 
              custom={i} 
              initial={{ y: "100%" }} 
              animate={textControls} 
              style={{ 
                display: 'inline-block',
                position: 'relative',
                transformOrigin: 'center bottom',
                willChange: 'transform'
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      </div>
    </div>
  );
};

// Time Display Component (not currently used)
// const TimeDisplay = ({CONFIG={timeZone: "America/New_York", timeUpdateInterval: 1000}}: {CONFIG?: {timeZone?: string; timeUpdateInterval?: number}}) => {
//   const [time, setTime] = useState({ hours: '', minutes: '', dayPeriod: '' });
//
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const options: Intl.DateTimeFormatOptions = {
//         timeZone: CONFIG.timeZone,
//         hour12: true,
//         hour: "numeric" as const,
//         minute: "numeric" as const,
//         second: "numeric" as const
//       };
//       const formatter = new Intl.DateTimeFormat("en-US", options);
//       const parts = formatter.formatToParts(now);
//       
//       setTime({
//         hours: parts.find(part => part.type === "hour")?.value || '',
//         minutes: parts.find(part => part.type === "minute")?.value || '',
//         dayPeriod: parts.find(part => part.type === "dayPeriod")?.value || ''
//       });
//     };
//
//     updateTime();
//     const interval = setInterval(updateTime, CONFIG.timeUpdateInterval);
//     return () => clearInterval(interval);
//   }, [CONFIG.timeUpdateInterval, CONFIG.timeZone]);
//
//   return (
//     <time className="corner-item bottom-right" id="current-time">
//       {time.hours}<span className="time-blink">:</span>{time.minutes} {time.dayPeriod}
//     </time>
//   );
// };

// Project Item Component
const ProjectItem = React.forwardRef<HTMLLIElement, {
         project: {
           id: number;
           artist: string;
           album: string;
           category: string;
           label: string;
           year: string;
           image: string;
           url?: string;
         };
  index: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  isActive: boolean;
  isIdle: boolean;
}>(({ project, index, onMouseEnter, onMouseLeave, isActive, isIdle }, ref) => {
  const textRefs = useMemo(() => ({
    artist: React.createRef<HTMLSpanElement>(),
    album: React.createRef<HTMLSpanElement>(),
    category: React.createRef<HTMLSpanElement>(),
    label: React.createRef<HTMLSpanElement>(),
    year: React.createRef<HTMLSpanElement>(),
  }), []);

  useEffect(() => {
    if (isActive) {
      // Animate text scramble on hover
      Object.entries(textRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const textValue = project[key as keyof typeof project];
          gsap.killTweensOf(ref.current);
          gsap.to(ref.current, {
            duration: 0.8,
            scrambleText: {
              text: String(textValue || ''),
              chars: "qwerty1337h@ck3r",
              revealDelay: 0.3,
              speed: 0.4
            }
          });
        }
      });
      
    } else {
      // Reset text
      Object.entries(textRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const textValue = project[key as keyof typeof project];
          gsap.killTweensOf(ref.current);
          ref.current.textContent = String(textValue || '');
        }
      });
      
    }
  }, [isActive, project, textRefs]);

  const handleClick = () => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <li 
      ref={ref}
      className={`project-item ${isActive ? 'active' : ''} ${isIdle ? 'idle' : ''} ${project.url ? 'clickable' : ''}`}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      data-image={project.image}
      style={{ cursor: project.url ? 'pointer' : 'default' }}
    >
      <span ref={textRefs.artist} className="project-data artist hover-text">
        {project.artist}
      </span>
      <span ref={textRefs.album} className="project-data album hover-text">
        {project.album}
      </span>
      <span ref={textRefs.category} className="project-data category hover-text">
        {project.category}
      </span>
      <span ref={textRefs.label} className="project-data label hover-text">
        {project.label}
      </span>
      <span ref={textRefs.year} className="project-data year hover-text">
        {project.year}
      </span>
      
    </li>
  );
});

ProjectItem.displayName = 'ProjectItem';

// Main Portfolio Component
const MusicPortfolio = ({PROJECTS_DATA=[], CONFIG={}}: {
  PROJECTS_DATA?: Array<{
    id: number;
    artist: string;
    album: string;
    category: string;
    label: string;
    year: string;
    image: string;
    url?: string;
  }>;
  LOCATION?: {latitude?: string; longitude?: string; display?: boolean};
  CALLBACKS?: Record<string, unknown>;
  CONFIG?: {timeZone?: string; timeUpdateInterval?: number; idleDelay?: number; debounceDelay?: number};
  SOCIAL_LINKS?: {spotify?: string; email?: string; x?: string};
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isIdle, setIsIdle] = useState(true);
  // Removed hoveredProject state - no longer using hover images
  
  const backgroundRef = useRef(null);
  const containerRef = useRef(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const projectItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  // Preload images
  useEffect(() => {
    PROJECTS_DATA.forEach(project => {
      if (project.image) {
        const img = new Image();
        //img.crossOrigin = "anonymous";
        img.src = project.image;
      }
    });
  }, [PROJECTS_DATA]);

  // Start idle animation
  const startIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) return;
    
    const timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 2
    });
    
    projectItemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      const hideTime = 0 + index * 0.05;
      const showTime = 0 + (PROJECTS_DATA.length * 0.05 * 0.5) + index * 0.05;
      
      timeline.to(item, {
        opacity: 0.05,
        duration: 0.1,
        ease: "power2.inOut"
      }, hideTime);
      
      timeline.to(item, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut"
      }, showTime);
    });
    
    idleAnimationRef.current = timeline;
  }, [PROJECTS_DATA.length]);

  // Stop idle animation
  const stopIdleAnimation = useCallback(() => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;
      
      projectItemsRef.current.forEach(item => {
        if (item) {
          gsap.set(item, { opacity: 1 });
        }
      });
    }
  }, []);

  // Start idle timer
  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    
    idleTimerRef.current = setTimeout(() => {
      if (activeIndex === -1) {
        setIsIdle(true);
        startIdleAnimation();
      }
    }, CONFIG.idleDelay || 4000);
  }, [activeIndex, startIdleAnimation, CONFIG.idleDelay]);

  // Stop idle timer
  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  // Handle mouse enter on project
  const handleProjectMouseEnter = useCallback((index: number) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    stopIdleAnimation();
    stopIdleTimer();
    setIsIdle(false);
    
    if (activeIndex === index) return;
    
    setActiveIndex(index);
    
    // No hover images - removed per user request
  }, [activeIndex, stopIdleAnimation, stopIdleTimer]);

  // Handle mouse leave on project
  const handleProjectMouseLeave = useCallback(() => {
    debounceRef.current = setTimeout(() => {
      // Text reset handled in ProjectItem component
    }, 50);
  }, []);

  // Handle container mouse leave
  const handleContainerMouseLeave = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    setActiveIndex(-1);
    
    // Disable background image hiding
    // if (backgroundRef.current) {
    //   backgroundRef.current.style.opacity = "0";
    // }
    
    startIdleTimer();
  }, [startIdleTimer]);

  // Initial idle animation
  useEffect(() => {
    startIdleTimer();
    return () => {
      stopIdleTimer();
      stopIdleAnimation();
    };
  }, [startIdleTimer, stopIdleTimer, stopIdleAnimation]);

  // No scroll listener needed for simple hover images

  return (
    <>
      {/* Hover images removed per user request */}

      <div 
        className="container"
      >
        {/* Web Design Header */}
        <WebDesignHeader />
        
        <main 
          ref={containerRef}
          className={`portfolio-container ${activeIndex !== -1 ? 'has-active' : ''}`}
          onMouseLeave={handleContainerMouseLeave}
        >
          <h1 className="sr-only">Music Portfolio</h1>
          
          <ul className="project-list" role="list">
            {PROJECTS_DATA.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
                onMouseEnter={handleProjectMouseEnter}
                onMouseLeave={handleProjectMouseLeave}
                isActive={activeIndex === index}
                isIdle={isIdle}
                ref={(el: HTMLLIElement | null) => {
                  projectItemsRef.current[index] = el;
                }}
              />
            ))}
          </ul>
        </main>

        <div 
          ref={backgroundRef}
          className="background-image" 
          id="backgroundImage" 
          role="img" 
          aria-hidden="true"
        />

        <aside className="corner-elements">
          <nav className="corner-item top-right">
            <a href="mailto:oscar@osalproductions.com">
              Contact
            </a> |
            <a href="https://linkedin.com/in/oscarsalerno" target="_blank" rel="noopener">
              LinkedIn
            </a> |
            <a href="mailto:oscar@osalproductions.com">
              Email
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default MusicPortfolio;
