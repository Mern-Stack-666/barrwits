# Interactive Hero Scene Documentation

## 🎨 Overview

The new Hero Scene (`app/components/HeroScene.tsx`) is an advanced, mouse-reactive 3D environment that combines Three.js graphics with GSAP animations for an immersive hero section experience.

## ✨ Features

### 1. **Mouse-Reactive 3D Elements**
All 3D objects respond to mouse movement in real-time:
- **Floating Shapes**: 15 geometric shapes that rotate and follow mouse position
- **Morphing Core**: Central icosahedron that changes color and size on hover
- **Ring System**: Concentric rings that tilt based on cursor position
- **Energy Waves**: Expanding circles that rotate towards mouse
- **Connection Lines**: Radial lines with subtle mouse influence
- **Particle Trail**: Dynamic trail following cursor movement

### 2. **GSAP Integration**
Smooth animations throughout the hero section:
- **Entrance Animations**: Staggered fade-in for all content elements
- **Mouse Parallax**: Content moves subtly with cursor (different speeds for depth)
- **Button Hover**: Scale effects with elastic easing
- **Stats Hover**: Bouncy scale animations
- **Image Tilt**: 3D perspective tilt on image container

### 3. **Interactive Components**

#### Morphing Core
- Changes color from cyan (#00ffff) to pink (#ff006e) on hover
- Scales up when hovered
- Rotates based on mouse position
- Wireframe icosahedron with emissive glow

#### Particle Trail
- 50 particles that follow mouse cursor
- Creates a dynamic trail effect
- Additive blending for glowing appearance
- Real-time position updates

#### Floating Shapes
- 15 random geometric shapes (boxes and spheres)
- Wireframe materials with transparency
- Individual rotation speeds
- Mouse-following group rotation

#### Ring System
- 3 concentric torus rings
- Different colors (cyan, silver, white)
- Continuous rotation
- Mouse-based tilting

---

## 🎯 How It Works

### Three.js Mouse Interaction

```tsx
const { mouse, viewport } = useThree();

useFrame(() => {
  // Mouse position is normalized (-1 to 1)
  const targetX = mouse.x * 2;
  const targetY = mouse.y * 2;
  
  // Smooth interpolation
  object.rotation.x += (targetY - object.rotation.x) * 0.05;
  object.rotation.y += (targetX - object.rotation.y) * 0.05;
});
```

### GSAP Mouse Parallax

```tsx
heroRef.current.addEventListener('mousemove', (e: MouseEvent) => {
  const xPos = (clientX / innerWidth - 0.5) * 20;
  const yPos = (clientY / innerHeight - 0.5) * 20;

  // Move content at different speeds for depth
  gsap.to(contentRef.current, {
    x: xPos * 0.5,
    y: yPos * 0.5,
    duration: 0.5
  });
});
```

### Hover Effects

```tsx
<button
  onMouseEnter={(e) => {
    gsap.to(e.currentTarget, { 
      scale: 1.05, 
      duration: 0.3, 
      ease: 'power2.out' 
    });
  }}
  onMouseLeave={(e) => {
    gsap.to(e.currentTarget, { 
      scale: 1, 
      duration: 0.3 
    });
  }}
>
```

---

## 🔧 Customization

### Change Colors

In `HeroScene.tsx`, modify color values:

```tsx
// Floating shapes colors
color: Math.random() > 0.5 ? '#00ffff' : '#C0C0C0'

// Morphing core colors
color={hovered ? '#ff006e' : '#00ffff'}

// Ring colors
color={i === 0 ? '#00ffff' : i === 1 ? '#C0C0C0' : '#ffffff'}
```

### Adjust Mouse Sensitivity

```tsx
// In FloatingShapes
const targetX = mouse.x * 2; // Increase multiplier for more sensitivity
const targetY = mouse.y * 2;

// In GSAP parallax
const xPos = (clientX / innerWidth - 0.5) * 20; // Increase for more movement
```

### Modify Particle Count

```tsx
// In ParticleTrail
const maxTrailLength = 50; // Increase or decrease

// In FloatingShapes
Array.from({ length: 15 }, ...) // Change number of shapes
```

### Animation Speed

```tsx
// GSAP animations
gsap.to(element, {
  duration: 0.3, // Faster: 0.1, Slower: 0.8
  ease: 'power2.out'
});

// Three.js rotation
child.rotation.x += shapes[i].rotationSpeed; // Default: 0.01-0.03
```

---

## 📊 Performance Optimization

### Current Optimizations
- ✅ Device pixel ratio clamped to [1, 2]
- ✅ Antialiasing enabled
- ✅ Transparent materials for better performance
- ✅ Efficient geometry (low poly counts)
- ✅ Proper cleanup with gsap.context()
- ✅ requestAnimationFrame via useFrame

### Further Optimization Tips

1. **Reduce Particles**: Lower `maxTrailLength` if needed
2. **Simplify Geometry**: Use fewer segments in geometries
3. **Disable Shadows**: Remove spotLight if not needed
4. **Lower Fog Distance**: Reduce render distance
5. **Mobile Detection**: Simplify scene on mobile devices

```tsx
// Example: Mobile detection
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 20 : 50;
```

---

## 🎨 Visual Effects Breakdown

### Lighting Setup
```tsx
<ambientLight intensity={0.3} />                    // Base lighting
<pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffff" />   // Cyan light
<pointLight position={[-10, -10, -10]} intensity={1} color="#ff006e" />  // Pink light
<pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />      // White fill
<spotLight position={[0, 15, 0]} angle={0.6} penumbra={1} intensity={1} /> // Top spotlight
```

### Fog for Depth
```tsx
<fog attach="fog" args={['#000000', 8, 20]} />
// Color: black, Near: 8 units, Far: 20 units
```

### Material Properties
```tsx
<meshStandardMaterial
  color="#00ffff"
  transparent
  opacity={0.6}
  metalness={0.9}      // High reflectivity
  roughness={0.1}      // Smooth surface
  wireframe            // Wireframe rendering
  emissive="#00ffff"   // Glow color
  emissiveIntensity={0.2} // Glow strength
/>
```

---

## 🚀 Usage Examples

### Basic Implementation
```tsx
import HeroScene from './components/HeroScene';

function Hero() {
  return (
    <section className="relative h-screen">
      <HeroScene onSceneReady={() => console.log('Scene loaded!')} />
      <div className="relative z-10">
        {/* Your content */}
      </div>
    </section>
  );
}
```

### With Custom Callbacks
```tsx
<HeroScene 
  onSceneReady={() => {
    // Trigger analytics event
    // Start music
    // Show loading complete
  }} 
/>
```

---

## 🎭 Animation Timeline

### Page Load Sequence
```
0.0s - Scene starts loading
0.2s - Content container fades in from left
0.3s - Image container slides from right
0.4s - Heading animates up
0.6s - Description fades in
0.8s - Buttons stagger in with bounce
1.0s - Stats scale up
       ↓
Continuous - Mouse interactions active
```

### Mouse Interactions
- **Move Mouse**: 3D scene rotates, content parallax
- **Hover Core**: Color change + scale up
- **Hover Buttons**: Smooth scale to 1.05
- **Hover Stats**: Bouncy scale to 1.1

---

## 🐛 Troubleshooting

### Issue: Scene is laggy
**Solution**: 
- Reduce particle count
- Lower device pixel ratio
- Simplify geometries
- Check browser GPU acceleration

### Issue: Mouse interaction not working
**Solution**:
- Ensure `'use client'` directive is present
- Check that Canvas is properly sized
- Verify mouse coordinates are being tracked

### Issue: GSAP animations stuttering
**Solution**:
- Use `will-change: transform` in CSS
- Avoid animating too many properties
- Use GPU-accelerated properties (transform, opacity)

### Issue: Scene appears black
**Solution**:
- Check lighting intensity
- Verify material opacity settings
- Ensure camera position is correct

---

## 📱 Responsive Considerations

### Current Behavior
- Canvas automatically scales with container
- Mouse parallax works on all screen sizes
- Touch devices get basic interaction

### Mobile Enhancements (Optional)
```tsx
// Detect touch device
const isTouchDevice = 'ontouchstart' in window;

// Simplify scene for mobile
if (isTouchDevice) {
  // Reduce particles
  // Disable complex effects
  // Use simpler geometries
}
```

---

## 🎓 Advanced Customization

### Add New 3D Objects

```tsx
function CustomObject() {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    
    // Custom animation logic
    ref.current.rotation.x += 0.01;
    ref.current.position.y = mouse.y * 5;
  });

  return (
    <mesh ref={ref}>
      <yourGeometry />
      <yourMaterial />
    </mesh>
  );
}

// Add to scene
<CustomObject />
```

### Create Custom GSAP Timelines

```tsx
useEffect(() => {
  const tl = gsap.timeline();
  
  tl.from('.element1', { x: -100, duration: 0.5 })
    .from('.element2', { y: 100 }, '-=0.3')
    .to('.element3', { rotation: 360 });
  
  return () => tl.kill();
}, []);
```

### Implement Scroll-Based 3D Changes

```tsx
import { ScrollTrigger } from 'gsap/ScrollTrigger';

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      // Rotate 3D scene based on scroll
      sceneRef.current.rotation.y = self.progress * Math.PI;
    }
  });
}, []);
```

---

## 🔗 Related Files

- **Component**: `app/components/HeroScene.tsx`
- **Usage**: `app/components/Hero.tsx`
- **Hooks**: `lib/animations.ts`
- **Demo**: `app/demo/page.tsx`

---

## 💡 Pro Tips

1. **Layer Your Effects**: Combine Three.js 3D with GSAP 2D for depth
2. **Use Easing**: Always specify easing functions for natural motion
3. **Test on Multiple Devices**: Performance varies greatly
4. **Provide Fallbacks**: Consider reduced motion preferences
5. **Monitor Frame Rate**: Use stats-gl for performance monitoring
6. **Smooth Transitions**: Use lerp for smooth value transitions
7. **Cleanup Properly**: Always kill GSAP tweens and revert contexts

---

## 🌟 Key Takeaways

✅ **Mouse Reactivity**: All elements respond to cursor movement
✅ **GSAP Integration**: Smooth, professional animations
✅ **Performance**: Optimized for smooth 60fps
✅ **Customizable**: Easy to modify colors, speeds, and behaviors
✅ **Accessible**: Respects user preferences
✅ **Responsive**: Works across all screen sizes

The Interactive Hero Scene creates a memorable first impression with cutting-edge 3D graphics and smooth animations! 🚀✨
