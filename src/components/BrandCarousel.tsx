import React from 'react';
import { BRAND_PARTNERS } from '../data/storeData';
import { Award, ShieldCheck } from 'lucide-react';

export const BrandCarousel: React.FC = () => {
  return (
    <section className="py-12 bg-black text-white border-b border-red-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest">FEATURED BRAND PARTNERS</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-red-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Authorized OEM Distributor Channel</span>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-marquee space-x-8 whitespace-nowrap py-2">
          {BRAND_PARTNERS.concat(BRAND_PARTNERS).map((partner, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 bg-[#121212] border border-red-900/30 hover:border-red-500/50 px-5 py-3 rounded-xl transition-all duration-300 shadow-md flex-shrink-0"
            >
              <div className="text-base font-black tracking-wider text-white uppercase font-display">
                {partner.logoText}
              </div>
              <div className="h-4 w-px bg-red-900/50" />
              <div className="text-left">
                <span className="text-[10px] font-bold text-red-400 uppercase block">{partner.category}</span>
                <span className="text-[9px] text-gray-400 block">{partner.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
