'use client'

import React, { useEffect, useRef, useState } from 'react';
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
  const engineRef = useRef<{ cleanup: () => void, resetCamera: () => void } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the Vanilla Three.js Solar System
    engineRef.current = initSolarSystem(containerRef.current, (planetName: string) => {
      setSelectedPlanet(planetName);
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

      {/* Planet Info Modal overlay */}
      {selectedPlanet && (
        <div className="absolute top-24 right-8 w-80 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl z-50 text-white animate-in fade-in slide-in-from-right-4 duration-300">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {selectedPlanet}
          </h3>

          <div className="space-y-3 text-sm text-slate-300 mt-4">
            <p><strong>Radius:</strong> {planetData[selectedPlanet]?.radius}</p>
            <p><strong>Orbit:</strong> {planetData[selectedPlanet]?.orbit}</p>
            <p className="mt-4 pt-4 border-t border-slate-700 leading-relaxed">
              {planetData[selectedPlanet]?.info}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
