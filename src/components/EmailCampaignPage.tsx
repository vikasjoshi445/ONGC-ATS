import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Mail, Send, Users, CheckCircle } from 'lucide-react';

export const EmailCampaignPage: React.FC = () => {
  const [campaign, setCampaign] = useState({
    name: 'e.g. Internship Selection Notification 2024',
    subject: 'ONGC Internship Application Status - Congratulations!',
    template: `Dear {name},

Congratulations! We are pleased to inform you that your application for the ONGC Internship Program has been successful.

Your application details:
- College: {college}
- SGPA: {sgpa}
- Status: Selected

We will contact you shortly with further details regarding the internship program, including:
- Start date and duration
- Reporting location`
  });

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', campaign);
  };

  return (
    <div className="flex-1 bg-gray-50">
      <TopBar 
        title="Email Campaign" 
        subtitle="Create and send email notifications to selected candidates"
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Creation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Create New Campaign</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={campaign.name}
                    onChange={(e) => setCampaign({...campaign, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Internship Selection Notification 2024"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Subject</label>
                  <input
                    type="text"
                    value={campaign.subject}
                    onChange={(e) => setCampaign({...campaign, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Template</label>
                  <textarea
                    value={campaign.template}
                    onChange={(e) => setCampaign({...campaign, template: e.target.value})}
                    rows={12}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Available placeholders: {'{name}'}, {'{college}'}, {'{sgpa}'}, {'{email}'}
                  </p>
                </div>
                
                <button
                  onClick={handleCreateCampaign}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Create Campaign</span>
                </button>
              </div>
            </div>

            {/* Campaign History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Campaign History</h2>
              <p className="text-gray-600 mb-6">View previous email campaigns and their performance</p>
              
              <div className="text-center py-8 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No campaigns sent yet</p>
                <p className="text-sm">Create your first email campaign above</p>
              </div>
            </div>
          </div>

          {/* Recipients & Best Practices */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recipients */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h2>
              
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Eligible Applicants</span>
                <span className="text-sm font-semibold text-green-600">0</span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Breakdown by College:</h4>
                <div className="text-sm text-gray-600">
                  <p>No eligible applicants found</p>
                </div>
              </div>
            </div>

            {/* Email Best Practices */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Best Practices</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Use personalized greetings with {'{name}'}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Include clear next steps and deadlines</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Provide contact information for queries</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Keep the tone professional yet welcoming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};