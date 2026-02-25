import React, { useState, useEffect } from 'react';
import {
  DollarSign, Download, Play, History, TrendingUp,
  PlusCircle, AlertCircle, FileCheck
} from 'lucide-react';

const Salary: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    setHistory([
      { id: 1, month: 'May 2024', base: 85000, ot: 12400, bonus: 5000, deductions: 2000, net: 100400, status: 'Paid' },
      { id: 2, month: 'Apr 2024', base: 85000, ot: 8200, bonus: 0, deductions: 1500, net: 91700, status: 'Paid' },
      { id: 3, month: 'Mar 2024', base: 85000, ot: 10500, bonus: 2000, deductions: 0, net: 97500, status: 'Paid' },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Salary & Compensation</h2>
          <p className="text-gray-500">Automated salary computation and payslip management.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Compensation
          </button>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center shadow-lg shadow-primary-200">
            <Play className="w-4 h-4 mr-2" />
            Process Monthly Salary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-2xl font-bold text-gray-900">LKR 1.4M</p>
          <p className="text-xs text-gray-500 font-medium">Total Monthly Outflow</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-2xl font-bold text-gray-900">LKR 42.5K</p>
          <p className="text-xs text-gray-500 font-medium">Avg Salary Per Staff</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl w-fit mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-xs text-gray-500 font-medium">Pending Compensations</p>
        </div>
        <div className="glass-card p-6 rounded-2xl">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit mb-4">
            <FileCheck className="w-6 h-6" />
          </div>
          <p className="text-2xl font-bold text-gray-900">98%</p>
          <p className="text-xs text-gray-500 font-medium">Payslips Generated</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Salary Records</h3>
          <button className="text-sm font-bold text-primary-600 hover:underline flex items-center">
            <History className="w-4 h-4 mr-1" />
            View Full Archive
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Base Salary</th>
                <th className="px-6 py-4">OT & Bonus</th>
                <th className="px-6 py-4">Deductions</th>
                <th className="px-6 py-4">Net Salary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{rec.month}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">LKR {rec.base.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">+LKR {(rec.ot + rec.bonus).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-rose-500 font-medium">-LKR {rec.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">LKR {rec.net.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all shadow-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;
