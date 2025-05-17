import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfoPanel({ timeframe, selectedHotspot, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatingChart, setAnimatingChart] = useState(false);

  // Reset tab when panel opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      // Trigger chart animation when panel opens
      setTimeout(() => {
        setAnimatingChart(true);
      }, 500);
    } else {
      setAnimatingChart(false);
    }
  }, [isOpen]);

  // Exit early if no timeframe is selected
  if (!timeframe) return null;

  const impactsByTimeframe = {
    'prehistoric': [
      'Early atmosphere was primarily CO₂, methane and water vapor',
      'No ice caps as we know them today',
      'Early life forms began affecting atmospheric composition'
    ],
    'ice-age': [
      'Extensive glaciation covered much of North America and Europe',
      'Sea levels up to 120m lower than today',
      'Forests retreated toward the equator'
    ],
    'pre-industrial': [
      'Relatively stable climate for human agriculture and civilization',
      'Natural carbon cycle kept CO₂ levels balanced',
      'Regional climate variations affected human settlements'
    ],
    'industrial': [
      'Beginning of notable human impact on atmospheric composition',
      'Early coal power and manufacturing released CO₂',
      'First scientific observations of greenhouse effect'
    ],
    'modern': [
      'Accelerating rate of CO₂ increase in atmosphere',
      'First observations of Arctic ice thinning',
      'Rising global temperatures and more extreme weather events'
    ],
    'present': [
      'Arctic sea ice decreased by ~40% since 1979',
      'Ocean acidity increased by ~30% since industrial revolution',
      'More intense hurricanes, wildfires, floods, and droughts'
    ],
    'future': [
      'Potential sea level rise of 0.5-2m by 2100',
      'Significant loss of biodiversity and ecosystem function',
      'Increased water scarcity and food security challenges',
      'Migration of climate zones affecting agriculture'
    ]
  };

  const solutionsByTimeframe = {
    'prehistoric': [
      'Study Earth\'s early atmosphere to understand natural climate cycles',
      'Research how early life adapted to changing conditions'
    ],
    'ice-age': [
      'Learn from natural climate change transition periods',
      'Understand how ecosystems adapted to dramatic shifts'
    ],
    'pre-industrial': [
      'Study sustainable pre-industrial agricultural practices',
      'Examine stable carbon cycles for climate modeling'
    ],
    'industrial': [
      'Review historical emissions to understand cumulative impacts',
      'Research early climate science observations'
    ],
    'modern': [
      'Reduce fossil fuel dependence through sustainable technology',
      'Implement early carbon capture technologies',
      'Preserve forests and natural carbon sinks'
    ],
    'present': [
      'Rapidly transition to renewable energy sources',
      'Improve energy efficiency across all sectors',
      'Protect and restore natural ecosystems',
      'Develop climate resilient infrastructure'
    ],
    'future': [
      'Achieve net-negative carbon emissions through technology and nature',
      'Develop adaptive agriculture for changing climate zones',
      'Create sustainable water management systems',
      'Establish climate refugee support frameworks'
    ]
  };

  const impacts = impactsByTimeframe[timeframe.id] || [];
  const solutions = solutionsByTimeframe[timeframe.id] || [];

  // Temperature chart data for visualization
  const tempData = [
    { era: 'Prehistoric', value: 25 },
    { era: 'Ice Age', value: 8 },
    { era: 'Pre-Industrial', value: 13.7 },
    { era: 'Industrial', value: 13.8 },
    { era: 'Modern', value: 14.2 },
    { era: 'Present', value: 15.0 },
    { era: 'Future (Low)', value: 16.5 },
    { era: 'Future (High)', value: 19.5 }
  ];

  // CO2 chart data for visualization
  const co2Data = [
    { era: 'Prehistoric', value: 280 },
    { era: 'Ice Age', value: 180 },
    { era: 'Pre-Industrial', value: 280 },
    { era: 'Industrial', value: 310 },
    { era: 'Modern', value: 370 },
    { era: 'Present', value: 420 },
    { era: 'Future (Low)', value: 500 },
    { era: 'Future (High)', value: 900 }
  ];

  // Find max value for scaling
  const maxTemp = Math.max(...tempData.map(d => d.value));
  const maxCO2 = Math.max(...co2Data.map(d => d.value));

  // Calculate the current timeframe index
  const timeframeIndex = ['prehistoric', 'ice-age', 'pre-industrial', 'industrial', 'modern', 'present', 'future'].indexOf(timeframe.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 w-full md:w-96 h-screen glassmorphism text-white z-20 overflow-auto"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.button
            className="absolute top-4 right-4 text-white hover:text-blue-300 z-50"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <div className="mt-10 p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-2">{timeframe.name}</h2>
              <p className="text-xl text-gray-300">{timeframe.year}</p>
            </motion.div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700 mt-8 mb-4">
              <button
                className={`px-4 py-2 mr-2 transition-colors ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 mr-2 transition-colors ${activeTab === 'data' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('data')}
              >
                Climate Data
              </button>
              <button
                className={`px-4 py-2 transition-colors ${activeTab === 'solutions' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('solutions')}
              >
                Solutions
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.div
                    className="bg-gray-800/50 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-sm text-gray-400">Global Temperature</p>
                    <p className="text-2xl font-mono text-yellow-300">{timeframe.temp}</p>
                  </motion.div>
                  <motion.div
                    className="bg-gray-800/50 p-4 rounded-lg"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-sm text-gray-400">CO₂ Levels</p>
                    <p className="text-2xl font-mono text-green-300">{timeframe.co2}</p>
                  </motion.div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Environmental Impacts</h3>
                  <ul className="space-y-3">
                    {impacts.map((impact, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{impact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Globe Image */}
                <motion.div
                  className="relative w-full h-48 bg-blue-900/20 rounded-lg mb-8 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/globe.svg"
                      alt="Earth illustration"
                      className="h-32 opacity-60 animate-float"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-3 text-sm">
                    <p className="text-blue-300 font-semibold">Climate Pattern:</p>
                    <p className="text-white/80">
                      {timeframe.id === 'future' ? 'Unpredictable weather extremes' :
                       timeframe.id === 'present' ? 'Increasing weather anomalies' :
                       timeframe.id === 'modern' ? 'Warming trend established' :
                       timeframe.id === 'industrial' ? 'Beginning of human impact' :
                       timeframe.id === 'pre-industrial' ? 'Natural climate cycles' :
                       timeframe.id === 'ice-age' ? 'Extended cold period' :
                       'Primordial climate formation'}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">Temperature History</h3>
                <div className="h-40 relative mb-8 bg-gray-800/30 rounded-lg p-4">
                  <div className="absolute bottom-8 left-0 right-0 h-px bg-gray-600"></div>
                  <div className="flex h-24 items-end justify-between relative">
                    {tempData.map((item, i) => {
                      const isCurrentEra = i === timeframeIndex ||
                                          (timeframe.id === 'future' && i >= tempData.length - 2);
                      return (
                        <motion.div
                          key={i}
                          className="w-6 bg-gradient-to-t from-yellow-500 to-red-500 rounded-t relative group"
                          style={{ height: '0%' }}
                          animate={{
                            height: animatingChart ? `${(item.value / maxTemp) * 100}%` : '0%',
                            opacity: isCurrentEra ? 1 : 0.6
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.value}°C
                          </span>
                          <span className={`absolute -bottom-6 text-xs transform -rotate-45 origin-left ${isCurrentEra ? 'text-blue-300' : 'text-gray-400'}`}>
                            {item.era.split(' ')[0]}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">CO₂ Levels (ppm)</h3>
                <div className="h-40 relative mb-8 bg-gray-800/30 rounded-lg p-4">
                  <div className="absolute bottom-8 left-0 right-0 h-px bg-gray-600"></div>
                  <div className="flex h-24 items-end justify-between relative">
                    {co2Data.map((item, i) => {
                      const isCurrentEra = i === timeframeIndex ||
                                          (timeframe.id === 'future' && i >= co2Data.length - 2);
                      return (
                        <motion.div
                          key={i}
                          className="w-6 bg-gradient-to-t from-green-500 to-green-300 rounded-t relative group"
                          style={{ height: '0%' }}
                          animate={{
                            height: animatingChart ? `${(item.value / maxCO2) * 100}%` : '0%',
                            opacity: isCurrentEra ? 1 : 0.6
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.5 + i * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.value}
                          </span>
                          <span className={`absolute -bottom-6 text-xs transform -rotate-45 origin-left ${isCurrentEra ? 'text-blue-300' : 'text-gray-400'}`}>
                            {item.era.split(' ')[0]}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-800/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Key Findings:</h3>
                  <p className="text-sm text-gray-300">
                    {timeframe.id === 'future' ?
                      'Projected CO₂ levels show a dramatic increase that could lead to irreversible climate shifts if emissions continue unchecked.' :
                     timeframe.id === 'present' ?
                      'Current CO₂ concentration is 50% higher than pre-industrial levels, driving significant global warming.' :
                     timeframe.id === 'modern' ?
                      'The rate of CO₂ increase from 1950-2000 exceeded all natural variations in the previous 800,000 years.' :
                     timeframe.id === 'industrial' ?
                      'The beginning of fossil fuel use marked the start of anthropogenic climate change.' :
                     timeframe.id === 'pre-industrial' ?
                      'For thousands of years before industrialization, CO₂ levels remained relatively stable.' :
                     timeframe.id === 'ice-age' ?
                      'Lower CO₂ levels during ice ages correlated with global cooling and glacier expansion.' :
                      'Early Earth\'s carbon cycle was primarily volcanic with no human influence.'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Solutions Tab */}
            {activeTab === 'solutions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Climate Action</h3>
                <ul className="space-y-4 mb-8">
                  {solutions.map((solution, index) => (
                    <motion.li
                      key={index}
                      className="bg-gray-800/30 p-3 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      <div className="flex gap-3 items-start">
                        <div className="bg-blue-500/30 p-1 rounded-full mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{solution}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Call to Action */}
                {(timeframe.id === 'present' || timeframe.id === 'future') && (
                  <motion.div
                    className="mt-8 p-4 bg-gradient-to-r from-blue-900/50 to-blue-700/50 rounded-lg border border-blue-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-lg font-bold text-blue-300 mb-2">Take Action Now</h4>
                    <p className="text-sm text-gray-200 mb-4">
                      The choices we make today will determine the climate future of generations to come.
                      Every action, no matter how small, contributes to the solution.
                    </p>
                    <motion.button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open('https://www.un.org/en/actnow', '_blank')}
                    >
                      Learn How You Can Help
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
