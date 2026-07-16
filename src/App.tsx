import { useState, useEffect } from 'react';
import { RouteState, Product } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CollectionCards from './components/CollectionCards';
import CatalogView from './components/CatalogView';

// Import distinct collection datasets
import koreData from './data/collections/kore.json';
import duneData from './data/collections/dune.json';
import dueroData from './data/collections/duero.json';
import dartData from './data/collections/dart.json';
import facetData from './data/collections/facet.json';
import quadraData from './data/collections/quadra.json';
import arnoData from './data/collections/arno.json';
import ridgeData from './data/collections/ridge.json';
import deckData from './data/collections/deck.json';
import showersData from './data/collections/showers.json';

import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [route, setRoute] = useState<RouteState>({ page: 'home' });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Compile products from the ten distinct collection files, adding the collection tag dynamically
  const products: Product[] = [
    ...koreData.map((p) => ({ ...p, collection: 'KORE' })),
    ...duneData.map((p) => ({ ...p, collection: 'DUNE' })),
    ...dueroData.map((p) => ({ ...p, collection: 'DUERO' })),
    ...dartData.map((p) => ({ ...p, collection: 'DART' })),
    ...facetData.map((p) => ({ ...p, collection: 'FACET' })),
    ...quadraData.map((p) => ({ ...p, collection: 'QUADRA' })),
    ...arnoData.map((p) => ({ ...p, collection: 'ARNO' })),
    ...ridgeData.map((p) => ({ ...p, collection: 'RIDGE' })),
    ...deckData.map((p) => ({ ...p, collection: 'DECK' })),
    ...showersData.map((p) => ({ ...p, collection: 'SHOWERS' })),
  ] as Product[];

  // Track scroll position to show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-black text-white relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-10 w-10 rounded-full border border-brand-orange/30 border-t-brand-orange animate-spin" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-light-gray/70">
                Loading CAMZON
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Upper Subtle Ambient Background Light (Home page only) */}
      {route.page === 'home' && (
        <div className="pointer-events-none absolute top-0 left-1/2 h-500px w-full max-w-7xl -translate-x-1/2 bg-linear-to-b from-brand-orange/5 to-transparent blur-[120px] z-0" />
      )}

      {/* Header */}
      <Header route={route} setRoute={setRoute} />

      {/* Main Content Area */}
      <div className="grow z-10">
        <AnimatePresence mode="wait">
          {route.page === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Banner */}
              <Hero onExploreClick={() => setRoute({ page: 'catalog' })} />
              
              {/* Infinite scrolling collection strip */}
              <section className="bg-brand-dark-gray border-y border-brand-border/60 py-5 overflow-hidden">
                <div className="relative w-full flex overflow-x-hidden">
                  <div className="animate-marquee flex whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.25em] text-brand-light-gray/40">
                    {/* Block 1 */}
                    <div className="flex shrink-0 items-center gap-12 pr-12">
                      {['KORE', 'DUNE', 'DUERO', 'DART', 'FACET', 'QUADRA', 'ARNO', 'RIDGE', 'DECK', 'SHOWERS'].map((item, index) => (
                        <div key={`${item}-1-${index}`} className="flex items-center gap-12">
                          <span className="hover:text-brand-orange transition-colors duration-300 cursor-default">{item}</span>
                          <span className="text-brand-border/80 font-normal">/</span>
                        </div>
                      ))}
                    </div>
                    {/* Block 2 (identical for seamless loop) */}
                    <div className="flex shrink-0 items-center gap-12 pr-12">
                      {['KORE', 'DUNE', 'DUERO', 'DART', 'FACET', 'QUADRA', 'ARNO', 'RIDGE', 'DECK', 'SHOWERS'].map((item, index) => (
                        <div key={`${item}-2-${index}`} className="flex items-center gap-12">
                          <span className="hover:text-brand-orange transition-colors duration-300 cursor-default">{item}</span>
                          <span className="text-brand-border/80 font-normal">/</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Collections Segment */}
              <CollectionCards
                products={products}
                onCategorySelect={(category) =>
                  setRoute({ page: 'catalog', selectedCategory: category })
                }
              />
            </motion.div>
          )}

          {route.page === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CatalogView
                products={products}
                selectedCategory={route.selectedCategory}
                onCategoryChange={(category) =>
                  setRoute({ page: 'catalog', selectedCategory: category })
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer setRoute={setRoute} />

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            id="scroll-to-top"
            onClick={handleScrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center border border-brand-orange bg-brand-black text-brand-orange shadow-lg hover:bg-brand-orange hover:text-brand-black transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
