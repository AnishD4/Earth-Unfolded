"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Climate hotspot data by timeframe
const hotspotsByTimeframe = {
  'prehistoric': [
    { position: [0.8, 0.5, 0.5], label: 'Volcanic Activity', color: '#FF5733' },
    { position: [-0.7, 0.1, 0.7], label: 'Early Oceans', color: '#33A1FF' }
  ],
  'ice-age': [
    { position: [0, 0.8, 0.5], label: 'Glaciation', color: '#FFFFFF' },
    { position: [0.6, -0.6, 0.5], label: 'Lowered Sea Level', color: '#33A1FF' }
  ],
  'pre-industrial': [
    { position: [0.8, 0.3, 0.5], label: 'Stable Climate', color: '#33FF57' },
    { position: [-0.5, 0.5, 0.6], label: 'Pristine Forests', color: '#207040' }
  ],
  'industrial': [
    { position: [0.8, 0.4, 0.4], label: 'Coal Industry', color: '#555555' },
    { position: [-0.6, 0.5, 0.5], label: 'Deforestation', color: '#8B4513' }
  ],
  'modern': [
    { position: [0.7, 0.5, 0.5], label: 'Rising CO₂', color: '#FF5733' },
    { position: [-0.7, -0.3, 0.6], label: 'Arctic Melt', color: '#33A1FF' }
  ],
  'present': [
    { position: [0.6, 0.6, 0.5], label: 'Wildfires', color: '#FF5733' },
    { position: [-0.4, 0.6, 0.6], label: 'Extreme Weather', color: '#9370DB' },
    { position: [0.1, -0.8, 0.5], label: 'Rising Sea Levels', color: '#33A1FF' }
  ],
  'future': [
    { position: [0.7, 0.5, 0.5], label: 'Coastal Flooding', color: '#33A1FF' },
    { position: [-0.6, -0.5, 0.6], label: 'Desertification', color: '#D2B48C' },
    { position: [0.2, 0.8, 0.5], label: 'Climate Refugees', color: '#FF8C00' }
  ]
};

