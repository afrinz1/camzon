import { RouteState } from '../types';
import logoImage from '../assets/logo/logo.png.png';

interface FooterProps {
  setRoute: (route: RouteState) => void;
}

export default function Footer({ setRoute }: FooterProps) {
  const categories = [
    'KORE',
    'DUNE',
    'DUERO',
    'DART',
    'FACET',
    'QUADRA',
    'ARNO',
    'RIDGE',
    'DECK',
    'SHOWERS',
  ];

  const handleCategoryClick = (category: string) => {
    setRoute({
      page: 'catalog',
      selectedCategory: category,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-brand-border/40 bg-brand-black pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Brand Philosophy column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex items-center border border-white/10 bg-white/] px-3 py-1.5">
                <img
                  src={logoImage}
                  alt="CAMZON logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-brand-light-gray/50 font-light">
              Pioneering architectural sanctuary fittings that balance sculptural minimalism with state-of-the-art water dynamics. Designed for high-end residential and luxury wellness spaces.
            </p>
          </div>

          {/* Quick Links / Collections column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              Collections
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    id={`footer-cat-${category.toLowerCase().replace(' ', '-')}`}
                    onClick={() => handleCategoryClick(category)}
                    className="text-left text-xs text-brand-light-gray/50 transition-colors hover:text-brand-orange font-medium"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications/Support column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
              Specifications
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-brand-light-gray/50 font-light">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">BIM / CAD Downloads</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Product Spec Sheets</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Installation Guides</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row */}
        <div className="mt-16 border-t border-brand-border/20 pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-[10px] tracking-wider text-brand-light-gray/40 uppercase font-medium">
            &copy; {new Date().getFullYear()} CAMZON. All rights reserved.
          </p>
          <div className="mt-4 flex flex-col items-center gap-2 sm:mt-0 sm:items-end">
            <div className="flex justify-center gap-6">
              <span className="text-[10px] tracking-wider text-brand-light-gray/40 hover:text-white transition-colors cursor-pointer uppercase font-medium">Privacy</span>
              <span className="text-[10px] tracking-wider text-brand-light-gray/40 hover:text-white transition-colors cursor-pointer uppercase font-medium">Terms</span>
              <span className="text-[10px] tracking-wider text-brand-light-gray/40 hover:text-white transition-colors cursor-pointer uppercase font-medium">Dealers</span>
            </div>
            <span className="text-[10px] tracking-wider text-brand-orange/80 uppercase font-medium">
              Work in progress
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
