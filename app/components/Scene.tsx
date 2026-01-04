'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Futuristic Grid Plane
function GridPlane() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -3, 0]}>
            <planeGeometry args={[30, 30, 30, 30]} />
            <meshBasicMaterial
                color="#00ffff"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

// Holographic Rings
function HolographicRings() {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.x = state.clock.getElapsedTime() * 0.1;
        group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    });

    return (
        <group ref={group}>
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[5, 0.05, 16, 100]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[6, 0.05, 16, 100]} />
                <meshBasicMaterial color="#C0C0C0" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[5.5, 0.05, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

// Floating Particles with Glow
function FloatingParticles() {
    const particleCount = 800;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    const ref = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;

        // Animate particles up and down
        const positions = ref.current.geometry.attributes.position;
        for (let i = 0; i < particleCount; i++) {
            const y = positions.getY(i);
            positions.setY(i, y + Math.sin(state.clock.getElapsedTime() + i) * 0.001);
        }
        positions.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#00ffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Rotating Cube Wireframe
function TechCube() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[4, 4, 4]} />
            <meshBasicMaterial color="#C0C0C0" wireframe transparent opacity={0.2} />
        </mesh>
    );
}

// Data Streams (vertical lines)
function DataStreams() {
    const lines = useMemo(() => {
        const lineGeometries = [];
        for (let i = 0; i < 20; i++) {
            const points = [];
            const x = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            points.push(new THREE.Vector3(x, -10, z));
            points.push(new THREE.Vector3(x, 10, z));
            lineGeometries.push(points);
        }
        return lineGeometries;
    }, []);

    return (
        <group>
            {lines.map((points, index) => (
                <line key={index}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
                            count={points.length}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#00ffff" transparent opacity={0.1} />
                </line>
            ))}
        </group>
    );
}

export default function Scene() {
    return (
        <div className="absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C0C0C0" />

                {/* Futuristic Elements */}
                <FloatingParticles />
                <HolographicRings />
                <TechCube />
                <GridPlane />
                <DataStreams />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000000', 10, 30]} />
            </Canvas>
        </div>
    );
}
