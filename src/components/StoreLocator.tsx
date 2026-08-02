import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Search, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { STORE_LOCATIONS } from '../data/storeData';

export const StoreLocator: React.FC = () => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedStore, setSelectedStore] = useState(STORE_LOCATIONS[0]);

  const filteredStores = STORE_LOCATIONS.filter(store => {
    if (!searchCity.trim()) return true;
    const q = searchCity.toLowerCase();
    return store.city.toLowerCase().includes(q) || 
           store.state.toLowerCase().includes(q) || 
           store.name.toLowerCase().includes(q) ||
           store.address.toLowerCase().includes(q);
  });

  return (
    <section id="stores" className="py-20 bg-[#0E0E0E] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest">
            Pan-India Retail Network
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
            STORE <span className="text-red-600">LOCATOR</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Locate your nearest Profit Automobile Store flagship hub or express outlet across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Jaipur, Pune & major centers.
          </p>
        </div>

        {/* Store Locator Search & List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Store Search & Selection List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#121212] p-4 rounded-2xl border border-red-900/40 relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-7 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city, state or pincode (e.g. Delhi, Mumbai, 110020)..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredStores.map(store => (
                <div
                  key={store.id}
                  onClick={() => setSelectedStore(store)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedStore.id === store.id
                      ? 'bg-gradient-to-r from-red-950/90 to-black border-red-500 shadow-lg shadow-red-950/50'
                      : 'bg-[#121212] border-gray-800 hover:border-red-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{store.name}</h4>
                      <p className="text-[11px] text-red-400 font-semibold">{store.city}, {store.state}</p>
                    </div>
                    {store.isFlagship && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                        Flagship Hub
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {store.address}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-gray-300 pt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-red-500" />
                      {store.phone}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Clock className="w-3 h-3" /> Open
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Preview & Selected Store Card */}
          <div className="lg:col-span-7 bg-[#121212] rounded-3xl border border-red-900/40 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">Selected Retail Outlet</span>
                <h3 className="text-xl font-black text-white">{selectedStore.name}</h3>
              </div>
              <a
                href={`https://maps.google.com/?q=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Open Google Maps GPS</span>
              </a>
            </div>

            {/* Simulated Interactive Map Display Card */}
            <div className="relative h-64 bg-black rounded-2xl border border-red-900/30 overflow-hidden flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-red-950 opacity-90" />
              
              {/* Map Pins Visual */}
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white mx-auto flex items-center justify-center shadow-2xl shadow-red-600/50 animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white">{selectedStore.name}</h4>
                <p className="text-xs text-gray-300 max-w-md mx-auto">{selectedStore.address}</p>
                <p className="text-[11px] text-amber-400 font-bold">GPS Coords: {selectedStore.coordinates.lat}, {selectedStore.coordinates.lng}</p>
              </div>
            </div>

            {/* Store Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-black rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-bold block">Operating Timings</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {selectedStore.timing}
                </span>
              </div>

              <div className="p-4 bg-black rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-bold block">Direct Hotline</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  {selectedStore.phone}
                </span>
              </div>
            </div>

            {/* Onsite Services List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Available Onsite Facilities:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStore.servicesAvailable.map((srv, i) => (
                  <span key={i} className="text-xs bg-red-950/60 text-red-300 px-3 py-1 rounded-lg border border-red-900/40 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {srv}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
