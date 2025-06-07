// trusthaven-frontend/src/pages/dashboards/GuardianDashboardPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import { Users, ClipboardList, Settings } from 'lucide-react'; // Example icons

const GuardianDashboardPage = () => {
  const { userProfile } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Admin Control Panel, <span className="text-primary">{userProfile?.username || 'Guardian'}</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Full oversight and management of the TrustHaven platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Manage Users */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-primary">
            <Users className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Manage Users</h3>
            <p className="text-gray-600 mb-4">View, edit, and moderate all user accounts.</p>
            <Link to="/admin/users" className="bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-primary-dark transition-colors duration-200">
              Go to Users
            </Link>
          </div>

          {/* Card 2: Moderate Listings */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-orange-500">
            <ClipboardList className="w-16 h-16 text-orange-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Moderate Listings</h3>
            <p className="text-gray-600 mb-4">Review, approve, or suspend property listings.</p>
            <Link to="/admin/listings" className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-orange-600 transition-colors duration-200">
              Moderate Listings
            </Link>
          </div>

          {/* Card 3: System Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-gray-600">
            <Settings className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">System Settings</h3>
            <p className="text-gray-600 mb-4">Configure platform-wide settings and parameters.</p>
            <Link to="/admin/settings" className="bg-gray-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-700 transition-colors duration-200">
              Adjust Settings
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuardianDashboardPage;