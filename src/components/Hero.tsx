import React from 'react';
import { 
  Car, ShieldCheck, Wrench, Search, MapPin, Award, 
  FileText, Mail, Sparkles, ChevronRight, CheckCircle2, Star
} from 'lucide-react';
import { VehicleSelection } from '../types';

interface HeroProps {
  selectedVehicle: VehicleSelection;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<VehicleSelection>>;
  onOpenVehicleModal: () => void;
  onOpenFranchiseModal: () => void;
  onOpenQuoteDrawer: () => void;
  onOpenAiChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedVehicle,
  setSelectedVehicle,
  onOpenVehicleModal,
  onOpenFranchiseModal,
  onOpenQuoteDrawer,
  onOpenAiChat
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] bg-[#0B0B0B] text-white flex flex-col justify-between overflow-hidden">
      {/* Background HD Image Overlay with Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_car_showroom_1785656029935.jpg"
          alt="PROFIT AUTOMOBILE STORE Showroom"
          className="w-full h-full object-cover object-center opacity-40 filter brightness-90 saturate-110 transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Main Hero Banner Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-8 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Corporate Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-600/50 text-red-400 text-xs font-semibold backdrop-blur-md shadow-lg shadow-red-950/50">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Retail Chain of Big Business House</span>
              <span className="text-red-600">•</span>
              <span className="text-gray-300 font-normal">Pan-India Network</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.05] font-display">
              PROFIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">AUTOMOBILE</span> STORE
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl leading-relaxed">
              India's Premium Destination for Genuine Automobile Accessories, Spare Parts, Lubricants, Batteries & Car Care.
            </p>

            <p className="text-sm text-gray-400 max-w-xl">
              Everything Your Vehicle Needs — Genuine Products, Expert Support & Premium Quality Assured by Big Business House.
            </p>

            {/* Key Value Pill Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg border border-red-900/30 text-xs">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="font-semibold text-gray-200">100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg border border-red-900/30 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-gray-200">National Warranty</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg border border-red-900/30 text-xs">
                <Wrench className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold text-gray-200">Expert Fitment</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg border border-red-900/30 text-xs">
                <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="font-semibold text-gray-200">Best Price</span>
              </div>
            </div>

            {/* CTA Buttons Group */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {/* Explore Products */}
              <button
                onClick={() => scrollToSection('categories')}
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold rounded-xl shadow-xl shadow-red-900/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
              >
                <span>Explore Products</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Find Store */}
              <button
                onClick={() => scrollToSection('stores')}
                className="px-5 py-3.5 bg-gray-900/90 hover:bg-gray-800 text-white font-semibold rounded-xl border border-red-900/40 hover:border-red-500 transition-all flex items-center gap-2 text-sm"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Find Store</span>
              </button>

              {/* Become Franchise Partner */}
              <button
                onClick={onOpenFranchiseModal}
                className="px-5 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                <Award className="w-4 h-4 text-amber-200" />
                <span>Become Franchise Partner</span>
              </button>

              {/* Request Quote */}
              <button
                onClick={onOpenQuoteDrawer}
                className="px-5 py-3.5 bg-gray-900/90 hover:bg-red-950 text-gray-200 font-semibold rounded-xl border border-gray-700 transition-all flex items-center gap-2 text-sm"
              >
                <FileText className="w-4 h-4 text-gray-300" />
                <span>Request Quote</span>
              </button>

              {/* Email Us */}
              <a
                href="mailto:Info@profitautostore.in"
                className="px-4 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive AI Compatibility Quick Search Box */}
          <div className="lg:col-span-4">
            <div className="bg-[#121212]/90 border border-red-900/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/20 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-600/20 text-red-500 rounded-lg">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">AI Vehicle Match</h3>
                    <p className="text-[11px] text-gray-400">Lock exact specs for your car</p>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              </div>

              {/* Selector Form */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] uppercase font-bold text-gray-400 block mb-1">Vehicle Make</label>
                  <select 
                    value={selectedVehicle.make} 
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, make: e.target.value, model: '' })}
                    className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs font-semibold text-white outline-none transition-colors"
                  >
                    <option value="">Select Make (e.g. Hyundai, Tata)</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Tata Motors">Tata Motors</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Kia">Kia</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Honda">Honda</option>
                    <option value="Volkswagen">Volkswagen</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold text-gray-400 block mb-1">Model Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Creta, Thar, Nexon, Swift"
                    value={selectedVehicle.model}
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, model: e.target.value })}
                    className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] uppercase font-bold text-gray-400 block mb-1">Year</label>
                    <select
                      value={selectedVehicle.year}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, year: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                    >
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2018">2018 - Older</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-bold text-gray-400 block mb-1">Fuel Type</label>
                    <select
                      value={selectedVehicle.fuelType}
                      onChange={(e) => setSelectedVehicle({ ...selectedVehicle, fuelType: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                    >
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                      <option value="CNG">CNG</option>
                      <option value="Electric">Electric / EV</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={onOpenAiChat}
                  className="w-full mt-2 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Get AI Product Match</span>
                </button>
              </div>

              {selectedVehicle.make && (
                <div className="mt-4 p-3 bg-red-950/40 rounded-lg border border-red-900/30 text-[11px] text-gray-300">
                  <p className="font-semibold text-red-400">Locked Match:</p>
                  <p className="font-bold text-white text-xs">{selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year} {selectedVehicle.fuelType})</p>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Showing verified compatible parts & lubricants
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Storefront Showcase Bar */}
      <div className="relative z-10 bg-gradient-to-r from-red-950/90 via-[#0E0E0E] to-black border-t border-red-900/40 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-bold uppercase tracking-wider">Store Status:</span>
            <span>All 50+ Retail Outlets & Service Bays Open Pan-India</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-red-500 font-bold">50,000+</span> SKU Catalog
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-red-500 font-bold">2,50,000+</span> Satisfied Drivers
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-amber-400 font-bold">4.9 ★</span> Google Customer Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
