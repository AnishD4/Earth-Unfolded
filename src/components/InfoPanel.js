import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfoPanel({ timeframe, selectedHotspot, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatingChart, setAnimatingChart] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      setTimeout(() => {
        setAnimatingChart(true);
      }, 500);
    } else {
      setAnimatingChart(false);
    }
  }, [isOpen]);

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

  const maxTemp = Math.max(...tempData.map(d => d.value));
  const maxCO2 = Math.max(...co2Data.map(d => d.value));

  const timeframeIndex = ['prehistoric', 'ice_age', 'preindustrial', 'industrial', 'modern', 'present', 'future'].indexOf(timeframe.id);

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

                <h3 className="text-xl font-semibold mb-3 text-white">Climate Impacts</h3>
                <ul className="space-y-2 mb-8">
                  {impacts.map((impact, idx) => (
                    <motion.li 
                      key={idx}
                      className="bg-gray-800/30 p-3 rounded-lg flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span>{impact}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="bg-gray-800/20 p-4 rounded-lg mb-6">
                  <h3 className="text-lg text-blue-300 mb-2">Did you know?</h3>
                  <p className="text-gray-300">
                    {timeframe.id === 'prehistoric' && "Earth's early atmosphere had over 100 times more CO₂ than today."}
                    {timeframe.id === 'ice_age' && "During the last Ice Age, humans migrated across land bridges exposed by lower sea levels."}
                    {timeframe.id === 'preindustrial' && "The pre-industrial period had relatively stable climate for thousands of years."}
                    {timeframe.id === 'industrial' && "The first scientific paper on the greenhouse effect was published in 1896."}
                    {timeframe.id === 'modern' && "The Earth has warmed about 0.8°C between 1950 and 2000."}
                    {timeframe.id === 'present' && "The last decade contained the hottest years in modern record-keeping."}
                    {timeframe.id === 'future' && "If all ice on Earth melted, sea levels would rise by approximately 70 meters (230 feet)."}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">Temperature History</h3>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <div className="h-40 w-full relative">
                      {tempData.map((data, i) => (
                        <motion.div
                          key={`temp-${i}`}
                          className={`absolute bottom-0 rounded-t-sm transition-all ${
                            data.era.toLowerCase().includes(timeframe.id.replace('_', '')) 
                              ? 'bg-yellow-500' 
                              : 'bg-yellow-800/50'
                          }`}
                          style={{
                            left: `${(i / (tempData.length-1)) * 100}%`,
                            height: `${(data.value / maxTemp) * 100}%`,
                            width: '12px',
                            marginLeft: '-6px',
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: animatingChart ? `${(data.value / maxTemp) * 100}%` : 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.5 }}
                        />
                      ))}
                      
                      <div className="absolute bottom-0 w-full h-px bg-gray-600" />
                      <div className="absolute left-0 h-full w-px bg-gray-600" />
                    </div>
                    
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      {tempData.map((data, i) => (
                        <div key={`era-${i}`} className="text-center" style={{ width: '12px' }}>
                          <span className="rotate-45 inline-block whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '80px' }}>
                            {data.era}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">CO₂ Levels (ppm)</h3>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <div className="h-40 w-full relative">
                      {co2Data.map((data, i) => (
                        <motion.div
                          key={`co2-${i}`}
                          className={`absolute bottom-0 rounded-t-sm transition-all ${
                            data.era.toLowerCase().includes(timeframe.id.replace('_', '')) 
                              ? 'bg-green-500' 
                              : 'bg-green-800/50'
                          }`}
                          style={{
                            left: `${(i / (co2Data.length-1)) * 100}%`,
                            height: `${(data.value / maxCO2) * 100}%`,
                            width: '12px',
                            marginLeft: '-6px',
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: animatingChart ? `${(data.value / maxCO2) * 100}%` : 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.5 }}
                        />
                      ))}
                      
                      <div className="absolute bottom-0 w-full h-px bg-gray-600" />
                      <div className="absolute left-0 h-full w-px bg-gray-600" />
                    </div>
                    
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      {co2Data.map((data, i) => (
                        <div key={`co2-era-${i}`} className="text-center" style={{ width: '12px' }}>
                          <span className="rotate-45 inline-block whitespace-nowrap overflow-hidden text-ellipsis" style={{ maxWidth: '80px' }}>
                            {data.era}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/20 p-4 rounded-lg mb-6 text-sm text-gray-300">
                  <p>Data sources: Ice core samples, tree rings, fossil records, and direct measurements provide our understanding of Earth's climate history.</p>
                  <p className="mt-2">Future projections based on IPCC climate models under various emissions scenarios.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'solutions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-white">Climate Solutions</h3>
                <ul className="space-y-2 mb-6">
                  {solutions.map((solution, idx) => (
                    <motion.li 
                      key={idx}
                      className="bg-gray-800/30 p-3 rounded-lg flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      <span className="text-green-400 mr-2 mt-1">✓</span>
                      <span>{solution}</span>
                    </motion.li>
                  ))}
                </ul>

                {timeframe.id === 'present' && (
                  <div className="bg-blue-900/30 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                    <h4 className="text-lg font-medium text-blue-300 mb-2">Take Action Now</h4>
                    <p className="text-gray-300 mb-3">
                      The present moment is critical for climate action. Individual and collective efforts can make a significant difference.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Explore Climate Initiatives
                    </button>
                  </div>
                )}

                {timeframe.id === 'future' && (
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-medium text-purple-300 mb-2">The Future is Not Set</h4>
                    <p className="text-gray-300">
                      There are multiple possible futures depending on our actions today. The choices we make in the next decade will determine which climate future we experience.
                    </p>
                  </div>
                )}

                {timeframe.id !== 'future' && timeframe.id !== 'present' && (
                  <div className="bg-gray-800/20 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-medium text-gray-300 mb-2">Historical Context</h4>
                    <p className="text-gray-400">
                      Understanding past climate changes helps us better predict and prepare for future changes.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-800">
              <a 
                href="https://climate.nasa.gov/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
              >
                <span>More data at NASA Climate</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
