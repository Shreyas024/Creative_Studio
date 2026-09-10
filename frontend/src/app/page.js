import HeroSection from '@/components/home/HeroSection';
import SacredCollections from '@/components/home/SacredCollections';
import ArtisanShowcase from '@/components/home/ArtisanShowcase';
import PhilosophySection from '@/components/home/PhilosophySection';
import FestiveGifting from '@/components/home/FestiveGifting';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SacredCollections />
      <ArtisanShowcase />
      <PhilosophySection />
      <FestiveGifting />
    </>
  );
}
