import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Zap,
  Users,
  Target,
  ChevronDown,
  Heart
} from 'lucide-react';

const Navbar = () => {
  // State to control mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // State to change navbar style on scroll
  const [scrolled, setScrolled] = useState(false);

  // State to control dropdown menu visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // To access current route path
  const location = useLocation();

  // Refs for handling click outside
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // Navigation items with optional dropdowns
  const navItems = [
    { name: 'Home', icon: Home, hasDropdown: false, path: '/' },
    {
      name: 'Classes',
      icon: Zap,
      hasDropdown: true,
      path: '/classes',
      dropdownItems: [
        { name: 'Cardio', path: '/classes/cardio' },
        { name: 'Strength Training', path: '/classes/strengthtraning' },
        { name: 'Yoga', path: '/classes/yoga' },
        { name: 'CrossFit', path: '/classes/crossfit' }
      ]
    },
    { name: 'Trainers', icon: Users, hasDropdown: false, path: '/trainers' },
    { name: 'Pricing', icon: Target, hasDropdown: false, path: '/pricing' },
  ];

  // Add scroll listener to update navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location.pathname]);

  // Toggle dropdown menu
  const handleDropdownToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // Close mobile menu
  const handleMobileMenuClose = () => {
    setIsOpen(false);
    setShowDropdown(false);
  };

  // Check if navigation item is active
  const isItemActive = (item) => {
    const currentPath = location.pathname;
    if (currentPath === item.path) return true;
    if (item.hasDropdown && item.dropdownItems) {
      return item.dropdownItems.some(dropItem => currentPath === dropItem.path);
    }
    return false;
  };

  // Check if dropdown item is active
  const isDropdownItemActive = (dropItem) => location.pathname === dropItem.path;

  return (
    <div>
      <nav
        ref={navRef}
        className={`fixed w-full z-50 py-2 transition-all duration-500 ${scrolled ? 'bg-white/20' : 'bg-white/25 backdrop-blur-xl py-2 shadow-2xl border-b bg-gray-500'}`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo Section with Animated Dumbbell and Text */}
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-12 animate-bounce">
                <img
                  src="./removebg.png"
                  alt="Hilux Fitness Logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <div className="flex flex-col items-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-translate-y-2 animate-pulse">
                <span className="text-xl sm:text-2xl font-black text-black tracking-wider transition-all duration-500 ease-in-out group-hover:text-yellow-400 group-hover:-translate-y-1">
                  HILUX
                </span>
                <div className="flex items-center mt-1 space-x-2 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-translate-y-1">
                  <div className="w-6 h-0.5 bg-red-500"></div>
                  <span className="text-xs font-medium tracking-widest text-yellow-400 transition-all duration-500 ease-in-out group-hover:text-black">
                    FITNESS
                  </span>
                  <div className="w-6 h-0.5 bg-red-500"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item);

                return (
                  <div key={item.name} className="relative group">
                    {item.hasDropdown ? (
                      <button
                        onClick={handleDropdownToggle}
                        className={`flex items-center space-x-2 px-3 xl:px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${isActive ? 'text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/25' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/20 group-hover:to-red-700/20 transition-all duration-300"></div>
                        {Icon && <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-white' : 'text-red-400 group-hover:text-red-300 group-hover:scale-110'}`} />}
                        <span className="relative z-10 tracking-wide text-sm xl:text-base">{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></div>
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 xl:px-4 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${isActive ? 'text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/25' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/20 group-hover:to-red-700/20 transition-all duration-300"></div>
                        {Icon && <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-white' : 'text-red-400 group-hover:text-red-300 group-hover:scale-110'}`} />}
                        <span className="relative z-10 tracking-wide text-sm xl:text-base">{item.name}</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300"></div>
                      </Link>
                    )}

                    {/* Dropdown Menu for Desktop */}
                    {item.hasDropdown && showDropdown && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-red-500/20 overflow-hidden z-50"
                        style={{ animation: 'fadeInDown 0.3s ease-out' }}
                      >
                        {item.dropdownItems.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.path}
                            onClick={() => setShowDropdown(false)}
                            className={`block w-full text-left px-4 py-3 transition-all duration-300 border-b border-white/5 last:border-b-0 ${isDropdownItemActive(dropItem) ? 'text-white bg-red-600/30' : 'text-gray-300 hover:text-white hover:bg-red-600/20'}`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${isDropdownItemActive(dropItem) ? 'bg-red-400' : 'bg-red-500 opacity-50'}`}></div>
                              <span className="text-sm font-medium">{dropItem.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Contact Us Button */}
              <div className="ml-4">
                <Link
                  to="/contact"
                  className="group relative px-4 xl:px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 inline-flex items-center space-x-2"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm xl:text-base">Contact us</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 backdrop-blur-sm flex items-center justify-center group px-8 hover:bg-red-600/20 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`} />
                <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`} />
              </div>
            </button>

          </div>
        </div>
      </nav>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;