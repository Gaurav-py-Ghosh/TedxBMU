import Hero from "./Hero";
import EventDetails from "./EventDetails";
import SpeakerSection from "./SpeakerSection";
import Testimonials from "./Testimonials";
import Gallery from "./Gallery";
import Sponsor from "./Sponsor";
import Theme from "./Theme";
import AttendeesSay from "./AttendeesSay";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EventDetails />
      <Theme />
      {/* <AttendeesSay /> */}
      <SpeakerSection />
      <Testimonials />
      <Gallery />
      <Sponsor />
    </>
  );
}