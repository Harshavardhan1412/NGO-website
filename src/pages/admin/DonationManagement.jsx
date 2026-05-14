import { useState } from 'react';
import { donorList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { Search, DollarSign, TrendingUp, Users, CheckCircle, Clock, Edit2, Trash2 } from 'lucide-react';

const methodColors = { 'Bank Transfer': 'badge-info', Online: 'badge-success', Cheque: 'badge-warning', UPI: 'badge-purple' };
const typeColors = { Corporate: 'badge-info', Individual: 'badge-success', Organization: 'badge-purple' };

function DonationModal({ onClose, onSave, donation }) {
  const [form, setForm] = useState(donation || {
    name: '',
    type: 'Individual',
    amount: '',
    purpose: 'General Fund',
    method: 'Online',
    date: new Date().toISOString().split('T')[0],
    status: 'Received'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, amount: parseFloat(form.amount) });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white text-xl">{donation ? 'Edit Donation' : 'Record New Donation'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><CheckCircle className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Donor Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Full name or Company name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Donor Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field">
                <option>Individual</option>
                <option>Corporate</option>
                <option>Organization</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount (₹)</label>
              <input type="number" required value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="input-field" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Purpose</label>
              <select value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})} className="input-field">
                <option>General Fund</option>
                <option>Elderly Care</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Ration Support</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Payment Method</label>
              <select value={form.method} onChange={e => setForm({...form, method: e.target.value})} className="input-field">
                <option>Online</option>
                <option>UPI</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Date</label>
            <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="input-field" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
            <button type="submit" className="flex-1 btn-primary justify-center py-3">{donation ? 'Save Changes' : 'Record Donation'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DonationManagement() {
  const { donations, setDonations } = useData();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showModal, setShowModal] = useState(null); // null | 'add' | {donation}

  const handleSaveDonation = (newData) => {
    if (showModal === 'add') {
      const newId = `D${(donations.length + 1).toString().padStart(3, '0')}`;
      const donation = { ...newData, id: newId };
      setDonations([donation, ...donations]);
    } else {
      setDonations(donations.map(d => d.id === showModal.id ? newData : d));
    }
    setShowModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this donation record?')) {
      setDonations(donations.filter(d => d.id !== id));
    }
  };

  const filtered = donations.filter(d =>
    (typeFilter === 'All' || d.type === typeFilter) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.purpose.toLowerCase().includes(search.toLowerCase()))
  );

  const totalRaised = donations.reduce((a, d) => a + d.amount, 0);
  const corporate = donations.filter(d => d.type === 'Corporate').reduce((a, d) => a + d.amount, 0);
  const individual = donations.filter(d => d.type === 'Individual').reduce((a, d) => a + d.amount, 0);

  const summary = [
    { label: 'Total Raised', value: `₹${(totalRaised / 100000).toFixed(1)}L`, color: '#10B981', icon: TrendingUp },
    { label: 'Total Donors', value: donations.length, color: '#2563EB', icon: Users },
    { label: 'Corporate', value: `₹${(corporate / 100000).toFixed(1)}L`, color: '#8B5CF6', icon: DollarSign },
    { label: 'Individual', value: `₹${(individual / 1000).toFixed(0)}K`, color: '#F59E0B', icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Donation Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Donor records, transaction tracking & fund utilization</p>
        </div>
        <button onClick={() => setShowModal('add')} className="btn-primary">
          <DollarSign className="w-4 h-4" /> Add Donation
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summary.map(s => (
          <div key={s.label} className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}18` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search donors..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2">
          {['All', 'Corporate', 'Individual', 'Organization'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${typeFilter === t ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Donor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(d => (
          <div key={d.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-black flex-shrink-0">
                  {d.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{d.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`badge text-xs ${typeColors[d.type] || 'badge-info'}`}>{d.type}</span>
                    <span className={`badge text-xs ${methodColors[d.method] || 'badge-info'}`}>{d.method}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-emerald-600">₹{d.amount.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{new Date(d.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs text-slate-400">Purpose</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{d.purpose}</p>
                </div>
                <div className="flex gap-1 ml-4">
                  <button onClick={() => setShowModal(d)} className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-100 transition-all">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(d.id)} className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 hover:bg-red-100 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {d.status === 'Received' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-500" />
                )}
                <span className={`text-sm font-semibold ${d.status === 'Received' ? 'text-emerald-600' : 'text-amber-600'}`}>{d.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-slate-800 dark:text-white">All Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['ID', 'Donor Name', 'Type', 'Amount', 'Date', 'Method', 'Purpose', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-header text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {donations.map(d => (
                <tr key={d.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{d.name}</td>
                  <td className="px-4 py-3"><span className={`badge text-xs ${typeColors[d.type]}`}>{d.type}</span></td>
                  <td className="px-4 py-3 font-bold text-emerald-600">₹{d.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{new Date(d.date).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3"><span className={`badge text-xs ${methodColors[d.method]}`}>{d.method}</span></td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{d.purpose}</td>
                  <td className="px-4 py-3">
                    <span className={`badge text-xs ${d.status === 'Received' ? 'badge-success' : 'badge-warning'}`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => setShowModal(d)} className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(d.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <DonationModal donation={showModal === 'add' ? null : showModal} onClose={() => setShowModal(null)} onSave={handleSaveDonation} />}
    </div>
  );
}
