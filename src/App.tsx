/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-[#e5e5e5] flex flex-col justify-between items-center font-sans select-none tracking-[-0.03em] overflow-hidden">
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
          Stay tuned- we'll be live soon.
        </p>
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 w-full pb-10 md:pb-12 flex flex-col items-center" id="footer-section">
        {/* Very thin orange horizontal line spanning about 86% width */}
        <div className="w-[86%] max-w-300 h-px bg-[#ff8a00] mb-5" id="footer-divider" />
        
        {/* Small copyright text below */}
        <p className="text-[13px] text-[#cfcfcf]" id="copyright-text">
          © 2026 - Camzon.
        </p>
      </footer>
    </div>
  );
}
