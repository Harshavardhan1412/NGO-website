import { useState } from 'react';
import { volunteerList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { Search, Plus, Star, Clock, CheckCircle, XCircle, Edit2, Heart, Trash2 } from 'lucide-react';

const statusColors = { Active: 'badge-success', Inactive: 'badge-warning' };

function VolunteerModal({ onClose, onSave, volunteer }) {
  const [form, setForm] = useState(volunteer ? { ...volunteer, skills: volunteer.skills.join(', ') } : {
    name: '',
    area: '',
    skills: '',
    joined: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = form.skills.split(',').map(s => s.trim()).filter(s => s !== '');
    onSave({ ...form, skills: skillsArray });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white text-xl">{volunteer ? 'Edit Volunteer' : 'Register New Volunteer'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><XCircle className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Full Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="e.g. Alice Smith" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Location / Area</label>
            <input required value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="input-field" placeholder="e.g. Downtown, Mumbai" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Skills (comma separated)</label>
            <input required value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} className="input-field" placeholder="e.g. Teaching, Healthcare, Logistics" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Joined Date</label>
              <input type="date" required value={form.joined} onChange={e => setForm({...form, joined: e.target.value})} className="input-field" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="input-field">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
            <button type="submit" className="flex-1 btn-primary justify-center py-3">{volunteer ? 'Save Changes' : 'Register Volunteer'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function VolunteerManagement() {
  const { volunteers, setVolunteers } = useData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(null); // null | 'add' | {volunteer}
  const [deleteId, setDeleteId] = useState(null);

  const handleSaveVolunteer = (newData) => {
    if (showModal === 'add') {
      const newId = `V${(volunteers.length + 1).toString().padStart(3, '0')}`;
      const volunteer = { ...newData, id: newId, hours: 0, rating: 5 };
      setVolunteers([volunteer, ...volunteers]);
    } else {
      setVolunteers(volunteers.map(v => v.id === showModal.id ? newData : v));
    }
    setShowModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this volunteer?')) {
      setVolunteers(volunteers.filter(v => v.id !== id));
    }
  };

  const filtered = volunteers.filter(v =>
    (statusFilter === 'All' || v.status === statusFilter) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.area.toLowerCase().includes(search.toLowerCase()))
  );

  const summary = [
    { label: 'Total Volunteers', value: volunteers.length, color: '#2563EB' },
    { label: 'Active', value: volunteers.filter(v => v.status === 'Active').length, color: '#10B981' },
    { label: 'Total Hours', value: `${volunteers.reduce((a, v) => a + v.hours, 0)}h`, color: '#8B5CF6' },
    { label: 'Avg Rating', value: `${(volunteers.reduce((a, v) => a + v.rating, 0) / volunteers.length).toFixed(1)}★`, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Volunteer Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Registrations, tasks, attendance & performance</p>
        </div>
        <button onClick={() => setShowModal('add')} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Volunteer
        </button>
      </div>

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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search volunteers..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'Inactive'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="card p-5 group hover:border-blue-200 dark:hover:border-blue-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {v.name?.split(' ').length > 1 
                    ? v.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                    : v.name?.slice(0, 2).toUpperCase() || '??'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{v.name}</h4>
                  <p className="text-xs text-slate-500">{v.area}</p>
                </div>
              </div>
              <span className={`badge ${statusColors[v.status]}`}>{v.status}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {v.skills.map(s => (
                <span key={s} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-medium">
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-2">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-bold text-slate-800 dark:text-white text-sm">{v.hours}h</span>
                </div>
                <p className="text-xs text-slate-400">Hours</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-2">
                <div className="flex items-center justify-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < v.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-600'}`} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-slate-400">Rating</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-2">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  {v.status === 'Active' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="font-bold text-slate-800 dark:text-white text-xs">{v.status}</span>
                </div>
                <p className="text-xs text-slate-400">Status</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 mb-4">
              Joined: {new Date(v.joined).toLocaleDateString('en-IN')}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowModal(v)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-all">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDelete(v.id)} className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center hover:bg-red-100 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No volunteers found</p>
        </div>
      )}
      {showModal && <VolunteerModal volunteer={showModal === 'add' ? null : showModal} onClose={() => setShowModal(null)} onSave={handleSaveVolunteer} />}
    </div>
  );
}
