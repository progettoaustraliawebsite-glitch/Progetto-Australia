import HeroSlider from '@/components/home/HeroSlider';
import AboutStrip from '@/components/home/AboutStrip';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import TravelTypes from '@/components/home/TravelTypes';
import FeaturedItineraries from '@/components/home/FeaturedItineraries';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutStrip />
      <DestinationsGrid />
      <TravelTypes />
      <FeaturedItineraries />
    </>
  );
}
