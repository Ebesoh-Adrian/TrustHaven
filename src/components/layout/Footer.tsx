import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import Logo from './Logo';
import { Button } from '../ui/Button';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Logo />
              <span className="ml-2 text-xl font-bold text-white">TrustHaven</span>
            </div>
            <p className="text-gray-400 mb-4">
              Find verified listings for homes, cars, and services in Cameroon.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Listings', 'Contact', 'FAQ', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Homes', 'Cars', 'Services', 'Businesses', 'Jobs', 'Electronics'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/category/${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest listings and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 py-2 px-3 text-gray-800 rounded-l-md focus:outline-none"
              />
              <Button 
                variant="default" 
                className="rounded-l-none"
              >
                <ArrowRight size={16} />
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-start">
                <Mail size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contact@trusthaven.cm</span>
              </div>
              <div className="flex items-start">
                <Phone size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+237 670 123 456</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-400">Molyko, Buea, Cameroon</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {year} TrustHaven. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm text-gray-500">
                <li>
                  <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-primary">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;