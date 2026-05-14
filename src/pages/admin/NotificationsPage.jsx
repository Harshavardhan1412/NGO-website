import { useState } from 'react';
import { notifications as initialNotifications } from '../../data/mockData';
import { AlertTriangle, Info, CheckCircle, Bell, Check, Trash2, Filter } from 'lucide-react';

const iconMap = { danger: AlertTriangle, warning: AlertTriangle, info: Info, success: CheckCircle };
const colorMap = { danger: '#EF4444', warning: '#F59E0B', info: '#2563EB', success: '#10B981' };
const bgMap = { danger: '#FEF2F2', warning: '#FFFBEB', info: '#EFF6FF', success: '#F0FDF4' };
const darkBgMap = { danger: 'rgba(239,68,68,0.1)', warning: 'rgba(245,158,11,0.1)', info: 'rgba(37,99,235,0.1)', success: 'rgba(16,185,129,0.1)' };

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? notifs
    : filter === 'Unread' ? notifs.filter(n => !n.read)
    : notifs.filter(n => n.type === filter.toLowerCase());

  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const deleteNotif = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{unreadCount}</span>
              )}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Alerts, reminders, and system updates</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-100 transition-all">
            <Check className="w-4 h-4" /> Mark All Read
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Critical Alerts', value: notifs.filter(n => n.type === 'danger').length, color: '#EF4444' },
          { label: 'Warnings', value: notifs.filter(n => n.type === 'warning').length, color: '#F59E0B' },
          { label: 'Information', value: notifs.filter(n => n.type === 'info').length, color: '#2563EB' },
          { label: 'Success', value: notifs.filter(n => n.type === 'success').length, color: '#10B981' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Unread', 'Danger', 'Warning', 'Info', 'Success'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filtered.map(n => {
          const Icon = iconMap[n.type] || Info;
          return (
            <div
              key={n.id}
              className={`card p-4 flex items-start gap-4 transition-all ${!n.read ? 'border-l-4' : 'opacity-75'}`}
              style={{
                borderLeftColor: !n.read ? colorMap[n.type] : undefined,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: bgMap[n.type] }}
              >
                <Icon className="w-5 h-5" style={{ color: colorMap[n.type] }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`font-bold text-slate-800 dark:text-white text-sm ${!n.read ? '' : 'font-semibold'}`}>
                      {n.title}
                      {!n.read && <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 inline-block" />}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{n.message}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!n.read && (
                      <button onClick={() => markRead(n.id)}
                        className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-all"
                        title="Mark as read">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button onClick={() => deleteNotif(n.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-400 flex items-center justify-center hover:bg-red-100 transition-all"
                      title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">{n.time}</p>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No notifications found</p>
            <p className="text-slate-400 text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
