/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f0f0f] text-[#e5e5e5]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse delay-150"></span>
            <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse delay-300"></span>
          </div>
          <p className="mt-4 text-xs tracking-[0.5em] text-[#cfcfcf] uppercase">Loading</p>
        </div>
      )}

      <div className={`relative min-h-screen bg-[#0f0f0f] text-[#e5e5e5] flex flex-col justify-between items-center font-sans select-none tracking-[-0.03em] overflow-hidden transition-opacity duration-500 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Background Particle Animation */}
        <ParticleBackground />

        {/* Top Logo Section */}
        <header className="relative z-10 w-full pt-16 md:pt-20 flex justify-center items-center" id="header-logo">
          <img
            src="/assets/logo.png"
            alt="Camzon Logo"
            className="w-35 h-auto object-contain"
            referrerPolicy="no-referrer"
            id="logo-img"
          />
        </header>

        {/* Main Hero Section */}
        <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4" id="main-content">
          <span className="text-[14px] font-medium text-[#d1d1d1] mb-2.5" id="eyebrow-text">
            On Build.
          </span>
          <h1 className="text-[44px] md:text-[52px] font-medium text-[#e5e5e5] leading-none mb-3" id="main-heading">
            Launching Soon.
          </h1>
          <p className="text-[14px] font-medium text-[#ff8a00]" id="subtitle-text">
            Stay tuned - we'll be live soon.
          </p>
        </main>

        {/* Footer Section */}
        <footer className="relative z-10 w-full pb-10 md:pb-12 flex flex-col items-center" id="footer-section">
          <div className="w-[86%] max-w-300 h-px bg-[#ff8a00] mb-5" id="footer-divider" />
          <p className="text-[13px] text-[#cfcfcf]" id="copyright-text">
            © 2026 - Camzon.
          </p>
        </footer>
      </div>
    </>
  );
}
