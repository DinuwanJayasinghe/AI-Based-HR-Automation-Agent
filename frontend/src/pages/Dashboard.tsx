import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Calendar, BarChart3, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { useWebSockets } from '../hooks/useWebSockets';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { lastMessage } = useWebSockets();
  const [recentAttendance, setRecentAttendance] = useState<any[]>([
    { employee_name: 'Employee 1', timestamp: '08:00 AM', status: 'On Time' },
    { employee_name: 'Employee 2', timestamp: '08:15 AM', status: 'On Time' },
    { employee_name: 'Employee 3', timestamp: '08:30 AM', status: 'On Time' },
  ]);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'dashboard_update' && lastMessage.event === 'attendance_marked') {
      setRecentAttendance((prev) => [
        {
          employee_name: lastMessage.data.employee_name,
          timestamp: new Date().toLocaleTimeString(),
          status: 'Just now'
        },
        ...prev.slice(0, 2)
      ]);
    }
  }, [lastMessage]);

  const stats = [
    { label: 'Active Employees', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2.4%' },
    { label: 'Pending Leaves', value: '14', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50', trend: '-5.2%' },
    { label: 'Average Performance', value: '88.4%', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+1.8%' },
    { label: 'Clocked In Today', value: '942', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+12%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Morning, John 👋</h2>
        <p className="text-gray-500">Here's what's happening in your organization today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-2xl premium-shadow hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-lg ${
                stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Attendance */}
        <div className="lg:col-span-2 glass-card rounded-2xl premium-shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Live Attendance Feed</h3>
            <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="pb-4 font-semibold">Employee</th>
                  <th className="pb-4 font-semibold">Time</th>
                  <th className="pb-4 font-semibold">Department</th>
                  <th className="pb-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentAttendance.map((att, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs mr-3">
                          {att.employee_name.charAt(0)}
                        </div>
                        <span className="font-medium text-sm text-gray-900">{att.employee_name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-500">{att.timestamp}</td>
                    <td className="py-4 text-sm text-gray-500">Engineering</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        att.status === 'On Time' || att.status === 'Just now'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}>
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="glass-card rounded-2xl premium-shadow p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-900">Priority Alerts</h3>
          <div className="space-y-4">
            <div className="flex p-4 bg-rose-50 border border-rose-100 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mr-3" />
              <div>
                <p className="text-sm font-bold text-rose-900">Unrecognized Face</p>
                <p className="text-xs text-rose-700 mt-1">An unknown face was detected at Entry Gate A at 10:42 AM.</p>
              </div>
            </div>
            <div className="flex p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mr-3" />
              <div>
                <p className="text-sm font-bold text-amber-900">Attendance Anomalies</p>
                <p className="text-xs text-amber-700 mt-1">4 employees from Sales department have missing clock-out records.</p>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full py-3 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
                View Security Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
