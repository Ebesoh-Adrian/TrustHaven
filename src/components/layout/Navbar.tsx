import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import {
  Menu,
  X,
  ChevronDown,
  Rocket,      // Example icon for Features
  Settings,     // Example icon for Features
  Zap,          // Example icon for Features
  BarChart2,    // Example icon for Features
  CreditCard,   // Example icon for Pricing
  DollarSign,   // Example icon for Pricing
  Building,     // Example icon for Pricing
  LayoutDashboard, // New icon for general pages
  User,          // New icon
  MessageSquare, // New icon
  BarChart,      // New icon
} from 'lucide-react'; // Import necessary icons

=======
import { MenuSquare, X, Search, MapPin, User, LogIn } from 'lucide-react';
>>>>>>> 72c77804fc3c8a0aefee56d331656cfb1385748f
import { Button } from '../ui/Button';
import Logo from './Logo';

// Define a type for dropdown links, now including icon and description
interface DropdownLink {
  name: string;
  path: string;
  icon?: React.ElementType; // Icon component from lucide-react
  description?: string;
}

// Reusable SimpleDropdown component
const SimpleDropdown: React.FC<{ links: DropdownLink[] }> = ({ links }) => (
  <div
    // Increased width to w-[30rem] for more horizontal space
    // Added translate-y-2 for a slight downward slide animation
    className="absolute left-0 mt-4 w-[30rem] bg-white rounded-lg shadow-xl py-4 z-50
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               transition-all duration-300 ease-out transform origin-top scale-y-0 translate-y-2 group-hover:scale-y-100 group-hover:translate-y-0"
  >
    {links.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        // Increased padding (px-6 py-3) for more spacious items
        // More pronounced hover effect: translate-x-2, larger shadow, slight scale
        className="flex items-start px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-all duration-200 group
                   hover:translate-x-2 hover:shadow-md transform hover:scale-[1.01]"
      >
        {link.icon && (
          // Larger icon (w-7 h-7) and slightly darker initial text-gray-600
          <link.icon className="w-7 h-7 mr-4 mt-0.5 text-gray-600 group-hover:text-pink-600 transition-colors duration-200 flex-shrink-0" />
        )}
        <div>
          {/* Slightly larger name (text-lg), bolder (font-bold) */}
          <span className="block text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-200">
            {link.name}
          </span>
          {link.description && (
            // Description: text-base, text-gray-500, leading-normal
            <span className="block text-base text-gray-500 mt-1 leading-normal">
              {link.description}
            </span>
          )}
        </div>
      </Link>
    ))}
  </div>
);

// --- Navbar Component ---

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Updated navLinks with richer descriptions and specific icons
  const navLinks = [
    {
      name: 'Features',
      path: '/features',
      dropdownLinks: [
        { name: 'Dashboard Analytics', path: '/features/dashboard', icon: LayoutDashboard, description: 'Gain powerful insights with intuitive dashboards.' },
        { name: 'User Management', path: '/features/users', icon: User, description: 'Efficiently manage user roles and permissions.' },
        { name: 'Real-time Chat', path: '/features/chat', icon: MessageSquare, description: 'Communicate instantly with your team or customers.' },
        { name: 'Advanced Reporting', path: '/features/reports', icon: BarChart, description: 'Generate detailed reports for informed decisions.' },
      ],
    },
    { name: 'Testimonials', path: '/testimonials' },
    {
      name: 'Pricing',
      path: '/pricing',
      dropdownLinks: [
        { name: 'Standard Plans', path: '/pricing/standard', icon: CreditCard, description: 'Flexible plans to fit your individual or small team needs.' },
        { name: 'Pro Subscriptions', path: '/pricing/pro', icon: DollarSign, description: 'Unlock advanced features for growing businesses.' },
        { name: 'Custom Enterprise', path: '/pricing/enterprise', icon: Building, description: 'Tailored solutions and dedicated support for large organizations.' },
      ],
    },
    { name: 'FAQ', path: '/faq' },
    { name: 'Affiliates', path: '/affiliates' },
  ];

  return (
<<<<<<< HEAD
    <header className="fixed top-0 w-full z-50 pt-6 px-4">
      <div
        className="container mx-auto px-6 py-4 bg-white rounded-2xl shadow-lg
                   flex items-center justify-between max-w-7xl"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.path}
                className={`flex items-center text-gray-800 hover:text-gray-950 text-base font-semibold transition-colors duration-200
                            ${link.dropdownLinks ? 'cursor-pointer' : ''}`}
                aria-haspopup={link.dropdownLinks ? "true" : undefined}
                aria-expanded={link.dropdownLinks ? "false" : undefined}
              >
                {link.name}
                {link.dropdownLinks && (
                  <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>
              {/* Render SimpleDropdown if dropdownLinks exist */}
              {link.dropdownLinks && <SimpleDropdown links={link.dropdownLinks} />}
            </div>
          ))}
        </nav>

        {/* Auth Button (Start for free) */}
        <div className="hidden md:flex items-center">
          <Link to="/start-for-free">
            <Button
              variant="default"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold
                         py-3 px-8 rounded-full text-base tracking-wide
                         transition-colors duration-200"
            >
              Start for free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 p-4 pt-20 shadow-lg overflow-y-auto">
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <React.Fragment key={link.path}>
                <Link
                  to={link.path}
                  className={`block px-4 py-3 rounded-md text-gray-800 hover:bg-gray-100 font-medium ${link.dropdownLinks ? 'flex items-center justify-between' : ''}`}
                  onClick={link.dropdownLinks ? (e) => e.preventDefault() : undefined}
                >
                  {link.name}
                  {link.dropdownLinks && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${location.pathname.startsWith(link.path) && link.dropdownLinks ? 'rotate-180' : ''}`}
                      onClick={() => { console.log(`Toggling mobile dropdown for ${link.name}`); }}
                    />
                  )}
                </Link>
                {/* Mobile dropdown content */}
                {link.dropdownLinks && location.pathname.startsWith(link.path) && (
                  <div className="pl-6 pt-2 pb-2 bg-gray-50 rounded-md transition-all duration-300 ease-in-out">
                    <ul className="space-y-1">
                      {link.dropdownLinks.map((subLink) => (
                        <li key={subLink.path}>
                          <Link
                            to={subLink.path}
                            className="flex items-start text-gray-700 hover:text-pink-500 hover:bg-gray-100 p-2 rounded-md text-sm transition-colors duration-200"
                          >
                            {subLink.icon && (
                              <subLink.icon className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                            )}
                            <div>
                              <span className="block font-medium text-gray-800">{subLink.name}</span>
                              {subLink.description && (
                                <span className="block text-xs text-gray-500 leading-tight">
                                  {subLink.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/start-for-free"
              className="block w-full text-center px-4 py-3 bg-pink-500 text-white rounded-full font-bold
                         transition-colors duration-200"
            >
              Start for free
            </Link>
          </div>
        </div>
      )}
    </header>
=======
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
>>>>>>> 72c77804fc3c8a0aefee56d331656cfb1385748f
  );
};

export default Navbar;