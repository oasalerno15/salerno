"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface SimpleStickerPeelProps {
  imageSrc: string;
  width?: number;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  className?: string;
}

const SimpleStickerPeel: React.FC<SimpleStickerPeelProps> = ({
  imageSrc,
  width = 200,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const defaultPadding = 10;

  useEffect(() => {
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (pointLightRef.current) {
        gsap.set(pointLightRef.current, { attr: { x, y } });
      }
      if (pointLightFlippedRef.current) {
        gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', updateLight);
      return () => container.removeEventListener('mousemove', updateLight);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      container.classList.add('touch-active');
    };

    const handleTouchEnd = () => {
      container.classList.remove('touch-active');
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  // Add drag functionality
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const rect = dragRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const parentRect = dragRef.current?.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const newX = e.clientX - parentRect.left - dragOffset.x;
        const newY = e.clientY - parentRect.top - dragOffset.y;
        
        setPosition({
          x: Math.max(-50, Math.min(newX, 200)), // Basic bounds
          y: Math.max(-50, Math.min(newY, 200))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const dragElement = dragRef.current;
    if (dragElement) {
      dragElement.addEventListener('mousedown', handleMouseDown, { passive: false });
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        dragElement.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const cssVars = useMemo(
    () => ({
      '--sticker-rotate': `${rotate}deg`,
      '--sticker-p': `${defaultPadding}px`,
      '--sticker-peelback-hover': `${peelBackHoverPct}%`,
      '--sticker-peelback-active': `${peelBackActivePct}%`,
      '--sticker-width': `${width}px`,
      '--sticker-shadow-opacity': shadowIntensity,
      '--sticker-lighting-constant': lightingIntensity,
      '--peel-direction': '0deg'
    }),
    [rotate, peelBackHoverPct, peelBackActivePct, width, shadowIntensity, lightingIntensity]
  );

  return (
    <div 
      className={`simple-sticker ${className}`} 
      ref={dragRef}
      style={{
        ...cssVars,
        position: 'relative',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <svg width="0" height="0">
        <defs>
          <filter id="pointLight">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="pointLightFlipped">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id="dropShadow">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={3 * shadowIntensity}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>

          <filter id="expandAndFill">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className="sticker-container" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <Image
              src={imageSrc}
              alt=""
              width={width}
              height={width}
              className="sticker-image"
              draggable="false"
              onContextMenu={e => e.preventDefault()}
              unoptimized
            />
          </div>
        </div>

        <div className="flap">
          <div className="flap-lighting">
            <Image
              src={imageSrc}
              alt=""
              width={width}
              height={width}
              className="flap-image"
              draggable="false"
              onContextMenu={e => e.preventDefault()}
              unoptimized
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .simple-sticker {
          position: relative;
          cursor: pointer;
          border: none;
          outline: none;
          background: transparent;
        }

        .sticker-container {
          position: relative;
          transform: rotate(var(--peel-direction));
          transform-origin: center;
        }

        .sticker-container * {
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }

        .sticker-main {
          clip-path: polygon(
            calc(-1 * var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) calc(100% + var(--sticker-p)),
            calc(-1 * var(--sticker-p)) calc(100% + var(--sticker-p))
          );
          transition: clip-path 0.6s ease-out;
          filter: url(#dropShadow);
        }

        .sticker-main > * {
          transform: rotate(calc(-1 * var(--peel-direction)));
        }

        .sticker-lighting {
          filter: url(#pointLight);
        }

        .sticker-container:hover .sticker-main,
        .sticker-container.touch-active .sticker-main {
          clip-path: polygon(
            calc(-1 * var(--sticker-p)) var(--sticker-peelback-hover),
            calc(100% + var(--sticker-p)) var(--sticker-peelback-hover),
            calc(100% + var(--sticker-p)) calc(100% + var(--sticker-p)),
            calc(-1 * var(--sticker-p)) calc(100% + var(--sticker-p))
          );
        }

        .sticker-container:active .sticker-main {
          clip-path: polygon(
            calc(-1 * var(--sticker-p)) var(--sticker-peelback-active),
            calc(100% + var(--sticker-p)) var(--sticker-peelback-active),
            calc(100% + var(--sticker-p)) calc(100% + var(--sticker-p)),
            calc(-1 * var(--sticker-p)) calc(100% + var(--sticker-p))
          );
        }

        .sticker-image {
          transform: rotate(var(--sticker-rotate));
        }

        .flap {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: calc(-100% - var(--sticker-p) - var(--sticker-p));
          clip-path: polygon(
            calc(-1 * var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(-1 * var(--sticker-p)) calc(-1 * var(--sticker-p))
          );
          transform: scaleY(-1);
          transition: all 0.6s ease-out;
        }

        .flap > * {
          transform: rotate(calc(-1 * var(--peel-direction)));
        }

        .sticker-container:hover .flap,
        .sticker-container.touch-active .flap {
          clip-path: polygon(
            calc(-1 * var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) var(--sticker-peelback-hover),
            calc(-1 * var(--sticker-p)) var(--sticker-peelback-hover)
          );
          top: calc(-100% + 2 * var(--sticker-peelback-hover) - 1px);
        }

        .sticker-container:active .flap {
          clip-path: polygon(
            calc(-1 * var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) calc(-1 * var(--sticker-p)),
            calc(100% + var(--sticker-p)) var(--sticker-peelback-active),
            calc(-1 * var(--sticker-p)) var(--sticker-peelback-active)
          );
          top: calc(-100% + 2 * var(--sticker-peelback-active) - 1px);
        }

        .flap-lighting {
          filter: url(#pointLightFlipped);
        }

        .flap-image {
          transform: rotate(var(--sticker-rotate));
          filter: url(#expandAndFill);
        }

        .sticker-image,
        .flap-image {
          width: var(--sticker-width, 200px);
          border-radius: 12px;
          box-shadow: none;
        }

        .sticker-main,
        .flap {
          will-change: clip-path, transform;
        }
      `}</style>
    </div>
  );
};

export default SimpleStickerPeel;
