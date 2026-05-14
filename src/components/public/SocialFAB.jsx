import { useState } from 'react';
import { Globe, Camera, Share2, X } from 'lucide-react';

export default function SocialFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: 'bg-[#25D366]',
      href: 'https://wa.me/919876543210',
      label: 'Chat with us'
    },
    {
      name: 'Facebook',
      icon: <Globe className="w-6 h-6" />,
      color: 'bg-[#1877F2]',
      href: 'https://www.facebook.com/pcdsguntur/',
      label: 'Follow us on Facebook'
    },
    {
      name: 'Instagram',
      icon: <Camera className="w-6 h-6" />,
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      href: 'https://www.instagram.com/pcds2026?igsh=MWZ3bG1rZ29tMXVsOQ==',
      label: 'Follow us on Instagram'
    }
  ];

  return (
    <div
      className="fixed bottom-6 right-6 z-[60] flex flex-col items-center gap-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Sub Buttons */}
      <div className={`flex flex-col items-center gap-3 transition-all duration-500 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10'}`}>
        {socials.map((social, index) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-300 relative group/item ${social.color}`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {social.icon}
            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl">
              {social.label}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
            </span>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-500 animate-float ${isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-blue-600'}`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Share2 className="w-8 h-8" />}

        {/* Main Badge/Notification pulse when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20 pointer-events-none" />
        )}
      </button>
    </div>
  );
}
