import { impactStats } from '../../data/mockData';

export default function ImpactStats() {
  return (
    <section id="impact" className="py-24 impact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Our Impact</h2>
        <p className="text-xl text-slate-300 mb-20 max-w-2xl mx-auto">
          Making a real difference through action and dedication
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {impactStats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold text-white mb-3">
                {stat.value.toLocaleString()}{stat.suffix}
              </span>
              <p className="text-lg text-slate-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
