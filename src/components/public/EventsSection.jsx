import { events } from '../../data/mockData';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function EventsSection() {
  const formatDate = (d) => {
    const date = new Date(d);
    return { day: date.getDate(), month: date.toLocaleString('default', { month: 'short' }), year: date.getFullYear() };
  };

  return (
    <section id="events" className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
            Mark Your Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
            Upcoming <span className="gradient-text">Events</span> & Campaigns
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => {
            const { day, month, year } = formatDate(event.date);
            return (
              <div
                key={event.id}
                className="card p-6 flex gap-5 group hover:border-blue-200 dark:hover:border-blue-700"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Date block */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${event.color}, ${event.color}cc)` }}
                >
                  <span className="text-2xl font-black leading-none">{day}</span>
                  <span className="text-xs font-semibold uppercase">{month}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    <span
                      className="badge text-xs flex-shrink-0"
                      style={{ background: `${event.color}18`, color: event.color }}
                    >
                      {event.category}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {event.location.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {event.spots} spots
                    </span>
                  </div>

                  <button
                    className="mt-3 flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
                  >
                    Register Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button className="btn-primary">View All Events</button>
        </div>
      </div>
    </section>
  );
}
