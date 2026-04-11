# Custom Cursor Documentation

## 🎯 Overview

A stylish, technical custom cursor featuring a "B" logo that follows the mouse across the entire Barrwit website. The cursor includes smooth animations, hover effects, and click feedback using GSAP.

---

## ✨ Features

### 1. **Technical B Logo**
- Custom SVG "B" letter with technical grid lines
- Corner accents for futuristic look
- Centered in a glassmorphic circle
- White color with mix-blend-difference for visibility

### 2. **Smooth Animations (GSAP)**
- **Instant Follow**: Main cursor follows mouse immediately
- **Trail Effect**: Delayed trail creates motion blur effect
- **Hover Scale**: Expands on interactive elements
- **Click Scale**: Shrinks on mouse down
- **Easing**: Smooth power2.out transitions

### 3. **Interactive States**

#### Default State
- Circular cursor with B logo
- Outer ring border
- Rotating dashed ring (static)
- Cyan trail behind

#### Hover State (over buttons/links)
- Cursor scales to 1.5x
- Trail scales to 2x
- Outer ring scales to 1.25x
- Dashed ring starts spinning
- Trail opacity increases

#### Click State
- Cursor shrinks to 0.8x
- Trail shrinks to 0.8x
- Inner circle becomes brighter
- Ping ripple effect appears
- Trail opacity increases

### 4. **Visual Elements**

#### Main Cursor (12-16 layers)
1. **Outer Ring**: White border, scales on interaction
2. **Inner Circle**: Glassmorphic background with B logo
3. **B SVG**: Technical design with grid lines
4. **Rotating Ring**: Dashed circle, spins on hover

#### Trail Effect
- Larger circle behind cursor
- Cyan color with 10% opacity
- Blur effect (backdrop-blur-md)
- Delayed movement (0.3s)

#### Click Ripple
- Ping animation on click
- White color, 30% opacity
- Expands and fades out

---

## 🎨 Design Specifications

