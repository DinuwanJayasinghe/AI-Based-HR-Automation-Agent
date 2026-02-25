import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight } from 'lucide-react';
import i18n from '../locales/i18n';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Mock login success
    localStorage.setItem('token', 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700 rounded-full -ml-48 -mb-48 opacity-30 blur-3xl"></div>

        <div className="relative z-10 text-white max-w-md">
          <h1 className="text-5xl font-bold mb-6">AI-Powered HR Excellence.</h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            Automating core HR processes with cutting-edge AI, facial recognition, and smart policy reasoning.
          </p>
          <div className="mt-12 flex space-x-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-3xl font-bold">5,000+</p>
              <p className="text-sm text-primary-200">Employees Managed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm text-primary-200">AI Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white shadow-2xl z-20">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome')}</h2>
            <p className="text-gray-500">Please enter your credentials to access the system.</p>
          </div>

          <div className="flex justify-center lg:justify-start space-x-2 mb-8">
            {['en', 'si', 'ta'].map((lang) => (
              <button
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  i18n.language === lang
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...register('password')}
                    type="password"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-500">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 px-4 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition-all duration-200 group"
            >
              {t('login')}
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="font-bold text-primary-600 hover:text-primary-500">Contact HR</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
