import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Plus } from 'lucide-react';

const Recruitment: React.FC = () => {
  const jobs = [
    { id: 1, title: 'Senior Software Engineer', dept: 'Engineering', type: 'Full-time', salary: '$120k - $150k', applicants: 24, status: 'Open' },
    { id: 2, title: 'Product Manager', dept: 'Product', type: 'Full-time', salary: '$110k - $140k', applicants: 18, status: 'Open' },
    { id: 3, title: 'UX Designer', dept: 'Design', type: 'Contract', salary: '$80k - $100k', applicants: 32, status: 'Closing Soon' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recruitment Pipeline</h2>
          <p className="text-gray-500">Manage job postings and AI-screened candidates.</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-5 h-5 mr-2" />
          Create Job Posting
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary-200 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    <span className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.dept}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {job.type}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {job.salary}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{job.applicants}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Applicants</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    job.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors border border-gray-100">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recruitment;
