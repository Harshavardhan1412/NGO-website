import { Quote, Award, Heart, BookOpen } from 'lucide-react';

export default function FounderSection() {
  return (
    <section id="founder" className="py-24 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Founder Image Column */}
          <div className="w-full lg:w-5/12">
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 aspect-[4/5]">
                <img
                  src="/gallery/founder.jpeg"
                  alt="Founder of PCDS"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white">Shri. Perumalla Gowri Sireesha</h3>
                  <p className="text-blue-300 font-bold uppercase tracking-wider text-xs">Founder & President</p>
                </div>
              </div>

              {/* Decorative behind elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600 rounded-2xl -z-10 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 border-4 border-slate-200 dark:border-slate-700 rounded-3xl -z-10" />

              {/* Experience Badge */}
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl z-20 hidden md:block">
                <div className="text-center">
                  <span className="block text-3xl font-black text-blue-600">7+</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Years Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Story Column */}
          <div className="w-full lg:w-7/12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> Meet Our Visionary
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
              A Life Dedicated to <br />
              <span className="gradient-text">Humanity & Service</span>
            </h2>

            <div className="space-y-6 text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-10">
              <p>
                Prajwalaa Community Development Society (PCDS) was born out of a single vision: to ensure that no individual in our community suffers from neglect or lack of basic necessities.
              </p>
              <p className="font-medium italic border-l-4 border-blue-500 pl-6 my-8">
                "Our mission isn't just about providing food or shelter; it's about restoring dignity to every soul we touch and building a foundation where every human can thrive."
              </p>
              <p>
                Under his leadership, PCDS has grown from a small local initiative in Guntur to a robust community pillar, supporting hundreds of elderly residents, providing child education, and facilitating critical healthcare drives.
              </p>
            </div>

            {/* Founder Values */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Award Winning</h4>
                  <p className="text-sm">Recognized for excellence in social work and community development.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Expert Guidance</h4>
                  <p className="text-sm">Leading with years of experience in NGO management and social welfare.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
