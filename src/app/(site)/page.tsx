import Hero from '@/components/Hero';
import LiveRatesDesk from '@/components/LiveRatesDesk';
import TrustBar from '@/components/TrustBar';
import CoreServices from '@/components/CoreServices';
import CustomerJourney from '@/components/CustomerJourney';
import PledgedGoldSection from '@/components/PledgedGoldSection';
import LiveGoldCalculator from '@/components/LiveGoldCalculator';
import DoorstepService from '@/components/DoorstepService';
import InstagramShowcase from '@/components/InstagramShowcase';
import ContactLocation from '@/components/ContactLocation';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LiveRatesDesk />
      <TrustBar />
      <CoreServices />
      <CustomerJourney />
      <PledgedGoldSection />
      <LiveGoldCalculator />
      <DoorstepService />
      <InstagramShowcase />
      <ContactLocation />
      <FAQ />
      <FinalCTA />
    </>
  );
}
