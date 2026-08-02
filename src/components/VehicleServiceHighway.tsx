import React, { useState } from 'react';
import { 
  Bike, Car, Truck, Wrench, Sparkles, CheckCircle2, 
  MapPin, Clock, ArrowRight, ShieldCheck, Zap, Settings,
  RotateCcw, Play, ChevronRight, Gauge
} from 'lucide-react';

interface VehicleServiceItem {
  id: string;
  type: 'bike' | 'car' | 'heavy';
  name: string;
  categoryName: string;
  icon: typeof Bike;
  badgeColor: string;
  borderColor: string;
  serviceItems: string[];
  estimatedTime: string;
  expressPrice: string;
  tag: string;
}

const VEHICLE_TYPES: VehicleServiceItem[] = [
  {
    id: 'bike-1',
    type: 'bike',
    name: 'Superbike & Two-Wheeler',
    categoryName: 'Bike & Two-Wheeler Bay',
    icon: Bike,
    badgeColor: 'bg-amber-500 text-black',
    borderColor: 'border-amber-500/50',
    serviceItems: ['Synthetic Engine Oil Flush', 'Chain Lube & Tensioning', 'Brake Pad & Disc Inspection', '30-Point Computerized Scan'],
    estimatedTime: '20 Mins Express',
    expressPrice: '₹499 Onwards',
    tag: 'BIKE / 2-WHEELER'
  },
  {
    id: 'car-1',
    type: 'car',
    name: 'Passenger Car / SUV / EV',
    categoryName: 'Car & SUV Premium Bay',
    icon: Car,
    badgeColor: 'bg-red-600 text-white',
    borderColor: 'border-red-500/50',
    serviceItems: ['360° Digital Health Scan', 'Synthetic Oil & Filter Change', '3D Wheel Alignment & Balancing', 'AC Filter & Sanitization'],
    estimatedTime: '45 Mins Express',
    expressPrice: '₹1,499 Onwards',
    tag: 'CAR / SUV / EV'
  },
  {
    id: 'heavy-1',
    type: 'heavy',
    name: 'Heavy Commercial & Fleet Vehicle',
    categoryName: 'Heavy Vehicle & Fleet Bay',
    icon: Truck,
    badgeColor: 'bg-blue-600 text-white',
    borderColor: 'border-blue-500/50',
    serviceItems: ['Hydraulic System Check', 'Heavy-Duty Brake Liner Service', 'Commercial Engine Tune-up', 'Pneumatic Pressure Scan'],
    estimatedTime: '60 Mins Express',
    expressPrice: '₹2,999 Onwards',
    tag: 'HEAVY VEHICLE / TRUCK / BUS'
  }
];

