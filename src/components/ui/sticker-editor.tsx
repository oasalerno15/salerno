"use client";

import React, { useState } from 'react';
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
  width: number;
}

interface StickerEditorProps {
  onSaveLayout: (positions: StickerPosition[]) => void;
  onCancel: () => void;
}

const StickerEditor: React.FC<StickerEditorProps> = ({ onSaveLayout, onCancel }) => {
  const [stickers, setStickers] = useState<StickerPosition[]>([
    { id: 'sticker1', src: '/sticker1.png', x: 80, y: 100, rotate: 15, width: 200 },
    { id: 'sticker2', src: '/sticker2.png', x: 240, y: 220, rotate: -10, width: 200 },
    { id: 'sticker3', src: '/sticker3.png', x: 120, y: 380, rotate: 20, width: 200 },
    { id: 'sticker4', src: '/sticker4.png', x: 320, y: 320, rotate: -5, width: 200 },
    { id: 'sticker5', src: '/sticker5.png', x: 60, y: 560, rotate: 25, width: 200 },
    { id: 'sticker6', src: '/sticker6.png', x: 280, y: 500, rotate: -15, width: 200 },
    { id: 'sticker7', src: '/sticker7.png', x: 440, y: 120, rotate: 10, width: 200 },
    { id: 'sticker8', src: '/sticker8.png', x: 400, y: 280, rotate: -20, width: 200 },
    { id: 'sticker9', src: '/sticker9.png', x: 520, y: 420, rotate: 5, width: 200 },
    { id: 'sticker10', src: '/sticker10.png', x: 460, y: 560, rotate: -12, width: 200 },
    { id: 'sticker11', src: '/sticker11.png', x: 560, y: 240, rotate: 18, width: 200 },
    { id: 'sticker12', src: '/sticker12.png', x: 200, y: 680, rotate: 8, width: 200 },
    { id: 'sticker13', src: '/sticker13.png', x: 380, y: 640, rotate: -25, width: 200 }
  ]);

  const [draggedSticker, setDraggedSticker] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);

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

  const handleSizeChange = (stickerId: string, newWidth: number) => {
    setStickers(prev => prev.map(sticker => 
      sticker.id === stickerId 
        ? { ...sticker, width: Math.max(100, Math.min(400, newWidth)) }
        : sticker
    ));
  };

  const handleReset = () => {
    setStickers([
      { id: 'sticker1', src: '/sticker1.png', x: 80, y: 100, rotate: 15, width: 200 },
      { id: 'sticker2', src: '/sticker2.png', x: 240, y: 220, rotate: -10, width: 200 },
      { id: 'sticker3', src: '/sticker3.png', x: 120, y: 380, rotate: 20, width: 200 },
      { id: 'sticker4', src: '/sticker4.png', x: 320, y: 320, rotate: -5, width: 200 },
      { id: 'sticker5', src: '/sticker5.png', x: 60, y: 560, rotate: 25, width: 200 },
      { id: 'sticker6', src: '/sticker6.png', x: 280, y: 500, rotate: -15, width: 200 },
      { id: 'sticker7', src: '/sticker7.png', x: 440, y: 120, rotate: 10, width: 200 },
      { id: 'sticker8', src: '/sticker8.png', x: 400, y: 280, rotate: -20, width: 200 },
      { id: 'sticker9', src: '/sticker9.png', x: 520, y: 420, rotate: 5, width: 200 },
      { id: 'sticker10', src: '/sticker10.png', x: 460, y: 560, rotate: -12, width: 200 },
      { id: 'sticker11', src: '/sticker11.png', x: 560, y: 240, rotate: 18, width: 200 },
      { id: 'sticker12', src: '/sticker12.png', x: 200, y: 680, rotate: 8, width: 200 },
      { id: 'sticker13', src: '/sticker13.png', x: 380, y: 640, rotate: -25, width: 200 }
    ]);
    setSelectedSticker(null);
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

      {/* Size Control Panel */}
      {selectedSticker && (
        <div className="absolute top-20 right-4 bg-blue-600 text-white p-4 rounded z-10 shadow-lg min-w-[300px]">
          <p className={`text-sm font-bold mb-3 ${jetBrainsMono.className}`}>
            📏 RESIZE: {selectedSticker}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const sticker = stickers.find(s => s.id === selectedSticker);
                if (sticker) handleSizeChange(selectedSticker, sticker.width - 20);
              }}
              className={`px-3 py-1 bg-blue-800 hover:bg-blue-900 rounded ${jetBrainsMono.className}`}
            >
              -
            </button>
            <input
              type="range"
              min="100"
              max="400"
              value={stickers.find(s => s.id === selectedSticker)?.width || 200}
              onChange={(e) => handleSizeChange(selectedSticker, Number(e.target.value))}
              className="flex-1"
              style={{ cursor: 'pointer' }}
            />
            <button
              onClick={() => {
                const sticker = stickers.find(s => s.id === selectedSticker);
                if (sticker) handleSizeChange(selectedSticker, sticker.width + 20);
              }}
              className={`px-3 py-1 bg-blue-800 hover:bg-blue-900 rounded ${jetBrainsMono.className}`}
            >
              +
            </button>
          </div>
          <p className={`text-xs mt-2 ${jetBrainsMono.className}`}>
            Width: {stickers.find(s => s.id === selectedSticker)?.width}px
          </p>
        </div>
      )}

      {/* Stickers */}
      <div className="absolute top-0 left-0 w-full h-full pt-20">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className={`absolute cursor-move select-none ${selectedSticker === sticker.id ? 'ring-4 ring-blue-500' : ''}`}
            style={{
              left: sticker.x,
              top: sticker.y,
              width: `${sticker.width}px`,
              height: `${sticker.width * 1.25}px`,
              overflow: 'visible'
            }}
            onMouseDown={(e) => handleMouseDown(e, sticker.id)}
            onClick={() => setSelectedSticker(sticker.id)}
          >
            <SimpleStickerPeel
              imageSrc={sticker.src}
              width={sticker.width}
              rotate={sticker.rotate}
              peelBackHoverPct={20}
              peelBackActivePct={40}
              shadowIntensity={0.8}
              lightingIntensity={0.12}
            />
            {/* Position indicator */}
            <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 text-xs rounded whitespace-nowrap">
              {sticker.id}: ({Math.round(sticker.x)}, {Math.round(sticker.y)}) | {sticker.width}px
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickerEditor;


