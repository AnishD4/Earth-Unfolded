"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineControl from '@/components/TimelineControl';
import InfoPanel from '@/components/InfoPanel';
import Stars from '@/components/Stars';

// Dynamically import Earth component to avoid SSR issues with Three.js
const Earth = dynamic(() => import('@/components/Earth'), { ssr: false });

export default function Home() {
  const [activeTimeframe, setActiveTimeframe] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Start with intro animation
  useEffect(() => {
    // Hide intro after delay
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);

    // Set default timeframe after initial load
    setActiveTimeframe({
      id: 'present',
      name: 'Present Day',
      year: '2025',
      temp: '~15.0°C global average',
      co2: '~420 ppm'
    });

    return () => clearTimeout(timer);
  }, []);

  // Show help temporarily and fade it out
  useEffect(() => {
    if (isLoaded && !showIntro) {
      // Show help message
      setShowHelp(true);

      // Hide help message after 6 seconds
      const helpTimer = setTimeout(() => {
        setShowHelp(false);
      }, 6000);

      return () => clearTimeout(helpTimer);
    }
  }, [isLoaded, showIntro]);

  const handleTimeframeChange = (timeframe) => {
    setActiveTimeframe(timeframe);
    // Close info panel when changing timeframes
    setShowInfoPanel(false);
  };

  const handleSceneLoaded = () => {
    setIsLoaded(true);
  };

  // Handle the info button click
  const handleInfoButtonClick = () => {
    setShowInfoPanel(true);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Intro animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <motion.img
                src="/globe.svg"
                alt="Earth"
                className="w-32 h-32 md:w-48 md:h-48"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity
                }}
              />

              <motion.div
                className="absolute top-0 left-0 w-full h-full rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px 10px rgba(52, 130, 246, 0.2)",
                    "0 0 30px 15px rgba(52, 130, 246, 0.4)",
                    "0 0 20px 10px rgba(52, 130, 246, 0.2)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mt-8"
            >
              Earth Unfolded
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-blue-300 text-xl mt-4 max-w-md text-center"
            >
              Visualizing our planet&#39;s climate through time
            </motion.p>

            {/* Custom loading animation instead of react-loader-spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8"
            >
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay */}
      <AnimatePresence>
        {!isLoaded && !showIntro && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl">Loading Earth...</p>
              <p className="text-blue-400 text-sm mt-2">Preparing climate data visualization</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Canvas */}
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 4], fov: 45 }}
        onCreated={handleSceneLoaded}
      >
        <Stars count={3000} />
        {activeTimeframe && (
          <Earth
            timeframe={activeTimeframe}
          />
        )}
      </Canvas>

      {/* Header with better spacing */}
      <motion.div
        className="absolute top-0 left-0 w-full p-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Earth Unfolded
              </motion.h1>
              <motion.p
                className="text-blue-300 text-lg mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                The Climate History of Our Planet
              </motion.p>
            </div>

            {/* Action buttons moved to header for better layout */}
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <motion.button
                className="bg-green-600/70 hover:bg-green-700 text-white p-2 rounded-lg backdrop-blur-sm flex items-center gap-2 px-4 text-sm"
                onClick={() => window.open('https://www.un.org/en/actnow', '_blank')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Take Action
              </motion.button>

              {/* Info button removed as requested */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Help tooltip with auto-hide functionality */}
      <AnimatePresence>
        {isLoaded && showHelp && !showInfoPanel && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center glassmorphism p-4 rounded-lg z-10 pointer-events-none max-w-xs"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white font-medium">Drag to rotate • Scroll to zoom</p>
            <p className="text-blue-300 mt-2 text-sm">Use the timeline to explore different eras</p>
            <p className="text-gray-400 text-xs mt-3">This message will disappear shortly</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Control */}
      <TimelineControl onTimeframeChange={handleTimeframeChange} />

      {/* Info Panel removed as requested */}
    </div>
  );
}
