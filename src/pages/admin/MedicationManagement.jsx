import { useState } from 'react';
import { medicineList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { Search, Plus, AlertTriangle, Pill, Package, Clock, Edit2, X, Trash2 } from 'lucide-react';

const statusStyles = { Adequate: 'badge-success', 'Low Stock': 'badge-warning', Critical: 'badge-danger' };

function MedicineModal({ onClose, onSave, medicine }) {
  const [form, setForm] = useState(medicine || {
    name: '',
    category: '',
    stock: '',
    unit: 'Tablets',
    reorderLevel: '',
    expiry: '',
    supplier: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white text-xl">{medicine ? 'Edit Medicine' : 'Add New Medicine'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Medicine Name</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="e.g. Paracetamol 500mg" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Category</label>
              <input required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field" placeholder="e.g. Painkiller" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Unit</label>
              <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="input-field">
                <option>Tablets</option>
                <option>Capsules</option>
                <option>Syrup (ml)</option>
                <option>Injections</option>
                <option>Units</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Initial Stock</label>
              <input type="number" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="input-field" placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Reorder Level</label>
              <input type="number" required value={form.reorderLevel} onChange={e => setForm({...form, reorderLevel: e.target.value})} className="input-field" placeholder="e.g. 50" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Expiry Date</label>
              <input type="date" required value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})} className="input-field" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Supplier</label>
              <input required value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} className="input-field" placeholder="Supplier name" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
            <button type="submit" className="flex-1 btn-primary justify-center py-3">{medicine ? 'Save Changes' : 'Add Medicine'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MedicationManagement() {
  const { medicines, setMedicines } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(null); // null | 'add' | {medicine}

  const handleSaveMedicine = (newData) => {
    const stock = parseInt(newData.stock);
    const reorder = parseInt(newData.reorderLevel);
    let status = 'Adequate';
    if (stock <= reorder / 2) status = 'Critical';
    else if (stock <= reorder) status = 'Low Stock';

    if (showModal === 'add') {
      const newId = `M${(medicines.length + 1).toString().padStart(3, '0')}`;
      const medicine = { ...newData, id: newId, stock, reorderLevel: reorder, status };
      setMedicines([medicine, ...medicines]);
    } else {
      setMedicines(medicines.map(m => m.id === showModal.id ? { ...newData, stock, reorderLevel: reorder, status } : m));
    }
    setShowModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(m => m.id !== id));
    }
  };

  const filtered = medicines.filter(m =>
    (filter === 'All' || m.status === filter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase()))
  );

  const summary = [
    { label: 'Total Medicines', value: medicines.length, color: '#2563EB', icon: Pill },
    { label: 'Adequate', value: medicines.filter(m => m.status === 'Adequate').length, color: '#10B981', icon: Package },
    { label: 'Low Stock', value: medicines.filter(m => m.status === 'Low Stock').length, color: '#F59E0B', icon: AlertTriangle },
    { label: 'Critical', value: medicines.filter(m => m.status === 'Critical').length, color: '#EF4444', icon: AlertTriangle },
  ];

  const getDaysToExpiry = (expiry) => {
    const days = Math.ceil((new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Medication Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Medicine inventory, schedules & expiry tracking</p>
        </div>
        <button onClick={() => setShowModal('add')} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
      </div>

      {/* Alerts banner */}
      {medicines.filter(m => m.status === 'Critical').length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">
            <strong>{medicines.filter(m => m.status === 'Critical').length} medicines</strong> are critically low and require immediate reorder.
            {medicines.filter(m => getDaysToExpiry(m.expiry) < 60 && getDaysToExpiry(m.expiry) > 0).length > 0 &&
              ` Also, ${medicines.filter(m => getDaysToExpiry(m.expiry) < 60).length} medicines expire within 60 days.`}
          </p>
        </div>
      )}

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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search medicines..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2">
          {['All', 'Adequate', 'Low Stock', 'Critical'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${filter === s ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}>
              {s}
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
                {['ID', 'Medicine Name', 'Category', 'Stock', 'Reorder Level', 'Expiry', 'Supplier', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-header text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map(m => {
                const days = getDaysToExpiry(m.expiry);
                const expiryWarning = days < 60;
                return (
                  <tr key={m.id} className="table-row">
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{m.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                          <Pill className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-white">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{m.category}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{
                              width: `${Math.min((m.stock / (m.reorderLevel * 5)) * 100, 100)}%`,
                              background: m.status === 'Adequate' ? '#10B981' : m.status === 'Low Stock' ? '#F59E0B' : '#EF4444',
                            }} />
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{m.stock} {m.unit}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{m.reorderLevel} {m.unit}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {expiryWarning && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                        <span className={`text-sm ${expiryWarning ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>
                          {new Date(m.expiry).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      {expiryWarning && <p className="text-xs text-amber-500">Expires in {days} days</p>}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{m.supplier}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${statusStyles[m.status] || 'badge-info'}`}>{m.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setShowModal(m)} className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(m.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <MedicineModal medicine={showModal === 'add' ? null : showModal} onClose={() => setShowModal(null)} onSave={handleSaveMedicine} />}
    </div>
  );
}
