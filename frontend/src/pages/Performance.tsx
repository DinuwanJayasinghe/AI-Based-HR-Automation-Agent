import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { Award, Zap, TrendingUp, Info } from 'lucide-react';

const data = [
  { name: 'Jan', score: 82 },
  { name: 'Feb', score: 85 },
  { name: 'Mar', score: 84 },
  { name: 'Apr', score: 90 },
  { name: 'May', score: 88 },
  { name: 'Jun', score: 92 },
];

const Performance: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Performance</h2>
        <p className="text-gray-500">Track your objectives, punctuality, and AI-generated evaluations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl mr-4">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Overall Score</p>
            <p className="text-2xl font-bold text-gray-900">92.4%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mr-4">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Punctuality</p>
            <p className="text-2xl font-bold text-gray-900">98.1%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mr-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Efficiency</p>
            <p className="text-2xl font-bold text-gray-900">89.5%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6">Performance Trend (6 Months)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-900">AI Monthly Evaluation</h3>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary-100 rounded-bl-full opacity-30"></div>
              <p className="text-xs font-bold text-primary-600 mb-1">JUNE 2024</p>
              <p className="text-sm font-bold text-gray-900 mb-2">Outstanding Performance</p>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "John has shown exceptional growth in technical leadership this month. His contribution to the new architecture was pivotal."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400">SCORE: 92/100</span>
                <button className="text-[10px] font-bold text-primary-600 hover:underline">Full Report</button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-gray-200">
              <div className="flex items-start">
                <Info className="w-4 h-4 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-xs font-bold text-gray-700">Appeal Status</p>
                  <p className="text-[10px] text-gray-500 mt-1">You have no pending appeals for your current evaluations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