export default function Earth({ timeframe, onHotspotClick }) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();
  const gltf = useLoader(GLTFLoader, '/models/earth.glb');
  const controlsRef = useRef();
  const [hoverHotspot, setHoverHotspot] = useState(null);
  const { clock } = useThree();
  const [cloudsTextureLoaded, setCloudsTextureLoaded] = useState(false);

  // Load clouds texture with error handling
  const cloudsTexture = useMemo(() => {
    const texture = new THREE.TextureLoader();
    const textureObj = texture.load(
      '/models/clouds.png',
      () => setCloudsTextureLoaded(true),
      undefined,
      (error) => {
        console.warn('Failed to load clouds texture:', error);
        setCloudsTextureLoaded(false);
      }
    );
    return textureObj;
  }, []);

  // Set up hotspots for current timeframe
  const hotspots = useMemo(() => {
    return timeframe ? hotspotsByTimeframe[timeframe.id] || [] : [];
  }, [timeframe]);

  // Handle smooth rotation animation - but don't override user interaction
  useFrame(() => {
    // Only auto-rotate when user isn't interacting
    if (earthRef.current && !controlsRef.current?.isDragging) {
      // Very slow rotation for subtle effect
      earthRef.current.rotation.y += 0.0002;
    }

    // Add subtle wobble to simulate Earth's actual movement
    if (timeframe?.id && earthRef.current) {
      const wobbleAmount = 0.01;
      const wobbleSpeed = 0.5;
      // Only apply wobble if user isn't dragging
      if (!controlsRef.current?.isDragging) {
        earthRef.current.rotation.x = Math.sin(clock.getElapsedTime() * wobbleSpeed) * wobbleAmount;
      }
    }

    // Rotate clouds slightly faster than Earth for effect
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0003;
    }
  });

  // Effect for timeframe changes - animate Earth appearance based on selected time period
  useEffect(() => {
    if (!timeframe || !earthRef.current) return;

    // Reset any ongoing animations
    gsap.killTweensOf(earthRef.current.rotation);
    gsap.killTweensOf(earthRef.current.position);
    gsap.killTweensOf(earthRef.current.scale);

    // Define transition based on timeframe
    const transitions = {
      'prehistoric': {
        duration: 2,
        rotationX: 0.1,
        scale: 1.05,
        atmosphereColor: '#FF5733',
        atmosphereOpacity: 0.2
      },
      'ice-age': {
        duration: 2,
        rotationX: 0.2,
        scale: 0.95,
        atmosphereColor: '#A5F2F3',
        atmosphereOpacity: 0.15
      },
      'pre-industrial': {
        duration: 2,
        rotationX: 0.1,
        scale: 1,
        atmosphereColor: '#3482F6',
        atmosphereOpacity: 0.12
      },
      'industrial': {
        duration: 2,
        rotationX: 0.15,
        scale: 1,
        atmosphereColor: '#A89C8F',
        atmosphereOpacity: 0.18
      },
      'modern': {
        duration: 2,
        rotationX: 0.15,
        scale: 1,
        atmosphereColor: '#E95F2B',
        atmosphereOpacity: 0.2
      },
      'present': {
        duration: 2,
        rotationX: 0.15,
        scale: 1,
        atmosphereColor: '#E95F2B',
        atmosphereOpacity: 0.25
      },
      'future': {
        duration: 2,
        rotationX: 0.2,
        scale: 0.98,
        atmosphereColor: '#FF3300',
        atmosphereOpacity: 0.3
      }
    };

    const transition = transitions[timeframe.id] || transitions.present;

    // Animate Earth's orientation and scale
    gsap.to(earthRef.current.rotation, {
      duration: transition.duration,
      x: transition.rotationX,
      ease: "power2.inOut"
    });

    gsap.to(earthRef.current.scale, {
      duration: transition.duration,
      x: transition.scale,
      y: transition.scale,
      z: transition.scale,
      ease: "power2.inOut"
    });

    // Make Earth "bounce" slightly when changing timeframes
    gsap.to(earthRef.current.position, {
      duration: 0.5,
      y: -0.2,
      ease: "power1.out",
      yoyo: true,
      repeat: 1
    });

    // Animate atmosphere
    if (atmosphereRef.current && atmosphereRef.current.material) {
      gsap.to(atmosphereRef.current.material, {
        duration: 1.5,
        opacity: transition.atmosphereOpacity,
        ease: "power2.inOut"
      });

      gsap.to(atmosphereRef.current.material.color, {
        duration: 1.5,
        r: new THREE.Color(transition.atmosphereColor).r,
        g: new THREE.Color(transition.atmosphereColor).g,
        b: new THREE.Color(transition.atmosphereColor).b,
        ease: "power2.inOut"
      });
    }

    // Impact effect when changing timeframes
    gsap.fromTo(
      controlsRef.current.target,
      { x: 0, y: 0, z: 0 },
      {
        duration: 0.5,
        x: 0,
        y: 0,
        z: 0,
        ease: "elastic.out(1, 0.5)"
      }
    );

  }, [timeframe]);

  return (
      <>
        {/* Improved OrbitControls with better settings for interaction */}
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            rotateSpeed={0.7} // Increased for better responsiveness
            zoomSpeed={1.2} // Increased for better responsiveness
            enableDamping={true}
            dampingFactor={0.1}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN
            }}
        />

        {/* Main Earth model */}
        <primitive
            ref={earthRef}
            object={gltf.scene}
            scale={1}
            position={[0, 0, 0]}
        />

        {/* Cloud layer - only render if texture loaded successfully */}
        {cloudsTextureLoaded && (
          <mesh ref={cloudsRef} scale={1.02}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              map={cloudsTexture}
              opacity={0.4}
              transparent={true}
              depthWrite={false}
              side={THREE.FrontSide}
            />
          </mesh>
        )}

        {/* Add atmospheric glow effect */}
        <mesh ref={atmosphereRef} scale={1.15}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial
              color="#3482F6"
              opacity={0.15}
              transparent={true}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
          />
        </mesh>

        {/* Inner atmosphere for better glow */}
        <mesh scale={1.05}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial
              color="#FFFFFF"
              opacity={0.05}
              transparent={true}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
          />
        </mesh>

        {/* Environment lighting */}
        <Environment preset="sunset" background={false} />

        {/* Directional light for more dramatic shadows */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={0.8}
          castShadow
          color="#ffffff"
        />

        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.2} />
      </>
  );
}

