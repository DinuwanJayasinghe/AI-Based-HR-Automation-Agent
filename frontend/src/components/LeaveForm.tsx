import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const LeaveForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // POST /api/v1/leave/apply
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-6">{t('leave')} Application</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <select
            {...register('leave_type_id')}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="1">Annual Leave</option>
            <option value="2">Sick Leave</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" {...register('start_date')} className="w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="date" {...register('end_date')} className="w-full border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
          <textarea {...register('reason')} rows={3} className="w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-md font-bold hover:bg-primary-700">
          Apply with AI Review
        </button>
      </form>
    </div>
  );
};

export default LeaveForm;
