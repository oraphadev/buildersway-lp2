import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./components/Hero";
import { ConceptMarquee } from "./components/ConceptMarquee";
import { PainNarrative } from "./components/PainNarrative";
import { Process } from "./components/Process";
import { Problems } from "./components/Problems";
import { Statement } from "./components/Statement";
import { Principles } from "./components/Principles";
import { FAQ } from "./components/FAQ";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ConceptMarquee />
        <PainNarrative />
        <Process />
        <Problems />
        <Statement />
        <Principles />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
