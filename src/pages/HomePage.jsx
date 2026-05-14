import Navbar from '../components/public/Navbar';
import HeroSection from '../components/public/HeroSection';
import AboutSection from '../components/public/AboutSection';
import FounderSection from '../components/public/FounderSection';
import ProgramsSection from '../components/public/ProgramsSection';
import DonationSection from '../components/public/DonationSection';
import VolunteerSection from '../components/public/VolunteerSection';
import TestimonialsSection from '../components/public/TestimonialsSection';
import GallerySection from '../components/public/GallerySection';
import EventsSection from '../components/public/EventsSection';
import ContactSection from '../components/public/ContactSection';
import ImpactStats from '../components/public/ImpactStats';
import Footer from '../components/public/Footer';
import SocialFAB from '../components/public/SocialFAB';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FounderSection />
      <ProgramsSection />
      <ImpactStats />
      <DonationSection />
      <VolunteerSection />
      <TestimonialsSection />
      <GallerySection />
      <EventsSection />
      <ContactSection />
      <Footer />
      <SocialFAB />
    </div>
  );
}
