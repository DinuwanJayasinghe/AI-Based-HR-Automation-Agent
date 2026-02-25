import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Users, Calendar, BarChart3,
  MessageSquare, Briefcase, FileText, Bell, LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    { name: t('dashboard'), icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Employees', icon: Users, path: '/employees' },
    { name: 'Departments', icon: FileText, path: '/departments' },
    { name: t('attendance'), icon: Users, path: '/attendance' },
    { name: t('leave'), icon: Calendar, path: '/leave' },
    { name: t('performance'), icon: BarChart3, path: '/performance' },
    { name: 'Salary & Payslips', icon: FileText, path: '/salary' },
    { name: 'Recruitment', icon: Briefcase, path: '/recruitment' },
    { name: t('chat'), icon: MessageSquare, path: '/chat' },
    { name: 'Reports', icon: FileText, path: '/reports' },
  ];

  return (
    <div className="w-64 glass-sidebar h-screen flex flex-col sticky top-0 z-20">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            H
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            AI HR Manager
          </h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-xl transition-all duration-200
              ${isActive
                ? 'bg-primary-50 text-primary-600 shadow-sm'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center w-full px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
