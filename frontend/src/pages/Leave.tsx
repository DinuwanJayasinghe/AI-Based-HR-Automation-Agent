import React from 'react';
import { useTranslation } from 'react-i18next';
import LeaveForm from '../components/LeaveForm';
import { Info, CheckCircle, Clock, XCircle } from 'lucide-react';

const Leave: React.FC = () => {
  const { t } = useTranslation();

  const balances = [
    { type: 'Annual', used: 12, total: 24, color: 'bg-blue-500' },
    { type: 'Sick', used: 4, total: 10, color: 'bg-rose-500' },
    { type: 'Casual', used: 2, total: 7, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('leave')} Management</h2>
        <p className="text-gray-500">Submit leave requests and track your remaining balance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {balances.map((b) => (
          <div key={b.type} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-700">{b.type} Leave</span>
              <span className="text-xs font-medium text-gray-400">{b.used}/{b.total} Days</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${b.color} transition-all duration-1000`}
                style={{ width: `${(b.used / b.total) * 100}%` }}
              ></div>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              <span className="font-bold text-gray-900">{b.total - b.used}</span> days remaining
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LeaveForm />

        <div className="glass-card p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-6">Application History</h3>
          <div className="space-y-6">
            {[
              { type: 'Annual', date: 'Oct 12 - Oct 14', status: 'Approved', ai: 'Request is within policy.' },
              { type: 'Sick', date: 'Sep 05 - Sep 06', status: 'Approved', ai: 'Medical certificate verified.' },
              { type: 'Casual', date: 'Aug 20', status: 'Rejected', ai: 'Insufficient team coverage.' },
            ].map((request, i) => (
              <div key={i} className="flex space-x-4">
                <div className="shrink-0 mt-1">
                  {request.status === 'Approved' ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-sm text-gray-900 dark:text-slate-100">{request.type} Leave</p>
                    <span className="text-xs text-gray-400">{request.date}</span>
                  </div>
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border dark:border-slate-700">
                    <div className="flex items-center text-[10px] font-bold text-primary-600 mb-1 uppercase tracking-wider">
                      <Info className="w-3 h-3 mr-1" />
                      AI Explanation
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{request.ai}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leave;
