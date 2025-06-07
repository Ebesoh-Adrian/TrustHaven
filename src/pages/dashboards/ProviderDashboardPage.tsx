// trusthaven-frontend/src/pages/dashboards/CreatorDashboardPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout';
import { PlusCircle, Home, TrendingUp } from 'lucide-react'; // Example icons

const CreatorDashboardPage = () => {
  const { userProfile } = useAuth();

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Hello, <span className="text-primary">{userProfile?.username || 'Pioneer'}</span>!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your listings and grow your presence on TrustHaven.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Create New Listing */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-primary">
            <PlusCircle className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Post a New Property</h3>
            <p className="text-gray-600 mb-4">Add new properties for sale or rent to your portfolio.</p>
            <Link to="/create-listing" className="bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-primary-dark transition-colors duration-200">
              Create Listing
            </Link>
          </div>

          {/* Card 2: My Listings */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-indigo-500">
            <Home className="w-16 h-16 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">View My Listings</h3>
            <p className="text-gray-600 mb-4">Manage, update, and track your active properties.</p>
            <Link to="/my-listings" className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-600 transition-colors duration-200">
              Manage Listings
            </Link>
          </div>

          {/* Card 3: Performance Insights */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-teal-500">
            <TrendingUp className="w-16 h-16 text-teal-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Performance Insights</h3>
            <p className="text-gray-600 mb-4">See how your listings are performing and attracting views.</p>
            <Link to="/performance" className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-teal-600 transition-colors duration-200">
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatorDashboardPage;