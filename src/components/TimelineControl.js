import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const timeframes = [
  {
    id: 'prehistoric',
    name: 'Prehistoric',
    year: '4.5 billion years ago',
    temp: '4-25°C',
    co2: '~280 ppm',
    description: 'The early Earth formed, with volcanic activity and a primordial atmosphere.',
    color: '#FF5733'
  },
  {
    id: 'ice_age',
    name: 'Ice Ages',
    year: '~2.5 million years ago',
    temp: '~6°C cooler than today',
    co2: '~180-280 ppm',
    description: 'Cycles of glacial expansion and retreat altered Earth\'s landscapes and habitats.',
    color: '#A5F2F3'
  },
  {
    id: 'preindustrial',
    name: 'Pre-Industrial',
    year: '~1750',
    temp: '~13.7°C global average',
    co2: '~280 ppm',
    description: 'Before widespread industrialization, climate was relatively stable for thousands of years.',
    color: '#33FF57'
  },
  {
    id: 'industrial',
    name: 'Industrial Revolution',
    year: '1850-1950',
    temp: '~13.8°C global average',
    co2: '~310 ppm',
    description: 'Increased burning of fossil fuels began releasing significant CO2 into the atmosphere.',
    color: '#A89C8F'
  },
  {
    id: 'modern',
    name: 'Modern Era',
    year: '1950-2000',
    temp: '~14.2°C global average',
    co2: '~370 ppm',
    description: 'Rapid industrialization and population growth accelerated human impacts on climate.',
    color: '#E95F2B'
  },
  {
    id: 'present',
    name: 'Present Day',
    year: '2025',
    temp: '~15.0°C global average',
    co2: '~420 ppm',
    description: 'Record temperatures and concentrated CO2 levels not seen in 3 million years.',
    color: '#E74C3C'
  },
  {
    id: 'future',
    name: 'Future Projection',
    year: '2100 (projected)',
    temp: '+1.5°C to +4.5°C from pre-industrial',
    co2: '500-900 ppm',
    description: 'Potential scenarios based on climate action taken or not taken today.',
    color: '#FF3300'
  }
];

export default function TimelineControl({ onTimeframeChange }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[5]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    onTimeframeChange(selectedTimeframe);
  }, [selectedTimeframe, onTimeframeChange]);

  const handleTimeframeSelect = (timeframe) => {
    setSelectedTimeframe(timeframe);

    // Add analytics tracking if needed
    console.log(`Timeline changed to: ${timeframe.name}`);
  };

  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full glassmorphism text-white p-4 md:p-6 z-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 md:mb-4">
          <div>
            <motion.h2
              className="text-xl md:text-2xl font-bold flex items-center"
              animate={{
                color: selectedTimeframe.color
              }}
              transition={{ duration: 1 }}
            >
              {selectedTimeframe.name}
              <motion.span
                className="text-blue-300 text-lg ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ({selectedTimeframe.year})
              </motion.span>
            </motion.h2>
            <p className="text-gray-300 mt-1 text-sm md:text-base max-w-2xl">{selectedTimeframe.description}</p>
          </div>

          <div className="flex gap-4 mt-3 md:mt-0">
            <motion.div
              className="bg-gray-800/70 px-2 md:px-3 py-1 md:py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gray-400 text-xs">Temperature</span>
              <p className="text-yellow-300 font-mono text-sm md:text-base">{selectedTimeframe.temp}</p>
            </motion.div>
            <motion.div
              className="bg-gray-800/70 px-2 md:px-3 py-1 md:py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gray-400 text-xs">CO₂</span>
              <p className="text-green-300 font-mono text-sm md:text-base">{selectedTimeframe.co2}</p>
            </motion.div>
          </div>
        </div>

        {/* Navigation buttons moved above timeline for better accessibility */}
        <div className="flex justify-center mb-3">
          <motion.button
            className="bg-blue-600/80 hover:bg-blue-700 text-white rounded-l-lg px-3 py-1 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              const currentIndex = timeframes.findIndex(t => t.id === selectedTimeframe.id);
              if (currentIndex > 0) {
                handleTimeframeSelect(timeframes[currentIndex - 1]);
              }
            }}
            disabled={selectedTimeframe.id === timeframes[0].id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Previous
          </motion.button>

          <motion.button
            className="bg-blue-600/80 hover:bg-blue-700 text-white rounded-r-lg px-3 py-1 text-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              const currentIndex = timeframes.findIndex(t => t.id === selectedTimeframe.id);
              if (currentIndex < timeframes.length - 1) {
                handleTimeframeSelect(timeframes[currentIndex + 1]);
              }
            }}
            disabled={selectedTimeframe.id === timeframes[timeframes.length - 1].id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>

        {/* Simplified timeline control */}
        <div className="relative">
          {/* Timeline track - clean design */}
          <div className="relative h-1 bg-gradient-to-r from-blue-900 via-blue-700 to-red-700 rounded-full w-full mb-10">
            {/* Time period indicators - better spacing and organization */}
            {timeframes.map((timeframe, index) => (
              <div
                key={`timeframe-${timeframe.id}`}
                className="absolute top-0 transform -translate-x-1/2"
                style={{
                  left: `${(index / (timeframes.length - 1)) * 100}%`,
                }}
              >
                <motion.button
                  className="mt-3 flex flex-col items-center cursor-pointer group"
                  onClick={() => handleTimeframeSelect(timeframe)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full shadow-lg ${
                      selectedTimeframe.id === timeframe.id
                        ? 'ring-2 ring-blue-300 ring-opacity-50'
                        : ''
                    }`}
                    animate={{
                      backgroundColor: timeframe.color || '#FFFFFF',
                      scale: selectedTimeframe.id === timeframe.id ? 1.2 : 1
                    }}
                  />

                  <span
                    className={`text-xs whitespace-nowrap mt-1.5 ${
                      selectedTimeframe.id === timeframe.id 
                        ? 'text-white font-medium'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {/*{timeframe.name.split(' ')[0]}*/}
                    {timeframe.name}
                  </span>
                </motion.button>
              </div>
            ))}

            {/* Progress indicator */}
            <motion.div
              className="absolute h-full bg-blue-400/30 top-0 left-0 rounded-full"
              animate={{
                width: `${((timeframes.findIndex(t => t.id === selectedTimeframe.id)) / (timeframes.length - 1)) * 100}%`
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
