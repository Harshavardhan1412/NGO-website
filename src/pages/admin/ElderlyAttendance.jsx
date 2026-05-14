import { useState } from 'react';
import { CheckCircle, Clock, Search, HeartPulse, AlertCircle, PlusCircle } from 'lucide-react';
import { elderlyList, elderlyAttendanceData } from '../../data/mockData';

export default function ElderlyAttendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Merge elderly list with attendance data for the selected date
  const [attendance, setAttendance] = useState(
    elderlyList.map(resident => {
      const record = elderlyAttendanceData.find(a => a.residentId === resident.id && a.date === date);
      return {
        ...resident,
        status: record ? record.status : 'Pending',
        notes: record ? record.notes : ''
      };
    })
  );

  const handleStatusChange = (id, newStatus) => {
    setAttendance(prev => prev.map(resident => {
      if (resident.id === id) {
        return { ...resident, status: newStatus };
      }
      return resident;
    }));
  };

  const handleNotesChange = (id, notes) => {
    setAttendance(prev => prev.map(resident => {
      if (resident.id === id) {
        return { ...resident, notes };
      }
      return resident;
    }));
  };

  const filteredResidents = attendance.filter(resident => 
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: attendance.length,
    present: attendance.filter(s => s.status === 'Present').length,
    hospitalized: attendance.filter(s => s.status === 'Hospitalized').length,
    away: attendance.filter(s => s.status === 'Away').length,
    pending: attendance.filter(s => s.status === 'Pending').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Elderly Resident Status</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Mark daily presence and health observations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
          <button className="btn-primary">Save Records</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Residents', value: stats.total, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Present / Active', value: stats.present, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Hospitalized', value: stats.hospitalized, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Away (Family)', value: stats.away, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Pending Update', value: stats.pending, color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-800' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-2xl border border-slate-100 dark:border-slate-800 ${stat.bg}`}>
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search resident by name or room number..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-9 text-sm"
          />
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Resident</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Room</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Daily Notes</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredResidents.map(resident => (
                <tr key={resident.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600 flex-shrink-0">
                        {resident.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{resident.name}</p>
                        <p className="text-xs text-slate-500">Age: {resident.age}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs font-mono">{resident.room}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      resident.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      resident.status === 'Hospitalized' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      resident.status === 'Away' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {resident.status === 'Present' && <CheckCircle className="w-3 h-3" />}
                      {resident.status === 'Hospitalized' && <HeartPulse className="w-3 h-3" />}
                      {resident.status === 'Away' && <Clock className="w-3 h-3" />}
                      {resident.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                      {resident.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <input 
                      type="text" 
                      placeholder="Add observation note..."
                      value={resident.notes}
                      onChange={(e) => handleNotesChange(resident.id, e.target.value)}
                      className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none text-sm text-slate-700 dark:text-slate-300 pb-1"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleStatusChange(resident.id, 'Present')}
                        title="Mark Present"
                        className={`p-1.5 rounded-lg text-xs font-semibold ${resident.status === 'Present' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        P
                      </button>
                      <button 
                        onClick={() => handleStatusChange(resident.id, 'Hospitalized')}
                        title="Mark Hospitalized"
                        className={`p-1.5 rounded-lg text-xs font-semibold ${resident.status === 'Hospitalized' ? 'bg-red-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        H
                      </button>
                      <button 
                        onClick={() => handleStatusChange(resident.id, 'Away')}
                        title="Mark Away with Family"
                        className={`p-1.5 rounded-lg text-xs font-semibold ${resident.status === 'Away' ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        A
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
