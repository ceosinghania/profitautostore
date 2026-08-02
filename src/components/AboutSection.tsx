import React from 'react';
import { Building2, ShieldCheck, Award, Users, Target, Eye, Wrench, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#0B0B0B] text-white border-b border-red-900/30 relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Store Exterior Visual Banner */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-red-900/40 shadow-2xl group">
              <img
                src="/src/assets/images/store_front_render_1785656042129.jpg"
                alt="Profit Automobile Store Outlet"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Badge on Store Banner */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-red-900/40 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">PROFIT AUTOMOBILE STORE</h4>
                  <p className="text-xs text-red-400 font-semibold">Retail Chain of Big Business House</p>
                </div>
                <div className="p-2 bg-red-600 rounded-lg text-white font-bold text-xs uppercase tracking-wider">
                  Est. Flagship
                </div>
              </div>
            </div>

            {/* Float Card */}
            <div className="absolute -bottom-6 -right-4 bg-gradient-to-r from-red-900 to-black p-4 rounded-xl border border-red-500/40 shadow-2xl hidden sm:flex items-center gap-3">
              <div className="p-3 bg-red-600 text-white rounded-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">India's Fastest Growing</p>
                <p className="text-sm font-black text-white uppercase">Automobile Retail Chain</p>
              </div>
            </div>
          </div>

          {/* Right Side: Corporate Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" />
              Corporate Identity
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-display leading-tight">
              PROFIT AUTOMOBILE STORE <br />
              <span className="text-red-600">RETAIL CHAIN OF BIG BUSINESS HOUSE</span>
            </h2>

            <p className="text-gray-300 text-base leading-relaxed">
              <strong>Profit Automobile Store</strong> is the premier flagship retail chain of <strong>Big Business House</strong>, committed to revolutionizing automobile ownership and maintenance across India.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              We bring under one roof world-class multi-brand automotive lubricants, batteries, spare parts, high-tech Android stereos, ceramic detailing, alloy wheels, and custom vehicle modification.
            </p>

            {/* Offerings Check Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-200 py-2">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Lubricants & Engine Oils</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Maintenance-Free Batteries</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> High-Tech Android Stereos</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Genuine OEM Spare Parts</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> High Performance Filters</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Custom Nappa Seat Covers</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Alloy Wheels & Tyres</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-500" /> Vehicle Detailing & Spa</div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-gray-900/80 rounded-xl border border-red-900/30 space-y-1">
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>OUR MISSION</span>
                </div>
                <p className="text-xs text-gray-400 leading-normal">
                  Deliver 100% genuine automotive products with transparent pricing, certified fitting, and exceptional customer service pan-India.
                </p>
              </div>

              <div className="p-4 bg-gray-900/80 rounded-xl border border-red-900/30 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>OUR VISION</span>
                </div>
                <p className="text-xs text-gray-400 leading-normal">
                  To become India's most trusted, technologically advanced, and accessible automobile retail chain with 500+ franchise stores.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
