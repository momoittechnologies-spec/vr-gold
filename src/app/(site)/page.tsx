import Hero from '@/components/Hero';
import LiveGoldCalculator from '@/components/LiveGoldCalculator';
import DoorstepService from '@/components/DoorstepService';
import WhyChooseUs from '@/components/WhyChooseUs';
import InstagramShowcase from '@/components/InstagramShowcase';
import ContactLocation from '@/components/ContactLocation';
import FAQ from '@/components/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveGoldCalculator />
      <DoorstepService />
      <WhyChooseUs />
      <InstagramShowcase />
      <ContactLocation />
      <FAQ />
    </>
  );
}
