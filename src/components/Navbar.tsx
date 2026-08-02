import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Search, ShoppingBag, ShieldCheck, 
  Menu, X, Sparkles, Car, ChevronDown, Award, Wrench, Building2, User
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/storeData';
import { VehicleSelection, QuoteItem } from '../types';

interface NavbarProps {
  quoteItems: QuoteItem[];
  onOpenQuoteDrawer: () => void;
  selectedVehicle: VehicleSelection;
  onOpenVehicleModal: () => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenFranchiseModal: () => void;
  onOpenAiChat: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteItems,
  onOpenQuoteDrawer,
  selectedVehicle,
  onOpenVehicleModal,
  onSelectCategory,
  onOpenFranchiseModal,
  onOpenAiChat,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalQuoteCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0B] border-b border-red-900/30 text-white font-sans shadow-2xl">
      {/* Top Corporate Bar */}
      <div className="bg-gradient-to-r from-red-950 via-[#0B0B0B] to-black py-1.5 px-4 sm:px-8 text-xs border-b border-red-900/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1.5 font-semibold text-red-400">
              <Building2 className="w-3.5 h-3.5 text-red-500" />
              Retail Chain of <strong className="text-white tracking-wide uppercase">Big Business House</strong>
            </span>
            <span className="hidden md:inline-block text-gray-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Spare Parts & Lubricants
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <a href="mailto:Info@profitautostore.in" className="flex items-center gap-1 hover:text-red-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span className="font-semibold">Info@profitautostore.in</span>
            </a>
            <span className="text-gray-600">|</span>
            <button 
              onClick={onOpenFranchiseModal}
              className="flex items-center gap-1 text-amber-400 font-semibold hover:text-amber-300 transition-colors bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30"
            >
              <Award className="w-3 h-3 text-amber-400" />
              Franchise Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection('hero')}
        >
          {/* Logo Emblem SVG */}
          <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-900 rounded-full p-0.5 shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-red-600/20 rounded-full animate-pulse" />
              <div className="relative flex flex-col items-center justify-center text-center">
                <Car className="w-6 h-6 text-red-500 transform -scale-x-100" />
                <span className="text-[6px] font-black tracking-widest text-red-400 uppercase -mt-0.5">PROFIT</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-display">
                PROFIT <span className="text-red-600">AUTOMOBILE</span> STORE
              </span>
            </div>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase font-medium">
              Driven by Trust. Focused on Quality.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button 
            onClick={() => scrollToSection('hero')}
            className={`hover:text-red-500 transition-colors py-1 ${activeSection === 'hero' ? 'text-red-500 font-bold border-b-2 border-red-500' : 'text-gray-300'}`}
          >
            Home
          </button>

          {/* Mega Menu Category Dropdown */}
          <div className="relative" onMouseEnter={() => setMegaMenuOpen(true)} onMouseLeave={() => setMegaMenuOpen(false)}>
            <button 
              onClick={() => scrollToSection('categories')}
              className="flex items-center gap-1 hover:text-red-500 transition-colors text-gray-300 py-1"
            >
              <span>Product Categories</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${megaMenuOpen ? 'rotate-180 text-red-500' : ''}`} />
            </button>

            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-[#121212] border border-red-900/40 rounded-xl shadow-2xl p-6 grid grid-cols-3 gap-4 z-50 backdrop-blur-xl">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      scrollToSection('categories');
                    }}
                    className="group p-2.5 rounded-lg hover:bg-red-950/40 border border-transparent hover:border-red-900/40 transition-all cursor-pointer flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-900/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors flex-shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">{cat.title}</h4>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{cat.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => scrollToSection('services')}
            className={`hover:text-red-500 transition-colors py-1 ${activeSection === 'services' ? 'text-red-500 font-bold border-b-2 border-red-500' : 'text-gray-300'}`}
          >
            Services
          </button>

          <button 
            onClick={() => scrollToSection('franchise')}
            className={`hover:text-red-500 transition-colors py-1 ${activeSection === 'franchise' ? 'text-red-500 font-bold border-b-2 border-red-500' : 'text-gray-300'}`}
          >
            Franchise
          </button>

          <button 
            onClick={() => scrollToSection('stores')}
            className={`hover:text-red-500 transition-colors py-1 ${activeSection === 'stores' ? 'text-red-500 font-bold border-b-2 border-red-500' : 'text-gray-300'}`}
          >
            Store Locator
          </button>

          <button 
            onClick={() => scrollToSection('about')}
            className={`hover:text-red-500 transition-colors py-1 ${activeSection === 'about' ? 'text-red-500 font-bold border-b-2 border-red-500' : 'text-gray-300'}`}
          >
            About Us
          </button>
        </nav>

        {/* Action Controls & Triggers */}
        <div className="flex items-center gap-3">
          {/* Vehicle Selector Badge */}
          <button
            onClick={onOpenVehicleModal}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-gray-900 to-black px-3 py-1.5 rounded-lg border border-red-900/40 hover:border-red-500 transition-all text-xs"
          >
            <Car className="w-4 h-4 text-red-500" />
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block -mb-0.5">My Vehicle</span>
              <span className="font-bold text-white truncate max-w-[110px] block">
                {selectedVehicle.make ? `${selectedVehicle.make} ${selectedVehicle.model}` : 'Select Vehicle'}
              </span>
            </div>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg shadow-red-900/50 transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span className="hidden sm:inline">AI Expert</span>
          </button>

          {/* Quote Cart Button */}
          <button
            onClick={onOpenQuoteDrawer}
            className="relative p-2 bg-gray-900/80 hover:bg-red-950 text-gray-200 hover:text-white rounded-lg border border-red-900/30 transition-colors"
            title="Request Quotation"
          >
            <ShoppingBag className="w-5 h-5 text-red-400" />
            {totalQuoteCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-bounce">
                {totalQuoteCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0F] border-b border-red-900/40 px-6 py-6 space-y-4">
          <div className="p-3 bg-red-950/40 rounded-lg border border-red-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Car className="w-4 h-4 text-red-500" />
              <span className="text-gray-300 font-medium">Vehicle:</span>
              <span className="font-bold text-white">
                {selectedVehicle.make ? `${selectedVehicle.make} ${selectedVehicle.model}` : 'Not Selected'}
              </span>
            </div>
            <button 
              onClick={onOpenVehicleModal} 
              className="text-xs text-red-400 underline font-semibold"
            >
              Change
            </button>
          </div>

          <nav className="flex flex-col space-y-3 font-medium text-sm text-gray-200">
            <button onClick={() => scrollToSection('hero')} className="text-left py-2 border-b border-gray-800">Home</button>
            <button onClick={() => scrollToSection('categories')} className="text-left py-2 border-b border-gray-800">Product Categories</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-2 border-b border-gray-800">Services</button>
            <button onClick={() => scrollToSection('franchise')} className="text-left py-2 border-b border-gray-800 text-amber-400 font-bold">Become Franchise Partner</button>
            <button onClick={() => scrollToSection('stores')} className="text-left py-2 border-b border-gray-800">Store Locator</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2">About Big Business House</button>
          </nav>
        </div>
      )}
    </header>
  );
};
