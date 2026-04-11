# Quick Reference - GSAP & Three.js

## 🚀 Import Statements

```tsx
// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Custom Hooks
import { useGSAPAnimation, useStaggerAnimation, useTextRevealAnimation } from '@/lib/animations';

// Three.js
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Components
import Scene from '@/app/components/Scene';
import InteractiveScene from '@/app/components/InteractiveScene';
import LoadingScreen from '@/app/components/LoadingScreen';
```

---

## 🎨 Common GSAP Animations

### Fade In
```tsx
gsap.from(element, { opacity: 0, duration: 1 });
```

### Slide Up
```tsx
gsap.from(element, { y: 50, opacity: 0, duration: 0.8 });
```

### Scale In
```tsx
gsap.from(element, { scale: 0.8, opacity: 0, duration: 0.6 });
```

### Rotate In
```tsx
gsap.from(element, { rotation: -180, opacity: 0, duration: 1 });
```

### Stagger Children
```tsx
gsap.from(children, {
  y: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  ease: 'power2.out'
});
```

### Bounce Effect
```tsx
gsap.from(element, {
  y: -50,
  duration: 0.8,
  ease: 'back.out(1.7)'
});
```

---

## 📜 Scroll Trigger Examples

### Basic Scroll Animation
```tsx
gsap.to(element, {
  y: -100,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true
  }
});
```

### Pin Element
```tsx
ScrollTrigger.create({
  trigger: element,
  start: 'top top',
  end: '+=1000',
  pin: true
});
```

### Toggle Class
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: 'top center',
    onEnter: () => element.classList.add('active'),
    onLeaveBack: () => element.classList.remove('active')
  }
});
```

---

## 🎮 Three.js Basics

### Simple Mesh
```tsx
function MyMesh() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  );
}
```

### Canvas Setup
```tsx
<Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <MyMesh />
</Canvas>
```

### Mouse Interaction
```tsx
<mesh
  onPointerOver={() => console.log('hovered')}
  onPointerOut={() => console.log('left')}
  onClick={() => console.log('clicked')}
>
  {/* geometry and material */}
</mesh>
```

---

## ⚡ Custom Hook Usage

### useGSAPAnimation
```tsx
const ref = useRef<HTMLDivElement>(null);

useGSAPAnimation(ref, {
  from: { opacity: 0, y: 50 },
  duration: 1,
  scrollTrigger: true,
  start: 'top 80%'
});

return <div ref={ref}>Content</div>;
```

### useStaggerAnimation
```tsx
const ref = useRef<HTMLDivElement>(null);

useStaggerAnimation(ref, '.item', {
  opacity: 0,
  x: -30,
  stagger: 0.1,
  duration: 0.6
});

return (
  <div ref={ref}>
    <div className="item">Item 1</div>
    <div className="item">Item 2</div>
  </div>
);
```

### useTextRevealAnimation
```tsx
const ref = useRef<HTMLHeadingElement>(null);

useTextRevealAnimation(ref, {
  opacity: 0,
  y: 30,
  duration: 1
});

return <h1 ref={ref}>Title</h1>;
```

---

## 🎯 Easing Functions

```
Linear: 'none'
Power: 'power1.out', 'power2.out', 'power3.out', 'power4.out'
Back: 'back.out(1.7)'
Elastic: 'elastic.out(1, 0.3)'
Bounce: 'bounce.out'
Sine: 'sine.inOut'
Expo: 'expo.out'
Circ: 'circ.out'
```

---

## 🔧 Timeline Control

### Create Timeline
```tsx
const tl = gsap.timeline();

tl.from('.elem1', { x: -100, duration: 0.5 })
  .from('.elem2', { y: 100, duration: 0.5 }, '-=0.3')
  .to('.elem3', { rotation: 360, duration: 1 });
```

### Reverse Timeline
```tsx
tl.reverse();
```

### Pause/Resume
```tsx
tl.pause();
tl.resume();
```

---

## 💡 React Best Practices

### Always Use Context
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // Your animations here
  });
  
  return () => ctx.revert();
}, []);
```

### Register Plugins Once
```tsx
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Cleanup Animations
```tsx
return () => {
  ctx.revert();
  gsap.killTweensOf(element);
};
```

---

## 🎬 Component Patterns

### Animated Section
```tsx
function AnimatedSection() {
  const ref = useRef<HTMLElement>(null);
  
  useGSAPAnimation(ref, {
    from: { opacity: 0, y: 50 },
    scrollTrigger: true
  });
  
  return <section ref={ref}>...</section>;
}
```

### 3D Background
```tsx
function PageWith3D() {
  return (
    <div className="relative">
      <Scene />
      <div className="relative z-10">
        {/* Content */}
      </div>
    </div>
  );
}
```

### Loading State
```tsx
function Page() {
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <LoadingScreen isLoading={loading} onComplete={() => setLoading(false)} />
      {!loading && <YourContent />}
    </>
  );
}
```

---

## 📱 Responsive Tips

### Media Queries in GSAP
```tsx
const isMobile = window.innerWidth < 768;

gsap.from(element, {
  x: isMobile ? -20 : -50,
  duration: isMobile ? 0.5 : 1
});
```

### MatchMedia
```tsx
gsap.matchMedia(() => {
  gsap.from(element, { x: -50 });
  
  return () => {
    // Cleanup
  };
});
```

---

## 🔗 Useful Links

- Demo: `/demo`
- Hooks: `lib/animations.ts`
- Docs: `GSAP_THREEJS_INTEGRATION.md`
- Summary: `INTEGRATION_SUMMARY.md`

---

**Remember**: Always use `'use client'` directive for components with animations or 3D!
