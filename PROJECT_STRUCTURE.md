# Project Structure - GSAP & Three.js Integration

```
barrwits/
│
├── lib/
│   └── animations.ts                    # Custom GSAP hooks
│       ├── useGSAPAnimation()           # Basic animation hook
│       ├── useStaggerAnimation()        # Stagger animation hook
│       └── useTextRevealAnimation()     # Text reveal hook
│
├── app/
│   ├── components/
│   │   ├── Scene.tsx                    # Original Three.js background
│   │   │   ├── GridPlane                # Animated grid
│   │   │   ├── HolographicRings         # Rotating rings
│   │   │   ├── FloatingParticles        # Particle system
│   │   │   ├── TechCube                 # Wireframe cube
│   │   │   └── DataStreams              # Vertical lines
│   │   │
│   │   ├── InteractiveScene.tsx         # Enhanced 3D scene ⭐ NEW
│   │   │   ├── InteractiveSphere        # Clickable sphere
│   │   │   ├── AnimatedTorusKnot        # Rotating knot
│   │   │   ├── ParticleField            # Mouse-responsive particles
│   │   │   ├── LightOrbs                # Moving lights
│   │   │   └── GroundGrid               # Rotating grid
│   │   │
│   │   ├── GSAPShowcase.tsx             # GSAP demo component ⭐ NEW
│   │   │   ├── Scroll-triggered cards
│   │   │   ├── Parallax background
│   │   │   └── Interactive button
│   │   │
│   │   ├── LoadingScreen.tsx            # Loading animation ⭐ NEW
│   │   │   ├── Progress bar animation
│   │   │   ├── Pulsing text
│   │   │   └── Animated dots
│   │   │
│   │   └── Hero.tsx                     # Enhanced with GSAP ✨ MODIFIED
│   │       ├── GSAP entrance animations
│   │       ├── Staggered buttons
│   │       └── Coordinated timing
│   │
│   ├── demo/
│   │   └── page.tsx                     # Demo page ⭐ NEW
│   │       ├── Interactive 3D hero
│   │       ├── GSAP showcase
│   │       ├── Feature comparison
│   │       └── Usage examples
│   │
│   ├── page.tsx                         # Home page (uses enhanced Hero)
│   ├── layout.tsx                       # Root layout
│   └── ...other pages
│
├── public/
│   └── ...assets
│
├── GSAP_THREEJS_INTEGRATION.md          # Full documentation ⭐ NEW
├── INTEGRATION_SUMMARY.md               # Summary document ⭐ NEW
└── QUICK_REFERENCE.md                   # Quick reference guide ⭐ NEW
```

---

## Component Relationships

```
Home Page (app/page.tsx)
    │
    ├─→ Header
    │
    ├─→ Hero (enhanced with GSAP)
    │     └─→ Scene (Three.js background)
    │
    ├─→ WhatWeDo
    ├─→ Services
    ├─→ WhyChooseUs
    ├─→ About
    ├─→ FAQ
    ├─→ Testimonials
    ├─→ CTA
    │
    └─→ Footer

Demo Page (app/demo/page.tsx)
    │
    ├─→ Header
    │
    ├─→ InteractiveScene (3D hero section)
    │
    ├─→ GSAPShowcase (animation examples)
    │
    ├─→ Features Section
    │
    └─→ Footer
```

---

## Technology Stack

```
Frontend Framework
    └─→ Next.js 16.1.1
         └─→ React 19.2.3

Animation Libraries
    ├─→ GSAP 3.14.2
    │    ├─→ Core animations
    │    ├─→ ScrollTrigger plugin
    │    └─→ Timeline control
    │
    └─→ Custom Hooks (lib/animations.ts)
         ├─→ useGSAPAnimation
         ├─→ useStaggerAnimation
         └─→ useTextRevealAnimation

3D Graphics
    ├─→ Three.js 0.182.0
    │    └─→ Core 3D engine
    │
    ├─→ @react-three/fiber 9.5.0
    │    └─→ React renderer
    │
    └─→ @react-three/drei 10.7.7
         └─→ Helper components

Styling
    └─→ Tailwind CSS 4
```

---

## File Types

### ⭐ NEW - Created during integration
- `lib/animations.ts` - Reusable animation hooks
- `app/components/InteractiveScene.tsx` - Enhanced 3D scene
- `app/components/GSAPShowcase.tsx` - GSAP demonstration
- `app/components/LoadingScreen.tsx` - Loading animation
- `app/demo/page.tsx` - Demo/showcase page
- Documentation files (.md)

### ✨ MODIFIED - Enhanced with GSAP
- `app/components/Hero.tsx` - Added GSAP animations

### ✅ EXISTING - Already working
- `app/components/Scene.tsx` - Original Three.js background
- All package dependencies

---

## Animation Flow

```
Page Load
    │
    ├─→ Hero Section
    │     ├─→ Scene loads (Three.js background)
    │     └─→ GSAP animates content in
    │          ├─→ Content slides from left
    │          ├─→ Heading fades up
    │          ├─→ Description fades up
    │          ├─→ Buttons stagger in
    │          ├─→ Stats scale up
    │          └─→ Image slides from right
    │
    ├─→ Scroll Down
    │     └─→ ScrollTrigger animations fire
    │          ├─→ Sections fade in
    │          ├─→ Cards stagger in
    │          └─→ Parallax effects activate
    │
    └─→ User Interaction
          ├─→ Hover effects (CSS + GSAP)
          ├─→ Click animations
          └─→ 3D scene interaction
```

---

## Performance Considerations

```
Optimization Strategies
    │
    ├─→ Three.js
    │    ├─→ Use 'use client' directive
    │    ├─→ Implement useFrame for animations
    │    ├─→ Memoize expensive calculations
    │    └─→ Proper cleanup on unmount
    │
    ├─→ GSAP
    │    ├─→ Use gsap.context() for React
    │    ├─→ Cleanup with ctx.revert()
    │    ├─→ Kill tweens when needed
    │    └─→ Register plugins once
    │
    └─→ General
         ├─→ Lazy load 3D scenes
         ├─→ Optimize particle counts
         ├─→ Use will-change sparingly
         └─→ Monitor frame rates
```

---

## Routes

```
/                              → Home page with enhanced Hero
/demo                          → GSAP & Three.js showcase
/about                         → About page
/services                      → Services listing
/services/[slug]               → Service detail
/projects                      → Projects listing
/contact                       → Contact page
/admin/*                       → Admin routes
/auth/*                        → Authentication routes
```

---

## Key Features by Location

### lib/animations.ts
- Reusable across entire app
- TypeScript typed
- React-optimized
- Cleanup included

### app/components/
- **Scene.tsx**: Background 3D effects
- **InteractiveScene.tsx**: Interactive 3D experiences
- **GSAPShowcase.tsx**: Animation examples
- **Hero.tsx**: Landing page animations
- **LoadingScreen.tsx**: Page load animations

### app/demo/page.tsx
- Complete feature showcase
- Code examples
- Interactive demonstrations
- Learning resource

---

## Import Paths

```tsx
// Custom hooks
import { useGSAPAnimation } from '@/lib/animations';

// 3D Components
import Scene from '@/app/components/Scene';
import InteractiveScene from '@/app/components/InteractiveScene';

// GSAP Components
import GSAPShowcase from '@/app/components/GSAPShowcase';
import LoadingScreen from '@/app/components/LoadingScreen';

// Direct GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Three.js
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
```

---

This structure provides a clean, maintainable, and scalable integration of GSAP and Three.js throughout your Barrwit project! 🚀
