import { useEffect, useRef, useState } from 'react';
import { donationTiers } from '../../data/mockData';
import { Heart, Shield, Star, Leaf, Lock, CheckCircle } from 'lucide-react';

const iconMap = { Heart, Shield, Star, Leaf };

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function DonationSection() {
  const [ref, inView] = useInView();
  const [selected, setSelected] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  return (
    <section id="donate" className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 rounded-full text-sm font-semibold mb-4">
            Make a Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
            Your Donation <span className="gradient-text">Changes Lives</span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Every rupee you donate goes directly to our programs. We maintain 93% program efficiency with complete transparency.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {donationTiers.map((tier, i) => {
            const Icon = iconMap[tier.icon] || Heart;
            const isSelected = selected === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelected(tier.id)}
                className={`relative card p-6 cursor-pointer transition-all duration-300 ${
                  tier.featured ? 'ring-2 ring-blue-500 shadow-2xl scale-105' : ''
                } ${isSelected ? 'ring-2 ring-emerald-500 shadow-2xl' : ''}`}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? (tier.featured ? 'scale(1.05)' : 'translateY(0)') : 'translateY(30px)',
                  transition: `all 0.6s ease ${i * 0.15}s`,
                }}
                onClick={() => window.location.href = '/donate'}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${tier.color}18` }}>
                    <Icon className="w-6 h-6" style={{ color: tier.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{tier.title}</h3>
                    <p className="text-2xl font-black" style={{ color: tier.color }}>
                      ₹{tier.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{tier.description}</p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>₹{(tier.raised / 1000).toFixed(0)}K raised</span>
                    <span>{tier.progress}% of goal</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: inView ? `${tier.progress}%` : '0%',
                        background: `linear-gradient(90deg, ${tier.color}, ${tier.color}cc)`,
                      }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-400">Goal: ₹{(tier.goal / 1000).toFixed(0)}K</p>
              </div>
            );
          })}
        </div>

        {/* Custom donation box */}
        <div className="max-w-2xl mx-auto">
          <div className="card p-6 md:p-8">
            <h3 className="font-bold text-slate-800 dark:text-white text-xl mb-4 text-center">Or Enter a Custom Amount</h3>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              {[500, 1000, 2000, 5000, 10000, 25000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setCustomAmount(amt.toString())}
                  className={`py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    customAmount === amt.toString()
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  ₹{amt >= 1000 ? `${amt / 1000}K` : amt}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">₹</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={e => setCustomAmount(e.target.value)}
                  className="input-field pl-8"
                />
              </div>
              <button onClick={() => window.location.href = '/donate'} className="btn-accent px-6 whitespace-nowrap">
                <Lock className="w-4 h-4" />
                Donate Now
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> 80G Tax Benefit</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> SSL Secured</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> FCRA Registered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
