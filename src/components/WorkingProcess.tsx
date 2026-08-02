import React from 'react';
import { ClipboardCheck, PackageCheck, Wrench, ShieldCheck, Smile, ArrowRight } from 'lucide-react';
import { WORKING_PROCESS } from '../data/storeData';

export const WorkingProcess: React.FC = () => {
  const iconsMap: Record<string, React.ReactNode> = {
    ClipboardCheck: <ClipboardCheck className="w-6 h-6" />,
    PackageCheck: <PackageCheck className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    Smile: <Smile className="w-6 h-6" />
  };

  return (
    <section className="py-20 bg-[#0E0E0E] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest">
            Standard Operating Procedure
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
            WORKING <span className="text-red-600">PROCESS</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Five disciplined steps followed across every Profit Automobile Store outlet in India to guarantee safety, zero wire damage, and 100% satisfaction.
          </p>
        </div>

        {/* 5 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {WORKING_PROCESS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#141414] hover:bg-gradient-to-b hover:from-[#1A0808] hover:to-[#121212] p-5 rounded-2xl border border-red-900/20 hover:border-red-600/50 transition-all duration-300 relative group shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Step Number Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 font-display">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/40 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {iconsMap[item.icon] || <Wrench className="w-5 h-5" />}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-amber-400 font-semibold mb-2">{item.subtitle}</p>

                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-1 pt-2 border-t border-gray-800">
                  {item.details.map((d, i) => (
                    <div key={i} className="text-[10px] text-gray-300 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {idx < 4 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-red-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
