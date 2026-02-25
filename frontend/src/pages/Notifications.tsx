import React from 'react';
import { Bell, Check, Trash2, Info, AlertTriangle, AlertCircle } from 'lucide-react';

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, title: 'Unrecognized Face Detected', body: 'A security alert was triggered at South Entrance.', type: 'error', time: '10 mins ago' },
    { id: 2, title: 'Leave Application Approved', body: 'Your annual leave for next week has been approved by AI.', type: 'info', time: '1 hour ago' },
    { id: 3, title: 'Performance Review Ready', body: 'Monthly evaluation for May 2024 is now available.', type: 'info', time: '5 hours ago' },
    { id: 4, title: 'System Maintenance', body: 'Servers will be down for 2 hours this Sunday.', type: 'warning', time: '1 day ago' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
          <p className="text-gray-500">Stay updated with the latest organizational events.</p>
        </div>
        <button className="text-sm font-bold text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {notifications.map((n) => (
          <div key={n.id} className="p-6 flex space-x-4 hover:bg-gray-50/50 transition-colors group">
            <div className={`shrink-0 p-3 rounded-2xl ${
              n.type === 'error' ? 'bg-rose-50 text-rose-600' :
              n.type === 'warning' ? 'bg-amber-50 text-amber-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              {n.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
               n.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
               <Info className="w-5 h-5" />}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900">{n.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{n.body}</p>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{n.time}</span>
              </div>
              <div className="mt-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-bold text-primary-600 flex items-center">
                  <Check className="w-3 h-3 mr-1" />
                  Mark as Read
                </button>
                <button className="text-[10px] font-bold text-rose-600 flex items-center">
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
