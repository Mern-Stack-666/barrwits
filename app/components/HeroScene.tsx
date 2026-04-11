'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const palette = {
  glow: '#67e8f9',
  glowSoft: '#38bdf8',
  silver: '#d4d4d8',
  panel: '#0f172a',
  mist: '#94a3b8',
  void: '#020617',
};

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

type NodeVariant = 'website' | 'strategy' | 'automation';

const orbitNodes: Array<{
  position: [number, number, number];
  accent: string;
  variant: NodeVariant;
  scale: number;
}> = [
  {
    position: [4.4, 1.8, 0.2],
    accent: palette.glow,
    variant: 'website',
    scale: 1,
  },
  {
    position: [-3.7, -1.3, 1.2],
    accent: palette.silver,
    variant: 'strategy',
    scale: 0.94,
  },
  {
    position: [1.3, -3.7, -0.8],
    accent: palette.glowSoft,
    variant: 'automation',
    scale: 0.84,
  },
];

function AmbientParticles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (seededUnit(index + 1) - 0.5) * 22;
      values[index * 3 + 1] = (seededUnit(index + count + 7) - 0.5) * 16;
      values[index * 3 + 2] = (seededUnit(index + count * 2 + 13) - 0.5) * 18;
    }

    return values;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = elapsed * 0.02;
    pointsRef.current.rotation.x = Math.sin(elapsed * 0.15) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={palette.silver}
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SignalGrid({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current || !scanRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -1.08 + mouse.y * 0.08,
      0.04
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -0.08 + mouse.x * 0.04,
      0.04
    );
    scanRef.current.position.z = Math.sin(elapsed * 0.9) * 2.6;
  });

  return (
    <group
      ref={groupRef}
      position={isMobile ? [0, -4.6, -6.5] : [2.6, -4.6, -6.5]}
      rotation={[-1.08, 0.12, -0.08]}
    >
      <gridHelper args={[18, 18, palette.glowSoft, palette.mist]} />
      <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[18, 0.55]} />
        <meshBasicMaterial
          color={palette.glow}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function CoreShell() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current || !haloRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const targetX = mouse.y * 0.25;
    const targetY = mouse.x * 0.45 + elapsed * 0.18;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06);

    const pulse = 1 + Math.sin(elapsed * 1.8) * 0.08;
    innerRef.current.scale.setScalar(pulse);
    haloRef.current.scale.setScalar(1.05 + Math.sin(elapsed * 1.4) * 0.14);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color={palette.glowSoft} transparent opacity={0.08} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshStandardMaterial
          color={palette.silver}
          emissive={palette.glowSoft}
          emissiveIntensity={0.18}
          transparent
          opacity={0.22}
          wireframe
        />
      </mesh>

      <mesh ref={innerRef}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial
          color={palette.glow}
          emissive={palette.glow}
          emissiveIntensity={0.8}
          metalness={0.45}
          roughness={0.2}
        />
      </mesh>

      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, index % 2 === 0 ? 0.35 : -0.35]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={index % 2 === 0 ? palette.glow : palette.silver} />
          </mesh>
        );
      })}
    </group>
  );
}

function PulseRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.x = elapsed * 0.16;
    groupRef.current.rotation.z = elapsed * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.035, 18, 120]} />
        <meshBasicMaterial color={palette.glow} transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[0.8, 0.3, 0.5]}>
        <torusGeometry args={[2.85, 0.03, 18, 120]} />
        <meshBasicMaterial color={palette.silver} transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[1.1, 0.9, 0.2]}>
        <torusGeometry args={[3.3, 0.025, 18, 120]} />
        <meshBasicMaterial color={palette.glowSoft} transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function OrbitConnections() {
  const positions = useMemo(() => {
    const values = orbitNodes.flatMap((node) => [0, 0, 0, ...node.position]);
    return new Float32Array(values);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={palette.glow} transparent opacity={0.24} />
    </lineSegments>
  );
}

function WebsitePanelFace({ accent }: { accent: string }) {
  return (
    <>
      <mesh position={[-0.55, 0.32, 0.06]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <mesh position={[-0.39, 0.32, 0.06]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={palette.silver} transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.24, 0.32, 0.06]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={palette.glowSoft} transparent opacity={0.65} />
      </mesh>
      <mesh position={[0.05, 0.12, 0.06]}>
        <boxGeometry args={[1.1, 0.16, 0.04]} />
        <meshBasicMaterial color={accent} transparent opacity={0.42} />
      </mesh>
      <mesh position={[-0.34, -0.16, 0.06]}>
        <boxGeometry args={[0.5, 0.46, 0.04]} />
        <meshBasicMaterial color={palette.silver} transparent opacity={0.2} />
      </mesh>
      <mesh position={[0.34, -0.16, 0.06]}>
        <boxGeometry args={[0.68, 0.46, 0.04]} />
        <meshBasicMaterial color={accent} transparent opacity={0.16} />
      </mesh>
    </>
  );
}

function StrategyPanelFace({ accent }: { accent: string }) {
  return (
    <>
      <mesh position={[-0.18, 0.22, 0.06]}>
        <boxGeometry args={[1.35, 0.18, 0.04]} />
        <meshBasicMaterial color={palette.silver} transparent opacity={0.2} />
      </mesh>
      <mesh position={[-0.38, -0.08, 0.06]}>
        <boxGeometry args={[0.5, 0.58, 0.04]} />
        <meshBasicMaterial color={accent} transparent opacity={0.18} />
      </mesh>
      {[
        { x: 0.16, height: 0.22 },
        { x: 0.42, height: 0.38 },
        { x: 0.68, height: 0.56 },
      ].map((bar) => (
        <mesh key={bar.x} position={[bar.x, -0.24 + bar.height / 2, 0.06]}>
          <boxGeometry args={[0.14, bar.height, 0.04]} />
          <meshBasicMaterial color={accent} transparent opacity={0.5} />
        </mesh>
      ))}
    </>
  );
}

function AutomationPanelFace({ accent }: { accent: string }) {
  return (
    <>
      <mesh position={[0, 0.24, 0.06]}>
        <boxGeometry args={[1.1, 0.14, 0.04]} />
        <meshBasicMaterial color={palette.silver} transparent opacity={0.18} />
      </mesh>
      {[-0.5, 0, 0.5].map((x) => (
        <mesh key={x} position={[x, -0.02, 0.06]}>
          <sphereGeometry args={[0.08, 14, 14]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
      {[-0.25, 0.25].map((x) => (
        <mesh key={x} position={[x, -0.02, 0.06]}>
          <boxGeometry args={[0.34, 0.04, 0.03]} />
          <meshBasicMaterial color={accent} transparent opacity={0.45} />
        </mesh>
      ))}
      <mesh position={[0, -0.32, 0.06]}>
        <boxGeometry args={[0.84, 0.12, 0.04]} />
        <meshBasicMaterial color={palette.glowSoft} transparent opacity={0.24} />
      </mesh>
    </>
  );
}

function OrbitPanel({
  accent,
  index,
  position,
  scale,
  variant,
}: {
  accent: string;
  index: number;
  position: [number, number, number];
  scale: number;
  variant: NodeVariant;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime() + index;
    groupRef.current.position.set(
      position[0],
      position[1] + Math.sin(elapsed * 0.9) * 0.14,
      position[2]
    );
    groupRef.current.rotation.x = Math.sin(elapsed * 0.35) * 0.08;
    groupRef.current.rotation.y = Math.cos(elapsed * 0.45) * 0.18;
  });

  return (
    <group ref={groupRef} scale={scale}>
      <mesh>
        <boxGeometry args={[1.8, 1.15, 0.09]} />
        <meshStandardMaterial
          color={palette.panel}
          emissive={accent}
          emissiveIntensity={0.12}
          transparent
          opacity={0.72}
          metalness={0.24}
          roughness={0.42}
        />
      </mesh>

      <mesh scale={[1.03, 1.03, 1.03]}>
        <boxGeometry args={[1.8, 1.15, 0.09]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.18} />
      </mesh>

      {variant === 'website' && <WebsitePanelFace accent={accent} />}
      {variant === 'strategy' && <StrategyPanelFace accent={accent} />}
      {variant === 'automation' && <AutomationPanelFace accent={accent} />}
    </group>
  );
}

function ConsultingCluster({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const baseX = isMobile ? 0 : 3.2;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      baseX + mouse.x * 0.45,
      0.04
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouse.y * 0.35,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.35 + mouse.x * 0.24 + elapsed * 0.04,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.12,
      0.04
    );
  });

  return (
    <group ref={groupRef} position={isMobile ? [0, 0, 0] : [3.2, 0, 0]}>
      <PulseRings />
      <OrbitConnections />
      <CoreShell />
      {orbitNodes.map((node, index) => (
        <OrbitPanel key={node.variant} index={index} {...node} />
      ))}
    </group>
  );
}

interface HeroSceneProps {
  onSceneReady?: () => void;
}

export default function HeroScene({ onSceneReady }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    onSceneReady?.();
  }, [onSceneReady]);

  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-zinc-950 to-black">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 52 }}
        dpr={isMobile ? [1, 1.3] : [1, 1.8]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 6]} intensity={1.1} color={palette.silver} />
        <pointLight position={[5, 3, 5]} intensity={1.8} color={palette.glow} />
        <pointLight position={[-5, -2, 3]} intensity={0.8} color={palette.glowSoft} />

        <AmbientParticles count={isMobile ? 220 : 520} />
        <SignalGrid isMobile={isMobile} />
        <ConsultingCluster isMobile={isMobile} />

        <fog attach="fog" args={[palette.void, 9, 22]} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(103,232,249,0.16),transparent_34%),radial-gradient(circle_at_62%_58%,rgba(56,189,248,0.12),transparent_28%)]" />
    </div>
  );
}
