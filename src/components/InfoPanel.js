import { motion } from 'framer-motion';

export default function InfoPanel({ timeframe, isOpen, onClose }) {
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

  const impacts = impactsByTimeframe[timeframe.id] || [];

  return (
    <motion.div
      className={`absolute top-0 right-0 w-full md:w-96 h-screen bg-black/80 backdrop-blur-lg text-white z-20 p-6 overflow-auto ${isOpen ? 'block' : 'hidden'}`}
      initial={{ x: 400 }}
      animate={{ x: isOpen ? 0 : 400 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <button
        className="absolute top-4 right-4 text-white hover:text-blue-300"
        onClick={onClose}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-10">
        <h2 className="text-3xl font-bold text-blue-400 mb-2">{timeframe.name}</h2>
        <p className="text-xl text-gray-300">{timeframe.year}</p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Climate Indicators</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Global Temperature</p>
              <p className="text-2xl font-mono text-yellow-300">{timeframe.temp}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400">CO₂ Levels</p>
              <p className="text-2xl font-mono text-green-300">{timeframe.co2}</p>
            </div>
          </div>
        </div>

        <div>
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

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Take Action</h3>
          {timeframe.id === 'present' || timeframe.id === 'future' ? (
            <div>
              <p className="mb-4">The decisions we make today will shape the future of our planet. Here are some ways to help:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Reduce carbon footprint through conservation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Support renewable energy initiatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Advocate for climate policy changes</span>
                </li>
              </ul>
            </div>
          ) : (
            <p>Explore how we can learn from past climate events to inform current decisions.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
