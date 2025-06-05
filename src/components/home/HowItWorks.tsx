import React from 'react';
import { Search, CheckCircle, MessageSquare, User } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: 'Find What You Need',
    description: 'Browse through our verified listings of homes, cars, services, and local businesses in Cameroon.'
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-primary" />,
    title: 'Verified Listings Only',
    description: 'All our listings are verified to ensure authenticity and quality, giving you peace of mind.'
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: 'Contact Directly',
    description: 'Connect directly with sellers through our secure messaging system or provided contact details.'
  },
  {
    icon: <User className="w-10 h-10 text-primary" />,
    title: 'Create Your Account',
    description: 'Sign up to save favorite listings, post your own listings, and get personalized recommendations.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How TrustHaven Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to find trusted listings and connect with verified sellers in Cameroon
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;