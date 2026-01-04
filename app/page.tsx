import Hero from "./components/Hero";
import Header from "./components/Header";
import WhatWeDo from "./components/WhatWeDo";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
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
      <Footer />
    </main>
  );
}
