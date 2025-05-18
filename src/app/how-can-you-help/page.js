"use client";

import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import { motion } from 'framer-motion';
import styles from './how-can-you-help.module.css';
import { useEffect, useState } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

// Stars background component
const StarsBackground = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars = [];
      const count = window.innerWidth < 768 ? 50 : 100;
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 8 + 2
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    // Handle window resize
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className={styles.starsContainer}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default function HowCanYouHelp() {
  useEffect(() => {
    // Add staggered animation to list items
    const listItems = document.querySelectorAll(`.${styles.list} li`);
    listItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 300 + (index * 100));
    });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <StarsBackground />
      <main className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${styles.heading} ${spaceGrotesk.className}`}>How Can You Help?</h1>
        </motion.div>
        
        <motion.p 
          className={styles.intro}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Climate action requires collective effort. Your contributions, aligned with the UN Sustainable Development Goals, can create meaningful change:
        </motion.p>
        
        <ul className={styles.list}>
          <li>
            <strong>Reduce your carbon footprint:</strong> use public transport, bike, or walk when possible.
          </li>
          <li>
            <strong>Conserve energy:</strong> turn off lights and electronics when not in use.
          </li>
          <li>
            <strong>Support renewable energy:</strong> choose sustainable products and green energy sources.
          </li>
          <li>
            <strong>Educate others:</strong> share knowledge about climate change and its impacts.
          </li>
          <li>
            <strong>Get involved:</strong> join local or global environmental organizations.
          </li>
          <li>
            <strong>Advocate for change:</strong> support policies that protect our environment.
          </li>
        </ul>
        
        <motion.div
          className={styles.unGoalsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2>UN Sustainable Development Goals</h2>
          <p>Your actions support these key UN climate goals:</p>
          <div className={styles.unGoalsList}>
            <div className={styles.unGoalItem}>
              <span className={styles.unGoalNumber}>13</span>
              <span>Climate Action</span>
            </div>
            <div className={styles.unGoalItem}>
              <span className={styles.unGoalNumber}>7</span>
              <span>Affordable & Clean Energy</span>
            </div>
            <div className={styles.unGoalItem}>
              <span className={styles.unGoalNumber}>12</span>
              <span>Responsible Consumption</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={styles.iconContainer}
        >
          <div className={styles.iconItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Global Impact</span>
          </div>
          <div className={styles.iconItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Renewable Energy</span>
          </div>
          <div className={styles.iconItem}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
            </svg>
            <span>Better Future</span>
          </div>
        </motion.div>
        
        <motion.p 
          className={`${styles.thankyou} ${spaceGrotesk.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Together, we can make a difference. Thank you for caring about our planet!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link href="/" className={styles.backLink}>
            <span>←</span> Back to Home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
