import { PageType, RouteState } from '../types';
import { Compass, Home, Layers, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import logoImage from '../assets/logo/logo.png.png';

interface HeaderProps {
  route: RouteState;
  setRoute: (route: RouteState) => void;
}

export default function Header({ route, setRoute }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' as PageType, icon: Home },
    { label: 'Catalog', view: 'catalog' as PageType, icon: Layers },
  ];

  const handleNavigate = (page: PageType, category?: string) => {
    setRoute({ page, selectedCategory: category });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-black/80 backdrop-blur-md">
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-3 items-center px-6 sm:px-8 lg:px-12">
        {/* Left Column: Navigation links */}
        <div className="flex items-center justify-start">
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = route.page === item.view;
              return (
                <button
                  id={`nav-${item.label.toLowerCase()}`}
                  key={item.label}
                  onClick={() => handleNavigate(item.view)}
                  className="relative py-1.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
                >
                  <span className={isActive ? 'text-brand-orange' : 'text-brand-light-gray hover:text-white'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="header-active-indicator"
                      className="absolute bottom-0 left-0 h-[1.5px] w-full bg-brand-orange"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Column: Logo */}
        <div className="flex items-center justify-center col-span-1">
          <button
            id="logo-btn"
            onClick={() => handleNavigate('home')}
            className="flex items-center justify-center text-center transition-transform hover:opacity-90 active:scale-98"
          >
            <img
              src={logoImage}
              alt="CAMZON logo"
              className="h-6 w-auto object-contain sm:h-7"
            />
          </button>
        </div>

        {/* Right Column: CTA / Mobile Menu toggle */}
        <div className="flex items-center justify-end">
          <div className="hidden md:block">
            <button
              id="header-explore-btn"
              onClick={() => handleNavigate('catalog')}
              className="flex items-center gap-1.5 rounded-lg border border-brand-border bg-transparent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:border-white/20 hover:bg-brand-dark-gray/20"
            >
              <Compass className="h-3.5 w-3.5 text-brand-orange" />
              Explore
            </button>
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center border border-brand-border rounded-lg text-white hover:border-white/20 hover:text-brand-orange md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 top-14 w-full border-b border-brand-border bg-brand-black px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = route.page === item.view;
              return (
                <button
                  id={`mobile-nav-${item.label.toLowerCase()}`}
                  key={item.label}
                  onClick={() => handleNavigate(item.view)}
                  className={`flex items-center gap-3 py-1.5 text-left text-sm font-semibold uppercase tracking-wider ${
                    isActive ? 'text-brand-orange' : 'text-brand-light-gray'
                  }`}
                >
                  <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-brand-orange' : 'text-brand-light-gray'}`} />
                  {item.label}
                </button>
              );
            })}
            <button
              id="mobile-explore-btn"
              onClick={() => handleNavigate('catalog')}
              className="mt-2 flex w-full items-center justify-center gap-2 border border-brand-orange rounded-lg py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-orange hover:text-brand-black"
            >
              <Compass className="h-3.5 w-3.5" />
              Explore Catalog
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
