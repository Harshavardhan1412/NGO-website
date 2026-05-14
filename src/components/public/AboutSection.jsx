import { Heart, Users, Target } from 'lucide-react';

export default function AboutSection() {
  const missions = [
    {
      title: "Compassion",
      description: "We believe in treating every individual with dignity, respect, and love.",
      icon: Heart,
    },
    {
      title: "Community",
      description: "Building strong, resilient communities through collaboration and empowerment.",
      icon: Users,
    },
    {
      title: "Impact",
      description: "Creating measurable, sustainable change that transforms lives for generations.",
      icon: Target,
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We are committed to breaking the cycle of poverty and creating opportunities for 
            vulnerable communities through education, healthcare, and sustainable development programs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((m, i) => (
            <div key={i} className="card p-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
                <m.icon className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{m.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

