import { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/gallery/ngo_1.jpeg', title: 'Our Office Entrance', category: 'Infrastructure' },
  { id: 2, src: '/gallery/ngo_2.jpeg', title: 'PCDS Information Banner', category: 'Awareness' },
  { id: 3, src: '/gallery/ngo_3.jpeg', title: 'Full Building View', category: 'Infrastructure' },
  { id: 4, src: '/gallery/ngo_4.jpeg', title: 'Inspiration Wall', category: 'Interior' },
  { id: 5, src: '/gallery/ngo_5.jpeg', title: 'Community Interaction', category: 'Social' },
  { id: 6, src: '/gallery/ngo_6.jpeg', title: 'Daily Operations', category: 'General' },
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const [showFull, setShowFull] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAuto]);

  const next = () => { setCurrent(prev => (prev + 1) % galleryImages.length); setIsAuto(false); };
  const prev = () => { setCurrent(prev => (prev - 1 + galleryImages.length) % galleryImages.length); setIsAuto(false); };

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            Visual Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Moments of <span className="gradient-text">Impact</span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Take a look at our facilities and the work we do on the ground every day at PCDS.
          </p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          {/* Main Slide Container */}
          <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100 dark:bg-slate-800">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setSelectedImg(img)}
                className={`absolute inset-0 cursor-zoom-in transition-all duration-1000 ease-out ${index === current ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-full scale-110'
                  }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                  <span className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4" /> {img.category}
                  </span>
                  <h3 className="text-white text-2xl md:text-4xl font-black mb-2">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/40 transition-all shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={next}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/40 transition-all shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrent(index); setIsAuto(false); }}
                className={`h-2 rounded-full transition-all duration-300 ${index === current ? 'w-10 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => setShowFull(true)}
            className="btn-primary group"
          >
            View Full Gallery
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Full Gallery Lightbox Modal */}
      {showFull && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm overflow-y-auto pt-20 pb-10 px-4 animate-in fade-in duration-300">
          <button 
            onClick={() => setShowFull(false)}
            className="fixed top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-[110]"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-2">PCDS Full Gallery</h2>
              <p className="text-slate-400">All moments from our mission</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img) => (
                <div 
                  key={img.id} 
                  onClick={() => setSelectedImg(img)}
                  className="group relative rounded-2xl overflow-hidden aspect-video shadow-lg cursor-zoom-in"
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-blue-400 text-xs font-bold uppercase mb-1">{img.category}</span>
                    <h4 className="text-white font-bold">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Image Zoom Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 md:p-12 animate-in zoom-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImg.src} 
              alt={selectedImg.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl shadow-blue-500/10" 
            />
            <div className="text-center">
              <h3 className="text-2xl font-black text-white mb-1">{selectedImg.title}</h3>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">{selectedImg.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
