import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, CheckCircle } from 'lucide-react';

export default function VolunteerSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', area: '', message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const areas = ['Healthcare', 'Food Distribution', 'Elderly Care', 'Education', 'Logistics', 'Events & Communications', 'Counselling', 'Fundraising'];

  return (
    <section id="volunteer" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Info */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              Join Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6">
              Become a <span className="gradient-text">Volunteer</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              Be the change you wish to see. Join our community of 2,800+ passionate volunteers making a real difference in people's lives every single day.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: '🎓', title: 'Training & Certification', desc: 'Free professional development workshops and NGO certification' },
                { icon: '🤝', title: 'Community Network', desc: 'Connect with like-minded changemakers across India' },
                { icon: '📊', title: 'Track Your Impact', desc: 'See exactly how your time creates measurable change' },
                { icon: '🏆', title: 'Recognition & Awards', desc: 'Annual volunteer appreciation with certificates and awards' },
              ].map(benefit => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <span className="text-2xl">{benefit.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">{benefit.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="card p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Welcome to the Family! 🎉</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Thank you for registering. Our volunteer coordinator will contact you within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', city: '', area: '', message: '' }); }} className="btn-primary">
                  Register Another
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Volunteer Registration</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Full Name *"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="input-field pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="input-field pl-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="City *"
                        required
                        value={form.city}
                        onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                        className="input-field pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        required
                        value={form.area}
                        onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                        className="input-field pl-10 appearance-none"
                      >
                        <option value="">Area of Interest *</option>
                        {areas.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                  </div>

                  <textarea
                    placeholder="Tell us about yourself and your motivation to volunteer..."
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="input-field resize-none"
                  />

                  <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                    Submit Registration
                  </button>

                  <p className="text-xs text-center text-slate-400">
                    By registering, you agree to our volunteer code of conduct. We'll never spam your inbox.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
