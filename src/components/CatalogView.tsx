import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, LayoutList, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface CatalogViewProps {
  products: Product[];
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
}

export default function CatalogView({
  products,
  selectedCategory,
  onCategoryChange,
}: CatalogViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const collections = [
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

  // Filter products based on selected collection
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.collection.toUpperCase() === selectedCategory.toUpperCase())
    : products;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
      {/* Catalog Title Header */}
      <div className="mb-12 border-b border-brand-border/60 pb-8">
        <h2 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
          Portfolio Directory
        </h2>
        <h1 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          {selectedCategory ? `${selectedCategory} Collection` : 'All Products Catalog'}
        </h1>
        <p className="mt-3 max-w-xl text-sm font-light text-brand-light-gray">
          Browse through our state-of-the-art catalog of high-end fittings. Filter by collection to inspect our design language.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        {/* Left Sidebar - Display product collections */}
        <aside className="lg:col-span-1">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:gap-6">
            <div className="flex items-center gap-3 border-b border-brand-border pb-4">
              <LayoutList className="h-4 w-4 text-brand-orange" />
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Collections
              </h3>
            </div>

            <nav className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:gap-3 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
              {/* "All" Toggle */}
              <button
                id="cat-filter-all"
                onClick={() => onCategoryChange(undefined)}
                className={`flex shrink-0 items-center justify-between gap-3 rounded-full border border-brand-border/50 px-3 py-2 text-left transition-all duration-300 lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-0 ${
                  selectedCategory === undefined
                    ? 'border-brand-orange/60 bg-brand-orange/10 text-brand-orange font-bold'
                    : 'text-brand-light-gray/70 hover:border-white/20 hover:text-white font-medium'
                }`}
              >
                <span className="font-sans text-[11px] uppercase tracking-[0.2em]">All Collections</span>
                <span className="font-mono text-[10px] opacity-70">
                  /{products.length}
                </span>
              </button>

              {collections.map((cat) => {
                const count = products.filter((p) => p.collection.toUpperCase() === cat.toUpperCase()).length;
                const isSelected = selectedCategory?.toUpperCase() === cat.toUpperCase();
                return (
                  <button
                    id={`cat-filter-${cat.toLowerCase()}`}
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`flex shrink-0 items-center justify-between gap-3 rounded-full border border-brand-border/50 px-3 py-2 text-left transition-all duration-300 lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-0 ${
                      isSelected
                        ? 'border-brand-orange/60 bg-brand-orange/10 text-brand-orange font-bold'
                        : 'text-brand-light-gray/70 hover:border-white/20 hover:text-white font-medium'
                    }`}
                  >
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em]">{cat}</span>
                    <span className="font-mono text-[10px] opacity-70">
                      /{count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center border border-dashed border-brand-border rounded-2xl text-center">
              <Grid className="h-10 w-10 text-brand-light-gray/40 mb-4" />
              <p className="text-sm text-brand-light-gray">
                No products found in this collection.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedProduct(product)}
                      className="group flex flex-col overflow-hidden rounded-none border border-brand-border bg-brand-black transition-all hover:border-brand-orange/60 cursor-pointer"
                      id={`product-card-${product.id}`}
                    >
                      {/* Image Container */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-brand-dark-gray">
                        <img
                          src={product.image}
                          alt={product.name}
                          width={800}
                          height={600}
                          loading="eager"
                          decoding="async"
                          className="h-full w-full object-cover object-center opacity-90 saturate-[0.85]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-2 border border-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-md text-white text-[10px] uppercase font-mono tracking-widest">
                            <ZoomIn className="h-3.5 w-3.5 text-brand-orange" />
                            <span>Enlarge</span>
                          </div>
                        </div>
                      </div>

                      {/* Simple Numbered Product Label */}
                      <div className="border-t border-brand-border/40 p-4 text-center bg-brand-black">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-brand-light-gray/60 group-hover:text-brand-orange transition-colors duration-300">
                          {(() => {
                            const productsInSameCol = products.filter(
                              (p) => p.collection.toUpperCase() === product.collection.toUpperCase()
                            );
                            const idx = productsInSameCol.findIndex((p) => p.id === product.id) + 1;
                            return `${product.collection} PRODUCT ${idx}`;
                          })()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      {/* Enlarged Product Image Lightbox Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] md:max-w-4xl overflow-hidden border border-brand-border bg-brand-black p-3 sm:p-5 shadow-2xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center border border-white/20 bg-black/70 text-white transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-black"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* High Resolution Enlarged Image */}
              <div className="relative max-h-[75vh] w-full overflow-hidden bg-brand-dark-gray flex items-center justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={1200}
                  height={900}
                  loading="eager"
                  decoding="async"
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info Footer */}
              <div className="w-full pt-4 pb-1 px-2 text-center border-t border-brand-border/40 mt-3 flex items-center justify-between">
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {(() => {
                    const productsInSameCol = products.filter(
                      (p) => p.collection.toUpperCase() === selectedProduct.collection.toUpperCase()
                    );
                    const idx = productsInSameCol.findIndex((p) => p.id === selectedProduct.id) + 1;
                    return `${selectedProduct.collection} PRODUCT ${idx}`;
                  })()}
                </span>
                <span className="font-mono text-[10px] text-brand-light-gray/50 uppercase tracking-widest hidden sm:inline">
                  Click outside or cross button to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
