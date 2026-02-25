import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, Calendar, BarChart3, MessageSquare, Bell } from 'lucide-react';
import i18n from '../locales/i18n';
import { useWebSockets } from '../hooks/useWebSockets';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { lastMessage } = useWebSockets();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [recentAttendance, setRecentAttendance] = useState<any[]>([
    { employee_name: 'Employee 1', timestamp: '08:00 AM', status: 'On Time' },
    { employee_name: 'Employee 2', timestamp: '08:15 AM', status: 'On Time' },
    { employee_name: 'Employee 3', timestamp: '08:30 AM', status: 'On Time' },
  ]);

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.type === 'notification') {
        setNotifications((prev) => [lastMessage.data, ...prev]);
        console.log('New Notification:', lastMessage.data);
      } else if (lastMessage.type === 'dashboard_update') {
        if (lastMessage.event === 'attendance_marked') {
          setRecentAttendance((prev) => [
            {
              employee_name: lastMessage.data.employee_name,
              timestamp: new Date().toLocaleTimeString(),
              status: 'Just now'
            },
            ...prev.slice(0, 2)
          ]);
        }
      }
    }
  }, [lastMessage]);

  const stats = [
    { label: 'Active Employees', value: '124', icon: Users, color: 'text-blue-600' },
    { label: 'Pending Leaves', value: '8', icon: Calendar, color: 'text-yellow-600' },
    { label: 'Avg Performance', value: '84%', icon: BarChart3, color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary-600">AI HR Manager</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: t('dashboard'), icon: LayoutDashboard },
            { name: t('attendance'), icon: Users },
            { name: t('leave'), icon: Calendar },
            { name: t('performance'), icon: BarChart3 },
            { name: t('chat'), icon: MessageSquare },
            { name: t('recruitment'), icon: Users },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{t('dashboard')}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2 mr-4">
              {['en', 'si', 'ta'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-2 py-1 text-xs font-bold rounded ${
                    i18n.language === lang ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="p-2 text-gray-500 hover:text-primary-600">
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity / Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">Recent Attendance</h3>
            <div className="space-y-4">
              {recentAttendance.map((att, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">{att.employee_name}</p>
                      <p className="text-xs text-gray-500">{att.timestamp}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">{att.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4">AI Assistant</h3>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              {t('chat')} interface goes here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
