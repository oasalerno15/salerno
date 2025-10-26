"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ImageTrailProps {
  items: string[];
  variant?: number;
}

const ImageTrail: React.FC<ImageTrailProps> = ({ items }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const isFirstMove = useRef(true);
  const autoDisplayInterval = useRef<number | null>(null);
  const isMouseActive = useRef(false);
  const cursorStationaryInterval = useRef<number | null>(null);
  const lastMoveTime = useRef(Date.now());

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    // Initialize image positions
    imagesRef.current.forEach((img, index) => {
      if (img) {
        gsap.set(img, {
          rotation: gsap.utils.random(-45, 45),
          scale: gsap.utils.random(0.7, 1.3),
          opacity: 0,
          zIndex: items.length - index
        });
      }
    });

    let currentImageIndex = 0;
    let requestId: number;

    // Auto-display images in center when no mouse interaction
    const startAutoDisplay = () => {
      if (autoDisplayInterval.current) return;
      
      const centerX = content.clientWidth / 2;
      const centerY = content.clientHeight / 2;
      
      autoDisplayInterval.current = window.setInterval(() => {
        if (!isMouseActive.current) {
          const img = imagesRef.current[currentImageIndex % items.length];
          if (img) {
            gsap.killTweensOf(img);
            
            gsap.set(img, {
              x: centerX - 95,
              y: centerY - 95,
              rotation: gsap.utils.random(-45, 45),
              scale: gsap.utils.random(0.7, 1.3),
            });

            gsap.timeline()
              .to(img, {
                opacity: 1,
                duration: 0.1,
                ease: "power2.out"
              })
              .to(img, {
                opacity: 0,
                duration: 0.7,
                delay: 0.3,
                ease: "power2.out"
              });

            currentImageIndex++;
          }
        }
      }, 800); // Show new image every 800ms
    };

    const stopAutoDisplay = () => {
      if (autoDisplayInterval.current) {
        clearInterval(autoDisplayInterval.current);
        autoDisplayInterval.current = null;
      }
    };

    const startCursorStationaryDisplay = () => {
      if (cursorStationaryInterval.current) return;
      
      cursorStationaryInterval.current = window.setInterval(() => {
        const img = imagesRef.current[currentImageIndex % items.length];
        if (img) {
          gsap.killTweensOf(img);
          
          gsap.set(img, {
            x: mousePos.current.x - 95,
            y: mousePos.current.y - 95,
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.7, 1.3),
          });

          gsap.timeline()
            .to(img, {
              opacity: 1,
              duration: 0.05,
              ease: "power2.out"
            })
            .to(img, {
              opacity: 0,
              duration: 0.2,
              delay: 0.1,
              ease: "power2.out"
            });

          currentImageIndex++;
        }
      }, 150); // Very fast - every 150ms
    };

    const stopCursorStationaryDisplay = () => {
      if (cursorStationaryInterval.current) {
        clearInterval(cursorStationaryInterval.current);
        cursorStationaryInterval.current = null;
      }
    };

    const updateImages = () => {
      const threshold = 5; // Very low threshold for instant response
      const distance = Math.sqrt(
        Math.pow(mousePos.current.x - lastMousePos.current.x, 2) +
        Math.pow(mousePos.current.y - lastMousePos.current.y, 2)
      );

      // Show image immediately when mouse moves
      if (distance > threshold) {
        stopCursorStationaryDisplay(); // Stop stationary display when moving
        
        const img = imagesRef.current[currentImageIndex % items.length];
        if (img) {
          gsap.killTweensOf(img);
          
          gsap.set(img, {
            x: mousePos.current.x - 95,
            y: mousePos.current.y - 95,
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.7, 1.3),
          });

          gsap.timeline()
            .to(img, {
              opacity: 1,
              duration: 0.05, // Much faster appearance
              ease: "power2.out"
            })
            .to(img, {
              opacity: 0,
              duration: 0.3,
              delay: 0.2,
              ease: "power2.out"
            });

          currentImageIndex++;
          lastMousePos.current = { ...mousePos.current };
          lastMoveTime.current = Date.now(); // Update last move time
        }
      } else {
        // Check if cursor has been stationary for more than 300ms
        if (Date.now() - lastMoveTime.current > 300) {
          if (!cursorStationaryInterval.current) {
            startCursorStationaryDisplay();
          }
        }
      }

      requestId = requestAnimationFrame(updateImages);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only activate in the WEB DESIGN section (2nd section)
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      // Show only in WEB DESIGN section: between 50% of 1st viewport and 80% of 2nd viewport
      if (scrollY < viewportHeight * 0.5 || scrollY > viewportHeight * 1.8) {
        return;
      }

      // User is now actively moving mouse
      isMouseActive.current = true;
      stopAutoDisplay();

      const rect = content.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      // Update last move time for stationary detection
      lastMoveTime.current = Date.now();

      if (isFirstMove.current) {
        lastMousePos.current = { ...mousePos.current };
        isFirstMove.current = false;
        
        // Show first image immediately on entry - INSTANT
        const img = imagesRef.current[0];
        if (img) {
          gsap.killTweensOf(img);
          gsap.set(img, {
            x: mousePos.current.x - 95,
            y: mousePos.current.y - 95,
            rotation: gsap.utils.random(-45, 45),
            scale: gsap.utils.random(0.7, 1.3),
            opacity: 1 // Show instantly
          });
          
          // Quick fade out
          gsap.to(img, {
            opacity: 0,
            duration: 0.3,
            delay: 0.2,
            ease: "power2.out"
          });
          
          currentImageIndex++;
        }
        
        requestId = requestAnimationFrame(updateImages);
      }
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(requestId);
      isFirstMove.current = true;
      isMouseActive.current = false;
      
      // Stop both display types
      stopCursorStationaryDisplay();
      
      // Fade out all visible images
      imagesRef.current.forEach(img => {
        if (img) {
          gsap.to(img, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Restart auto-display after a short delay
      setTimeout(() => {
        if (!isMouseActive.current) {
          startAutoDisplay();
        }
      }, 1000);
    };

    content.addEventListener('mousemove', handleMouseMove);
    content.addEventListener('mouseleave', handleMouseLeave);

    // Start auto-display immediately
    startAutoDisplay();

    return () => {
      content.removeEventListener('mousemove', handleMouseMove);
      content.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestId);
      stopAutoDisplay();
      stopCursorStationaryDisplay();
    };
  }, [items]);

  return (
    <div 
      ref={contentRef}
      className="content"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 100,
        borderRadius: '8px',
        background: 'transparent',
        overflow: 'visible'
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) imagesRef.current[index] = el;
          }}
          className="content__img"
          style={{
            width: '190px',
            aspectRatio: '1.1',
            borderRadius: '15px',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            overflow: 'hidden',
            willChange: 'transform, filter'
          }}
        >
          <div
            className="content__img-inner"
            style={{
              backgroundImage: `url(${item})`,
              backgroundPosition: '50% 50%',
              width: 'calc(100% + 20px)',
              height: 'calc(100% + 20px)',
              backgroundSize: 'cover',
              position: 'absolute',
              top: 'calc(-1 * 20px / 2)',
              left: 'calc(-1 * 20px / 2)'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;
