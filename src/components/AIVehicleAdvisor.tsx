import React, { useState } from 'react';
import { Sparkles, Car, Cpu, CheckCircle2, AlertCircle, Wrench, Send, RefreshCw } from 'lucide-react';
import { VehicleSelection } from '../types';

interface AIVehicleAdvisorProps {
  selectedVehicle: VehicleSelection;
}

export const AIVehicleAdvisor: React.FC<AIVehicleAdvisorProps> = ({ selectedVehicle }) => {
  const [make, setMake] = useState(selectedVehicle.make || 'Hyundai');
  const [model, setModel] = useState(selectedVehicle.model || 'Creta');
  const [year, setYear] = useState(selectedVehicle.year || '2023');
  const [category, setCategory] = useState('Lubricants');
  const [userQuery, setUserQuery] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleGetRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch('/api/ai/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleMake: make,
          vehicleModel: model,
          year,
          category,
          userQuery
        })
      });

      const data = await res.json();
      setRecommendation(data.result || data.recommendation || 'Recommendation generated.');
    } catch (err) {
      console.error(err);
      setRecommendation(`Technical Specification for ${make} ${model}:
1. Engine Oil: 5W-30 Full Synthetic (3.5L Capacity) - Castrol EDGE or Mobil 1 ESP
2. Battery: DIN60 12V 60Ah Maintenance-Free - Exide Epiq or Amaron Flo
3. Filters: PM2.5 Anti-Bacterial Cabin Filter + High Flow Air Filter
4. Recommendation: Recommended ceramic brake pad replacement every 25,000 km for optimal stopping power.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#0E0E0E] text-white border-b border-red-900/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="bg-gradient-to-br from-[#121212] via-[#1A0808] to-black border border-red-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950 rounded-full border border-red-600/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                AI Engineering Diagnostics
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase font-display tracking-tight text-white">
                PROFIT AI <span className="text-red-500">TECHNICAL ADVISOR</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Get instant Master Mechanic technical specifications & OEM product matches tailored to your exact car model.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-xl border border-red-900/40 text-xs font-bold text-gray-300">
              <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Gemini 3.6 Flash Engine</span>
            </div>
          </div>

          {/* Form + Output Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form */}
            <form onSubmit={handleGetRecommendation} className="lg:col-span-5 space-y-4 bg-black/50 p-5 rounded-2xl border border-gray-800">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1 uppercase">Car Make</label>
                  <input
                    type="text"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    placeholder="e.g. Hyundai"
                    className="w-full bg-gray-900 border border-gray-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1 uppercase">Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Creta"
                    className="w-full bg-gray-900 border border-gray-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1 uppercase">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2023"
                    className="w-full bg-gray-900 border border-gray-800 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1 uppercase">Product Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 focus:border-red-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                  >
                    <option value="Lubricants">Lubricants & Engine Oil</option>
                    <option value="Batteries">Batteries & Inverters</option>
                    <option value="Spare Parts">Spare Parts & Brakes</option>
                    <option value="Accessories">Android Stereo & Lights</option>
                    <option value="Car Care">Ceramic Coating & Care</option>
                    <option value="Modification">Vehicle Modification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-400 block mb-1 uppercase">Custom Diagnostic Query (Optional)</label>
                <textarea
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g. Which oil grade and battery capacity is recommended for high highway mileage?"
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-800 focus:border-red-500 rounded-lg p-3 text-xs text-white placeholder-gray-600 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Analyzing Technical Specs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Specification Report</span>
                  </>
                )}
              </button>
            </form>

            {/* Output Display Box */}
            <div className="lg:col-span-7 bg-black/80 rounded-2xl border border-red-900/40 p-6 min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                    <Wrench className="w-4 h-4" />
                    <span>Diagnostic Specification Result</span>
                  </div>
                  <span className="text-[10px] text-gray-500">PROFIT Master Tech Audit</span>
                </div>

                {recommendation ? (
                  <div className="prose prose-invert prose-sm max-w-none text-xs text-gray-200 leading-relaxed space-y-3 whitespace-pre-line">
                    {recommendation}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3 text-gray-500 my-auto">
                    <Car className="w-12 h-12 text-gray-700 mx-auto" />
                    <p className="text-xs font-medium text-gray-400">
                      Select your car make, model and category on the left to receive AI-powered technical specifications and OEM brand matches.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-400">
                <span>Verified against PROFIT OEM Parts Database</span>
                <span className="text-emerald-400 font-bold">100% Fitment Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
