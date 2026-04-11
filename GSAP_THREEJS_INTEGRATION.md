# GSAP & Three.js Integration Guide

This document explains how GSAP and Three.js are integrated into the Barrwit project.

## 📦 What's Installed

### Dependencies (Already in package.json)
- **gsap**: ^3.14.2 - GreenSock Animation Platform
- **three**: ^0.182.0 - 3D graphics library
- **@react-three/fiber**: ^9.5.0 - React renderer for Three.js
- **@react-three/drei**: ^10.7.7 - Useful helpers for React Three Fiber
- **@types/gsap**: ^1.20.2 - TypeScript types for GSAP
- **@types/three**: ^0.182.0 - TypeScript types for Three.js

## 🎨 Three.js Integration

### Existing Components

#### 1. Scene Component (`app/components/Scene.tsx`)
A futuristic 3D background with:
- Floating particles with glow effects
- Holographic rotating rings
- Wireframe tech cube
- Animated grid plane
- Data streams
- Fog for depth

**Usage:**
```tsx
import Scene from './components/Scene';

function Hero() {
  return (
    <div className="relative">
      <Scene />
      {/* Your content */}
    </div>
  );
}
```

#### 2. Interactive Scene Component (`app/components/InteractiveScene.tsx`)
An enhanced interactive 3D scene with:
- Mouse-responsive particle field
- Interactive sphere (clickable and hoverable)
- Animated torus knot
- Moving light orbs
- Ground grid
- Optional orbit controls

**Usage:**
```tsx
import InteractiveScene from './components/InteractiveScene';

function Page() {
  return (
    <InteractiveScene enableOrbitControls={true} />
  );
}
```

### Creating Custom 3D Components

```tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function My3DObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate on every frame
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  );
}

export default function MyScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <My3DObject />
    </Canvas>
  );
}
```

## ✨ GSAP Integration

### Custom Hooks (`lib/animations.ts`)

Three reusable hooks are provided:

#### 1. useGSAPAnimation
Basic animation hook with optional scroll trigger.

```tsx
import { useGSAPAnimation } from '@/lib/animations';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  useGSAPAnimation(ref, {
    from: { opacity: 0, y: 50 },
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: true,
    start: 'top 80%',
  });
  
  return <div ref={ref}>Animated Content</div>;
}
```

#### 2. useStaggerAnimation
Animate multiple children with staggered timing.

```tsx
import { useStaggerAnimation } from '@/lib/animations';

function CardGrid() {
  const ref = useRef<HTMLDivElement>(null);
  
  useStaggerAnimation(ref, '.card', {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
  });
  
  return (
    <div ref={ref}>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </div>
  );
}
```

#### 3. useTextRevealAnimation
Smooth text reveal animation.

```tsx
import { useTextRevealAnimation } from '@/lib/animations';

function Heading() {
  const ref = useRef<HTMLHeadingElement>(null);
  
  useTextRevealAnimation(ref, {
    opacity: 0,
    y: 30,
    duration: 1,
  });
  
  return <h1 ref={ref}>Revealed Text</h1>;
}
```

### Direct GSAP Usage

You can also use GSAP directly in components:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });
    });
    
    return () => ctx.revert();
  }, []);
  
  return <div ref={ref}>Content</div>;
}
```

## 🚀 Demo Page

A demo page is available at `/demo` that showcases:
- Interactive 3D scene with orbit controls
- GSAP animations with scroll triggers
- Feature comparison
- Usage examples

Visit: `http://localhost:3000/demo`

## 📝 Enhanced Hero Component

The Hero component (`app/components/Hero.tsx`) has been enhanced with GSAP animations:
- Staggered entrance animations
- Smooth transitions for all elements
- Coordinated timing for professional feel

## 🎯 Best Practices

### Three.js
1. Always use `'use client'` directive for 3D components
2. Use `useFrame` for animations instead of requestAnimationFrame
3. Keep geometry and material creation outside of render loop
4. Use `useMemo` for expensive calculations
5. Implement proper cleanup in useEffect

### GSAP
1. Always use `gsap.context()` for React components
2. Call `ctx.revert()` in cleanup function
3. Register plugins once (ScrollTrigger, etc.)
4. Use refs to target DOM elements
5. Prefer custom hooks for reusability

## 🔧 Common Animations

### Fade In
```tsx
gsap.from(element, { opacity: 0, duration: 1 });
```

### Slide In
```tsx
gsap.from(element, { x: -50, opacity: 0, duration: 0.8 });
```

### Scale Up
```tsx
gsap.from(element, { scale: 0.8, opacity: 0, duration: 0.6 });
```

### Stagger Multiple Elements
```tsx
gsap.from(elements, {
  y: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6
});
```

### Scroll Trigger
```tsx
gsap.to(element, {
  y: -100,
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

## 🌟 Advanced Features

### Timeline Sequencing
```tsx
const tl = gsap.timeline();
tl.from('.element1', { x: -100 })
  .from('.element2', { y: 100 }, '-=0.5')
  .to('.element3', { rotation: 360 });
```

### Mouse Follow Effect
```tsx
useFrame(({ mouse }) => {
  mesh.current.position.x = mouse.x * 5;
  mesh.current.position.y = mouse.y * 5;
});
```

### Interactive Materials
```tsx
<mesh
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
  onClick={() => setClicked(!clicked)}
>
  <meshStandardMaterial 
    color={hovered ? 'cyan' : 'white'}
    emissive={clicked ? 'red' : 'black'}
  />
</mesh>
```

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Documentation](https://github.com/pmndrs/drei)

## 🎬 Examples in Project

Check these files for real implementations:
- `app/components/Hero.tsx` - GSAP animations
- `app/components/Scene.tsx` - Three.js background
- `app/components/InteractiveScene.tsx` - Interactive 3D
- `app/components/GSAPShowcase.tsx` - GSAP showcase
- `lib/animations.ts` - Custom hooks
- `app/demo/page.tsx` - Complete demo
