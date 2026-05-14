import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ngo_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    // Mock credentials
    const admins = [
      { email: 'admin@ashakiran.org', password: 'admin123', name: 'Admin User', role: 'Super Admin' },
      { email: 'manager@ashakiran.org', password: 'manager123', name: 'Rahul Gupta', role: 'Manager' },
    ];
    const found = admins.find(a => a.email === email && a.password === password);
    if (found) {
      const userData = { email: found.email, name: found.name, role: found.role };
      setUser(userData);
      localStorage.setItem('ngo_admin_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ngo_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
