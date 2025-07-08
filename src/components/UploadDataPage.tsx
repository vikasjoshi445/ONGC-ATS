import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Upload, FileText, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UploadDataPageProps {
  stats: any;
}

export const UploadDataPage: React.FC<UploadDataPageProps> = ({ stats }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please select a CSV file');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload/csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Successfully processed ${data.count} applicants`);
        setFile(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Upload failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <TopBar 
        title="Upload Data" 
        subtitle="Import applicant data from CSV files"
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload New Data</h2>
              <p className="text-gray-600 mb-6">Import applicant data from Google Forms or other CSV sources</p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Upload</h3>
                <p className="text-gray-600 mb-4">Upload your CSV file to import new applicant data</p>
                
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose CSV File</span>
                </label>
              </div>

              {file && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">Size: {(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </button>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-700">{success}</span>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Headers: Name, Email, Phone, College, SGPA, Is_ONGC_Ward, Indian_Citizen, Dehradun_Citizen</li>
                  <li>• File size: Maximum 10MB</li>
                  <li>• Format: UTF-8 encoded CSV</li>
                  <li>• Boolean fields: Use "Yes/No" or "True/False"</li>
                </ul>
              </div>
            </div>

            {/* Upload History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload History</h2>
              <p className="text-gray-600 mb-6">View previous data uploads and their status</p>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">internship_applications_2024.csv</h4>
                  <p className="text-sm text-gray-600">1,847 records • 2024-01-15 10:30:00</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">Completed</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Current Data Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Data</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Total Applicants</span>
                  </div>
                  <span className="font-semibold text-gray-900">{stats?.total || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Eligible</span>
                  </div>
                  <span className="font-semibold text-green-600">{stats?.by_status?.Verified || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700">ONGC Wards</span>
                  </div>
                  <span className="font-semibold text-orange-600">{stats?.quota_fulfillment?.reserved_shortlisted || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};