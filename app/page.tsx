import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LocationSwitcher from "@/components/LocationSwitcher";
import PrayerRequestWizard from "@/components/PrayerRequestWizard";
import ScheduleCards from "@/components/ScheduleCards";
import MemoryBookSection from "@/components/MemoryBookSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LocationSwitcher />
        <ScheduleCards />
        <PrayerRequestWizard />
        <MemoryBookSection />
      </main>
      <Footer />
    </>
  );
}
