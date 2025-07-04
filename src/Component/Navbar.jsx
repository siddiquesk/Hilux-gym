import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Users, Target, ChevronDown, Heart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

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
        { name: 'CrossFit', path: '/classes/crossfit' },
      ],
    },
    { name: 'Trainers', icon: Users, hasDropdown: false, path: '/trainers' },
    { name: 'Pricing', icon: Target, hasDropdown: false, path: '/pricing' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
    setMobileDropdown(false);
  }, [location.pathname]);

  const isItemActive = (item) => {
    const currentPath = location.pathname;
    if (currentPath === item.path) return true;
    if (item.hasDropdown && item.dropdownItems) {
      return item.dropdownItems.some((dropItem) => currentPath === dropItem.path);
    }
    return false;
  };

  return (
    <div>
      <nav
        ref={navRef}
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/20' : 'bg-white/25 backdrop-blur-xl shadow-2xl border-b'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
              <img src="./removebg.webp" alt="Hilux" className="h-10 w-10 object-contain animate-bounce" />
              <div className="flex flex-col items-center group-hover:scale-110">
                <span className="text-xl font-black text-black group-hover:text-yellow-400">HILUX</span>
                <div className="flex items-center mt-1 space-x-2">
                  <div className="w-6 h-0.5 bg-red-500"></div>
                  <span className="text-xs tracking-widest text-yellow-400 group-hover:text-black">FITNESS</span>
                  <div className="w-6 h-0.5 bg-red-500"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item);

                return (
                  <div key={item.name} className="relative group">
                    {item.hasDropdown ? (
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold ${isActive ? 'text-white bg-gradient-to-r from-red-600 to-red-700' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 ${showDropdown ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-4 py-2 rounded-xl font-semibold ${isActive ? 'text-white bg-gradient-to-r from-red-600 to-red-700' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
                      >
                        {item.name}
                      </Link>
                    )}

                    {item.hasDropdown && showDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-black/95 rounded-xl z-50">
                        {item.dropdownItems.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.path}
                            onClick={() => setShowDropdown(false)}
                            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-red-600/20"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link to="/contact" className="px-4 py-2 bg-red-600 text-white rounded-xl">Contact Us</Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-12 h-10 flex items-center justify-center text-center rounded-md cursor-pointer"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute w-6 h-0.5 bg-white ${isOpen ? 'rotate-45 top-3' : 'top-1'}`} />
                <span className={`absolute w-6 h-0.5 bg-white top-3 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute w-6 h-0.5 bg-white ${isOpen ? '-rotate-45 top-3' : 'top-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/50 text-gray-200 py-4 animate-slideDown text-left">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-700">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.name ? false : item.name)}
                      className="w-full flex justify-between items-center px-4 py-3"
                    >
                      <span className='text-gray-300 hover:text-yellow-500 cursor-pointer font-semibold'>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform text-xl text-yellow-400 ${mobileDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDropdown === item.name && (
                      <div className="bg-black/80">
                        {item.dropdownItems.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            to={dropItem.path}
                            onClick={() => {
                              setIsOpen(false);
                              setMobileDropdown(false);
                            }}
                            className="block px-6 py-3 text-md hover:bg-red-600/30"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-md font-semibold hover:text-yellow-500"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 w-full bg-red-700 hover:bg-red-500 transition duration-150 rounded-xl m-2 text-center">Contact Us</Link>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Navbar;

