"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { JetBrains_Mono } from 'next/font/google';
import SimpleStickerPeel from '../SimpleStickerPeel';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

interface StickerPosition {
  id: string;
  src: string;
  x: number;
  y: number;
  rotate: number;
}

interface StickerEditorProps {
  onSaveLayout: (positions: StickerPosition[]) => void;
  onCancel: () => void;
}

const StickerEditor: React.FC<StickerEditorProps> = ({ onSaveLayout, onCancel }) => {
  const [stickers, setStickers] = useState<StickerPosition[]>([
    { id: 'sticker1', src: '/sticker1.png', x: 20, y: 50, rotate: 15 },
    { id: 'sticker2', src: '/sticker2.png', x: 150, y: 150, rotate: -10 },
    { id: 'sticker3', src: '/sticker3.png', x: 50, y: 300, rotate: 20 },
    { id: 'sticker4', src: '/sticker4.png', x: 200, y: 250, rotate: -5 },
    { id: 'sticker5', src: '/sticker5.png', x: 30, y: 500, rotate: 25 },
    { id: 'sticker6', src: '/sticker6.png', x: 180, y: 400, rotate: -15 },
    { id: 'sticker7', src: '/sticker7.png', x: 350, y: 80, rotate: 10 },
    { id: 'sticker8', src: '/sticker8.png', x: 300, y: 200, rotate: -20 },
    { id: 'sticker9', src: '/sticker9.png', x: 400, y: 350, rotate: 5 },
    { id: 'sticker10', src: '/sticker10.png', x: 320, y: 450, rotate: -12 },
    { id: 'sticker11', src: '/sticker11.png', x: 450, y: 250, rotate: 18 },
    { id: 'sticker12', src: '/sticker12.png', x: 100, y: 600, rotate: 8 },
    { id: 'sticker13', src: '/sticker13.png', x: 500, y: 500, rotate: -25 }
  ]);

  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, stickerId: string) => {
    e.preventDefault();
    const sticker = stickers.find(s => s.id === stickerId);
    if (sticker) {
      setDraggedSticker(stickerId);
      setDragOffset({
        x: e.clientX - sticker.x,
        y: e.clientY - sticker.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedSticker) {
      setStickers(prev => prev.map(sticker => 
        sticker.id === draggedSticker 
          ? { 
              ...sticker, 
              x: e.clientX - dragOffset.x, 
              y: e.clientY - dragOffset.y 
            }
          : sticker
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedSticker(null);
  };

  const handleSave = () => {
    onSaveLayout(stickers);
  };

  const handleReset = () => {
    setStickers([
      { id: 'sticker1', src: '/sticker1.png', x: 20, y: 50, rotate: 15 },
      { id: 'sticker2', src: '/sticker2.png', x: 150, y: 150, rotate: -10 },
      { id: 'sticker3', src: '/sticker3.png', x: 50, y: 300, rotate: 20 },
      { id: 'sticker4', src: '/sticker4.png', x: 200, y: 250, rotate: -5 },
      { id: 'sticker5', src: '/sticker5.png', x: 30, y: 500, rotate: 25 },
      { id: 'sticker6', src: '/sticker6.png', x: 180, y: 400, rotate: -15 },
      { id: 'sticker7', src: '/sticker7.png', x: 350, y: 80, rotate: 10 },
      { id: 'sticker8', src: '/sticker8.png', x: 300, y: 200, rotate: -20 },
      { id: 'sticker9', src: '/sticker9.png', x: 400, y: 350, rotate: 5 },
      { id: 'sticker10', src: '/sticker10.png', x: 320, y: 450, rotate: -12 },
      { id: 'sticker11', src: '/sticker11.png', x: 450, y: 250, rotate: 18 },
      { id: 'sticker12', src: '/sticker12.png', x: 100, y: 600, rotate: 8 },
      { id: 'sticker13', src: '/sticker13.png', x: 500, y: 500, rotate: -25 }
    ]);
  };

  return (
    <div 
      className="fixed inset-0 bg-white z-50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black text-white p-4 z-10">
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-bold ${jetBrainsMono.className}`}>
            STICKER PLACEMENT EDITOR
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className={`px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 transition-colors ${jetBrainsMono.className}`}
            >
              RESET
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors ${jetBrainsMono.className}`}
            >
              SAVE LAYOUT
            </button>
            <button
              onClick={onCancel}
              className={`px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors ${jetBrainsMono.className}`}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-20 left-4 bg-gray-100 p-4 rounded z-10">
        <p className={`text-sm ${jetBrainsMono.className}`}>
          Drag stickers to position them. Click and drag any sticker to move it around the page.
        </p>
      </div>

      {/* Stickers */}
      <div className="absolute top-0 left-0 w-full h-full pt-20">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="absolute cursor-move select-none"
            style={{
              left: sticker.x,
              top: sticker.y,
              width: '280px',
              height: '350px',
              overflow: 'visible'
            }}
            onMouseDown={(e) => handleMouseDown(e, sticker.id)}
          >
            <SimpleStickerPeel
              imageSrc={sticker.src}
              width={280}
              rotate={sticker.rotate}
              peelBackHoverPct={20}
              peelBackActivePct={40}
              shadowIntensity={0.8}
              lightingIntensity={0.12}
            />
            {/* Position indicator */}
            <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 text-xs rounded">
              {sticker.id}: ({Math.round(sticker.x)}, {Math.round(sticker.y)})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerEditor;


