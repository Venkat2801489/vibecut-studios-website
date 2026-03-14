import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HowWeWork from '@/components/HowWeWork';
import ReelsPortfolio from '@/components/ReelsPortfolio';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <Hero />
      <Stats />
      <HowWeWork />
      <ReelsPortfolio />
      <WhyUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
