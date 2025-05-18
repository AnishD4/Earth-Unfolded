"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ImpactPage() {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [personalImpact, setPersonalImpact] = useState(null);
  const [showPersonalImpactResults, setShowPersonalImpactResults] = useState(false);
  const [impactQuestions, setImpactQuestions] = useState([
    {
      id: 'transportation',
      question: 'What is your primary mode of transportation?',
      options: [
        { label: 'Walk or bicycle', value: 0 },
        { label: 'Public transportation', value: 3 },
        { label: 'Electric/hybrid vehicle', value: 5 },
        { label: 'Gasoline vehicle (shared/carpool)', value: 7 },
        { label: 'Gasoline vehicle (solo driver)', value: 10 }
      ],
      selected: null
    },
    {
      id: 'diet',
      question: 'How would you describe your diet?',
      options: [
        { label: 'Plant-based/vegan', value: 0 },
        { label: 'Vegetarian', value: 3 },
        { label: 'Pescatarian (vegetarian + seafood)', value: 5 },
        { label: 'Omnivore (moderate meat)', value: 7 },
        { label: 'Meat with most meals', value: 10 }
      ],
      selected: null
    },
    {
      id: 'energy',
      question: 'What is your home energy situation?',
      options: [
        { label: '100% renewable energy', value: 0 },
        { label: 'Partially renewable with efficiency measures', value: 3 },
        { label: 'Standard utilities with some efficiency measures', value: 6 },
        { label: 'Standard utilities with minimal efficiency', value: 8 },
        { label: 'High energy use with no efficiency measures', value: 10 }
      ],
      selected: null
    }
  ]);
  const [activeCTA, setActiveCTA] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Data for the different climate impacts with expanded information
  const impacts = [
    {
      id: 'rising-temps',
      title: 'Rising Temperatures',
      description: 'Global average temperatures have risen by over °C since pre-industrial times and are projected to continue rising, leading to more extreme heat events, affecting ecosystems and human health worldwide.',
      longDescription: 'The Earth\'s average temperature has increased by about 1.1°C since the pre-industrial era, with each of the last four decades being successively warmer than any decade that preceded it. This warming is primarily driven by greenhouse gas emissions from human activities. Rising temperatures are causing more frequent and intense heat waves, which have deadly consequences for people and wildlife. Heat-related deaths, particularly among vulnerable populations, are increasing. Agriculture is being disrupted as growing seasons change and extreme heat damages crops. Urban heat islands in cities amplify these effects, sometimes creating temperature differences of up to 7°C compared to surrounding areas.',
      icon: '🌡️',
      color: 'from-orange-400 to-red-600',
      stats: [
        { label: 'Temperature Increase Since 1880', value: '+1.1°C' },
        { label: 'Projected Increase by 2100', value: '+1.5 to +5.0°C' },
        { label: 'Annual Heat-Related Deaths', value: '166,000+' },
        { label: 'Economic Cost', value: '$2.4 trillion annually by 2030' }
      ],
      solutions: [
        {
          title: 'Rapid Transition to Renewable Energy',
          description: 'Shifting from fossil fuels to solar, wind, and other renewable sources could reduce emissions by 70-85% by 2050.',
          icon: '☀️'
        },
        {
          title: 'Energy Efficiency',
          description: 'Improving building insulation and appliance efficiency could reduce energy demand by 30%.',
          icon: '💡'
        },
        {
          title: 'Urban Green Spaces',
          description: 'Expanding parks and green roofs in cities can reduce urban heat island effects by 2-8°C.',
          icon: '🌳'
        }
      ],
      personalActions: [
        'Use energy-efficient appliances and lighting',
        'Install home insulation to reduce heating/cooling needs',
        'Choose renewable energy providers when possible',
        'Reduce meat consumption, especially beef',
        'Use public transportation, carpooling, or electric vehicles'
      ],
      impactVisual: '/rising-temp-graph.png',
      bgImage: 'https://images.unsplash.com/photo-1583795223154-92e282f3c80c?q=80&w=1470&auto=format'
    },
    {
      id: 'sea-level',
      title: 'Sea Level Rise',
      description: 'Rising sea levels threaten coastal communities, infrastructure, and ecosystems. Thermal expansion of oceans and melting ice from glaciers and ice sheets contribute to ongoing sea level rise.',
      longDescription: 'Global sea levels have risen about 20 centimeters (8 inches) since 1900, with the rate of rise accelerating in recent decades. This is happening due to two main factors: thermal expansion (as ocean water warms, it expands) and the melting of land ice (glaciers and ice sheets). The Greenland and Antarctic ice sheets are now losing mass at an accelerating rate. Rising seas are already causing more frequent and severe coastal flooding, even on sunny days. By 2050, areas currently home to 300 million people will face annual coastal flooding. Small island nations and low-lying coastal areas are particularly vulnerable, with some facing existential threats. Critical infrastructure like ports, airports, and power plants are at risk, along with freshwater supplies that can be contaminated by saltwater intrusion.',
      icon: '🌊',
      color: 'from-blue-400 to-blue-700',
      stats: [
        { label: 'Rise Since 1900', value: '~20 cm' },
        { label: 'Projected Rise by 2100', value: '30-110 cm' },
        { label: 'People at Risk by 2050', value: '300 million' },
        { label: 'Annual Cost of Coastal Flooding', value: '$1 trillion by 2050' }
      ],
      solutions: [
        {
          title: 'Coastal Protection Infrastructure',
          description: 'Sea walls, surge barriers, and nature-based solutions like restored wetlands can protect vulnerable areas.',
          icon: '🏗️'
        },
        {
          title: 'Managed Retreat',
          description: 'Planned relocation of communities from high-risk areas to safer ground, with policy support.',
          icon: '🏠'
        },
        {
          title: 'Carbon Reduction',
          description: 'Limiting warming to 1.5°C could reduce sea level rise by 50% compared to higher warming scenarios.',
          icon: '♻️'
        }
      ],
      personalActions: [
        'Support coastal conservation efforts',
        'Reduce carbon footprint to slow ice melt',
        'Consider climate risks when purchasing coastal property',
        'Advocate for climate-smart coastal development',
        'Support climate refugees and migration policies'
      ],
      impactVisual: '/sea-level-rise.png',
      bgImage: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1470&auto=format'
    },
    {
      id: 'extreme-weather',
      title: 'Extreme Weather',
      description: 'Climate change intensifies extreme weather events including hurricanes, droughts, floods, and wildfires, disrupting communities and ecosystems worldwide.',
      longDescription: 'Climate change is making extreme weather events more frequent and intense. Warmer air can hold more moisture, leading to heavier rainfall and more severe flooding in some regions. At the same time, higher temperatures increase evaporation, worsening droughts in other areas. Hurricane intensity has increased globally, with a higher proportion of Category 4 and 5 storms. Warmer, drier conditions in many regions have extended wildfire seasons and increased the area burned. These disasters cause immediate loss of life and property, but also long-term effects like population displacement, mental health impacts, and economic disruption. Vulnerable communities with fewer resources to prepare for and recover from disasters are disproportionately affected. Infrastructure designed for historical climate conditions is increasingly inadequate for these new extremes.',
      icon: '⛈️',
      color: 'from-purple-500 to-indigo-700',
      stats: [
        { label: 'Increase in Category 4-5 Hurricanes', value: '+30% since 1980' },
        { label: 'Annual Cost of Weather Disasters', value: '$150+ billion' },
        { label: 'Increase in Western US Wildfires', value: '+400% since 1980s' },
        { label: 'People Displaced by Weather Disasters (2008-2018)', value: '200+ million' }
      ],
      solutions: [
        {
          title: 'Early Warning Systems',
          description: 'Advanced forecasting and alert systems can reduce disaster-related deaths by up to 30%.',
          icon: '📱'
        },
        {
          title: 'Climate-Resilient Infrastructure',
          description: 'Buildings, roads, and utilities designed to withstand extreme conditions can reduce damage by 50%.',
          icon: '🏢'
        },
        {
          title: 'Nature-Based Solutions',
          description: 'Restored wetlands, forests, and mangroves provide natural protection against floods and storms.',
          icon: '🌿'
        }
      ],
      personalActions: [
        'Create a household emergency plan and kit',
        'Install flood and storm protection for your home',
        'Support disaster relief organizations',
        'Advocate for climate-resilient community planning',
        'Consider climate risks when choosing where to live'
      ],
      impactVisual: '/extreme-weather-trends.png',
      bgImage: 'https://images.unsplash.com/photo-1429552077091-836152271555?q=80&w=1472&auto=format'
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity Loss',
      description: 'Changing climate conditions are forcing species to adapt or migrate, with many facing extinction. Ecosystems are being disrupted with cascading effects throughout food webs.',
      longDescription: 'Climate change is a major driver of biodiversity loss, with ecosystems changing faster than many species can adapt. Rising temperatures are shifting habitat ranges poleward and to higher elevations, but many species cannot migrate quickly enough. Changing seasonal patterns disrupt critical life cycle events like flowering, migration, and reproduction. Ocean acidification—caused by oceans absorbing excess CO₂—is threatening marine life, especially coral reefs and shellfish. The IPBES estimates that up to one million plant and animal species are now at risk of extinction. This loss affects ecosystem services that humans depend on, including pollination of crops, clean water, and carbon sequestration. Indigenous communities and others who rely directly on natural resources for their livelihoods are particularly affected. The interconnected nature of ecosystems means that the loss of one species can have ripple effects throughout the food web.',
      icon: '🦋',
      color: 'from-green-400 to-emerald-600',
      stats: [
        { label: 'Species at Risk of Extinction', value: '1 million+' },
        { label: 'Rate of Extinction', value: '1000x background rate' },
        { label: 'Global Forest Loss Since 1990', value: '420 million hectares' },
        { label: 'Coral Reefs at Risk by 2050', value: '90%' }
      ],
      solutions: [
        {
          title: 'Protected Areas',
          description: 'Expanding marine and terrestrial protected areas to 30% of Earth\'s surface could preserve critical habitats.',
          icon: '🌍'
        },
        {
          title: 'Wildlife Corridors',
          description: 'Connected habitats allow species to migrate as climate zones shift.',
          icon: '🦌'
        },
        {
          title: 'Sustainable Agriculture',
          description: 'Regenerative farming practices can reduce habitat destruction while sequestering carbon.',
          icon: '🌱'
        }
      ],
      personalActions: [
        'Plant native species in your garden',
        'Choose sustainable seafood and forest products',
        'Support conservation organizations',
        'Reduce plastic pollution that harms wildlife',
        'Avoid products containing palm oil from deforested areas'
      ],
      impactVisual: '/biodiversity-decline.png',
      bgImage: 'https://images.unsplash.com/photo-1531591116320-72c171689a98?q=80&w=1470&auto=format'
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
      {/* Loading overlay - simplified */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl">Loading Impact Data...</p>
            <p className="text-blue-400 text-sm mt-2">Preparing climate impact visualization</p>
          </div>
        </div>
      )}

      {/* New Hero Section with Video Background */}
      <div ref={heroRef} className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {/* Fallback gradient instead of video */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black"></div>
          {/* Commenting out video since the file is missing */}
          {/* <video 
            className="w-full h-full object-cover opacity-70"
            autoPlay 
            muted 
            loop
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/climate-impact-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>

        {/* Improved Header */}
        <motion.div
          className="absolute top-0 w-full p-6 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mr-4"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>
                <div>
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Climate Impact Hub
                  </motion.h1>
                  <motion.p
                    className="text-blue-300 text-lg mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Visualize, understand, and act on climate change
                  </motion.p>
                </div>
              </div>

              {/* Navigation buttons - extremely simple HTML */}
              <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 z-20 relative">
                {/* Earth View - plain HTML anchor */}
                <a 
                  href="/"
                  style={{ 
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 30
                  }}
                >
                  <span>← Earth View</span>
                </a>
                
                {/* About This Data - plain HTML button */}
                <button
                  style={{ 
                    backgroundColor: 'rgba(22, 163, 74, 0.7)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 30
                  }}
                  onClick={() => setShowInfoPanel(true)}
                >
                  <span>ⓘ About This Data</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          className="absolute z-10 inset-0 flex flex-col justify-center items-center text-center px-4 md:px-16 pointer-events-none"
          style={{ opacity }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Our Planet Is <span className="text-blue-400">Changing</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore how climate change is affecting our world and what we can do about it
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('impact-grid').scrollIntoView({ behavior: 'smooth' });
                setActiveCTA(true);
              }}
            >
              <span>Explore Impacts</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('personal-impact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Calculate Your Impact</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      {/* Stats banner */}
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-indigo-900 py-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4f6eff_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white">1.1°C</h3>
              <p className="text-blue-200 mt-2">Global temp increase since pre-industrial era</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white">416 PPM</h3>
              <p className="text-blue-200 mt-2">Current atmospheric CO₂ concentration</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white">3.3 mm</h3>
              <p className="text-blue-200 mt-2">Annual sea level rise</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl md:text-4xl font-bold text-white">1.2 Trillion</h3>
              <p className="text-blue-200 mt-2">Tons of ice lost annually</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          id="impact-grid"
          className="text-3xl font-bold text-white mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Major Climate Impacts Explained
        </motion.h2>
        
        {/* Enhanced impact grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, staggerChildren: 0.2 }}
        >
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.id}
              className={`bg-gradient-to-br ${impact.color} rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg relative group`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
              onClick={() => setSelectedImpact(impact)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Using gradient background instead of image */}
              <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-t from-black/20 to-transparent">
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="p-6 relative z-10 h-full flex flex-col">
                <div className="text-4xl mb-3">{impact.icon}</div>
                <h3 className="text-white text-xl font-bold mb-2">{impact.title}</h3>
                <p className="text-white/80 text-sm flex-grow">{impact.description.substring(0, 100)}...</p>
                
                {/* Key stat preview */}
                <div className="mt-4 bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-white/90 text-xs font-medium">{impact.stats[0].label}</p>
                  <p className="text-white text-xl font-bold">{impact.stats[0].value}</p>
                </div>
                
                {/* Learn more button */}
                <div className="mt-4 text-white/80 text-sm flex items-center justify-end group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive visualization section */}
        <motion.div 
          className="mt-20 bg-gray-900/50 backdrop-blur-md rounded-xl p-6 md:p-8 overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4a5568_1px,transparent_1px),linear-gradient(to_bottom,#4a5568_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Global Impact Timeline</h2>
          
          <div className="relative z-10">
            <div className="w-full h-2 bg-gray-700 rounded-full mb-6 relative">
              {/* Timeline markers */}
              {['1800', '1900', '1950', '2000', '2050', '2100'].map((year, i) => (
                <div 
                  key={i} 
                  className="absolute transform -translate-x-1/2 top-0"
                  style={{ left: `${(i / 5) * 100}%` }}
                >
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  <p className="text-blue-400 text-xs mt-2">{year}</p>
                </div>
              ))}
              
              {/* Progress indicator */}
              <div className="absolute h-full w-[45%] bg-gradient-to-r from-blue-500 to-red-500 rounded-full">
                <div className="absolute right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-red-500"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Temperature Anomaly</h3>
                <div className="h-60 bg-black/50 rounded-lg flex items-end p-4 relative">
                  {/* Simple bar chart visualization */}
                  {[0.1, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1].map((val, i) => (
                    <div 
                      key={i}
                      className="w-full mx-0.5 bg-gradient-to-t from-blue-500 to-red-500 rounded-t-sm relative"
                      style={{ height: `${val * 100}%` }}
                    >
                      {i === 8 && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          +1.1°C (2020)
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Baseline */}
                  <div className="absolute left-0 right-0 bottom-1/3 border-t border-dashed border-white/30 flex justify-between">
                    <span className="text-xs text-white/70 -mt-5">Pre-industrial baseline</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">CO₂ Concentration (ppm)</h3>
                <div className="h-60 bg-black/50 rounded-lg p-4 relative">
                  {/* Simple line chart visualization */}
                  <svg className="w-full h-full overflow-visible">
                    <path 
                      d="M0,180 C20,170 40,160 60,150 C80,140 100,120 120,100 C140,80 160,50 180,30 C200,20 220,15 240,12 C260,10 280,8 300,5" 
                      fill="none" 
                      stroke="url(#co2Gradient)" 
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="co2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                    
                    {/* Current value indicator */}
                    <circle cx="300" cy="5" r="4" fill="white" />
                  </svg>
                  
                  {/* Value labels */}
                  <div className="absolute bottom-2 left-2 text-xs text-white/70">280 ppm (1800)</div>
                  <div className="absolute top-2 right-2 text-xs text-white/70">416 ppm (2022)</div>
                </div>
              </div>
            </div>
          </div>
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
            <motion.a
              href="https://drawdown.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Project Drawdown
            </motion.a>
          </div>
        </motion.div>
        
        {/* Enhanced Personal Impact Calculator */}
        <motion.div 
          id="personal-impact"
          className="mt-24 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
        >
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Your Climate Impact</h2>
                <p className="text-blue-300">Discover how your lifestyle choices affect the planet</p>
              </div>
              {showPersonalImpactResults && (
                <button 
                  onClick={() => setShowPersonalImpactResults(false)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg mt-4 md:mt-0 flex items-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Over
                </button>
              )}
            </div>
            
            <AnimatePresence mode="wait">
              {!showPersonalImpactResults ? (
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {impactQuestions.map((question, qIndex) => (
                      <div key={question.id} className="bg-black/30 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white mb-4">{question.question}</h3>
                        <div className="space-y-3">
                          {question.options.map((option, oIndex) => (
                            <div 
                              key={oIndex}
                              className={`p-4 rounded-lg cursor-pointer transition-all ${
                                impactQuestions[qIndex].selected === oIndex 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300'
                              }`}
                              onClick={() => {
                                const updatedQuestions = [...impactQuestions];
                                updatedQuestions[qIndex].selected = oIndex;
                                const newQuestions = [...updatedQuestions];
                                setImpactQuestions(newQuestions);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option.label}</span>
                                <div className={`w-5 h-5 rounded-full border-2 ${
                                  impactQuestions[qIndex].selected === oIndex 
                                    ? 'border-white bg-white/30' 
                                    : 'border-gray-400'
                                } flex items-center justify-center`}>
                                  {impactQuestions[qIndex].selected === oIndex && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Impact indicator - only show for selected */}
                              {impactQuestions[qIndex].selected === oIndex && (
                                <div className="mt-3 pt-3 border-t border-blue-500/30">
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full ${
                                        option.value < 3 ? 'bg-green-500' : 
                                        option.value < 7 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${option.value * 10}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between mt-1 text-xs">
                                    <span>Low Impact</span>
                                    <span>High Impact</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 flex justify-center">
                    <motion.button
                      className={`px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 ${
                        impactQuestions.every(q => q.selected !== null)
                          ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white cursor-pointer'
                          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={impactQuestions.every(q => q.selected !== null) ? { scale: 1.05 } : {}}
                      whileTap={impactQuestions.every(q => q.selected !== null) ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (impactQuestions.every(q => q.selected !== null)) {
                          // Calculate impact score
                          const totalScore = impactQuestions.reduce((total, q) => {
                            return total + q.options[q.selected].value;
                          }, 0);
                          
                          // Set impact level based on score range
                          // Total possible: 0-30
                          let impactLevel;
                          if (totalScore < 10) {
                            impactLevel = {
                              title: 'Low Impact',
                              description: 'Your lifestyle choices are helping reduce climate change. Keep up the good work!',
                              color: 'green',
                              score: totalScore,
                              percentage: Math.round((totalScore / 30) * 100),
                              co2: Math.round(totalScore * 0.8), // Simplified calculation for demo
                              suggestions: [
                                'Consider installing solar panels',
                                'Explore community climate initiatives',
                                'Share your knowledge with others'
                              ]
                            };
                          } else if (totalScore < 20) {
                            impactLevel = {
                              title: 'Medium Impact',
                              description: 'Your lifestyle has a moderate effect on the climate. Some changes could make a big difference.',
                              color: 'yellow',
                              score: totalScore,
                              percentage: Math.round((totalScore / 30) * 100),
                              co2: Math.round(totalScore * 0.8),
                              suggestions: [
                                'Reduce meat consumption further',
                                'Consider public transport more often',
                                'Improve home energy efficiency'
                              ]
                            };
                          } else {
                            impactLevel = {
                              title: 'High Impact',
                              description: 'Your lifestyle choices are contributing significantly to climate change. Making changes can help.',
                              color: 'red',
                              score: totalScore,
                              percentage: Math.round((totalScore / 30) * 100),
                              co2: Math.round(totalScore * 0.8),
                              suggestions: [
                                'Try meat-free days each week',
                                'Explore carpooling or public transportation',
                                'Switch to renewable energy providers',
                                'Improve home insulation'
                              ]
                            };
                          }
                          
                          setPersonalImpact(impactLevel);
                          setShowPersonalImpactResults(true);
                        }
                      }}
                    >
                      <span>Calculate My Impact</span>
                      {impactQuestions.every(q => q.selected !== null) ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      ) : null}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/40 rounded-xl p-8 backdrop-blur-md"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className={`p-6 rounded-xl bg-${personalImpact.color}-500/20 backdrop-blur-sm`}>
                        <h3 className="text-2xl font-bold text-white mb-2">{personalImpact.title}</h3>
                        <p className="text-white/80 mb-6">{personalImpact.description}</p>
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-white/70 mb-2">
                            <span>Low</span>
                            <span>High</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full bg-${personalImpact.color}-500`}
                              style={{ width: `${personalImpact.percentage}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 text-center">
                            <span className="text-xl font-bold text-white">{personalImpact.score} / 30</span>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-4xl font-bold text-white">{personalImpact.co2}</div>
                          <div className="text-white/70">Metric Tons CO₂e / Year</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold text-white mb-4">Suggested Actions</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {personalImpact.suggestions.map((suggestion, i) => (
                          <div key={i} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-start gap-3">
                            <div className="bg-blue-500 rounded-full p-1 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white font-medium">{suggestion}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 bg-blue-900/30 p-4 rounded-lg backdrop-blur-sm">
                        <h4 className="text-white font-bold flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Did you know?
                        </h4>
                        <p className="text-white/80 mt-2">
                          The average person in the United States produces about 16 metric tons of CO₂ 
                          annually, while the global average is closer to 4 metric tons per person.
                        </p>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button 
                          onClick={() => setShowPersonalImpactResults(false)}
                          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                          </svg>
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Detail Modal for Selected Impact */}
      <AnimatePresence>
        {selectedImpact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImpact(null)}
          >
            <motion.div
              className="max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl bg-gray-900"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with image background */}
              <div 
                className={`relative h-52 bg-gradient-to-br ${selectedImpact.color}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent"></div>
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setSelectedImpact(null)}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">{selectedImpact.icon}</span>
                    {selectedImpact.title}
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                {/* Tabs for different content sections */}
                <div className="border-b border-gray-700 flex mb-6">
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'data' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('data')}
                  >
                    Data & Trends
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'solutions' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('solutions')}
                  >
                    Solutions
                  </button>
                </div>
                
                {/* Tab content */}
                <div className="min-h-[300px]">
                  {activeTab === 'overview' && (
                    <div>
                      <p className="text-white/90 text-lg mb-6">
                        {selectedImpact.longDescription}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        {selectedImpact.stats.map((stat, i) => (
                          <div key={i} className={`bg-gradient-to-br ${selectedImpact.color} bg-opacity-20 p-4 rounded-lg`}>
                            <p className="text-white/80 text-sm">{stat.label}</p>
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'data' && (
                    <div>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                          <h3 className="text-white text-xl font-bold mb-4">Historical Trends</h3>
                          <div className="bg-gray-800 rounded-lg p-4 h-64 flex items-center justify-center">
                            {selectedImpact.impactVisual ? (
                              <div className="flex flex-col items-center justify-center text-center">
                                <div className="h-40 w-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                  </svg>
                                </div>
                                <p className="text-gray-400 text-sm">Data visualization for {selectedImpact.title}</p>
                              </div>
                            ) : (
                              <div className="text-gray-400">No data visualization available</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="md:w-1/2">
                          <h3 className="text-white text-xl font-bold mb-4">Key Data Points</h3>
                          <div className="space-y-4">
                            {selectedImpact.stats.map((stat, i) => (
                              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-white font-medium">{stat.label}</p>
                                    <p className="text-white text-2xl font-bold">{stat.value}</p>
                                  </div>
                                  <div className={`text-${selectedImpact.color.split('-')[0]}-500`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'solutions' && (
                    <div>
                      <h3 className="text-white text-xl font-bold mb-4">Key Solutions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {selectedImpact.solutions.map((solution, i) => (
                          <div key={i} className="bg-gray-800 rounded-lg p-6 flex flex-col">
                            <div className="text-3xl mb-4">{solution.icon}</div>
                            <h4 className="text-white font-bold text-lg mb-2">{solution.title}</h4>
                            <p className="text-gray-300 flex-grow">{solution.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-white text-xl font-bold mb-4">What You Can Do</h3>
                      <div className="bg-gray-800 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                          {selectedImpact.personalActions.map((action, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="bg-green-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div className="text-white/90">{action}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Call to action button */}
                <div className="mt-8 flex justify-center">
                  <a 
                    href={`https://www.google.com/search?q=how+to+help+with+${selectedImpact.title.toLowerCase().replace(/\s+/g, '+')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r ${selectedImpact.color} px-6 py-3 rounded-lg text-white font-bold flex items-center gap-2`}
                  >
                    <span>Learn More & Take Action</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Improved info panel with animation and transparency */}
      {showInfoPanel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'fadeIn 0.3s ease-in-out',
        }}>
          <div style={{
            backgroundColor: 'rgba(31, 41, 55, 0.85)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            animation: 'slideIn 0.3s ease-out',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: 'white',
                margin: 0,
              }}>About This Data</h3>
              
              <button 
                onClick={() => setShowInfoPanel(false)}
                style={{
                  backgroundColor: 'rgba(220, 38, 38, 0.8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgb(220, 38, 38)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.8)'}
              >
                ✕
              </button>
            </div>
            
            <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                The data presented in this application is sourced from leading climate research organizations:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px', lineHeight: '1.7' }}>
                <li>The Intergovernmental Panel on Climate Change (IPCC)</li>
                <li>NASA's Global Climate Change Portal</li>
                <li>NOAA's Climate.gov</li>
                <li>World Meteorological Organization (WMO)</li>
                <li>Global Carbon Project</li>
              </ul>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                The personal impact calculator provides estimates based on general consumption patterns
                and should be considered educational rather than a precise measurement of your carbon footprint.
              </p>
              <p style={{ color: '#60a5fa', lineHeight: '1.6' }}>
                For more detailed analysis, consider using tools from organizations like the EPA.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Footer with attribution */}
      <div className="relative mt-20 bg-black/50 backdrop-blur-sm text-white/60 py-4 text-center text-xs">
        <div className="container mx-auto px-4">
          <p className="mb-2">Earth Unfolded | Climate data sourced from IPCC, NASA, and NOAA</p>
          <p>© 2023 Earth Unfolded | Educational platform for climate change awareness</p>
        </div>
      </div>
    </div>
  );
}
