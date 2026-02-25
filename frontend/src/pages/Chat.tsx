import React from 'react';
import ChatWidget from '../components/ChatWidget';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

const Chat: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-primary-100 rounded-2xl text-primary-600 mb-2">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{t('chat')}</h2>
        <p className="text-gray-500">Ask me anything about HR policies, your leave balance, or performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <ChatWidget />
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-sm mb-3">Quick Queries</h4>
            <div className="space-y-2">
              {[
                'My leave balance',
                'Office dress code',
                'Insurance benefits',
                'Upcoming holidays'
              ].map(q => (
                <button key={q} className="w-full text-left p-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-colors border border-transparent hover:border-primary-100">
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
            <div className="flex items-center text-primary-700 font-bold text-xs mb-2">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Private & Secure
            </div>
            <p className="text-[10px] text-primary-600 leading-relaxed">
              All conversations are encrypted and only accessible to you and authorized HR personnel for audit purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
