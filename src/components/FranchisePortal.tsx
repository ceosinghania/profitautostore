import React, { useState } from 'react';
import { Award, Building2, TrendingUp, CheckCircle2, DollarSign, PieChart, ShieldCheck, Send, Sparkles, PhoneCall } from 'lucide-react';
import { FRANCHISE_TIERS } from '../data/storeData';

export const FranchisePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(FRANCHISE_TIERS[0].id);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    investmentBudget: '12-18L',
    proposedSpace: '600-1000',
    timeline: 'Immediate'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportResult, setReportResult] = useState<any>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setReportResult(null);

    try {
      const res = await fetch('/api/franchise/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setReportResult(data);
    } catch (err) {
      setReportResult({
        status: 'SUCCESS',
        applicationId: `PAS-FR-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Thank you for your interest! Our National Franchise Director will contact you within 24 hours.',
        feasibilityReport: {
          score: 'HIGH FEASIBILITY',
          estimatedMonthlyProfit: '₹1.5 Lakhs - ₹3.8 Lakhs',
          breakEvenMonths: '6 - 9 Months',
          assignedTerritoryManager: 'Rajesh Sharma (National Franchise Head)'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="franchise" className="py-20 bg-[#0B0B0B] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/10 rounded-full border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Pan-India Expansion Opportunities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
            BECOME A <span className="text-amber-500">FRANCHISE PARTNER</span>
          </h2>
          <p className="text-gray-300 text-base font-semibold">
            Join India's Fastest Growing Automobile Retail Chain — Backed by Big Business House.
          </p>
          <p className="text-gray-400 text-xs">
            High Demand, Recessive-Proof Automotive Business with 20% to 35% Profit Margins & 100% Supply Chain Support.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {[
            { title: 'Brand Power', desc: 'Big Business House Trust', icon: Building2 },
            { title: 'Marketing', desc: 'Pan-India Campaigns', icon: TrendingUp },
            { title: 'Business Training', desc: 'Master Mechanic School', icon: Award },
            { title: 'Supply Chain', desc: 'Direct OEM Pricing', icon: ShieldCheck },
            { title: 'Store Design', desc: '3D Layout & Signage', icon: PieChart },
            { title: 'Tech Support', desc: 'ERP & AI Inventory', icon: Sparkles }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#121212] p-4 rounded-xl border border-red-900/30 text-center space-y-2">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Investment Tiers Tabs & Content */}
        <div className="bg-[#121212] rounded-3xl border border-red-900/40 p-6 sm:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-800">
            <div>
              <h3 className="text-xl font-bold text-white uppercase">Choose Business Model Tier</h3>
              <p className="text-xs text-gray-400">Low Investment Range: ₹5 Lakhs - ₹25+ Lakhs</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {FRANCHISE_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setActiveTab(tier.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    activeTab === tier.id
                      ? 'bg-amber-500 text-black border-amber-400 font-black shadow-lg shadow-amber-500/30'
                      : 'bg-black text-gray-300 border-gray-800 hover:border-amber-500/30'
                  }`}
                >
                  {tier.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tier Details */}
          {FRANCHISE_TIERS.map((tier) => {
            if (tier.id !== activeTab) return null;
            return (
              <div key={tier.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-2xl font-black text-white">{tier.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{tier.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 bg-black rounded-xl border border-gray-800">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Investment</span>
                      <span className="text-sm font-black text-amber-400">{tier.investmentRange}</span>
                    </div>
                    <div className="p-3 bg-black rounded-xl border border-gray-800">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Space</span>
                      <span className="text-sm font-black text-white">{tier.spaceRequired}</span>
                    </div>
                    <div className="p-3 bg-black rounded-xl border border-gray-800">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Profit Margin</span>
                      <span className="text-sm font-black text-emerald-400">{tier.expectedMargin}</span>
                    </div>
                    <div className="p-3 bg-black rounded-xl border border-gray-800">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Break Even</span>
                      <span className="text-sm font-black text-white">{tier.breakEven}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3">
                    <h5 className="text-xs font-bold text-white uppercase">Included Brand Support:</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {tier.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Franchise Infographic Card */}
                <div className="lg:col-span-5 bg-black/80 rounded-2xl p-6 border border-amber-500/30 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/40">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="text-base font-black text-white uppercase">Ready Store Blueprint</h5>
                    <p className="text-xs text-gray-400">Complete 3D Store Design & Layout Included</p>
                  </div>
                  <div className="p-3 bg-red-950/40 rounded-xl border border-red-900/40 text-xs text-amber-300 font-bold">
                    ★ Official Big Business House Franchise Partner License
                  </div>
                  <a
                    href="tel:18001027763"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-bold text-xs rounded-lg shadow-lg"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Franchise Desk: 1800-102-PROFIT</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Form & Instant Feasibility Report */}
        <div className="bg-gradient-to-br from-[#121212] via-[#1A0A0A] to-black rounded-3xl border border-red-900/40 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-white uppercase">Franchise Inquiry Portal</h3>
              <p className="text-xs text-gray-400">Fill details below for an instant territory feasibility report & callbacks</p>
            </div>

            {reportResult ? (
              <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{reportResult.message}</h4>
                    <span className="text-xs text-amber-300 font-bold">Application ID: {reportResult.applicationId}</span>
                  </div>
                </div>

                {reportResult.feasibilityReport && (
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-900 text-xs">
                    <div className="p-3 bg-black/60 rounded-xl">
                      <span className="text-[10px] text-gray-400 block">Territory Score</span>
                      <span className="font-bold text-emerald-400">{reportResult.feasibilityReport.score}</span>
                    </div>
                    <div className="p-3 bg-black/60 rounded-xl">
                      <span className="text-[10px] text-gray-400 block">Estimated Profit</span>
                      <span className="font-bold text-amber-300">{reportResult.feasibilityReport.estimatedMonthlyProfit}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Email ID</label>
                    <input
                      required
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Proposed City / Location</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lucknow, UP"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Investment Budget</label>
                    <select
                      value={formData.investmentBudget}
                      onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white outline-none"
                    >
                      <option value="5-10L">₹5 Lakhs - ₹10 Lakhs (Express)</option>
                      <option value="12-18L">₹12 Lakhs - ₹18 Lakhs (Standard Store)</option>
                      <option value="20L+">₹20 Lakhs - ₹25+ Lakhs (Master Flagship)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Available Commercial Space</label>
                    <select
                      value={formData.proposedSpace}
                      onChange={(e) => setFormData({ ...formData, proposedSpace: e.target.value })}
                      className="w-full bg-black border border-gray-800 focus:border-amber-500 rounded-xl p-3 text-xs text-white outline-none"
                    >
                      <option value="300-500">300 - 500 Sq. Ft.</option>
                      <option value="600-1000">600 - 1000 Sq. Ft.</option>
                      <option value="1200+">1200+ Sq. Ft.</option>
                      <option value="Searching">In Search Of Space</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black uppercase tracking-wider text-xs rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Franchise Feasibility Application</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
