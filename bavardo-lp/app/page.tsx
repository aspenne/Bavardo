import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Values from "@/components/Values";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Values />
        <Partners />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
