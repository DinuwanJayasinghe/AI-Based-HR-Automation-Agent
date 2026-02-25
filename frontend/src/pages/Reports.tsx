import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { FileDown, Filter, Calendar } from 'lucide-react';

const attendanceData = [
  { name: 'Mon', present: 94 },
  { name: 'Tue', present: 96 },
  { name: 'Wed', present: 88 },
  { name: 'Thu', present: 92 },
  { name: 'Fri', present: 90 },
];

const leaveData = [
  { name: 'Annual', value: 45 },
  { name: 'Sick', value: 15 },
  { name: 'Casual', value: 25 },
  { name: 'Maternity', value: 15 },
];

const salaryCostData = [
  { month: 'Jan', cost: 1.2 },
  { month: 'Feb', cost: 1.3 },
  { month: 'Mar', cost: 1.25 },
  { month: 'Apr', cost: 1.4 },
  { month: 'May', cost: 1.45 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'];

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h2>
          <p className="text-gray-500">Comprehensive overview of organization-wide HR metrics.</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all">
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-2xl premium-shadow">
          <h3 className="text-lg font-bold mb-6">Salary Cost Summary (Millions LKR)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salaryCostData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Area type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl premium-shadow">
          <h3 className="text-lg font-bold mb-6 flex justify-between items-center">
            Attendance Rate (%)
            <span className="text-xs font-normal text-gray-400">Weekly View</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="present" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl premium-shadow">
          <h3 className="text-lg font-bold mb-6">Leave Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {leaveData.map((item, i) => (
              <div key={item.name} className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-gray-500 font-medium">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
