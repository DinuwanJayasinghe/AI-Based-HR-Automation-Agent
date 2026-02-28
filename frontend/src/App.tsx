import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Performance from './pages/Performance';
import Chat from './pages/Chat';
import Employees from './pages/Employees';
import Recruitment from './pages/Recruitment';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Salary from './pages/Salary';
import Departments from './pages/Departments';
import MainLayout from './components/layout/MainLayout';
import { Toaster } from 'react-hot-toast';
import './locales/i18n';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  // Simple auth check for now, in production use actual token check
  const token = localStorage.getItem('token');
  return token ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path="/leave" element={<PrivateRoute><Leave /></PrivateRoute>} />
          <Route path="/performance" element={<PrivateRoute><Performance /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/employees" element={<PrivateRoute><Employees /></PrivateRoute>} />
          <Route path="/recruitment" element={<PrivateRoute><Recruitment /></PrivateRoute>} />
          <Route path="/salary" element={<PrivateRoute><Salary /></PrivateRoute>} />
          <Route path="/departments" element={<PrivateRoute><Departments /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
