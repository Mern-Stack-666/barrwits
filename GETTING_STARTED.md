# 🚀 Getting Started with GSAP & Three.js in Barrwit

Welcome! This guide will help you start using GSAP animations and Three.js 3D graphics in your Barrwit project.

## ✅ What's Already Done

All dependencies are installed and ready to use:
- ✅ GSAP 3.14.2
- ✅ Three.js 0.182.0
- ✅ React Three Fiber 9.5.0
- ✅ Drei helpers 10.7.7
- ✅ Custom animation hooks
- ✅ Ready-to-use components
- ✅ Demo page at `/demo`

---

## 🎯 Quick Start (5 Minutes)

### 1. View the Demo
```bash
npm run dev
```
Visit: `http://localhost:3000/demo`

This shows you everything that's possible!

### 2. Use Your First Animation Hook
```tsx
'use client';
import { useRef } from 'react';
import { useGSAPAnimation } from '@/lib/animations';

export default function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Animate on mount
  useGSAPAnimation(ref, {
    from: { opacity: 0, y: 50 },
    duration: 1
  });
  
  return (
    <div ref={ref}>
      <h1>Hello World!</h1>
    </div>
  );
}
```

### 3. Add a 3D Scene
```tsx
import InteractiveScene from '@/app/components/InteractiveScene';

export default function Page() {
  return (
    <div className="h-screen">
      <InteractiveScene />
    </div>
  );
}
```

That's it! You're now using GSAP and Three.js! 🎉

---

## 📚 Learning Path

### Beginner Level

#### Step 1: Understand GSAP Basics
Read: `QUICK_REFERENCE.md` → Common GSAP Animations

Try animating different properties:
```tsx
gsap.from(element, { x: 100, duration: 1 });
gsap.from(element, { scale: 0.5, duration: 0.8 });
gsap.from(element, { rotation: 180, duration: 1 });
```

#### Step 2: Use Custom Hooks
Explore: `lib/animations.ts`

The three hooks provided:
- `useGSAPAnimation` - For single element animations
- `useStaggerAnimation` - For multiple elements
- `useTextRevealAnimation` - For text effects

#### Step 3: Explore 3D Components
Check out:
- `app/components/Scene.tsx` - Background scene
- `app/components/InteractiveScene.tsx` - Interactive scene

See how they're built and customize them!

---

### Intermediate Level

#### Step 4: Scroll-Triggered Animations
```tsx
useGSAPAnimation(ref, {
  from: { opacity: 0, y: 50 },
  scrollTrigger: true,
  start: 'top 80%'
});
```

#### Step 5: Create Custom 3D Objects
```tsx
function MyObject() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="cyan" />
    </mesh>
  );
}
```

#### Step 6: Combine GSAP + Three.js
Use GSAP to animate camera positions or object properties in your 3D scenes!

---

### Advanced Level

#### Step 7: Build Complex Timelines
```tsx
const tl = gsap.timeline();
tl.from('.elem1', { x: -100 })
  .from('.elem2', { y: 100 }, '-=0.5')
  .to('.elem3', { rotation: 360 });
```

#### Step 8: Create Interactive Experiences
Combine mouse events, 3D interactions, and GSAP animations for immersive experiences.

#### Step 9: Optimize Performance
- Use `will-change` strategically
- Implement proper cleanup
- Monitor frame rates
- Lazy load heavy 3D scenes

---

## 🎨 Common Use Cases

### 1. Animate Page Sections
```tsx
function Section() {
  const ref = useRef<HTMLElement>(null);
  
  useGSAPAnimation(ref, {
    from: { opacity: 0, y: 50 },
    scrollTrigger: true
  });
  
  return <section ref={ref}>...</section>;
}
```

### 2. Stagger Card Grid
```tsx
function CardGrid() {
  const ref = useRef<HTMLDivElement>(null);
  
  useStaggerAnimation(ref, '.card', {
    opacity: 0,
    y: 30,
    stagger: 0.1
  });
  
  return (
    <div ref={ref}>
      {cards.map(card => (
        <div key={card.id} className="card">
          {/* card content */}
        </div>
      ))}
    </div>
  );
}
```

### 3. Loading Screen
```tsx
function Page() {
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      <LoadingScreen 
        isLoading={loading} 
        onComplete={() => setLoading(false)} 
      />
      {!loading && <YourContent />}
    </>
  );
}
```

### 4. 3D Product Showcase
```tsx
function ProductShowcase() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ProductModel />
      <OrbitControls />
    </Canvas>
  );
}
```

### 5. Parallax Scrolling
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.parallax-element', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  return () => ctx.revert();
}, []);
```

---

## 🔧 Customization Guide

### Modify Existing Components

#### Change Scene Colors
In `app/components/Scene.tsx` or `InteractiveScene.tsx`:
```tsx
// Change particle color
<pointsMaterial color="#ff006e" />

// Change light color
<pointLight color="#00ffff" />

// Change material color
<meshStandardMaterial color="purple" />
```

#### Adjust Animation Speed
```tsx
// Slower animation
gsap.from(element, { duration: 2 });

// Faster animation
gsap.from(element, { duration: 0.3 });
```

#### Change Easing
```tsx
// Smooth
ease: 'power2.out'

// Bouncy
ease: 'back.out(1.7)'

// Elastic
ease: 'elastic.out(1, 0.3)'
```

---

## 🐛 Troubleshooting

### Issue: Animations not working
**Solution:** Make sure you have `'use client'` at the top of your component file.

### Issue: Three.js canvas is black
**Solution:** Check that you have lighting in your scene and materials are not transparent.

### Issue: GSAP warnings in console
**Solution:** Always use `gsap.context()` and call `ctx.revert()` in cleanup.

### Issue: ScrollTrigger not working
**Solution:** Ensure ScrollTrigger is registered:
```tsx
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Issue: Performance is slow
**Solution:**
- Reduce particle count in 3D scenes
- Use simpler geometries
- Limit simultaneous animations
- Implement proper cleanup

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `GSAP_THREEJS_INTEGRATION.md` | Complete integration guide |
| `INTEGRATION_SUMMARY.md` | What was added/modified |
| `QUICK_REFERENCE.md` | Code snippets & examples |
| `PROJECT_STRUCTURE.md` | File organization |
| `GETTING_STARTED.md` | This file! |

---

## 🎓 Next Steps

1. **Explore the demo** at `/demo`
2. **Read the quick reference** for code snippets
3. **Experiment** with the custom hooks
4. **Customize** existing components
5. **Build** your own animated sections
6. **Combine** GSAP + Three.js for stunning effects

---

## 💡 Pro Tips

### Tip 1: Start Simple
Begin with basic fade-in animations before attempting complex sequences.

### Tip 2: Use the Hooks
The custom hooks handle cleanup and best practices automatically.

### Tip 3: Test on Mobile
Always check animations on mobile devices for performance.

### Tip 4: Less is More
Don't over-animate. Subtle animations often look more professional.

### Tip 5: Learn from Examples
Study the Hero component and demo page for real-world implementations.

---

## 🆘 Need Help?

1. Check the documentation files
2. Look at example components
3. Review the demo page code
4. Reference the quick reference guide

---

## 🚀 Ready to Build!

You now have everything you need to create stunning animations and 3D experiences in your Barrwit project. 

Start small, experiment often, and have fun! 🎨✨

**Happy coding!** 💻
