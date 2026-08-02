import React, { useState } from 'react';
import { Wrench, Clock, ShieldCheck, Sparkles, CheckCircle2, ChevronRight, PhoneCall, Calendar } from 'lucide-react';
import { SERVICE_ITEMS } from '../data/storeData';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
    }, 4000);
  };

  return (
    <section id="services" className="py-20 bg-[#0B0B0B] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest">
            Expert Workshop & Detailing Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
            OUR PREMIUM <span className="text-red-600">SERVICES</span>
          </h2>
          <p className="text-gray-400 text-sm">
            State-of-the-art hydraulic lifts, temperature-controlled ceramic coating booths, and certified master mechanics at every Profit Automobile Store.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_ITEMS.map((service) => (
            <div
              key={service.id}
              className="bg-[#121212] rounded-2xl border border-red-900/30 hover:border-red-600/60 p-6 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800/40 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Estimated Time</span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" /> {service.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-gray-800/60">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-800/60 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase block font-bold">Service Rate</span>
                  <span className="text-sm font-black text-emerald-400">{service.priceEstimate}</span>
                </div>

                <button
                  onClick={() => setSelectedService(service.title)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1"
                >
                  <span>Book Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Booking Slot Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-red-900/50 rounded-2xl max-w-md w-full p-6 space-y-4 relative">
            <h3 className="text-lg font-bold text-white">Book Service Appointment</h3>
            <p className="text-xs text-red-400 font-semibold">{selectedService}</p>

            {bookingSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Service Appointment Confirmed!</h4>
                <p className="text-xs text-gray-300">Our Store Manager will call you shortly to confirm your preferred workshop timing.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">Vehicle Model & City</label>
                  <input required type="text" placeholder="e.g. Creta / Delhi Okhla Store" className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white" />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setSelectedService(null)} className="px-4 py-2 bg-gray-900 text-xs font-semibold rounded-lg text-gray-300">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-red-600 text-white text-xs font-bold rounded-lg shadow-lg">
                    Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
