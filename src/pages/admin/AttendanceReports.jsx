import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, Users, UserCheck, Activity, Download } from 'lucide-react';
import { staffList, elderlyList, staffAttendanceData, elderlyAttendanceData } from '../../data/mockData';

// Generate mock 30-day attendance trend data
const generateTrendData = () => {
  const data = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      staffPresent: Math.floor(Math.random() * 2) + staffList.length - 2, // 6-8 out of 8
      elderlyPresent: Math.floor(Math.random() * 2) + elderlyList.length - 1, // 5-6 out of 6
    });
  }
  return data;
};

const trendData = generateTrendData();

export default function AttendanceReports() {
  const [period, setPeriod] = useState('Monthly');

  // Simple aggregations based on the mock data
  const totalStaff = staffList.length;
  const staffPresentToday = staffAttendanceData.filter(a => a.status === 'Present').length;
  const staffAttendanceRate = Math.round((staffPresentToday / totalStaff) * 100);

  const totalElderly = elderlyList.length;
  const elderlyPresentToday = elderlyAttendanceData.filter(a => a.status === 'Present').length;
  const elderlyAttendanceRate = Math.round((elderlyPresentToday / totalElderly) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Attendance Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Overview of Staff and Elderly presence</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-field py-2"
          >
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
          <button className="btn-outline flex items-center gap-2 py-2">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+2% vs last {period.toLowerCase()}</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Avg Staff Attendance</h3>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{staffAttendanceRate}%</p>
        </div>

        <div className="card p-6 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+1% vs last {period.toLowerCase()}</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Avg Elderly Presence</h3>
          <p className="text-3xl font-black text-slate-800 dark:text-white">{elderlyAttendanceRate}%</p>
        </div>

        <div className="card p-6 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Total Staff Leaves (This {period})</h3>
          <p className="text-3xl font-black text-slate-800 dark:text-white">12</p>
        </div>

        <div className="card p-6 border-l-4 border-l-red-500">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Elderly Hospitalizations</h3>
          <p className="text-3xl font-black text-slate-800 dark:text-white">2</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">30-Day Attendance Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#F1F5F9' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" name="Staff Present" dataKey="staffPresent" stroke="#2563EB" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" name="Elderly Present" dataKey="elderlyPresent" stroke="#A855F7" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Weekly Status Breakdown</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Mon', Present: 13, Absent: 1, Leave: 0 },
                  { name: 'Tue', Present: 12, Absent: 0, Leave: 2 },
                  { name: 'Wed', Present: 14, Absent: 0, Leave: 0 },
                  { name: 'Thu', Present: 13, Absent: 1, Leave: 0 },
                  { name: 'Fri', Present: 11, Absent: 0, Leave: 3 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#F1F5F9' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Present" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} barSize={20} />
                <Bar dataKey="Leave" stackId="a" fill="#F59E0B" />
                <Bar dataKey="Absent" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
