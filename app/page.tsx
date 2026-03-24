import Hero from "./components/Hero";
import WhatWeDo from "./components/WhatWeDo";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main className="bg-black">
      {/* <div className=" border-b border-white/10"> */}
      <Hero />
      {/* </div> */}
      <WhatWeDo />
      <Services />
      <WhyChooseUs />
      <About />
      <FAQ />
      <Testimonials />
      <CTA />
    </main>
  );
}
