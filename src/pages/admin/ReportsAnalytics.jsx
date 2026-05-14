import { useState } from 'react';
import { monthlyActivityData, donationPieData } from '../../data/mockData';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { BarChart3, Download, TrendingUp } from 'lucide-react';

const tabs = ['Overview', 'Attendance', 'Medicine Usage', 'Donations', 'Food Distribution'];

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Reports & Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Comprehensive data insights and NGO performance metrics</p>
        </div>
        <button className="btn-accent"><Download className="w-4 h-4" /> Export Report</button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Meals This Year', value: '1,44,500', change: '+12%', color: '#F59E0B' },
          { label: 'Medicines Dispensed', value: '31,150', change: '+8%', color: '#10B981' },
          { label: 'Donations Received', value: '₹49.4L', change: '+22%', color: '#2563EB' },
          { label: 'Volunteer Hours', value: '8,640h', change: '+35%', color: '#8B5CF6' },
        ].map(k => (
          <div key={k.label} className="card p-4">
            <p className="text-2xl font-black text-slate-800 dark:text-white mb-1">{k.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{k.label}</p>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> {k.change} vs last year
            </span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 min-w-max px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Chart content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">Meals & Medicine Trend</h3>
            <p className="text-xs text-slate-500 mb-5">Monthly distribution over 2025</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gMeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gMeds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="meals" name="Meals" stroke="#F59E0B" strokeWidth={2.5} fill="url(#gMeals)" />
                <Area type="monotone" dataKey="medicines" name="Medicines" stroke="#10B981" strokeWidth={2.5} fill="url(#gMeds)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 dark:text-white mb-1">Fund Utilization Breakdown</h3>
            <p className="text-xs text-slate-500 mb-5">How funds are allocated across programs</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={donationPieData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" stroke="none" label={({ name, value }) => `${name}: ${value}%`} labelLine={false}>
                  {donationPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'Donations' && (
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Monthly Donation Revenue</h3>
          <p className="text-xs text-slate-500 mb-5">Full year 2025 donation data</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} formatter={v => [`₹${v.toLocaleString()}`, 'Donations']} />
              <Bar dataKey="donations" name="Donations" radius={[6, 6, 0, 0]}>
                {monthlyActivityData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${220 + i * 5}, 80%, ${50 + i}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'Attendance' && (
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">Volunteer Attendance Trend</h3>
          <p className="text-xs text-slate-500 mb-5">Active volunteers per month in 2025</p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Line type="monotone" dataKey="volunteers" name="Volunteers" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 5, fill: '#8B5CF6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {(activeTab === 'Medicine Usage' || activeTab === 'Food Distribution') && (
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 dark:text-white mb-1">
            {activeTab === 'Medicine Usage' ? 'Medicine Distribution' : 'Food Distribution'} Monthly
          </h3>
          <p className="text-xs text-slate-500 mb-5">2025 monthly data</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              <Bar
                dataKey={activeTab === 'Medicine Usage' ? 'medicines' : 'meals'}
                name={activeTab === 'Medicine Usage' ? 'Medicines' : 'Meals'}
                fill={activeTab === 'Medicine Usage' ? '#10B981' : '#F59E0B'}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
