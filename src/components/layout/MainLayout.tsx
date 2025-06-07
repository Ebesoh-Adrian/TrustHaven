// trusthaven-frontend/src/components/layout/MainLayout.tsx

import React from 'react';
import Navbar from './Navbar'; // Your existing Navbar component
import Footer from './Footer'; // Your existing Footer component


const MainLayout = ({ children }) => {
  return (
    // Apply a light background color that matches your landing page's overall feel
    // Use `bg-gray-50` or `bg-blue-50` for a light, subtle background
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Or bg-blue-50 for a slightly cooler tone */}
      <Navbar /> {/* Your application's header */}
      <main className="flex-grow">
        {children} {/* This is where your page content will be rendered */}
      </main>
      <Footer /> {/* Your application's footer */}
    </div>
  );
};

export default MainLayout;