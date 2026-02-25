import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle2 } from 'lucide-react';

const LeaveForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/v1/leave/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      setResult(resData);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-6">{t('leave')} Application</h3>
      {!result ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
            <select
              {...register('leave_type_id')}
              className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all"
            >
              <option value="550e8400-e29b-41d4-a716-446655440000">Annual Leave</option>
              <option value="6ba7b810-9dad-11d1-80b4-00c04fd430c8">Sick Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" {...register('start_date')} className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="date" {...register('end_date')} className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea {...register('reason')} rows={3} className="w-full bg-gray-50 border-gray-100 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all" />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Apply with AI Review'}
          </button>
        </form>
      ) : (
        <div className="text-center py-8 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h4 className="text-xl font-bold text-gray-900">Application Submitted</h4>
          <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 text-left">
            <p className="text-xs font-bold text-primary-700 uppercase mb-2">AI Decision: {result.ai_decision}</p>
            <p className="text-sm text-primary-600 leading-relaxed">{result.ai_explanation}</p>
          </div>
          <button
            onClick={() => setResult(null)}
            className="text-primary-600 font-bold text-sm hover:underline"
          >
            Submit another request
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveForm;
