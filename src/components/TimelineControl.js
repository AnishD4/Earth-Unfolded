import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const timeframes = [
  {
    id: 'prehistoric',
    name: 'Prehistoric',
    year: '4.5 billion years ago',
    temp: '4-25°C',
    co2: '~280 ppm',
    description: 'The early Earth formed, with volcanic activity and a primordial atmosphere.'
  },
  {
    id: 'ice-age',
    name: 'Ice Ages',
    year: '~2.5 million years ago',
    temp: '~6°C cooler than today',
    co2: '~180-280 ppm',
    description: 'Cycles of glacial expansion and retreat altered Earth\'s landscapes and habitats.'
  },
  {
    id: 'pre-industrial',
    name: 'Pre-Industrial',
    year: '~1750',
    temp: '~13.7°C global average',
    co2: '~280 ppm',
    description: 'Before widespread industrialization, climate was relatively stable for thousands of years.'
  },
  {
    id: 'industrial',
    name: 'Industrial Revolution',
    year: '1850-1950',
    temp: '~13.8°C global average',
    co2: '~310 ppm',
    description: 'Increased burning of fossil fuels began releasing significant CO2 into the atmosphere.'
  },
  {
    id: 'modern',
    name: 'Modern Era',
    year: '1950-2000',
    temp: '~14.2°C global average',
    co2: '~370 ppm',
    description: 'Rapid industrialization and population growth accelerated human impacts on climate.'
  },
  {
    id: 'present',
    name: 'Present Day',
    year: '2025',
    temp: '~15.0°C global average',
    co2: '~420 ppm',
    description: 'Record temperatures and concentrated CO2 levels not seen in 3 million years.'
  },
  {
    id: 'future',
    name: 'Future Projection',
    year: '2100 (projected)',
    temp: '+1.5°C to +4.5°C from pre-industrial',
    co2: '500-900 ppm',
    description: 'Potential scenarios based on climate action taken or not taken today.'
  }
];

export default function TimelineControl({ onTimeframeChange }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframes[5]);

  useEffect(() => {
    onTimeframeChange(selectedTimeframe);
  }, [selectedTimeframe, onTimeframeChange]);

  return (
    <div className="absolute bottom-0 left-0 w-full bg-black/70 backdrop-blur-md text-white p-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{selectedTimeframe.name} <span className="text-blue-300">({selectedTimeframe.year})</span></h2>
          <div className="flex gap-6 mt-2">
            <div>
              <span className="text-gray-400 text-sm">Global Temperature:</span>
              <p className="text-yellow-300 font-mono">{selectedTimeframe.temp}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">CO₂ Concentration:</span>
              <p className="text-green-300 font-mono">{selectedTimeframe.co2}</p>
            </div>
          </div>
          <p className="mt-2 text-gray-200">{selectedTimeframe.description}</p>
        </div>

        <div className="relative h-2 bg-gray-700 rounded-full w-full mb-4">
          {timeframes.map((timeframe, index) => (
            <motion.button
              key={timeframe.id}
              className={`absolute bottom-0 w-4 h-4 rounded-full -translate-x-2 ${
                selectedTimeframe.id === timeframe.id ? 'bg-blue-400 ring-2 ring-blue-200' : 'bg-white'
              }`}
              style={{ left: `${(index / (timeframes.length - 1)) * 100}%` }}
              onClick={() => setSelectedTimeframe(timeframe)}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>4.5B years ago</span>
          <span>Future</span>
        </div>
      </div>
    </div>
  );
}
