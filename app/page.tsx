import Header from "./components/Header";
import Footer from "./components/Footer";
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
    <>
      <Header />
      <main className="bg-black">
        <Hero />
        <WhatWeDo />
        <Services />
        <WhyChooseUs />
        <About />
        <FAQ />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
