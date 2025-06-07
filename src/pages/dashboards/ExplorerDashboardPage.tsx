// trusthaven-frontend/src/pages/dashboards/ExplorerDashboardPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../components/layout/MainLayout'; // Import your layout
import { Search, Heart, MessageSquare } from 'lucide-react'; // Example icons

const ExplorerDashboardPage = () => {
  const { userProfile } = useAuth();

  return (
    <MainLayout> {/* Wrap with the consistent layout */}
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome Back, <span className="text-primary">{userProfile?.username || 'Explorer'}</span>!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover your next home, car, or service with confidence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Find Properties */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-primary">
            <Search className="w-16 h-16 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Find Your Dream Property</h3>
            <p className="text-gray-600 mb-4">Browse a wide range of verified listings.</p>
            <Link to="/browse-listings" className="bg-primary text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-primary-dark transition-colors duration-200">
              Start Exploring
            </Link>
          </div>

          {/* Card 2: Saved Listings */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-blue-500">
            <Heart className="w-16 h-16 text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Your Saved Favorites</h3>
            <p className="text-gray-600 mb-4">Revisit properties you've liked and saved.</p>
            <Link to="/my-favorites" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors duration-200">
              View Favorites
            </Link>
          </div>

          {/* Card 3: Inquiries */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center border-t-4 border-green-500">
            <MessageSquare className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Manage Your Inquiries</h3>
            <p className="text-gray-600 mb-4">Track communication with property owners/agents.</p>
            <Link to="/my-inquiries" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-600 transition-colors duration-200">
              Check Inquiries
            </Link>
          </div>
        </div>

        {/* Optional: Latest blog content section, similar to landing page */}
        <div className="mt-12 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg flex items-center justify-between shadow-md">
          <p className="font-semibold text-lg">Check out our latest tips for buying property!</p>
          <Link to="/blog" className="flex items-center text-yellow-800 font-semibold hover:underline">
            Read Blog <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExplorerDashboardPage;