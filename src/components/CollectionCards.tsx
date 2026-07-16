import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface CollectionCardsProps {
  onCategorySelect: (category: string) => void;
  products: Product[];
}

export default function CollectionCards({ onCategorySelect, products }: CollectionCardsProps) {
  const collections = [
    {
      name: 'KORE',
      count: '2 Products',
      image: '/src/assets/images/faucet_gold_1783997883851.jpg',
      tagline: 'Minimalist Gold Brass Mixers',
    },
    {
      name: 'DUNE',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1620626011160-9928f1b9b630?auto=format&fit=crop&q=80&w=600',
      tagline: 'Organic Marble Vessels',
    },
    {
      name: 'DUERO',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      tagline: 'Thermostatic & Kitchen Systems',
    },
    {
      name: 'DART',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600',
      tagline: 'Sharp Angular Masterpieces',
    },
    {
      name: 'FACET',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1521485950395-bcfb8fc9bd06?auto=format&fit=crop&q=80&w=600',
      tagline: 'Geometric Luxury Fillers',
    },
    {
      name: 'QUADRA',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=600',
      tagline: 'Pure Cubist Sanitaryware',
    },
    {
      name: 'ARNO',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&q=80&w=600',
      tagline: 'Intelligent Hygienic Suites',
    },
    {
      name: 'RIDGE',
      count: '2 Products',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600',
      tagline: 'Ribbed Tactile Craftsmanship',
    },
    {
      name: 'DECK',
      count: '2 Products',
      image: '/src/assets/images/bathtub_luxury_1783997908810.jpg',
      tagline: 'Freestanding Stone Soakers',
    },
    {
      name: 'SHOWERS',
      count: '2 Products',
      image: '/src/assets/images/shower_rain_1783997896550.jpg',
      tagline: 'Air-Boost Overheads & Columns',
    },
  ];

  return (
    <section className="bg-brand-black px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between border-b border-brand-border/60 pb-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
              Signature Portfolios
            </h2>
            <h3 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Shop by Collection
            </h3>
            <p className="mt-3 text-sm text-brand-light-gray font-light">
              Each product collection represents a unified aesthetic philosophy, engineered to elevate private bath environments.
            </p>
          </div>
        </div>

        {/* Collection Grid / Scrollable List on Mobile */}
        <div className="flex overflow-x-auto -mx-6 px-6 pb-6 gap-6 snap-x snap-mandatory no-scrollbar sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-x-visible sm:pb-0 sm:snap-none lg:grid-cols-3">
          {collections.map((col, index) => {
            // Give the first and last cards a double-span layout on desktop for elegant asymmetry
            const isLargeSpan = index === 0 || index === 5;
            
            // Prefer the first product image from the products list for this collection
            const productImage = products.find((p) => p.collection.toUpperCase() === col.name.toUpperCase())?.image;
            const imageSrc = productImage ?? col.image;
            
            return (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group relative h-96 cursor-pointer overflow-hidden rounded-none border border-brand-border bg-brand-dark-gray transition-all hover:border-white/20 w-[80vw] max-w-85 shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink sm:snap-align-none ${
                  isLargeSpan ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
                onClick={() => onCategorySelect(col.name)}
              >
                {/* Background image zoom-in on hover */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={imageSrc}
                    alt={col.name}
                    className="h-full w-full object-cover opacity-50 saturate-50 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-60 group-hover:saturate-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/30 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                  {/* Top line */}
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-brand-light-gray">
                      {col.count}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-brand-black/50 backdrop-blur-sm text-white transition-all group-hover:border-white/30 group-hover:text-brand-orange">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom details */}
                  <div>
                    <span className="font-sans text-[10px] font-medium uppercase tracking-widest text-brand-orange">
                      {col.tagline}
                    </span>
                    <h4 className="mt-2 font-sans text-2xl font-bold tracking-tight text-white group-hover:text-brand-orange transition-colors">
                      {col.name}
                    </h4>
                  </div>
                </div>

                {/* Hover line indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-orange transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
