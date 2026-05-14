import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  "/gallery/ngo_3.jpeg",
  "/gallery/ngo_1.jpeg",
  "/gallery/ngo_5.jpeg",
  "/gallery/ngo_4.jpeg",
  "/gallery/ngo_2.jpeg",
  "/gallery/ngo_6.jpeg"
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroImages.length) % heroImages.length);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Slideshow Background */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all pointer-events-auto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease',
        }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tighter drop-shadow-2xl">
          Empowering Communities,<br />
          Transforming Lives
        </h1>

        <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-lg">
          Join Prajwalaa Community Development Society in our mission to create sustainable change and build a brighter future.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/donate"
            className="btn-dark text-lg px-10 py-5 bg-white text-slate-900 hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
          >
            Get Involved &rarr;
          </Link>
          <button
            onClick={() => scrollTo('#about')}
            className="px-10 py-5 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-slate-900 transition-all"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/80 transition-all animate-bounce z-20"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
