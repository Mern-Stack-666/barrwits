import Header from "../components/Header";
import Footer from "../components/Footer";
import InteractiveScene from "../components/InteractiveScene";
import GSAPShowcase from "../components/GSAPShowcase";

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="bg-black">
        {/* Hero Section with Interactive 3D Scene */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <InteractiveScene enableOrbitControls={true} />
          
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Three.js + GSAP
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interactive 3D graphics meets smooth animations. Move your mouse to interact with the scene!
            </p>
          </div>
        </section>

        {/* GSAP Showcase Section */}
        <GSAPShowcase />

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
              What's Integrated
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Three.js Features */}
              <div className="p-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-900/10 to-transparent">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">🎨 Three.js Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Interactive 3D scenes with React Three Fiber</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Mouse-responsive particle systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Animated geometric shapes and materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Dynamic lighting and shadows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">✓</span>
                    <span>Orbit controls for camera navigation</span>
                  </li>
                </ul>
              </div>

              {/* GSAP Features */}
              <div className="p-8 rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-900/10 to-transparent">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">✨ GSAP Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>Smooth entrance animations with stagger effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>Scroll-triggered animations with ScrollTrigger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>Parallax scrolling effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>Custom easing functions for natural motion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">✓</span>
                    <span>Reusable animation hooks for React</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Example Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              How to Use
            </h2>
            
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Using Custom Hooks</h3>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { useGSAPAnimation } from '@/lib/animations';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  useGSAPAnimation(ref, {
    from: { opacity: 0, y: 50 },
    duration: 1,
    scrollTrigger: true
  });
  
  return <div ref={ref}>Animated Content</div>;
}`}
                </pre>
              </div>

              <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/10">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Using Three.js Components</h3>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`import InteractiveScene from '@/app/components/InteractiveScene';

function Page() {
  return (
    <InteractiveScene enableOrbitControls={true} />
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
