import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Mail, Lock, Eye, EyeOff, Heart, Shield, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const { residents, staff, volunteers } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #065F46 100%)' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-emerald-600/10 blur-3xl animate-pulse" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-2xl flex-shrink-0">
              <img src="/src/assets/logo.png" alt="PCDS Logo" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <p className="font-black text-2xl leading-tight">Prajwalaa Community<br />Development Society</p>
              <p className="text-blue-400 text-sm font-bold uppercase tracking-wider">Foundation Admin Portal</p>
            </div>
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight">
            Manage with <br />
            <span className="text-emerald-400">Care & Precision</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-10">Access the complete management dashboard to oversee elderly care, staff, medicines, rations, donations, and volunteer coordination.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Residents Managed', value: residents?.length || 0 },
              { label: 'Staff Members', value: staff?.length || 0 },
              { label: 'Active Volunteers', value: volunteers?.filter(v => v.status === 'Active').length || 0 },
              { label: 'Daily Meals Served', value: '312+' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center lg:hidden">
                <img src="/src/assets/logo.png" alt="PCDS Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">
                  {forgot ? 'Reset Password' : 'Admin Login'}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {forgot ? 'Enter your email to receive a reset link' : 'Secure access to NGO management portal'}
                </p>
              </div>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-6">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">256-bit SSL Encrypted Connection</span>
            </div>

            {forgot ? (
              resetSent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">Reset Link Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Check your email for password reset instructions.</p>
                  <button onClick={() => { setForgot(false); setResetSent(false); }} className="btn-primary w-full justify-center">Back to Login</button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" required placeholder="Admin Email Address" className="input-field pl-11" />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3.5">Send Reset Link</button>
                  <button type="button" onClick={() => setForgot(false)} className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">Back to login</button>
                </form>
              )
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" required placeholder="admin@ashakiran.org"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="input-field pl-11" autoComplete="username" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type={showPass ? 'text' : 'password'} required placeholder="Enter password"
                      value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      className="input-field pl-11 pr-11" autoComplete="current-password" />
                    <button type="button" onClick={() => setShowPass(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                  </label>
                  <button type="button" onClick={() => setForgot(true)} className="text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : 'Sign In to Dashboard'}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
