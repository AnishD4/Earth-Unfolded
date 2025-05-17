"use client";

import dynamic from 'next/dynamic';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import TimelineControl from '@/components/TimelineControl';
import InfoPanel from '@/components/InfoPanel';

// Dynamically import Earth component to avoid SSR issues with Three.js
const Earth = dynamic(() => import('@/components/Earth'), { ssr: false });

export default function Home() {
  const [activeTimeframe, setActiveTimeframe] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  const handleTimeframeChange = (timeframe) => {
    setActiveTimeframe(timeframe);
    // Close info panel when changing timeframes
    setShowInfoPanel(false);
  };

  const handleHotspotClick = () => {
    setShowInfoPanel(true);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Loading overlay */}
      <Suspense fallback={
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl">Loading Earth...</p>
          </div>
        </div>
      }>
        {/* 3D Canvas */}
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 4], fov: 45 }}>
          <Earth
            timeframe={activeTimeframe}
            onHotspotClick={handleHotspotClick}
          />
        </Canvas>
      </Suspense>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Earth Unfolded
          </motion.h1>
          <motion.p
            className="text-blue-300 text-xl mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            The Climate History of Our Planet
          </motion.p>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black/30 backdrop-blur-sm p-4 rounded-lg z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p>Drag to rotate • Scroll to zoom</p>
        <p className="text-blue-300 mt-2">Click the Earth to see detailed information</p>
      </motion.div>

      {/* Info button */}
      <motion.button
        className="absolute top-6 right-6 z-20 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
        onClick={() => setShowInfoPanel(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.button>

      {/* Timeline Control */}
      <TimelineControl onTimeframeChange={handleTimeframeChange} />

      {/* Info Panel */}
      <InfoPanel
        timeframe={activeTimeframe}
        isOpen={showInfoPanel}
        onClose={() => setShowInfoPanel(false)}
      />
    </div>
  );
}
