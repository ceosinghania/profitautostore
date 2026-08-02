import React, { useState } from 'react';
import { Camera, Eye, Sparkles, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'g-1',
      title: 'PROFIT Flagship Showroom Exterior',
      category: 'Store',
      image: '/src/assets/images/store_front_render_1785656042129.jpg',
      desc: 'Modern red and black glass architectural storefront'
    },
    {
      id: 'g-2',
      title: 'Luxury Sports SUV Detailing Bay',
      category: 'Detailing',
      image: '/src/assets/images/detailing_workshop_1785656058206.jpg',
      desc: '3M 9H Ceramic coating application under LED spotlights'
    },
    {
      id: 'g-3',
      title: 'High-Tech Automobile Showroom Floor',
      category: 'Store',
      image: '/src/assets/images/hero_car_showroom_1785656029935.jpg',
      desc: 'Displaying alloy wheels, android stereos & lubricants'
    },
    {
      id: 'g-4',
      title: 'Custom SUV Modification & Lift Kit',
      category: 'Vehicle Modification',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      desc: 'Mahindra Thar off-road wide body kit & matrix LEDs'
    },
    {
      id: 'g-5',
      title: 'Castrol & Mobil Synthetic Lubricants Display',
      category: 'Products',
      image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80',
      desc: '100% Genuine motor oils with barcode verification'
    },
    {
      id: 'g-6',
      title: 'Precision Hydraulic Lift Workshop',
      category: 'Workshop',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      desc: 'Certified mechanics performing ceramic brake pad fitment'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeTab === 'ALL') return true;
    return item.category.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <section className="py-20 bg-[#0B0B0B] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest">
            Visual Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
            WORKSHOP & STORE <span className="text-red-600">GALLERY</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Explore our state-of-the-art retail store design, detailing studios, custom modifications, and happy customer drive-aways.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {['ALL', 'Store', 'Detailing', 'Vehicle Modification', 'Products', 'Workshop'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/50'
                  : 'bg-gray-900/80 text-gray-300 border-gray-800 hover:border-red-900/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.image)}
              className="group relative h-64 rounded-2xl overflow-hidden border border-red-900/30 hover:border-red-500/60 cursor-pointer shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{item.title}</h4>
                <p className="text-[11px] text-gray-300 line-clamp-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setActiveImage(null)}>
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-red-400"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage}
              alt="Expanded View"
              className="w-full max-h-[80vh] object-contain rounded-2xl border border-red-900/50 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