export const VehicleServiceHighway: React.FC = () => {
  const [activeVehicleType, setActiveVehicleType] = useState<'all' | 'bike' | 'car' | 'heavy'>('all');
  const [servicingVehicle, setServicingVehicle] = useState<VehicleServiceItem | null>(VEHICLE_TYPES[1]);
  const [isDriveInActive, setIsDriveInActive] = useState(false);
  const [serviceStatusMessage, setServiceStatusMessage] = useState('Vehicles arriving live at Profit Automobile Store Service Hub');

  const handleLaunchVehicle = (vehicle: VehicleServiceItem) => {
    setServicingVehicle(vehicle);
    setIsDriveInActive(true);
    setServiceStatusMessage(`⚡ ${vehicle.name} arrived at Profit Automobile Store Service Bay! Diagnostic Scan in Progress...`);

    setTimeout(() => {
      setServiceStatusMessage(`✅ ${vehicle.name} Service Diagnostic Ready! Express Turnaround: ${vehicle.estimatedTime}`);
    }, 1500);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#0B0B0B] via-[#120505] to-[#0B0B0B] border-y border-red-900/40 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f0303_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-600/40 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>Multi-Vehicle Live Service Express Highway</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide flex items-center gap-3">
              <span>Drive In To</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
                Profit Automobile Store
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              From Superbikes and Cars to Heavy Commercial Vehicles & Fleets — Our automated multi-bay service stations are equipped for instant check-in, 3D diagnostics, and express servicing.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveVehicleType('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeVehicleType === 'all' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setActiveVehicleType('bike')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeVehicleType === 'bike' ? 'bg-amber-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" /> Bikes
            </button>
            <button
              onClick={() => setActiveVehicleType('car')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeVehicleType === 'car' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" /> Cars
            </button>
            <button
              onClick={() => setActiveVehicleType('heavy')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 ${
                activeVehicleType === 'heavy' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5" /> Heavy Vehicles
            </button>
          </div>
        </div>

        {/* HIGHWAY & SERVICE STORE ANIMATED CONTAINER */}
        <div className="relative bg-black/90 rounded-2xl border border-gray-800 p-6 overflow-hidden shadow-2xl">
          
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#140808] border border-red-900/40 rounded-xl px-4 py-2.5 text-xs mb-6">
            <div className="flex items-center gap-2 text-gray-300 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-amber-300 font-bold uppercase tracking-wider">{serviceStatusMessage}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-[11px]">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-red-500" /> Average Service Time: 30 Mins</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> OEM Spare Parts Guarantee</span>
            </div>
          </div>

          {/* MAIN VISUAL ROAD LAYOUT */}
          <div className="relative min-h-[220px] flex flex-col md:flex-row items-center justify-between gap-6 my-2">
            
            {/* SCROLLING HIGHWAY LINE WITH RUNNING VEHICLES */}
            <div className="w-full md:w-2/3 relative h-40 bg-[#161616] rounded-2xl border-2 border-gray-800 overflow-hidden flex flex-col justify-between p-3 shadow-inner">
              
              {/* Highway Overhead Road Sign */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 z-10 bg-[#161616]/90 px-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white font-extrabold text-[10px] rounded tracking-wider uppercase">EXPRESS HIGHWAY 01</span>
                  <span className="text-gray-400 text-[11px]">→ Drive-Thru Service Hub Entrance</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">LIVE TRAFFIC FEED</span>
              </div>

              {/* Highway Asphalt Road Surface */}
              <div className="relative h-20 my-auto bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 rounded-lg overflow-hidden flex items-center border-y border-gray-700/80">
                
                {/* Dotted Center Road Line Animation */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 flex justify-between gap-3 opacity-80 pointer-events-none">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="w-6 h-1 bg-amber-400/80 rounded-sm animate-pulse" />
                  ))}
                </div>

                {/* SCROLLING VEHICLES MARQUEE / TRACK */}
                <div className="w-full overflow-hidden whitespace-nowrap relative z-10">
                  <div className="inline-flex gap-12 animate-marquee items-center">
                    
                    {/* Repeated Loop of Vehicles running towards the store */}
                    {[...VEHICLE_TYPES, ...VEHICLE_TYPES, ...VEHICLE_TYPES].map((item, index) => {
                      if (activeVehicleType !== 'all' && item.type !== activeVehicleType) return null;
                      const Icon = item.icon;
                      return (
                        <div 
                          key={`${item.id}-${index}`}
                          onClick={() => handleLaunchVehicle(item)}
                          className="inline-flex items-center gap-3 bg-black/80 hover:bg-red-950/80 border border-gray-700 hover:border-red-500 rounded-xl p-2.5 px-4 cursor-pointer transition-all transform hover:scale-105 group shadow-lg"
                        >
                          <div className={`p-2 rounded-lg ${item.badgeColor} shadow-md group-hover:rotate-6 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-white group-hover:text-red-400 transition-colors">{item.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded font-bold uppercase">{item.tag}</span>
                            </div>
                            <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                              <span>Arriving for Service</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>

              </div>

              {/* Highway Bottom Lane Details */}
              <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 px-2 z-10">
                <span>⚡ Tap any vehicle above to test drive into Profit Automobile Service Bay</span>
                <span className="text-emerald-400 font-bold">100% Free Inspection Available</span>
              </div>
            </div>

            {/* DESTINATION: PROFIT AUTOMOBILE STORE SERVICE BAY */}
            <div className="w-full md:w-1/3 bg-gradient-to-br from-red-950/80 via-black to-[#1a0505] rounded-2xl border-2 border-red-600/60 p-5 relative shadow-2xl flex flex-col justify-between min-h-[170px]">
              
              {/* Neon Store Header */}
              <div className="flex items-start justify-between border-b border-red-900/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-red-600 rounded-xl text-white shadow-lg shadow-red-600/30 animate-pulse">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      PROFIT AUTOMOBILE STORE
                    </h3>
                    <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" /> Express Service Hub Bay
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-[10px] font-extrabold uppercase animate-pulse">
                  OPEN LIVE
                </span>
              </div>

              {/* Service Bay Active Display */}
              {servicingVehicle && (
                <div className="my-3 p-3 bg-black/80 rounded-xl border border-red-900/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">Active Bay Check-in:</span>
                    <span className="text-amber-400 font-extrabold">{servicingVehicle.categoryName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${servicingVehicle.badgeColor}`}>
                      <servicingVehicle.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{servicingVehicle.name}</span>
                      <span className="text-[10px] text-gray-400">Turnaround: {servicingVehicle.estimatedTime} | {servicingVehicle.expressPrice}</span>
                    </div>
                  </div>

                  {/* Checklist Pill Highlights */}
                  <div className="grid grid-cols-2 gap-1 pt-1 border-t border-gray-800">
                    {servicingVehicle.serviceItems.slice(0, 2).map((sItem, idx) => (
                      <span key={idx} className="text-[9px] text-gray-300 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{sItem}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action Button */}
              <a
                href="#services"
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <span>Book Service for Bike / Car / Heavy Vehicle</span>
                <ChevronRight className="w-4 h-4" />
              </a>

            </div>

          </div>

          {/* Quick Vehicle Type Selector Cards Below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
            {VEHICLE_TYPES.map((v) => {
              const VIcon = v.icon;
              return (
                <div 
                  key={v.id}
                  onClick={() => handleLaunchVehicle(v)}
                  className={`p-4 rounded-xl bg-black/60 border ${v.borderColor} hover:bg-red-950/30 cursor-pointer transition-all flex items-start justify-between group shadow-md`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg text-xs ${v.badgeColor}`}>
                        <VIcon className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-extrabold text-white group-hover:text-amber-400 transition-colors">{v.tag}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-200">{v.name}</p>
                    <p className="text-[11px] text-gray-400">Starting at <span className="text-amber-400 font-bold">{v.expressPrice}</span></p>
                  </div>
                  <button className="p-2 bg-gray-900 group-hover:bg-red-600 text-gray-300 group-hover:text-white rounded-lg transition-colors">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
