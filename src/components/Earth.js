"use client";

import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function Earth({ timeframe, onHotspotClick }) {
  const earthRef = useRef();
  const gltf = useLoader(GLTFLoader, '/models/earth.glb');
  const controlsRef = useRef();

  // Handle rotation animation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  // Effect for timeframe changes - animate Earth appearance based on selected time period
  useEffect(() => {
    if (earthRef.current) {
      // Example of animating Earth based on timeframe
      gsap.to(earthRef.current.rotation, {
        duration: 2,
        x: timeframe.tilt || 0,
        ease: "power2.inOut"
      });

      // If we had materials we could control (like different textures for different time periods)
      if (earthRef.current.material) {
        gsap.to(earthRef.current.material, {
          duration: 1.5,
          opacity: 1,
          ease: "power2.inOut"
        });
      }
    }
  }, [timeframe]);

  return (
      <>
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            minDistance={2.5}
            maxDistance={8}
            rotateSpeed={0.5}
        />

        <primitive
            ref={earthRef}
            object={gltf.scene}
            scale={1}
            position={[0, 0, 0]}
            onClick={onHotspotClick}
        />

        <Environment preset="city" />

        {/* Add atmospheric effect */}
        <mesh scale={1.02}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
              color="#3482F6"
              opacity={0.15}
              transparent={true}
              side={THREE.BackSide}
          />
        </mesh>
      </>
  );
}