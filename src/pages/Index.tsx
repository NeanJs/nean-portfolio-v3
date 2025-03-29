
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Startups from '@/components/Startups';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Projects />
      <div className="section-divider max-w-5xl mx-auto" />
      <Startups />
      <div className="section-divider max-w-5xl mx-auto" />
      <About />
      <div className="section-divider max-w-5xl mx-auto" />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
