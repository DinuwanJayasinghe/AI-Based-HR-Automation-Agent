import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Globe, Moon, Sun, AlertCircle } from 'lucide-react';
import i18n from '../../locales/i18n';
import { useTheme } from '../../hooks/useTheme';
import Modal from '../Modal';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors duration-300">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search something..."
          className="w-full bg-gray-50 dark:bg-slate-800 dark:text-slate-200 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-all"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-lg p-1">
          {['en', 'si', 'ta'].map((lang) => (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                i18n.language === lang
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsNotifOpen(true)}
          className="relative p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-all"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <Modal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} title="Notification Center" maxWidth="max-w-md">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 border dark:border-slate-700">
                <AlertCircle className="w-5 h-5 text-primary-600 mr-3 shrink-0" />
                <div>
                  <p className="text-sm font-bold">System Update {i}</p>
                  <p className="text-xs text-gray-500">A new security patch has been applied to the facial recognition module.</p>
                  <p className="text-[10px] text-gray-400 mt-2">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Modal>

        <div className="flex items-center space-x-3 pl-4 border-l dark:border-slate-800">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900 dark:text-slate-100">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">HR Administrator</p>
          </div>
          <div className="w-10 h-10 bg-primary-100 rounded-full border-2 border-primary-50 flex items-center justify-center text-primary-700 font-bold overflow-hidden shadow-inner">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
