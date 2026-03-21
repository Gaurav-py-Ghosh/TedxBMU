import Hero from "./Hero";
import EventDetails from "./EventDetails";
import SpeakerSection from "./SpeakerSection";
import Testimonials from "./Testimonials";
import Gallery from "./Gallery";
import Sponsor from "./Sponsor";
import Theme from "./Theme";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventDetails />
      <Theme />
      {/* <SpeakerSection /> */}
      {/* <Testimonials /> */}
      <Gallery />
      <Sponsor />
    </>
  );
}