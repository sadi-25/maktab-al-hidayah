import React, { useState } from 'react';
import { Search, Menu, X, BookOpen, Volume2, Video, FileText, GraduationCap, HelpCircle, Heart, Phone, Info, Home } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onSearch,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);

  const navItems = [
    { id: 'home', label: 'হোম', route: '#/', icon: Home },
    { id: 'about', label: 'আমাদের সম্পর্কে', route: '#/about', icon: Info },
    { id: 'books', label: 'বই', route: '#/books', icon: BookOpen },
    { id: 'articles', label: 'প্রবন্ধ', route: '#/articles', icon: FileText },
    { id: 'audio', label: 'অডিও', route: '#/audio', icon: Volume2 },
    { id: 'videos', label: 'ভিডিও', route: '#/videos', icon: Video },
    { id: 'pamphlets', label: 'পাম্ফলেট', route: '#/pamphlets', icon: FileText },
    { id: 'courses', label: 'কোর্স', route: '#/courses', icon: GraduationCap },
    { id: 'qna', label: 'প্রশ্নোত্তর', route: '#/qna', icon: HelpCircle },
    { id: 'sadqah', label: 'সদকায়ে জারিয়া', route: '#/sadqah', icon: Heart },
    { id: 'contact', label: 'যোগাযোগ', route: '#/contact', icon: Phone },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setMobileSearchOpen(false);
    }
  };

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const isActive = (route: string) => {
    if (route === '#/' && (currentRoute === '' || currentRoute === '#/' || currentRoute === '#')) return true;
    return currentRoute.startsWith(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      {/* Top Banner: Scholarly Tagline */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-100 text-xs py-1.5 px-4 text-center font-medium border-b border-amber-900/60">
        <span className="font-arabic tracking-wide mr-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        <span className="opacity-70">|</span>
        <span className="ml-2">কুরআন ও সহিহ সুন্নাহর আলোকে ইসলামের শিক্ষা — আমাদের কথা নয়, দলীলের কথা</span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Left: Logo */}
          <div
            onClick={() => handleNavClick('#/')}
            className="cursor-pointer py-1 flex items-center"
            role="button"
            tabIndex={0}
            aria-label="মাকতাব আল হিদায়াহ হোমপেজ"
          >
            <Logo />
          </div>

          {/* Right Desktop: Internal Search Box */}
          <div className="hidden md:flex items-center justify-end flex-1 max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ইসলাম সম্পর্কে খুঁজুন... (বই, অডিও, ভিডিও, প্রশ্নোত্তর)"
                className="w-full bg-gray-50 text-gray-900 text-sm rounded-full pl-10 pr-24 py-2.5 border border-gray-200 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors shadow-xs"
              >
                খুঁজুন
              </button>
            </form>
          </div>

          {/* Mobile Right Controls: Search button & Hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              aria-label="খুঁজুন"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {mobileSearchOpen && (
          <div className="py-3 pb-4 border-t border-gray-100 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ইসলাম সম্পর্কে খুঁজুন..."
                autoFocus
                className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg pl-10 pr-20 py-2.5 border border-gray-200 focus:outline-none focus:border-amber-600 focus:bg-white"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white text-xs px-3 py-1.5 rounded-md font-medium"
              >
                খুঁজুন
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 lg:space-x-2 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const active = isActive(item.route);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                    active
                      ? 'text-amber-900 bg-amber-50 shadow-xs border border-amber-200 font-semibold'
                      : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50/50'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${active ? 'text-amber-700' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[110px] z-50 bg-amber-950/40 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-white border-b border-gray-200 px-4 py-4 max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const active = isActive(item.route);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.route)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-sm transition-colors ${
                      active
                        ? 'bg-amber-50 text-amber-900 font-semibold border-l-4 border-amber-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${active ? 'text-amber-700' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
