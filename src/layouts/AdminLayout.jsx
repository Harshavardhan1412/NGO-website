import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard, Users, UserCheck, Pill, Package, DollarSign,
  Heart, BarChart3, Bell, LogOut, Menu, X, Moon, Sun,
  ChevronLeft, Settings, Shield, Home
} from 'lucide-react';
import { notifications } from '../data/mockData';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Staff Management', icon: UserCheck, path: '/admin/staff' },
  { label: 'Elderly People', icon: Users, path: '/admin/elderly' },
  { label: 'Medications', icon: Pill, path: '/admin/medications' },
  { label: 'Ration Supply', icon: Package, path: '/admin/rations' },
  { label: 'Donations', icon: DollarSign, path: '/admin/donations' },
  { label: 'Volunteers', icon: Heart, path: '/admin/volunteers' },
  { label: 'Staff Attendance', icon: UserCheck, path: '/admin/attendance/staff' },
  { label: 'Elderly Attendance', icon: Users, path: '/admin/attendance/elderly' },
  { label: 'Attendance Reports', icon: BarChart3, path: '/admin/attendance/reports' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg bg-white">
          <img src="/src/assets/logo.png" alt="PCDS Logo" className="w-full h-full object-contain" />
        </div>
        {sidebarOpen && (
          <div>
            <p className="font-black text-slate-800 dark:text-white text-sm leading-none">PCDS</p>
            <p className="text-blue-600 dark:text-blue-400 text-xs">Admin Portal</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-0.5">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
        <Link to="/" className="sidebar-link">
          <Home className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span>Public Website</span>}
        </Link>
        <button onClick={handleLogout} className="sidebar-link w-full text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>

      {/* User info */}
      {sidebarOpen && (
        <div className="px-3 py-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-16'}`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white dark:bg-slate-800 flex flex-col shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center gap-4 px-4 lg:px-6 flex-shrink-0">
          {/* Collapse button */}
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          {/* Theme toggle */}
          <button onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications bell */}
          <NavLink to="/admin/notifications"
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </NavLink>

          {/* User avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
