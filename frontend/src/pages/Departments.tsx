import React, { useState, useEffect } from 'react';
import { Building2, Users, Search, Plus } from 'lucide-react';

const Departments: React.FC = () => {
  const [depts, setDepts] = useState<any[]>([]);

  useEffect(() => {
    setDepts([
      { id: 1, name: 'Engineering', head: 'Alice Tech', staff: 42, budget: '$2.4M' },
      { id: 2, name: 'Human Resources', head: 'Jane HR', staff: 8, budget: '$0.8M' },
      { id: 3, name: 'Sales', head: 'Robert Deal', staff: 25, budget: '$1.2M' },
      { id: 4, name: 'Marketing', head: 'Sarah Brand', staff: 12, budget: '$1.0M' },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Departments</h2>
          <p className="text-gray-500">Organize and manage your organizational structure.</p>
        </div>
        <button className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center shadow-lg shadow-primary-200">
          <Plus className="w-5 h-5 mr-2" />
          New Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {depts.map((dept) => (
          <div key={dept.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-gray-400">ID: DEP-{100 + dept.id}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{dept.name}</h3>
            <p className="text-xs text-gray-500 mb-4">Head: <span className="font-medium text-gray-700">{dept.head}</span></p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center text-xs text-gray-500">
                <Users className="w-3 h-3 mr-1" />
                {dept.staff} Staff
              </div>
              <span className="text-xs font-bold text-emerald-600">{dept.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
