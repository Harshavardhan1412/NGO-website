import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Globe, MessageSquare, Camera, Share2, Briefcase, Send, ArrowRight } from 'lucide-react';
import { ngoInfo } from '../../data/mockData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Programs', href: '#programs' },
    { label: 'Our Impact', href: '#impact' },
    { label: 'Donate Now', href: '#donate' },
    { label: 'Contact', href: '#contact' },
  ];

  const programsList = ['Education for All', 'Healthcare Access', 'Clean Water Initiative', 'Housing & Shelter'];
  const socials = [
    { icon: Globe, href: '#', label: 'Facebook' },
    { icon: MessageSquare, href: '#', label: 'Twitter' },
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Share2, href: '#', label: 'YouTube' },
  ];

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white">
      {/* Newsletter band */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl font-bold mb-1">Stay Updated with Our Work</h3>
              <p className="text-white/70 text-sm">Join 12,000+ subscribers. Get monthly impact reports, stories, and event updates.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <span className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center">✓</span>
                You're subscribed! Thank you.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubscribed(true); }} className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-72">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="email" required placeholder="Enter your email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/50 text-sm"
                  />
                </div>
                <button type="submit" className="btn-accent px-5 py-3 whitespace-nowrap">
                  <Send className="w-4 h-4" /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-white flex-shrink-0">
                <img src="/src/assets/logo.png" alt="PCDS Logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="font-bold text-2xl tracking-tighter text-white">
                {ngoInfo.name.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Empowering communities and transforming lives through education, healthcare, and sustainable development since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => (
                link.label === 'Donate Now' ? (
                  <Link key={link.label} to="/donate"
                    className="text-left text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group py-0.5">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                    {link.label}
                  </Link>
                ) : (
                  <button key={link.label} onClick={() => scrollTo(link.href)}
                    className="text-left text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-1 group py-0.5">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-3 group-hover:ml-0" />
                    {link.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Our Programs</h4>
            <div className="space-y-3">
              {programsList.map(p => (
                <p key={p} className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Contact</h4>
            <div className="space-y-4">
              <a href={`tel:${ngoInfo.phone}`} className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                {ngoInfo.phone}
              </a>
              <a href={`mailto:${ngoInfo.email}`} className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                {ngoInfo.email}
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                <span>{ngoInfo.address}</span>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400">Registered under Societies Registration Act • FCRA Approved • 80G & 12A Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} {ngoInfo.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Annual Report'].map(link => (
              <a key={link} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
