import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuSquare, X, Search, MapPin, User, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/listings' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {scrolled && <div style={{ height: '64px' }}></div>}
      <header 
        className={`top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'fixed bg-white shadow-md py-2' 
            : 'relative bg-transparent py-4'
        } mb-8 md:mb-12 rounded-xl px-4 md:px-8`}
      >
        <div className="container mx-auto px-0">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Logo />
              <span className={`ml-2 text-xl font-bold ${scrolled ? 'text-primary' : 'text-gray-900'}`}>
                TrustHaven
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden menu935:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : scrolled
                      ? 'text-gray-700 hover:text-primary'
                      : 'text-gray-900 hover:text-primary-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Location Selector */}
            <div className="hidden menu935:flex items-center mx-4">
              <Button 
                variant="ghost" 
                size="sm"
                className={`flex items-center ${
                  scrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                <MapPin className="w-4 h-4 mr-1" />
                <span>Buea</span>
              </Button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden menu935:flex items-center space-x-2">
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={scrolled ? 'text-gray-700' : 'text-gray-900'}
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">
                  Register
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block menu935:hidden p-2 rounded-md"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-gray-900'}`} />
              ) : (
                <MenuSquare className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-gray-900'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="menu935:hidden bg-white rounded-lg mt-2 p-4 shadow-lg">
              <div className="flex items-center mb-4 px-2">
                <MapPin className="w-5 h-5 text-primary mr-2" />
                <span className="text-gray-700">Buea</span>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-md focus:outline-none"
                />
              </div>
              
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 rounded-md ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link 
                  to="/login" 
                  className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full text-center px-4 py-2 bg-primary text-white rounded-md"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;