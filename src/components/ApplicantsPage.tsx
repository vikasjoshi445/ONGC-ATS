import React, { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { Filter, Search, Download, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Applicant } from './Dashboard';

export const ApplicantsPage: React.FC = () => {
  const { token } = useAuth();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    college: '',
    applicant: '',
    location: '',
    nationality: ''
  });

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const response = await fetch(`/api/applicants?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setApplicants(data);
      }
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [filters, token]);

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.present_institute.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50">
      <TopBar 
        title="Applicants" 
        subtitle="View and manage all internship applications"
        onRefresh={fetchApplicants}
      />
      
      <div className="p-6">
        {/* Filters Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button 
              onClick={fetchApplicants}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Verified">Verified</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <select
              value={filters.college}
              onChange={(e) => setFilters({...filters, college: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Colleges</option>
              <option value="IIT">IIT</option>
              <option value="NIT">NIT</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
            
            <select
              value={filters.applicant}
              onChange={(e) => setFilters({...filters, applicant: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Applicants</option>
              <option value="General">General</option>
              <option value="ONGC Ward">ONGC Ward</option>
            </select>
            
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Other">Other</option>
            </select>
            
            <select
              value={filters.nationality}
              onChange={(e) => setFilters({...filters, nationality: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Nationalities</option>
              <option value="Indian">Indian</option>
              <option value="Foreign">Foreign</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applicants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="px-6 py-3">Applicant</th>
                  <th className="px-6 py-3">College</th>
                  <th className="px-6 py-3">SGPA</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mr-2" />
                        <span className="text-gray-500">Loading applicants...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Showing 1 to 0 of 0 results
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((applicant) => (
                    <tr key={applicant._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{applicant.name}</div>
                          <div className="text-sm text-gray-500">{applicant.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{applicant.present_institute}</div>
                        <div className="text-sm text-gray-500">{applicant.areas_of_training}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{applicant.last_sem_sgpa}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          applicant.status === 'Selected' ? 'bg-green-100 text-green-800' :
                          applicant.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' :
                          applicant.status === 'Verified' ? 'bg-yellow-100 text-yellow-800' :
                          applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {applicant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {applicant.quota_category === 'Reserved' && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                            ONGC Ward
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                <span>Previous</span>
              </button>
              <span className="text-sm text-gray-500">
                Showing {filteredApplicants.length} of {applicants.length} results
              </span>
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                <span>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};