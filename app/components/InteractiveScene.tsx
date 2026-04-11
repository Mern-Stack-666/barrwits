'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Interactive Floating Sphere
function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;

    // Pulse effect when hovered
    const scale = hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      position={[3, 0, 0]}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={clicked ? '#ff006e' : '#00ffff'}
        emissive={clicked ? '#ff006e' : '#00ffff'}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Animated Torus Knot
function AnimatedTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[-3, 1, -2]}>
      <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#C0C0C0"
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// Particle Field with Mouse Interaction
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particlesCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0005;
    
    // Subtle mouse interaction
    pointsRef.current.rotation.x = mouse.y * 0.1;
    pointsRef.current.rotation.z = mouse.x * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Moving Light Orbs
function LightOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(time * 0.5) * 5;
      orb1Ref.current.position.y = Math.cos(time * 0.3) * 3;
      orb1Ref.current.position.z = Math.sin(time * 0.7) * 2;
    }

    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(time * 0.4) * 6;
      orb2Ref.current.position.y = Math.sin(time * 0.6) * 4;
      orb2Ref.current.position.z = Math.cos(time * 0.5) * 3;
    }
  });

  return (
    <>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#00ffff" />
        <pointLight intensity={2} color="#00ffff" distance={10} />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ff006e" />
        <pointLight intensity={2} color="#ff006e" distance={10} />
      </mesh>
    </>
  );
}

// Ground Grid
function GroundGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, '#00ffff', '#C0C0C0']}
      position={[0, -5, 0]}
    />
  );
}

interface InteractiveSceneProps {
  enableOrbitControls?: boolean;
}

export default function InteractiveScene({ 
  enableOrbitControls = false 
}: InteractiveSceneProps) {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-zinc-950 to-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff006e" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* 3D Objects */}
        <InteractiveSphere />
        <AnimatedTorusKnot />
        <ParticleField />
        <LightOrbs />
        <GroundGrid />

        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 5, 25]} />

        {/* Optional Orbit Controls */}
        {enableOrbitControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
}
