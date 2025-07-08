import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { DashboardHome } from './DashboardHome';
import { UploadDataPage } from './UploadDataPage';
import { ApplicantsPage } from './ApplicantsPage';
import { FilteringPage } from './FilteringPage';
import { EmailCampaignPage } from './EmailCampaignPage';
import { UploadModal } from './UploadModal';
import { Stats } from './Dashboard';

export const MainLayout: React.FC = () => {
  const { user, logout, token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/applicants/stats/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} onLogout={logout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardHome 
                stats={stats} 
                onUpload={() => setShowUploadModal(true)}
                onNavigate={handleNavigate}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <DashboardHome 
                stats={stats} 
                onUpload={() => setShowUploadModal(true)}
                onNavigate={handleNavigate}
              />
            } 
          />
          <Route 
            path="/upload" 
            element={<UploadDataPage stats={stats} />} 
          />
          <Route 
            path="/applicants" 
            element={<ApplicantsPage />} 
          />
          <Route 
            path="/filtering" 
            element={<FilteringPage />} 
          />
          <Route 
            path="/email" 
            element={<EmailCampaignPage />} 
          />
          <Route 
            path="/reports" 
            element={
              <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reports</h2>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>

      {showUploadModal && (
        <UploadModal 
          isOpen={showUploadModal} 
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={() => {
            fetchStats();
            setShowUploadModal(false);
          }}
        />
      )}
    </div>
  );
};