import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ngoInfo } from '../../data/mockData';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Impact', href: '#impact' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    
    // If not on home page, navigate to home page first
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      // Small delay to allow the home page to render before scrolling
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    // Already on home page, just scroll
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg border-b border-slate-200 dark:border-slate-700'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-white flex-shrink-0">
              <img src="/src/assets/logo.png" alt="PCDS Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white block">
                {ngoInfo.name.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${scrolled || dark ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/admin"
              className={`hidden md:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${scrolled || dark
                ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400'
                : 'border-white/60 text-white hover:bg-white/10'
                }`}
            >
              Admin Portal
            </Link>

            <Link
              to="/donate"
              className="btn-dark text-sm"
            >
              Donate Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-lg transition-all ${scrolled || dark ? 'text-slate-600 dark:text-slate-300' : 'text-white'}`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                {link.label}
              </button>
            ))}
            <Link to="/admin" className="mt-2 text-center px-4 py-3 rounded-lg border border-blue-600 text-blue-600 text-sm font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
