import React from 'react';
import { TopBar } from './TopBar';
import { 
  FileText, 
  Users, 
  Award, 
  Mail, 
  Upload, 
  Filter as FilterIcon, 
  Send,
  TrendingUp,
  CheckCircle,
  Crown,
  Plane
} from 'lucide-react';

interface DashboardHomeProps {
  stats: any;
  onUpload: () => void;
  onNavigate: (path: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ 
  stats, 
  onUpload, 
  onNavigate 
}) => {
  const statCards = [
    {
      title: 'Total Applications',
      value: stats?.total || 0,
      icon: FileText,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      subtitle: '12% from last cycle',
      subtitleColor: 'text-blue-600'
    },
    {
      title: 'Eligible Candidates',
      value: stats?.by_status?.Verified || 0,
      icon: Users,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      subtitle: '0% pass rate',
      subtitleColor: 'text-green-600'
    },
    {
      title: 'ONGC Wards',
      value: stats?.quota_fulfillment?.reserved_shortlisted || 0,
      icon: Crown,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      subtitle: 'Priority candidates',
      subtitleColor: 'text-orange-600'
    },
    {
      title: 'Emails Sent',
      value: 0,
      icon: Plane,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      subtitle: '95% delivery rate',
      subtitleColor: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Upload New Data',
      icon: Upload,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: onUpload
    },
    {
      title: 'Apply Filters',
      icon: FilterIcon,
      color: 'bg-green-600 hover:bg-green-700',
      onClick: () => onNavigate('/filtering')
    },
    {
      title: 'Send Emails',
      icon: Send,
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => onNavigate('/email')
    }
  ];

  const activeFilters = [
    { label: 'Dehradun Citizens Only', color: 'bg-blue-100 text-blue-800' },
    { label: 'Indian Citizens Only', color: 'bg-green-100 text-green-800' },
    { label: 'ONGC Wards Priority', color: 'bg-orange-100 text-orange-800' },
    { label: 'College Ranking: IIT > NIT > Government > Private', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <TopBar 
        title="Dashboard" 
        subtitle="Manage internship applications and selections"
      />
      
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                    <span className={`text-sm ${card.subtitleColor}`}>{card.subtitle}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${card.iconBg}`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`${action.color} text-white p-6 rounded-lg transition-colors flex items-center justify-center space-x-3`}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-medium">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Filters</h2>
            <button 
              onClick={() => onNavigate('/filtering')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit Filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${filter.color}`}
              >
                {filter.label}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search applicants..."
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                    <th className="pb-3">Applicant</th>
                    <th className="pb-3">College</th>
                    <th className="pb-3">SGPA</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-8 text-center text-gray-500" colSpan={6}>
                      Showing 1 to 0 of 0 results
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                <span>Previous</span>
              </button>
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