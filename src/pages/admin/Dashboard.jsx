import { monthlyActivityData, donationPieData, notifications } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, Pill, Package, TrendingUp, Heart, Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const iconMap = { Users, UserCheck, Pill, Package, TrendingUp, Heart };

function StatCard({ stat, index }) {
  const Icon = iconMap[stat.icon] || TrendingUp;
  return (
    <div
      className={`rounded-2xl p-5 text-white relative overflow-hidden bg-gradient-to-br ${stat.bg} shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-white/75 text-xs font-medium mb-1 uppercase tracking-wide">{stat.label}</p>
      <p className="text-3xl font-black mb-1">{stat.value}</p>
      <p className={`text-xs font-semibold flex items-center gap-1 ${stat.positive ? 'text-white/90' : 'text-red-200'}`}>
        {stat.positive ? '↑' : '↓'} {stat.change}
      </p>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
    </div>
  );
}

const notifIcon = { danger: AlertTriangle, warning: AlertTriangle, info: Info, success: CheckCircle };
const notifColor = { danger: '#EF4444', warning: '#F59E0B', info: '#2563EB', success: '#10B981' };
const notifBg = { danger: '#FEF2F2', warning: '#FFFBEB', info: '#EFF6FF', success: '#F0FDF4' };

export default function Dashboard() {
  const { staff, residents, medicines, rations, donations, volunteers } = useData();
  const recent = notifications.slice(0, 5);

  const totalDonations = donations.reduce((acc, d) => acc + d.amount, 0);
  const formattedDonations = totalDonations >= 100000 
    ? `₹${(totalDonations / 100000).toFixed(1)}L` 
    : `₹${(totalDonations / 1000).toFixed(1)}K`;

  const stats = [
    { label: "Total Elderly Residents", value: residents.length, change: "+1", positive: true, icon: "Users", color: "#2563EB", bg: "from-blue-500 to-blue-600" },
    { label: "Staff Active Today", value: staff.filter(s => s.status === 'Active').length, change: `of ${staff.length}`, positive: true, icon: "UserCheck", color: "#10B981", bg: "from-emerald-500 to-emerald-600" },
    { label: "Medicines in Stock", value: medicines.length, change: `${medicines.filter(m => m.status === 'Critical').length} Critical`, positive: false, icon: "Pill", color: "#F59E0B", bg: "from-amber-500 to-orange-500" },
    { label: "Ration Items", value: rations.length, change: `${rations.filter(r => r.status === 'Low Stock').length} Low`, positive: false, icon: "Package", color: "#8B5CF6", bg: "from-purple-500 to-violet-600" },
    { label: "Total Donations", value: formattedDonations, change: "+12%", positive: true, icon: "TrendingUp", color: "#EF4444", bg: "from-rose-500 to-pink-500" },
    { label: "Active Volunteers", value: volunteers.filter(v => v.status === 'Active').length, change: `of ${volunteers.length}`, positive: true, icon: "Heart", color: "#EC4899", bg: "from-pink-500 to-fuchsia-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time snapshot of PCDS Foundation operations</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Activity Chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Monthly Activity Overview</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Meals, medicines & volunteer data for 2025</p>
            </div>
            <div className="flex gap-1.5">
              {['Meals', 'Medicines', 'Volunteers'].map(t => (
                <span key={t} className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md">{t}</span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="meals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="meds" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
              <Area type="monotone" dataKey="meals" name="Meals" stroke="#2563EB" strokeWidth={2.5} fill="url(#meals)" />
              <Area type="monotone" dataKey="medicines" name="Medicines" stroke="#10B981" strokeWidth={2.5} fill="url(#meds)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donation Pie */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Fund Utilization</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">How donations are allocated</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={donationPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                paddingAngle={3} dataKey="value" stroke="none">
                {donationPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {donationPieData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-600 dark:text-slate-400 text-xs">{d.name}</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-white text-xs">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donations bar chart + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Monthly Donations (₹)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Donation revenue trend for 2025</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} formatter={v => [`₹${v.toLocaleString()}`, 'Donations']} />
              <Bar dataKey="donations" name="Donations" radius={[6, 6, 0, 0]} fill="url(#donBar)" />
              <defs>
                <linearGradient id="donBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Notifications panel */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800 dark:text-white">Alerts</h3>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
              {recent.filter(n => !n.read).length} new
            </span>
          </div>
          <div className="space-y-3">
            {recent.map(n => {
              const Icon = notifIcon[n.type] || Info;
              return (
                <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${n.read ? 'opacity-60' : ''}`}
                  style={{ background: notifBg[n.type] }}>
                  <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: notifColor[n.type] }} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
