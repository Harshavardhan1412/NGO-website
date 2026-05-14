import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, MessageSquare, Share2, Camera, Briefcase } from 'lucide-react';
import { ngoInfo } from '../../data/mockData';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const contactDetails = [
    { icon: Phone, label: 'Call Us', value: ngoInfo.phone, href: `tel:${ngoInfo.phone}`, color: '#10B981' },
    { icon: Mail, label: 'Email Us', value: ngoInfo.email, href: `mailto:${ngoInfo.email}`, color: '#2563EB' },
    { icon: MapPin, label: 'Visit Us', value: ngoInfo.address, href: '#', color: '#F59E0B' },
  ];

  const socials = [
    { icon: Globe, href: '#', color: '#1E293B', label: 'Facebook' },
    { icon: MessageSquare, href: '#', color: '#1E293B', label: 'Twitter' },
    { icon: Camera, href: '#', color: '#1E293B', label: 'Instagram' },
    { icon: Share2, href: '#', color: '#1E293B', label: 'Youtube' },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
            We'd Love to <span className="gradient-text">Hear From You</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-5 mb-8">
              {contactDetails.map(cd => (
                <a key={cd.label} href={cd.href} className="card p-5 flex items-start gap-4 hover:no-underline group bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cd.color}18` }}>
                    <cd.icon className="w-6 h-6" style={{ color: cd.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{cd.label}</p>
                    <p className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cd.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 flex items-center justify-center border border-slate-200 dark:border-slate-700 mb-6">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">{ngoInfo.name} HQ</p>
                <p className="text-xs text-slate-400">{ngoInfo.address}</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                  className="mt-2 inline-block text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  View on Google Maps →
                </a>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socials.map(s => (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center hover:scale-110 transition-all hover:shadow-lg"
                    style={{ '--hover-color': s.color }}
                  >
                    <s.icon className="w-4 h-4" style={{ color: s.color }} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Message Sent! ✅</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary">Send Another</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name *" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" />
                    <input type="email" placeholder="Email Address *" required value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" />
                  </div>
                  <input type="text" placeholder="Subject" value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field" />
                  <textarea placeholder="Your message..." rows={5} required value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="input-field resize-none" />
                  <button type="submit" className="btn-primary w-full justify-center py-3.5">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
