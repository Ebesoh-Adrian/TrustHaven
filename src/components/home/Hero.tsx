import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

const Hero: React.FC = () => {
  const popularSearches = ['Apartments', 'Used Cars', 'Web Design', 'Restaurants', 'Plumbers'];

  return (
    <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' 
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full z-10 relative">
        <div className="flex flex-col justify-center h-full text-white pt-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-2xl">
            Find <span className="text-primary">Trusted</span> Listings in Cameroon
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-gray-200">
            Discover verified homes, cars, services and businesses in Buea and beyond.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-lg p-2 md:p-3 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Location Selector */}
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 md:w-1/4">
                <MapPin className="text-primary w-5 h-5 mr-2" />
                <select className="bg-transparent text-gray-800 w-full focus:outline-none appearance-none">
                  <option>Buea</option>
                  <option>Douala</option>
                  <option>Yaoundé</option>
                  <option>Bamenda</option>
                  <option>Limbe</option>
                </select>
                <ChevronDown className="text-gray-500 w-4 h-4" />
              </div>
              
              {/* Category Selector */}
              <div className="bg-gray-100 rounded-md px-3 py-2 md:w-1/4">
                <select className="bg-transparent text-gray-800 w-full focus:outline-none appearance-none">
                  <option value="">All Categories</option>
                  <option>Homes</option>
                  <option>Cars</option>
                  <option>Services</option>
                  <option>Businesses</option>
                  <option>Jobs</option>
                  <option>Electronics</option>
                </select>
              </div>
              
              {/* Search Input */}
              <div className="flex-1 flex items-center bg-gray-100 rounded-md px-3 py-2">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="bg-transparent text-gray-800 w-full focus:outline-none"
                />
              </div>
              
              {/* Search Button */}
              <Button className="w-full md:w-auto">
                Search
              </Button>
            </div>
          </div>
          
          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap items-center text-sm">
            <span className="mr-2 text-gray-300">Popular:</span>
            {popularSearches.map((term, index) => (
              <a 
                key={index}
                href={`/listings?q=${term.toLowerCase()}`}
                className="mr-2 mb-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white transition-colors"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;