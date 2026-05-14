import { useState } from 'react';
import { testimonials } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 60%, #065F46 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-sm font-semibold mb-4">
            Stories of Hope
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Voices That <span style={{ background: 'linear-gradient(135deg, #34D399, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Inspire</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main card */}
          <div className="glass rounded-3xl p-8 md:p-12 text-white relative mb-8">
            <Quote className="absolute top-6 left-8 w-10 h-10 text-white/20" />
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${testimonials[active].color}, ${testimonials[active].color}aa)` }}
              >
                {testimonials[active].avatar}
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 italic">
                "{testimonials[active].text}"
              </p>
              <div>
                <p className="font-bold text-white text-lg">{testimonials[active].name}</p>
                <p className="text-white/60 text-sm">{testimonials[active].role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={prev} className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`rounded-full transition-all ${i === active ? 'w-8 h-2.5 bg-emerald-400' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={t.id} onClick={() => setActive(i)} className="glass rounded-2xl p-4 cursor-pointer hover:bg-white/15 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed line-clamp-2">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
