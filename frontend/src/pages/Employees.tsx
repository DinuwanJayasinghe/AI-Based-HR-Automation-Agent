import React, { useState, useEffect } from 'react';
import { Search, UserPlus, MoreVertical, Mail, Phone, MapPin } from 'lucide-react';

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    // Mock fetching employees
    setEmployees([
      { id: 1, name: 'John Developer', email: 'john@example.com', dept: 'Engineering', role: 'Senior Dev', status: 'Active' },
      { id: 2, name: 'Jane HR', email: 'jane@example.com', dept: 'HR', role: 'Specialist', status: 'Active' },
      { id: 3, name: 'Robert Sales', email: 'rob@example.com', dept: 'Sales', role: 'Manager', status: 'On Leave' },
    ]);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Employee Directory</h2>
          <p className="text-gray-500">Manage your workforce lifecycle and profiles.</p>
        </div>
        <button className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
          <UserPlus className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by name, department, or role..."
              className="w-full bg-gray-50 border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg border border-gray-100">All Depts</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg border border-gray-100">Active Only</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Department / Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold mr-3 border-2 border-white shadow-sm">
                        {emp.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-400">ID: EMP-{1000 + emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">{emp.role}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {emp.dept}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
