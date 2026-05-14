import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Filter, AlertCircle } from 'lucide-react';
import { staffList, staffAttendanceData } from '../../data/mockData';

export default function StaffAttendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Merge staff list with attendance data for the selected date
  const [attendance, setAttendance] = useState(
    staffList.map(staff => {
      const record = staffAttendanceData.find(a => a.staffId === staff.id && a.date === date);
      return {
        ...staff,
        status: record ? record.status : 'Pending',
        checkIn: record ? record.checkIn : '-',
        checkOut: record ? record.checkOut : '-'
      };
    })
  );

  const handleStatusChange = (id, newStatus) => {
    setAttendance(prev => prev.map(staff => {
      if (staff.id === id) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return {
          ...staff,
          status: newStatus,
          checkIn: newStatus === 'Present' && staff.checkIn === '-' ? time : staff.checkIn,
          checkOut: newStatus === 'Absent' || newStatus === 'Leave' ? '-' : staff.checkOut
        };
      }
      return staff;
    }));
  };

  const filteredStaff = attendance.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: attendance.length,
    present: attendance.filter(s => s.status === 'Present').length,
    absent: attendance.filter(s => s.status === 'Absent').length,
    leave: attendance.filter(s => s.status === 'Leave').length,
    pending: attendance.filter(s => s.status === 'Pending').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Staff Attendance</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Mark daily attendance for all employees</p>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
          <button className="btn-primary">Save Attendance</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Staff', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Present', value: stats.present, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Absent', value: stats.absent, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'On Leave', value: stats.leave, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Pending', value: stats.pending, color: 'text-slate-600', bg: 'bg-slate-50 dark:bg-slate-800' },
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
            placeholder="Search staff by name or role..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-9 text-sm"
          />
        </div>
        <button className="btn-outline flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
          <Filter className="w-4 h-4" /> Filter by Dept
        </button>
      </div>

      {/* Attendance List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Staff Member</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Check In</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredStaff.map(staff => (
                <tr key={staff.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 flex-shrink-0">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{staff.name}</p>
                        <p className="text-xs text-slate-500">{staff.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-xs">{staff.department}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300 font-mono">
                    {staff.checkIn}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      staff.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      staff.status === 'Absent' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      staff.status === 'Leave' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {staff.status === 'Present' && <CheckCircle className="w-3 h-3" />}
                      {staff.status === 'Absent' && <XCircle className="w-3 h-3" />}
                      {staff.status === 'Leave' && <Clock className="w-3 h-3" />}
                      {staff.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleStatusChange(staff.id, 'Present')}
                        className={`p-1.5 rounded-lg text-xs font-semibold ${staff.status === 'Present' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        P
                      </button>
                      <button 
                        onClick={() => handleStatusChange(staff.id, 'Absent')}
                        className={`p-1.5 rounded-lg text-xs font-semibold ${staff.status === 'Absent' ? 'bg-red-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        A
                      </button>
                      <button 
                        onClick={() => handleStatusChange(staff.id, 'Leave')}
                        className={`p-1.5 rounded-lg text-xs font-semibold ${staff.status === 'Leave' ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                      >
                        L
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
