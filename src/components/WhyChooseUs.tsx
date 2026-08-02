import React from 'react';
import { 
  ShieldCheck, Wrench, Tag, Users, CheckCircle, Award, 
  Smile, Truck, Globe, Building2 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const whyChooseReasons = [
    {
      title: '100% Genuine Products',
      desc: 'Sourced directly from global OEM manufacturers with barcode verification and serial authentication.',
      icon: ShieldCheck,
      highlight: 'Barcode Verified'
    },
    {
      title: 'Expert Service & Support',
      desc: 'Master mechanics and trained technicians providing doorstep and in-store fitting support.',
      icon: Wrench,
      highlight: 'Master Techs'
    },
    {
      title: 'Best Price Guarantee',
      desc: 'Transparent pricing with Big Business House corporate buying power passed straight to you.',
      icon: Tag,
      highlight: 'Unbeatable Value'
    },
    {
      title: 'Trusted by Thousands',
      desc: 'Over 250,000 satisfied car and bike owners across major metro cities and highways.',
      icon: Users,
      highlight: '2.5L+ Customers'
    },
    {
      title: 'Professional Installation',
      desc: 'Precision fitting using specialized diagnostic tools, pneumatic guns, and zero wire splicing.',
      icon: CheckCircle,
      highlight: 'OEM Standards'
    },
    {
      title: 'Quality Assurance',
      desc: 'Every item passes multi-stage quality testing before being cataloged in our stores.',
      icon: Award,
      highlight: 'Multi-Check Approved'
    },
    {
      title: 'Customer Satisfaction',
      desc: '4.9 Star rated customer service with 24x7 helpline and hassle-free warranty claim process.',
      icon: Smile,
      highlight: '4.9 ★ Rating'
    },
    {
      title: 'Fast Express Delivery',
      desc: '24-48 Hours rapid dispatch from regional warehouse hubs across all major pincodes.',
      icon: Truck,
      highlight: 'Express Dispatch'
    },
    {
      title: 'Pan India Network',
      desc: '50+ operational outlets and expanding fast into tier-1, tier-2, and tier-3 industrial centers.',
      icon: Globe,
      highlight: 'Nationwide Stores'
    },
    {
      title: 'Retail Chain of Big Business House',
      desc: 'Backed by the financial strength, trust, and ethical heritage of Big Business House group.',
      icon: Building2,
      highlight: 'Flagship Group'
    }
  ];

  return (
    <section className="py-20 bg-[#0E0E0E] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest">
            The Profit Advantage
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
            WHY CHOOSE <span className="text-red-600">PROFIT AUTOMOBILE STORE</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Setting the national benchmark in automotive retail through genuine products, cutting-edge technical expertise, and Big Business House backing.
          </p>
        </div>

        {/* 10 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {whyChooseReasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group bg-[#141414] hover:bg-gradient-to-b hover:from-[#1A0A0A] hover:to-[#121212] p-5 rounded-xl border border-red-900/20 hover:border-red-600/50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-950/40 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-800/40 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-800/50 flex items-center text-[10px] text-gray-500 font-semibold group-hover:text-red-400 transition-colors">
                  <span>PROFIT GUARANTEED</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
