import AboutSection from "../Landing page sections/AboutSection";
import GallerySection from "../Landing page sections/GallerySection";
import HeroSection from "../Landing page sections/HeroSection";

const Landing = () => {
  return (
    <div style={{ backgroundColor: "#F7ECE1" }}>
      <HeroSection />
      <AboutSection />
      <GallerySection />
    </div>
  );
};

export default Landing;
