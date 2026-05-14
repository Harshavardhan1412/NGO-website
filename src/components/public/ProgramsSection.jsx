import { programs } from '../../data/mockData';
import { BookOpen, Stethoscope, Droplets, Home, ArrowRight } from 'lucide-react';

const iconMap = {
  BookOpen,
  Stethoscope,
  Droplets,
  Home,
};

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Our Programs</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive initiatives designed to address the root causes of poverty and inequality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((prog) => {
            const Icon = iconMap[prog.icon] || Home;
            return (
              <div key={prog.id} className="card group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-10">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{prog.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {prog.description}
                      </p>
                      <button className="flex items-center gap-2 text-slate-900 font-bold hover:gap-3 transition-all">
                        Learn more <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

