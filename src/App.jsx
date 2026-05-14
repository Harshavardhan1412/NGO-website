import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import HomePage from './pages/HomePage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import StaffManagement from './pages/admin/StaffManagement';
import ElderlyManagement from './pages/admin/ElderlyManagement';
import MedicationManagement from './pages/admin/MedicationManagement';
import RationManagement from './pages/admin/RationManagement';
import DonationManagement from './pages/admin/DonationManagement';
import VolunteerManagement from './pages/admin/VolunteerManagement';
import StaffAttendance from './pages/admin/StaffAttendance';
import ElderlyAttendance from './pages/admin/ElderlyAttendance';
import AttendanceReports from './pages/admin/AttendanceReports';
import DonatePage from './pages/DonatePage';

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public website */}
              <Route path="/" element={<HomePage />} />
              <Route path="/donate" element={<DonatePage />} />

              {/* Admin auth */}
              <Route path="/admin" element={<AdminLogin />} />

              {/* Protected admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="staff" element={<StaffManagement />} />
                <Route path="elderly" element={<ElderlyManagement />} />
                <Route path="medications" element={<MedicationManagement />} />
                <Route path="rations" element={<RationManagement />} />
                <Route path="donations" element={<DonationManagement />} />
                <Route path="volunteers" element={<VolunteerManagement />} />
                <Route path="attendance/staff" element={<StaffAttendance />} />
                <Route path="attendance/elderly" element={<ElderlyAttendance />} />
                <Route path="attendance/reports" element={<AttendanceReports />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  );
}
