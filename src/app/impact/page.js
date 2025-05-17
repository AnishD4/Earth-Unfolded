"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ImpactPage() {
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Data for the different climate impacts
  const impacts = [
    {
      id: 'rising-temps',
      title: 'Rising Temperatures',
      description: 'Global average temperatures have risen by over 1°C since pre-industrial times and are projected to continue rising, leading to more extreme heat events, affecting ecosystems and human health worldwide.',
      icon: '🌡️',
      color: 'from-orange-400 to-red-600',
      stats: [
        { label: 'Temperature Increase Since 1880', value: '+1.1°C' },
        { label: 'Projected Increase by 2100', value: '+1.5 to +5.0°C' }
      ]
    },
    {
      id: 'sea-level',
      title: 'Sea Level Rise',
      description: 'Rising sea levels threaten coastal communities, infrastructure, and ecosystems. Thermal expansion of oceans and melting ice from glaciers and ice sheets contribute to ongoing sea level rise.',
      icon: '🌊',
      color: 'from-blue-400 to-blue-700',
      stats: [
        { label: 'Rise Since 1900', value: '~20 cm' },
        { label: 'Projected Rise by 2100', value: '30-110 cm' }
      ]
    },
    {
      id: 'extreme-weather',
      title: 'Extreme Weather',
      description: 'Climate change intensifies extreme weather events including hurricanes, droughts, floods, and wildfires, disrupting communities and ecosystems worldwide.',
      icon: '⛈️',
      color: 'from-purple-500 to-indigo-700',
      stats: [
        { label: 'Increase in Category 4-5 Hurricanes', value: '+30% since 1980' },
        { label: 'Annual Cost of Weather Disasters', value: '$150+ billion' }
      ]
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity Loss',
      description: 'Changing climate conditions are forcing species to adapt or migrate, with many facing extinction. Ecosystems are being disrupted with cascading effects throughout food webs.',
      icon: '🦋',
      color: 'from-green-400 to-emerald-600',
      stats: [
        { label: 'Species at Risk of Extinction', value: '1 million+' },
        { label: 'Rate of Extinction', value: '1000x background rate' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading for visual consistency with the main page
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Loading overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl">Loading Impact Data...</p>
              <p className="text-blue-400 text-sm mt-2">Preparing climate impact visualization</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="w-full p-6 z-10"
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
                transition={{ delay: 0.2 }}
              >
                Climate Impact
              </motion.h1>
              <motion.p
                className="text-blue-300 text-lg mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Understanding the effects of climate change
              </motion.p>
            </div>

            {/* Navigation button */}
            <Link href="/" passHref>
              <motion.button
                className="bg-blue-600/70 hover:bg-blue-700 text-white p-2 rounded-lg backdrop-blur-sm flex items-center gap-2 px-4 text-sm mt-4 md:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Earth View
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 pb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, staggerChildren: 0.2 }}
        >
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.id}
              className={`bg-gradient-to-br ${impact.color} rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              onClick={() => setSelectedImpact(impact)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className="text-4xl mb-3">{impact.icon}</div>
                <h3 className="text-white text-xl font-bold mb-2">{impact.title}</h3>
                <p className="text-white/80 text-sm">{impact.description.substring(0, 100)}...</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Take Action on Climate Change</h2>
          <p className="text-blue-300 max-w-2xl mx-auto mb-6">
            Individual actions, when taken collectively, can make a significant impact
            in combating climate change and preserving our planet for future generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.a
              href="https://www.un.org/en/actnow"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              UN Climate Action
            </motion.a>
            <motion.a
              href="https://www.ipcc.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              IPCC Reports
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Detail modal for selected impact */}
      <AnimatePresence>
        {selectedImpact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImpact(null)}
          >
            <motion.div
              className={`bg-gradient-to-br ${selectedImpact.color} max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">{selectedImpact.icon}</span>
                    {selectedImpact.title}
                  </h2>
                  <button
                    onClick={() => setSelectedImpact(null)}
                    className="text-white/80 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/90 text-lg mb-6">
                  {selectedImpact.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {selectedImpact.stats.map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-white text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="text-white text-xl font-bold mb-2">What can be done?</h3>
                  <p className="text-white/90">
                    Mitigating {selectedImpact.title.toLowerCase()} requires both global policy changes and individual actions.
                    Reducing carbon emissions, transitioning to renewable energy, and supporting sustainable practices
                    are critical steps toward addressing this challenge.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer with attribution */}
      <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm text-white/60 py-2 text-center text-xs">
        <p>Earth Unfolded | Climate data sourced from IPCC and NASA</p>
      </div>
    </div>
  );
}