### Colors
- **Cursor**: White (#ffffff)
- **Trail**: Cyan (#00ffff) with 10% opacity
- **B Logo**: White
- **Grid Lines**: White with 30-50% opacity

### Sizes
- **Desktop**: 64px (4rem) cursor, 64px trail
- **Mobile**: 48px (3rem) cursor, 48px trail
- **B SVG**: 24x24px

### Animations
- **Follow Speed**: 0.1s (instant)
- **Trail Speed**: 0.3s (delayed)
- **Hover Duration**: 0.3s
- **Click Duration**: 0.3s
- **Easing**: power2.out

### Z-Index
- **Main Cursor**: 99999
- **Trail**: 99998
- **Click Ripple**: 99997

---

## 🔧 How It Works

### Mouse Tracking
```tsx
window.addEventListener('mousemove', (e) => {
  setPosition({ x: e.clientX, y: e.clientY });
});
```

### GSAP Animation
```tsx
gsap.to(cursorRef.current, {
  x: position.x,
  y: position.y,
  duration: 0.1,
  ease: 'power2.out',
});
```

### Hover Detection
```tsx
const isInteractive = 
  target.tagName === 'BUTTON' ||
  target.tagName === 'A' ||
  target.closest('button') ||
  target.closest('a');
```

### Touch Device Detection
```tsx
const mediaQuery = window.matchMedia('(hover: hover)');
if (!mediaQuery.matches) return; // Hide on touch
```

---

## 📂 File Structure

```
app/
├── components/
│   └── CustomCursor.tsx          # Cursor component
└── layout.tsx                     # Integrated here (global)
```

---

## 🎯 Usage

### Automatic (Already Implemented)
The cursor is automatically added to the root layout and appears on all pages:

```tsx
// app/layout.tsx
import CustomCursor from "./components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          <CustomCursor />  {/* ← Added here */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Manual Usage (if needed)
```tsx
import CustomCursor from '@/app/components/CustomCursor';

function Page() {
  return (
    <>
      <CustomCursor />
      {/* Your content */}
    </>
  );
}
```

---

## 🎨 Customization

### Change B Logo Color
Edit the SVG in `CustomCursor.tsx`:
```tsx
<svg className="text-cyan-400">  // Change from text-white
```

### Adjust Cursor Size
```tsx
// Change dimensions
w-12 h-12 md:w-16 md:h-16  // to your preferred sizes
```

### Modify Trail Color
```tsx
<div className="bg-purple-400/10 backdrop-blur-md" />  // Change from cyan
```

### Adjust Animation Speed
```tsx
gsap.to(cursorRef.current, {
  duration: 0.05,  // Faster (was 0.1)
  // or
  duration: 0.2,   // Slower
});
```

### Change Hover Scale
```tsx
gsap.to(cursorRef.current, {
  scale: isHovering ? 2 : 1,  // Larger scale (was 1.5)
});
```

### Modify Rotating Ring Speed
Add CSS animation:
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 2s linear infinite;  // Adjust duration
}
```

---

## 🎭 Interactive Elements

The cursor automatically detects and responds to:
- ✅ `<button>` elements
- ✅ `<a>` links
- ✅ `<input>` fields
- ✅ `<select>` dropdowns
- ✅ `<textarea>` elements
- ✅ Elements with `data-cursor-hover` attribute

### Custom Hover Trigger
Add the data attribute to any element:
```tsx
<div data-cursor-hover>
  Custom interactive element
</div>
```

---

## 📱 Responsive Behavior

### Desktop (hover: hover)
- ✅ Full cursor with all effects
- ✅ Smooth animations
- ✅ Hover states active
- ✅ Click effects

### Mobile/Tablet (no hover)
- ❌ Cursor hidden (native touch)
- ❌ No animations
- ❌ Better UX for touch devices

---

## ⚡ Performance

### Optimizations
✅ GSAP animations (GPU-accelerated)
✅ Transform-only animations (no layout thrashing)
✅ Conditional rendering (hidden on mobile)
✅ Proper cleanup on unmount
✅ Context-based animations (gsap.context)
✅ Event listener cleanup

### Performance Impact
- **Minimal**: Uses transform and opacity only
- **Efficient**: GSAP optimized animations
- **Smart**: Disabled on touch devices
- **Clean**: Proper disposal

---

## 🐛 Troubleshooting

### Issue: Cursor not showing
**Solution**: Check that you're on a desktop device (not mobile/tablet)

### Issue: Cursor lagging
**Solution**: 
- Reduce GSAP duration for faster response
- Check for other heavy animations
- Verify GPU acceleration is enabled

### Issue: Hover not working
**Solution**: 
- Ensure elements are actual button/link tags
- Or add `data-cursor-hover` attribute
- Check z-index conflicts

### Issue: Multiple cursors
**Solution**: 
- Verify CustomCursor is only in root layout
- Check for duplicate imports

### Issue: Cursor visible on mobile
**Solution**: 
- The `(hover: hover)` media query should hide it
- Check browser dev tools for media query support

---

## 🎓 Advanced Customization

### Add Custom Sound on Click
```tsx
const clickSound = new Audio('/click.mp3');

useEffect(() => {
  if (isClicking) {
    clickSound.play();
  }
}, [isClicking]);
```

### Add Trail Particles
```tsx
// Create particles on mouse move
const [particles, setParticles] = useState([]);

useEffect(() => {
  setParticles(prev => [...prev, { x, y, id: Date.now() }]);
  // Clean up old particles
}, [position]);
```

### Change Cursor per Page
```tsx
// Pass variant prop
<CustomCursor variant="minimal" />
<CustomCursor variant="gaming" />
<CustomCursor variant="elegant" />
```

### Add Magnetic Effect (attract to buttons)
```tsx
useEffect(() => {
  if (isHovering && buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    gsap.to(cursorRef.current, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
}, [isHovering]);
```

---

## 🌟 Features Breakdown

### Technical B Design
```svg
<!-- Main B shape with clean lines -->
<path d="M7 4H13C15.2091 4 17 5.79086 17 8..." />

<!-- Horizontal grid line -->
<line x1="7" y1="11.5" x2="17" y2="11.5" />

<!-- Vertical center line -->
<line x1="11" y1="4" x2="11" y2="19.5" />

<!-- Corner accent dots -->
<circle cx="7" cy="4" r="0.5" />
```

### Mix Blend Difference
```css
mix-blend-difference
```
This ensures the cursor is always visible by inverting colors based on what's underneath.

### Glassmorphism Effect
```tsx
bg-white/10 backdrop-blur-sm
```
Creates a frosted glass appearance for modern aesthetics.

---

## 📊 Browser Support

✅ Chrome/Edge (full support)
✅ Firefox (full support)
✅ Safari (full support)
✅ Opera (full support)
⚠️ IE11 (not supported - gracefully hidden)

---

## 🎬 Animation Timeline

### Page Load
```
0.0s - Cursor appears at (0, 0)
0.1s - Cursor follows mouse
0.3s - Trail starts following
```

### Hover Interaction
```
0.0s - Mouse enters interactive element
0.05s - isHovering = true
0.3s - Cursor scaled to 1.5x
0.3s - Trail scaled to 2x
0.3s - Ring starts spinning
```

### Click Interaction
```
0.0s - Mouse down
0.05s - isClicking = true
0.3s - Cursor shrinks to 0.8x
0.0s - Ping animation starts
0.5s - Ping completes and fades
```

---

## 💡 Pro Tips

1. **Use mix-blend-difference**: Ensures visibility on all backgrounds
2. **Keep it smooth**: Use GSAP for buttery animations
3. **Respect preferences**: Hide on mobile/touch devices
4. **Add value**: Make it functional, not just decorative
5. **Test everywhere**: Check on different backgrounds and elements
6. **Performance first**: Use transform and opacity only
7. **Clean code**: Proper cleanup prevents memory leaks

---

## 🔗 Related Files

- **Component**: `app/components/CustomCursor.tsx`
- **Layout**: `app/layout.tsx` (where it's integrated)
- **Hero Scene**: `app/components/HeroScene.tsx` (also has mouse interaction)

---

## 🎉 Summary

The custom cursor provides:
- ✅ **Branding**: Technical "B" logo always visible
- ✅ **Interactivity**: Responds to user actions
- ✅ **Polish**: Smooth GSAP animations
- ✅ **Professional**: Modern glassmorphic design
- ✅ **Performance**: Optimized and efficient
- ✅ **Accessibility**: Respects device capabilities
- ✅ **Global**: Appears on all pages automatically

The cursor creates a cohesive, branded experience throughout the entire website! 🚀✨
