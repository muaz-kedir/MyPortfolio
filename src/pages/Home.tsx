import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { WhyMe } from "@/components/WhyMe";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <WhyMe />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
