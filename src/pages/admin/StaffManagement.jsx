import { useState } from 'react';
import { staffList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { Search, Plus, Edit2, Trash2, UserCheck, X, Save } from 'lucide-react';

const departments = ['All', 'Healthcare', 'Kitchen', 'Welfare', 'Security', 'Admin', 'Elderly Care', 'Logistics'];
const shifts = ['Morning', 'Day', 'Night'];
const statusColors = { Active: 'badge-success', 'On Leave': 'badge-warning' };

function Modal({ staff, onClose, onSave }) {
  const [form, setForm] = useState(staff || { name: '', role: '', department: 'Healthcare', phone: '', status: 'Active', shift: 'Morning', attendance: 100, joinDate: '', leaves: 0 });
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg">{staff ? 'Edit Staff' : 'Add New Staff'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Full Name</label>
            <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Role</label>
            <input className="input-field" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Job role" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Department</label>
            <select className="input-field" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}>
              {departments.filter(d => d !== 'All').map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Phone</label>
            <input className="input-field" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone number" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Shift</label>
            <select className="input-field" value={form.shift} onChange={e => setForm(f => ({ ...f, shift: e.target.value }))}>
              {shifts.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Status</label>
            <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Active</option><option>On Leave</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Join Date</label>
            <input type="date" className="input-field" value={form.joinDate} onChange={e => setForm(f => ({ ...f, joinDate: e.target.value }))} />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
          <button onClick={() => onSave(form)} className="flex-1 btn-primary justify-center py-2.5"><Save className="w-4 h-4" /> Save Staff</button>
        </div>
      </div>
    </div>
  );
}

export default function StaffManagement() {
  const { staff, setStaff } = useData();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [modal, setModal] = useState(null); // null | 'add' | {staff object}
  const [deleteId, setDeleteId] = useState(null);

  const filtered = staff.filter(s =>
    (dept === 'All' || s.department === dept) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (form) => {
    if (modal === 'add') {
      setStaff(prev => [...prev, { ...form, id: `S${String(prev.length + 1).padStart(3, '0')}` }]);
    } else {
      setStaff(prev => prev.map(s => s.id === modal.id ? { ...s, ...form } : s));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
  };

  const summary = [
    { label: 'Total Staff', value: staff.length, color: '#2563EB' },
    { label: 'Active', value: staff.filter(s => s.status === 'Active').length, color: '#10B981' },
    { label: 'On Leave', value: staff.filter(s => s.status === 'On Leave').length, color: '#F59E0B' },
    { label: 'Avg Attendance', value: `${Math.round(staff.reduce((a, s) => a + s.attendance, 0) / staff.length)}%`, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Staff Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage all staff members, attendance, and shifts</p>
        </div>
        <button onClick={() => setModal('add')} className="btn-primary"><Plus className="w-4 h-4" /> Add Staff</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summary.map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map(d => (
            <button key={d} onClick={() => setDept(d)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${dept === d ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['ID', 'Name & Role', 'Department', 'Shift', 'Attendance', 'Leaves', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-header text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                        {s.name?.split(' ').length > 1 
                          ? s.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                          : s.name?.slice(0, 2).toUpperCase() || '??'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-black text-slate-950 dark:text-white text-sm leading-tight truncate">
                          {s.name || 'Unknown Staff'}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate">
                          {s.role}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{s.department}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${s.shift === 'Morning' ? 'badge-info' : s.shift === 'Night' ? 'badge-purple' : 'badge-success'}`}>{s.shift}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden w-16">
                        <div className="h-full rounded-full" style={{ width: `${s.attendance}%`, background: s.attendance > 90 ? '#10B981' : s.attendance > 75 ? '#F59E0B' : '#EF4444' }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{s.leaves}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${statusColors[s.status] || 'badge-info'}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setModal(s)} className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteId(s.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No staff found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && <Modal staff={modal === 'add' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} />}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">Confirm Delete</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">Are you sure you want to delete this staff member? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
