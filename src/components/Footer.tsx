import React from 'react';
import { 
  Car, Building2, Phone, Mail, MapPin, ShieldCheck, 
  Award, ChevronRight, MessageSquare, Globe
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/storeData';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onOpenFranchiseModal: () => void;
  onOpenAiChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenFranchiseModal,
  onOpenAiChat
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-gray-400 font-sans border-t-2 border-red-600 relative overflow-hidden">
      {/* Top CTA Bar */}
      <div className="bg-gradient-to-r from-red-950 via-[#0B0B0B] to-black py-8 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-black text-white uppercase font-display">
              Ready to Upgrade Your Automobile Experience?
            </h3>
            <p className="text-xs text-gray-300">
              Visit your nearest Profit Automobile Store or speak directly with our Master Mechanics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919876543210?text=Hi%20PROFIT%20Automobile%20Store,%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={onOpenFranchiseModal}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Franchise Desk</span>
            </button>

            <a
              href="mailto:Info@profitautostore.in"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Info@profitautostore.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Col 1: Corporate Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
              <Car className="w-5 h-5 transform -scale-x-100" />
            </div>
            <div>
              <span className="text-lg font-black text-white uppercase tracking-wider font-display block">
                PROFIT <span className="text-red-600">AUTOMOBILE</span> STORE
              </span>
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest block">
                Retail Chain of Big Business House
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            India's premier national automobile retail chain specializing in 100% genuine spare parts, lubricants, batteries, filters, seat covers, ceramic detailing, alloy wheels, and custom vehicle modification.
          </p>

          <div className="space-y-2 text-xs pt-2">
            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <span>Corporate Office: Motera PVR Building, Ahmedabad - 380005</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <Globe className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Overseas Office: Virtual Office at Dubai, UAE</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Corporate Email: Info@profitautostore.in</span>
            </div>
          </div>
        </div>

        {/* Col 2: Product Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-red-900/40 pb-2">
            Product Portfolio
          </h4>
          <ul className="space-y-2 text-xs">
            {PRODUCT_CATEGORIES.slice(0, 6).map(cat => (
              <li key={cat.id}>
                <button
                  onClick={() => {
                    onSelectCategory(cat.id);
                    scrollToSection('categories');
                  }}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-600" />
                  <span>{cat.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services & Solutions */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-red-900/40 pb-2">
            Workshop Services
          </h4>
          <ul className="space-y-2 text-xs">
            {['Vehicle Inspection', 'Ceramic Coating', 'Battery Replacement', 'Synthetic Oil Change', 'Android Stereo Fitment', 'Alloy Wheel Balancing', 'Custom Modification'].map((srv, i) => (
              <li key={i}>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-red-600" />
                  <span>{srv}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Corporate & Franchise */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-red-900/40 pb-2">
            Corporate & Network
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onOpenFranchiseModal} className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-amber-400" />
                <span>Franchise Opportunities</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('stores')} className="hover:text-red-400 flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-red-600" />
                <span>Store Locator (Pan India)</span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('about')} className="hover:text-red-400 flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-red-600" />
                <span>About Big Business House</span>
              </button>
            </li>
            <li>
              <button onClick={onOpenAiChat} className="hover:text-red-400 flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-red-600" />
                <span>AI Parts Match Tool</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#080808] border-t border-gray-900 py-6 px-4 sm:px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p>© {new Date().getFullYear()} <strong>PROFIT AUTOMOBILE STORE</strong>. All Rights Reserved.</p>
            <p className="text-[10px] text-gray-600 mt-0.5">A Retail Chain Initiative of <strong>Big Business House Group</strong>. Driven by Trust. Focused on Quality.</p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">OEM Warranty T&C</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
