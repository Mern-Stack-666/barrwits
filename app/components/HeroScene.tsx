'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

// Floating Geometric Shapes with Mouse Interaction
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10 - 5
      ],
      scale: Math.random() * 0.5 + 0.3,
      rotationSpeed: Math.random() * 0.02 + 0.01,
      type: Math.random() > 0.5 ? 'box' : 'sphere',
      color: Math.random() > 0.5 ? '#00ffff' : '#C0C0C0'
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth mouse follow
    const targetX = mouse.x * 2;
    const targetY = mouse.y * 2;
    
    groupRef.current.rotation.x += (targetY * 0.3 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetX * 0.3 - groupRef.current.rotation.y) * 0.05;

    // Animate individual children
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += shapes[i].rotationSpeed;
      child.rotation.y += shapes[i].rotationSpeed;
      
      // Gentle floating motion
      child.position.y += Math.sin(state.clock.getElapsedTime() + i) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <mesh
          key={shape.id}
          position={shape.position as [number, number, number]}
          scale={shape.scale}
        >
          {shape.type === 'box' ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <sphereGeometry args={[0.6, 16, 16]} />
          )}
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.4}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// Interactive Particle Trail
function ParticleTrail() {
  const { mouse, viewport } = useThree();
  const particlesRef = useRef<THREE.Points>(null);
  const trailRef = useRef<Array<{ x: number; y: number; z: number }>>([]);
  const maxTrailLength = 50;

  const positions = useMemo(() => {
    return new Float32Array(maxTrailLength * 3);
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;

    // Add current mouse position to trail
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    const z = 0;

    trailRef.current.unshift({ x, y, z });
    if (trailRef.current.length > maxTrailLength) {
      trailRef.current.pop();
    }

    // Update particle positions using Three.js API
    const geometry = particlesRef.current.geometry;
    const positionAttribute = geometry.getAttribute('position');
    
    trailRef.current.forEach((point, i) => {
      if (i < maxTrailLength) {
        positionAttribute.setXYZ(i, point.x, point.y, point.z);
      }
    });
    
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={maxTrailLength}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00ffff"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Morphing Central Object
function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotate based on mouse position
    const targetRotX = mouse.y * Math.PI * 0.3;
    const targetRotY = mouse.x * Math.PI * 0.3;
    
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.1;

    // Pulse effect
    const scale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        color={hovered ? '#ff006e' : '#00ffff'}
        emissive={hovered ? '#ff006e' : '#00ffff'}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        wireframe
        transparent
        opacity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

// Animated Ring System
function RingSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotate rings
    groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    
    // Tilt based on mouse
    const targetTiltX = mouse.y * 0.5;
    const targetTiltY = mouse.x * 0.5;
    
    groupRef.current.rotation.x += (targetTiltX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetTiltY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {[1.5, 2.5, 3.5].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, 0]}>
          <torusGeometry args={[radius, 0.03, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? '#00ffff' : i === 1 ? '#C0C0C0' : '#ffffff'}
            transparent
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Energy Waves
function EnergyWaves() {
  const wavesRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!wavesRef.current) return;

    // Expand and contract
    const time = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(time * 0.5) * 0.2;
    wavesRef.current.scale.set(scale, scale, scale);

    // Rotate towards mouse
    const targetRotX = mouse.y * 0.3;
    const targetRotY = mouse.x * 0.3;
    wavesRef.current.rotation.x += (targetRotX - wavesRef.current.rotation.x) * 0.05;
    wavesRef.current.rotation.y += (targetRotY - wavesRef.current.rotation.y) * 0.05;
  });

  return (
    <mesh ref={wavesRef}>
      <circleGeometry args={[5, 64]} />
      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Connection Lines
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const positions = useMemo(() => {
    const points = [];
    const count = 30;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      points.push(
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
        new THREE.Vector3(0, 0, 0)
      );
    }
    
    return new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
  }, []);

  useFrame(() => {
    if (!linesRef.current) return;
    linesRef.current.rotation.z += 0.002;
    
    // Subtle mouse influence
    linesRef.current.rotation.x = mouse.y * 0.2;
    linesRef.current.rotation.y = mouse.x * 0.2;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
    </lineSegments>
  );
}

interface HeroSceneProps {
  onSceneReady?: () => void;
}

export default function HeroScene({ onSceneReady }: HeroSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    onSceneReady?.();
  }, [onSceneReady]);

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-zinc-950 to-black">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff006e" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.6}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* Scene Elements */}
        <FloatingShapes />
        <MorphingCore />
        <RingSystem />
        <EnergyWaves />
        <ConnectionLines />
        <ParticleTrail />

        {/* Fog for depth */}
        <fog attach="fog" args={['#000000', 8, 20]} />
      </Canvas>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
