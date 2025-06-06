import React from 'react';
import { Search, CheckCircle, Users } from 'lucide-react';
import '../../index.css'; // Ensure global animations are available

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: 'Discover Everything in One Place',
    description: 'Find homes, cars, jobs, services, and local businesses—all in one easy-to-use platform designed for Cameroon.',
    card: (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Search className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-semibold text-gray-700">Centralized Search</span>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">Homes</span>
            <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">Cars</span>
            <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">Jobs</span>
            <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">Services</span>
            <span className="bg-gray-100 text-xs px-3 py-1 rounded-full">Businesses</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-primary" />,
    title: 'Trust Every Listing',
    description: 'Every listing is verified for authenticity, so you can browse and connect with confidence, free from scams.',
    card: (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-semibold text-gray-700">Verified Listings</span>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Verified</span>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">No Scams</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: 'Empower Local Businesses & Community',
    description: "Support local businesses and connect with your community. Whether you're a newcomer or a local, TrustHaven helps you find what you need and helps businesses grow.",
    card: (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <span className="text-sm font-semibold text-gray-700">Community & Growth</span>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">Local Businesses</span>
            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">Newcomers</span>
            <span className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full">Locals</span>
          </div>
        </div>
      </div>
    ),
  },
];

const StepInfographic: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="relative flex flex-col gap-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''} animate-fade-in-up`}
              style={{ animationDelay: `${idx * 0.2 + 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Card/Icon */}
              <div className="flex-1 flex justify-center md:justify-end">
                {step.card}
              </div>
              {/* Step number and line */}
              <div className="flex flex-col items-center mx-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md mb-2">
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className="h-32 w-1 bg-primary/20 rounded-full animate-fade-in-up-infinite" />
                )}
              </div>
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700 max-w-md">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepInfographic; 