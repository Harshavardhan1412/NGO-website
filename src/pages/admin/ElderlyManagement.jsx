import { useState } from 'react';
import { elderlyList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { Search, Plus, Edit2, Eye, Users, X, Save, Heart, Phone, MapPin, Trash2 } from 'lucide-react';

const healthColors = { Good: 'badge-success', Stable: 'badge-info', Critical: 'badge-danger' };

function DetailModal({ resident, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg">Resident Profile</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
        </div>
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-black flex-shrink-0">
            {resident.name?.split(' ').length > 1 
              ? resident.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
              : resident.name?.slice(0, 2).toUpperCase() || '??'}
          </div>
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-xl">{resident.name}</h4>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-sm text-slate-500">{resident.gender} • {resident.age} yrs</span>
              <span className="text-sm text-slate-500">Room {resident.room}</span>
              <span className={`badge ${healthColors[resident.health]}`}>{resident.health}</span>
            </div>
          </div>
        </div>
        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Resident ID', value: resident.id },
            { label: 'Admitted', value: new Date(resident.admitted).toLocaleDateString('en-IN') },
            { label: 'Diet', value: resident.diet },
            { label: 'Attendance', value: `${resident.attendance}%` },
          ].map(f => (
            <div key={f.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
              <p className="text-xs text-slate-400 mb-0.5">{f.label}</p>
              <p className="font-semibold text-slate-800 dark:text-white">{f.value}</p>
            </div>
          ))}
        </div>
        {/* Medical condition */}
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1 uppercase tracking-wide flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Medical Conditions</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">{resident.condition}</p>
        </div>
        {/* Emergency contact */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wide flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Emergency Contact</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">{resident.contact}</p>
        </div>
        <button onClick={onClose} className="mt-5 w-full btn-primary justify-center">Close</button>
      </div>
    </div>
  );
}

function ResidentModal({ onClose, onSave, resident }) {
  const [form, setForm] = useState(resident || {
    name: '',
    age: '',
    gender: 'Male',
    room: '',
    health: 'Good',
    condition: '',
    contact: '',
    diet: 'Regular'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white text-xl">{resident ? 'Edit Resident' : 'Add New Resident'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Full Name</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Age</label>
              <input type="number" required value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="input-field" placeholder="Age" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Gender</label>
              <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} className="input-field">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Room Number</label>
              <input required value={form.room} onChange={e => setForm({...form, room: e.target.value})} className="input-field" placeholder="e.g. A-101" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Health Status</label>
              <select value={form.health} onChange={e => setForm({...form, health: e.target.value})} className="input-field">
                <option>Good</option>
                <option>Stable</option>
                <option>Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Medical Conditions</label>
            <textarea required value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} className="input-field resize-none" rows={2} placeholder="List conditions..." />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Emergency Contact</label>
            <input required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="input-field" placeholder="Name & Phone Number" />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Dietary Requirements</label>
            <input value={form.diet} onChange={e => setForm({...form, diet: e.target.value})} className="input-field" placeholder="Regular, Diabetic, etc." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
            <button type="submit" className="flex-1 btn-primary justify-center py-3">{resident ? 'Save Changes' : 'Add Resident'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ElderlyManagement() {
  const { residents, setResidents } = useData();
  const [search, setSearch] = useState('');
  const [healthFilter, setHealthFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(null); // null | 'add' | {resident}

  const handleSaveResident = (newData) => {
    if (showModal === 'add') {
      const newId = `E${(residents.length + 1).toString().padStart(3, '0')}`;
      const resident = {
        ...newData,
        id: newId,
        admitted: new Date().toISOString().split('T')[0],
        attendance: 100,
        age: parseInt(newData.age)
      };
      setResidents([resident, ...residents]);
    } else {
      setResidents(residents.map(r => r.id === showModal.id ? { ...newData, age: parseInt(newData.age) } : r));
    }
    setShowModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this resident record?')) {
      setResidents(residents.filter(r => r.id !== id));
    }
  };

  const filtered = residents.filter(r =>
    (healthFilter === 'All' || r.health === healthFilter) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const summary = [
    { label: 'Total Residents', value: residents.length, color: '#2563EB' },
    { label: 'Good Health', value: residents.filter(r => r.health === 'Good').length, color: '#10B981' },
    { label: 'Stable', value: residents.filter(r => r.health === 'Stable').length, color: '#F59E0B' },
    { label: 'Critical', value: residents.filter(r => r.health === 'Critical').length, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Elderly Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Resident profiles, health records & room allocation</p>
        </div>
        <button onClick={() => setShowModal('add')} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Resident
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search residents..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2">
          {['All', 'Good', 'Stable', 'Critical'].map(h => (
            <button key={h} onClick={() => setHealthFilter(h)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${healthFilter === h ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}>
              {h}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="card p-5 group hover:border-blue-200 dark:hover:border-blue-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-lg font-black flex-shrink-0">
                  {r.name?.split(' ').length > 1 
                    ? r.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                    : r.name?.slice(0, 2).toUpperCase() || '??'}
                </div>
                <div>
                  <h4 className="font-black text-slate-950 dark:text-white">{r.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{r.gender} • {r.age} yrs • Room {r.room}</p>
                </div>
              </div>
              <span className={`badge ${healthColors[r.health]}`}>{r.health}</span>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs">{r.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5" /> Diet: {r.diet}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Attendance</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${r.attendance}%` }} />
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{r.attendance}%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelected(r)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-all">
                <Eye className="w-4 h-4" /> View Profile
              </button>
              <button onClick={() => setShowModal(r)} className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-500 flex items-center justify-center hover:bg-slate-100 transition-all">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(r.id)} className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center hover:bg-red-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && <DetailModal resident={selected} onClose={() => setSelected(null)} />}
      {showModal && <ResidentModal resident={showModal === 'add' ? null : showModal} onClose={() => setShowModal(null)} onSave={handleSaveResident} />}
    </div>
  );
}
