'use client'

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// @ts-ignore
import { initSolarSystem } from './external-solar-system/src/solarSystemEngine';
import { X } from 'lucide-react';

const planetData: Record<string, any> = {
  'Sun': { radius: '696,340 km', orbit: 'Center of Solar System', info: 'The star at the center of our solar system, constituting 99.8% of its total mass.' },
  'Mercury': { radius: '2,439.7 km', orbit: '88 Earth days', info: 'The smallest planet in our solar system and nearest to the Sun.' },
  'Venus': { radius: '6,051.8 km', orbit: '225 Earth days', info: 'Second planet from the Sun, known for its extreme temperatures.' },
  'Earth': { radius: '6,371 km', orbit: '365 days', info: 'Third planet from the Sun and the only known planet to harbor life.' },
  'Mars': { radius: '3,389.5 km', orbit: '687 Earth days', info: 'Known as the Red Planet, famous for its reddish appearance.' },
  'Jupiter': { radius: '69,911 km', orbit: '12 Earth years', info: 'The largest planet in our solar system, known for its Great Red Spot.' },
  'Saturn': { radius: '58,232 km', orbit: '29.5 Earth years', info: 'Distinguished by its extensive ring system.' },
  'Uranus': { radius: '25,362 km', orbit: '84 Earth years', info: 'Known for its unique sideways rotation and pale blue color.' },
  'Neptune': { radius: '24,622 km', orbit: '165 Earth years', info: 'The most distant planet from the Sun in our solar system.' },
  'Pluto': { radius: '1,188.3 km', orbit: '248 Earth years', info: 'Originally classified as the ninth planet, now considered a dwarf planet.' }
};

export default function ExternalSolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const engineRef = useRef<{ cleanup: () => void, resetCamera: () => void } | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;

    // Initialize the Vanilla Three.js Solar System
    engineRef.current = initSolarSystem(containerRef.current, (planetName: string) => {
      if (planetName) {
        // Find matching key case-insensitively to prevent any casing or white-space mismatches
        const matchedKey = Object.keys(planetData).find(
          (key) => key.toLowerCase() === planetName.trim().toLowerCase()
        );
        setSelectedPlanet(matchedKey || planetName);
      } else {
        setSelectedPlanet(null);
      }
    });

    return () => {
      if (engineRef.current) {
        engineRef.current.cleanup();
      }
    };
  }, []);

  const handleClose = () => {
    setSelectedPlanet(null);
    if (engineRef.current) {
      engineRef.current.resetCamera();
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {mounted && typeof document !== 'undefined' && selectedPlanet && createPortal(
        <>
          {/* Backdrop for mobile to prevent clashing overlay text */}
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-void-black/75 backdrop-blur-sm z-[900] md:hidden cursor-pointer"
            aria-hidden="true"
          />

          {/* Planet Info Modal overlay wrapper */}
          <div className="fixed inset-0 flex items-center justify-center md:justify-end md:items-start md:p-8 pointer-events-none z-[1000]">
            <div className="relative w-[calc(100%-2.5rem)] max-w-xs md:w-80 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-6 rounded-2xl shadow-2xl text-white pointer-events-auto animate-in fade-in zoom-in-95 md:slide-in-from-right-4 duration-300 md:mt-24">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Close planet info"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {selectedPlanet}
              </h3>

              <div className="space-y-3 text-sm text-slate-300 mt-4">
                <p><strong>Radius:</strong> {planetData[selectedPlanet]?.radius || 'N/A'}</p>
                <p><strong>Orbit:</strong> {planetData[selectedPlanet]?.orbit || 'N/A'}</p>
                <p className="mt-4 pt-4 border-t border-slate-700/80 leading-relaxed">
                  {planetData[selectedPlanet]?.info || 'No detailed data available for this planetary body.'}
                </p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
