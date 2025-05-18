"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineControl from '@/components/TimelineControl';
import InfoPanel from '@/components/InfoPanel';
import Stars from '@/components/Stars';
import Link from 'next/link';

// Dynamically import Earth component to avoid SSR issues with Three.js
const Earth = dynamic(() => import('@/components/Earth'), { ssr: false });
const timelineFacts = {
  prehistoric: {
    year: 'Prehistoric (4.5 billion years ago)',
    facts: [
      'Global temperatures fluctuated between 4-25°C.',
      'CO₂ levels averaged around 280 ppm during stable periods.',
      'No polar ice caps existed; sea levels were significantly higher.'
    ]
  },
  ice_age: {
    year: 'Last Glacial Maximum (~20,000 years ago)',
    facts: [
      'Global average temperature was about 6°C colder than today.',
      'Massive ice sheets covered much of North America, Northern Europe, and Asia.',
      'Sea levels were about 120 meters (394 feet) lower than today.',
      'Atmospheric CO₂ was around 180–190 ppm.'
    ]
  },
  preindustrial: {
    year: 'Pre-Industrial (circa 1750)',
    facts: [
      'Global climate was relatively stable for thousands of years.',
      'Global average temperature was around 13.7°C.',
      'Atmospheric CO₂ was about 280 ppm.',
      'Human influence on climate was minimal before widespread fossil fuel use.'
    ]
  },
  industrial: {
    year: 'Industrial Revolution (1850-1950)',
    facts: [
      'Global average temperature was around 13.8°C.',
      'CO₂ levels rose to about 310 ppm from fossil fuel burning.',
      'Industrialization began releasing significant greenhouse gas emissions.',
      'Early climate research started to identify human impacts on the atmosphere.'
    ]
  },
  modern: {
    year: 'Modern Era (1950-2000)',
    facts: [
      'Global average temperature rose to around 14.2°C.',
      'CO₂ levels increased to approximately 370 ppm.',
      'Rapid increase in greenhouse gas emissions due to industrialization and population growth.',
      'Widespread recognition of climate change and international efforts to address it began.'
    ]
  },
  present: {
    year: 'Present Day (2025)',
    facts: [
      'Global average temperature is approximately 15.0°C.',
      'Atmospheric CO₂ is above 420 ppm, the highest in at least 2 million years.',
      'Earth has warmed by about 1.1°C since pre-industrial times.',
      'Extreme weather events and sea level rise are accelerating due to climate change.'
    ]
  },
  future: {
    year: 'Future Projection (2100)',
    facts: [
      'Global temperatures could rise by 1.5-4.5°C above pre-industrial levels, depending on emissions.',
      'CO₂ levels may reach 500-900 ppm if emissions are not curbed.',
      'Sea levels could rise by up to 1 meter, threatening coastal cities.',
      'Extreme weather events are projected to become even more frequent and severe.'
    ]
  }
};
export default function Home() {
  const [activeTimeframe, setActiveTimeframe] = useState({ id: 'present' /* ... */ });
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedFact, setSelectedFact] = useState(0);
  const currentFact = timelineFacts[activeTimeframe?.id] || timelineFacts['present'];


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
      <div className="absolute left-25 top-32 z-20 flex">
        <motion.aside 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border border-blue-900/50 bg-gradient-to-br from-black/70 to-blue-950/40 p-5 w-96 rounded-xl mt-4 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <motion.h2 
              className="text-white text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {currentFact.year}
            </motion.h2>
            <motion.div 
              className="text-blue-400 text-sm bg-blue-900/30 px-3 py-1 rounded-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Climate Facts
            </motion.div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-3"></div>
          
          <div className="text-blue-100">
            <motion.ul 
              className="space-y-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, staggerChildren: 0.1 }}
            >
              {currentFact.facts.map((fact, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className={`flex items-start p-3 rounded-lg transition-all duration-300 ${selectedFact === idx ? 'bg-blue-700/20 border-l-2 border-blue-400' : 'hover:bg-blue-800/20 cursor-pointer border-l-2 border-transparent'}`}
                  onClick={() => setSelectedFact(idx)}
                >
                  <span className="text-blue-300 mr-3 mt-0.5 flex-shrink-0">•</span>
                  <span>{fact}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          
          <div className="flex justify-between mt-4 pt-3 border-t border-blue-900/30">
            <motion.a 
              href="https://climate.nasa.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-blue-400 text-xs hover:text-blue-300 transition-colors flex items-center"
            >
              <span>Source: NASA Climate</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          
            <div className="flex space-x-1">
              {currentFact.facts.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`w-2 h-2 rounded-full ${selectedFact === idx ? 'bg-blue-400' : 'bg-blue-800'}`}
                  onClick={() => setSelectedFact(idx)}
                />
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
      <div className="absolute left-0 right-0 top-32 z-20 flex justify-start">
    </div>


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

              <Link href="/impact">
                <motion.div
                  className="bg-blue-600/70 hover:bg-blue-700 text-white p-2 rounded-lg backdrop-blur-sm flex items-center gap-2 px-4 text-sm cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  Climate Impact
                </motion.div>
              </Link>

              <Link href="/how-can-you-help">
                <motion.div
                  className="bg-blue-600/70 hover:bg-blue-700 text-white p-2 rounded-lg backdrop-blur-sm flex items-center gap-2 px-4 text-sm cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  How Can You Help
                </motion.div>
              </Link>

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Control */}
      <TimelineControl onTimeframeChange={setActiveTimeframe} />


      {/* Info Panel removed as requested */}
    </div>
  );
}
