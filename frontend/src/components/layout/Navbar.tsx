import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Globe } from 'lucide-react';
import i18n from '../../locales/i18n';

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search something..."
          className="w-full bg-gray-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* Language Switcher */}
        <div className="flex items-center bg-gray-50 rounded-lg p-1">
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

        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">HR Administrator</p>
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
