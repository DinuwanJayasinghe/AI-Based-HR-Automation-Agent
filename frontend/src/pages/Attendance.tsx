import React from 'react';
import AttendanceCamera from '../components/AttendanceCamera';
import { useTranslation } from 'react-i18next';
import { History, MapPin, UserCheck } from 'lucide-react';

const Attendance: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('attendance')}</h2>
        <p className="text-gray-500">Mark your daily attendance using facial recognition.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AttendanceCamera />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <History className="w-5 h-5 mr-2 text-primary-600" />
              Recent Logs
            </h3>
            <div className="space-y-4">
              {[
                { time: '08:30 AM', status: 'In', date: 'Today' },
                { time: '05:45 PM', status: 'Out', date: 'Yesterday' },
                { time: '08:15 AM', status: 'In', date: 'Yesterday' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{log.date}</p>
                    <p className="text-xs text-gray-500">{log.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    log.status === 'In' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    CLOCK {log.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <MapPin className="w-6 h-6 opacity-80" />
              <UserCheck className="w-6 h-6 opacity-80" />
            </div>
            <p className="text-sm opacity-90 mb-1">Attendance Score</p>
            <p className="text-3xl font-bold">94%</p>
            <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[94%] shadow-[0_0_8px_white]"></div>
            </div>
            <p className="text-[10px] mt-2 opacity-80 italic">Top 5% in your department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
