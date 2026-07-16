import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-brand-black px-6 sm:px-8 lg:px-12">
      {/* Background Hero Image with dark overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/src/assets/images/bathroom_hero_1783997870328.jpg"
          alt="Premium Luxury Bathroom Fitting"
          className="h-full w-full object-cover opacity-45 filter brightness-75 saturate-50 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Subtle vignette gradients to ensure high contrast for text */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/50 to-brand-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-brand-black/90 via-transparent to-brand-black/90" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5"
        >
          {/* Tagline */}
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-brand-orange">
            Luxury Bathroom Design
          </span>

          {/* Heading */}
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            <span className="font-semibold">Premium Bathware</span> <br />
            <span className="inline-block font-serif italic text-brand-orange" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
              for Modern Living.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-brand-light-gray/80 sm:text-sm font-light">
            Refined fixtures and sculptural essentials crafted for contemporary spaces.
          </p>

          {/* Call to Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="group flex items-center justify-center gap-2.5 bg-brand-orange px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-brand-black hover:bg-white hover:text-brand-black transition-all duration-300"
            >
              Discover Catalog
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              id="hero-specs-btn"
              onClick={onExploreClick}
              className="flex items-center justify-center gap-2.5 border border-white/10 bg-brand-black/20 backdrop-blur-sm px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white hover:border-white hover:bg-brand-black/60 transition-all duration-300"
            >
              View Collections
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
