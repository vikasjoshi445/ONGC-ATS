import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Save, Play } from 'lucide-react';

export const FilteringPage: React.FC = () => {
  const [settings, setSettings] = useState({
    requireIndianCitizenship: true,
    requireDehradunCitizenship: true,
    minimumSGPA: 6.0,
    prioritizeONGCWards: true,
    collegeRanking: 'IIT,NIT,Government,Private'
  });

  const handleSave = () => {
    // Save settings logic
    console.log('Saving settings:', settings);
  };

  const handleApplyFilters = () => {
    // Apply filters logic
    console.log('Applying filters:', settings);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <TopBar 
        title="Filtering" 
        subtitle="Configure applicant filtering and ranking criteria"
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Eligibility Criteria */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Eligibility Criteria</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Require Indian Citizenship</h3>
                    <p className="text-sm text-gray-600">Only include Indian citizens in the selection process</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireIndianCitizenship}
                      onChange={(e) => setSettings({...settings, requireIndianCitizenship: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Require Dehradun Citizenship</h3>
                    <p className="text-sm text-gray-600">Only include Dehradun citizens for local preference</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.requireDehradunCitizenship}
                      onChange={(e) => setSettings({...settings, requireDehradunCitizenship: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block font-medium text-gray-900 mb-2">Minimum SGPA/Percentage</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={settings.minimumSGPA}
                    onChange={(e) => setSettings({...settings, minimumSGPA: parseFloat(e.target.value)})}
                    className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-1">Minimum SGPA required for eligibility (leave empty for no minimum)</p>
                </div>
              </div>
            </div>

            {/* Ranking Criteria */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Ranking Criteria</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Prioritize ONGC Wards</h3>
                    <p className="text-sm text-gray-600">Give highest priority to ONGC ward children</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.prioritizeONGCWards}
                      onChange={(e) => setSettings({...settings, prioritizeONGCWards: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block font-medium text-gray-900 mb-2">College Type Ranking</label>
                  <input
                    type="text"
                    value={settings.collegeRanking}
                    onChange={(e) => setSettings({...settings, collegeRanking: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-1">Comma-separated list of college types in order of preference (highest to lowest)</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Ranking Priority Order:</h4>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. IIT</li>
                  <li>2. NIT</li>
                  <li>3. Government</li>
                  <li>4. Private</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Actions & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
                
                <button
                  onClick={handleApplyFilters}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>

            {/* Current Filter Status */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Filter Status</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Indian Citizens</span>
                  <span className="text-sm font-medium text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dehradun Citizens</span>
                  <span className="text-sm font-medium text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ONGC Ward Priority</span>
                  <span className="text-sm font-medium text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Min SGPA</span>
                  <span className="text-sm font-medium text-gray-900">6.0</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">College Ranking:</h4>
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">1. IIT</div>
                  <div className="text-xs text-gray-600">2. NIT</div>
                  <div className="text-xs text-gray-600">3. Government</div>
                  <div className="text-xs text-gray-600">4. Private</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};