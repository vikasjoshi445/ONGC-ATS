import React from 'react';
import { Bell, RefreshCw } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle: string;
  showNotification?: boolean;
  onRefresh?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  title, 
  subtitle, 
  showNotification = true,
  onRefresh 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          )}
          
          {showNotification && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Last sync:</span> 2 minutes ago
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};