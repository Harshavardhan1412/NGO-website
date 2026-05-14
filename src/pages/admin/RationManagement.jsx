import { useState } from 'react';
import { rationList } from '../../data/mockData';
import { useData } from '../../context/DataContext';
import { Search, Plus, Package, AlertTriangle, TrendingDown, TrendingUp, Edit2, XCircle, Trash2 } from 'lucide-react';

const statusStyles = { Adequate: 'badge-success', 'Low Stock': 'badge-warning', Daily: 'badge-info' };

function StockModal({ onClose, onSave, item }) {
  const [form, setForm] = useState(item || {
    item: '',
    category: 'Grains',
    stock: '',
    unit: 'kg',
    reorderLevel: '',
    supplier: '',
    status: 'Adequate'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 dark:text-white text-xl">{item ? 'Edit Stock Item' : 'Add New Stock Item'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><XCircle className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Item Name</label>
              <input required value={form.item} onChange={e => setForm({...form, item: e.target.value})} className="input-field" placeholder="e.g. Basmati Rice" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                <option>Grains</option>
                <option>Pulses</option>
                <option>Oils</option>
                <option>Vegetables</option>
                <option>Spices</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Unit</label>
              <input required value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="input-field" placeholder="e.g. kg, L, Packets" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Current Stock</label>
              <input type="number" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="input-field" placeholder="0" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Reorder Level</label>
              <input type="number" required value={form.reorderLevel} onChange={e => setForm({...form, reorderLevel: e.target.value})} className="input-field" placeholder="e.g. 100" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Supplier</label>
              <input required value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} className="input-field" placeholder="Supplier name" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Cancel</button>
            <button type="submit" className="flex-1 btn-primary justify-center py-3">{item ? 'Save Changes' : 'Add Stock Item'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RationManagement() {
  const { rations, setRations } = useData();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [showModal, setShowModal] = useState(null); // null | 'add' | {item}

  const handleSaveStock = (newData) => {
    const stockVal = parseInt(newData.stock);
    const reorder = parseInt(newData.reorderLevel);
    let status = 'Adequate';
    if (stockVal <= reorder / 2) status = 'Low Stock';
    else if (stockVal <= reorder) status = 'Low Stock';

    if (showModal === 'add') {
      const newId = `R${(rations.length + 1).toString().padStart(3, '0')}`;
      const newItem = { ...newData, id: newId, stock: stockVal, reorderLevel: reorder, lastRestocked: new Date().toISOString().split('T')[0], status };
      setRations([newItem, ...rations]);
    } else {
      setRations(rations.map(s => s.id === showModal.id ? { ...newData, stock: stockVal, reorderLevel: reorder, status } : s));
    }
    setShowModal(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this stock item?')) {
      setRations(rations.filter(s => s.id !== id));
    }
  };

  const categories = ['All', ...new Set(rations.map(s => s.category))];
  const filtered = rations.filter(s =>
    (catFilter === 'All' || s.category === catFilter) &&
    s.item.toLowerCase().includes(search.toLowerCase())
  );

  const summary = [
    { label: 'Total Items', value: rations.length, color: '#2563EB' },
    { label: 'Adequate', value: rations.filter(s => s.status === 'Adequate').length, color: '#10B981' },
    { label: 'Low Stock', value: rations.filter(s => s.status === 'Low Stock').length, color: '#F59E0B' },
    { label: 'Daily Supply', value: rations.filter(s => s.status === 'Daily').length, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Ration Supply Management</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Food stock inventory, distribution & supplier management</p>
        </div>
        <button onClick={() => setShowModal('add')} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Stock
        </button>
      </div>

      {rations.filter(s => s.status === 'Low Stock').length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <strong>{rations.filter(s => s.status === 'Low Stock').length} items</strong> are running low.
            Items affected: {rations.filter(s => s.status === 'Low Stock').map(s => s.item).join(', ')}.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summary.map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {rations.filter(s => s.status !== 'Daily').map(s => (
          <div key={s.id} className={`card p-4 border-l-4 ${s.status === 'Adequate' ? 'border-emerald-500' : 'border-amber-500'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <Package className="w-4 h-4 text-slate-500" />
              </div>
              <span className={`badge text-xs ${statusStyles[s.status]}`}>{s.status}</span>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-0.5">{s.item}</h4>
            <p className="text-xs text-slate-500 mb-2">{s.category}</p>
            <p className="text-xl font-black" style={{ color: s.status === 'Adequate' ? '#10B981' : '#F59E0B' }}>
              {s.stock} <span className="text-sm font-normal text-slate-500">{s.unit}</span>
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
              {s.status === 'Adequate' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-amber-500" />}
              Reorder at {s.reorderLevel} {s.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stock items..." className="input-field pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${catFilter === c ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50'}`}>
              {c}
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
                {['ID', 'Item', 'Category', 'Stock', 'Unit', 'Reorder Level', 'Last Restocked', 'Supplier', 'Status', ''].map(h => (
                  <th key={h} className="table-header text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-white">{s.item}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{s.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${Math.min((s.stock / (s.reorderLevel * 5 || s.stock * 1.5)) * 100, 100)}%`,
                          background: s.status === 'Adequate' ? '#10B981' : s.status === 'Daily' ? '#2563EB' : '#F59E0B',
                        }} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{s.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{s.unit}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{s.reorderLevel || '—'} {s.reorderLevel ? s.unit : ''}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{new Date(s.lastRestocked).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{s.supplier}</td>
                  <td className="px-4 py-3"><span className={`badge ${statusStyles[s.status] || 'badge-info'}`}>{s.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => setShowModal(s)} className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all">
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
      {showModal && <StockModal item={showModal === 'add' ? null : showModal} onClose={() => setShowModal(null)} onSave={handleSaveStock} />}
    </div>
  );
}
