import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ShoppingBag, CheckCircle2, Sparkles, 
  Car, Eye, ShieldCheck, Tag, Star, ChevronRight, X, ArrowUpDown,
  Building2, Layers, Award, Wrench, Zap, Droplet, Disc, Tv, ShieldAlert,
  Flame, Armchair, Box
} from 'lucide-react';
import { PRODUCT_CATEGORIES, BRAND_PARTNERS } from '../data/storeData';
import { Product, VehicleSelection, QuoteItem } from '../types';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  selectedVehicle: VehicleSelection;
  onAddQuoteItem: (product: Product) => void;
  onOpenAiChat: () => void;
}

// Small product visual thumbnails for "In One Store Consumer Gets Each Product" showcase
const ONE_STORE_PRODUCT_THUMBNAILS = [
  {
    id: 'thumb-oil',
    title: 'Engine Oils & Fluids',
    brandBadge: 'Castrol • Mobil 1 • Shell • Motul',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=300&q=80',
    categoryId: 'lubricants',
    priceStart: '₹499'
  },
  {
    id: 'thumb-battery',
    title: 'Zero Maintenance Batteries',
    brandBadge: 'Exide • Amaron • SF Sonic',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=300&q=80',
    categoryId: 'batteries',
    priceStart: '₹1,299'
  },
  {
    id: 'thumb-stereo',
    title: 'Android Stereos & Dashcams',
    brandBadge: 'Pioneer • JBL • PROFIT Ultra',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=300&q=80',
    categoryId: 'accessories',
    priceStart: '₹4,999'
  },
  {
    id: 'thumb-brakes',
    title: 'Brake Pads & Discs',
    brandBadge: 'Bosch • Brembo • TVS',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80',
    categoryId: 'spare-parts',
    priceStart: '₹850'
  },
  {
    id: 'thumb-filters',
    title: 'PM2.5 Air & Oil Filters',
    brandBadge: 'Bosch • Mann-Filter • Elofic',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80',
    categoryId: 'filters',
    priceStart: '₹350'
  },
  {
    id: 'thumb-detailing',
    title: '3M Ceramic Polish & Wash',
    brandBadge: '3M • Meguiar\'s • SONAX',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=300&q=80',
    categoryId: 'car-care',
    priceStart: '₹299'
  },
  {
    id: 'thumb-seats',
    title: 'Nappa Leather Seat Covers',
    brandBadge: 'PROFIT Custom Tailored',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80',
    categoryId: 'seat-covers',
    priceStart: '₹3,500'
  },
  {
    id: 'thumb-alloys',
    title: 'Sports Alloys & Tyres',
    brandBadge: 'Bridgestone • Michelin • MRF • JK',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=300&q=80',
    categoryId: 'alloy-wheels',
    priceStart: '₹18,500'
  },
  {
    id: 'thumb-helmet',
    title: 'ECE Helmets & Rider Gear',
    brandBadge: 'Axor • Studds • Vega',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80',
    categoryId: 'helmets-rider',
    priceStart: '₹1,199'
  },
  {
    id: 'thumb-modification',
    title: 'Body Kits & LED Matrix Lights',
    brandBadge: 'Osram • Philips • PROFIT Works',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80',
    categoryId: 'modification',
    priceStart: '₹2,499'
  }
];

// All premium brands list for quick tag filtering
const ALL_PREMIUM_BRANDS = [
  'Castrol', 'Mobil 1', 'Shell', 'Motul', 'Liqui Moly',
  'Bosch', 'Exide', 'Amaron', '3M Automotive', 'Meguiar\'s', 'SONAX',
  'Pioneer', 'JBL', 'Blaupunkt', 'Osram', 'Philips',
  'Michelin', 'Bridgestone', 'MRF', 'JK Tyre', 'CEAT',
  'Brembo', 'PROFIT Signature', 'Axor', 'Studds'
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedVehicle,
  onAddQuoteItem,
  onOpenAiChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('ALL');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Flatten all products across categories
  const allProducts = useMemo(() => {
    return PRODUCT_CATEGORIES.flatMap(cat => cat.featuredProducts);
  }, []);

  // Filtered list based on active category tab, search query, and brand filter
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category filter
      if (selectedCategory !== 'ALL') {
        const catObj = PRODUCT_CATEGORIES.find(c => c.id === selectedCategory);
        if (catObj && !catObj.featuredProducts.some(p => p.id === product.id)) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrandFilter !== 'ALL' && product.brand.toLowerCase() !== selectedBrandFilter.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesCompat = product.compatibility.some(c => c.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesCompat) {
          return false;
        }
      }

      return true;
    });
  }, [allProducts, selectedCategory, selectedBrandFilter, searchQuery]);

  const handleAddToQuote = (product: Product) => {
    onAddQuoteItem(product);
    setAddedToast(`Added "${product.name.slice(0, 25)}..." to Quote Request`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <section id="categories" className="py-20 bg-[#0B0B0B] text-white border-b border-red-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
              Comprehensive One-Stop Megastore
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
              PRODUCT <span className="text-red-600">CATEGORIES</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-2xl">
              In ONE Store, consumers get EACH and EVERY automotive product — 100% Genuine Lubricants, Batteries, Electronics, Spare Parts, Tyres, Filters, Rider Gear & Detailing Supplies.
            </p>
          </div>

          {/* AI Parts Match Prompt CTA */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-950 via-black to-red-950 border border-red-500/40 hover:border-red-400 rounded-xl text-xs font-bold text-amber-300 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI Part Compatibility Search</span>
          </button>
        </div>

        {/* 1. "IN ONE STORE CONSUMER GETS EACH PRODUCT" CONCEPT BANNER */}
        <div className="bg-gradient-to-r from-red-950/90 via-[#180808] to-black rounded-2xl border-2 border-red-600/60 p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Overlay */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-red-900/50 pb-4">
              <div>
                <span className="px-3 py-1 bg-amber-500 text-black font-extrabold text-[10px] rounded-full uppercase tracking-wider mb-2 inline-block shadow-md">
                  ★ ONE STORE CONCEPT ★
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  ONE STORE FOR EACH & EVERY AUTOMOTIVE PRODUCT
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Why visit 10 different shops? <strong className="text-white">Profit Automobile Store</strong> brings world-renowned OEM brand partners under a single roof with instant 3D fitment & warranty.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="px-3 py-2 bg-black/80 rounded-xl border border-red-800/40 text-center">
                  <span className="text-amber-400 font-extrabold text-sm block">25,000+</span>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Genuine SKUs</span>
                </div>
                <div className="px-3 py-2 bg-black/80 rounded-xl border border-red-800/40 text-center">
                  <span className="text-red-400 font-extrabold text-sm block">50+</span>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Global OEM Brands</span>
                </div>
                <div className="px-3 py-2 bg-black/80 rounded-xl border border-red-800/40 text-center">
                  <span className="text-emerald-400 font-extrabold text-sm block">100%</span>
                  <span className="text-gray-400 text-[10px] uppercase font-bold">Genuine Guarantee</span>
                </div>
              </div>
            </div>

            {/* SMALL PRODUCT IMAGES SHOWCASE GRID */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-red-500" />
                  <span>Explore Available Products In-Store (Small Visual Preview)</span>
                </span>
                <span className="text-[11px] text-amber-400 font-medium">Click thumbnail to filter category</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {ONE_STORE_PRODUCT_THUMBNAILS.map((thumb) => (
                  <div
                    key={thumb.id}
                    onClick={() => onSelectCategory(thumb.categoryId)}
                    className={`bg-black/80 hover:bg-red-950/80 rounded-xl border ${
                      selectedCategory === thumb.categoryId ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-gray-800 hover:border-red-500'
                    } p-2.5 cursor-pointer transition-all duration-300 group shadow-md flex flex-col justify-between`}
                  >
                    <div className="relative h-20 rounded-lg overflow-hidden bg-gray-900 mb-2">
                      <img 
                        src={thumb.image} 
                        alt={thumb.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-extrabold text-amber-400 uppercase">
                        {thumb.priceStart}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold text-white group-hover:text-amber-300 line-clamp-1">
                        {thumb.title}
                      </h4>
                      <p className="text-[9px] text-gray-400 line-clamp-1 mt-0.5">
                        {thumb.brandBadge}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 2. PREMIUM BRAND PARTNERS NAMES TICKER & FILTER STRIP */}
        <div className="bg-[#121212] rounded-2xl border border-red-900/40 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official Premium Brand Partners Available at Profit Store</span>
            </span>
            <span className="text-[11px] text-gray-400">All brands backed by national warranty</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedBrandFilter('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                selectedBrandFilter === 'ALL'
                  ? 'bg-amber-500 text-black border-amber-400'
                  : 'bg-black text-gray-300 border-gray-800 hover:border-gray-600'
              }`}
            >
              All Brands ({ALL_PREMIUM_BRANDS.length})
            </button>

            {ALL_PREMIUM_BRANDS.map((bName) => (
              <button
                key={bName}
                onClick={() => setSelectedBrandFilter(bName)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedBrandFilter.toLowerCase() === bName.toLowerCase()
                    ? 'bg-red-600 text-white border-red-500 font-bold'
                    : 'bg-black/80 text-gray-300 border-gray-800 hover:border-red-900/60'
                }`}
              >
                {bName}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Header Bar */}
        <div className="bg-[#121212] border border-red-900/40 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by name, brand (Castrol, Bosch, Exide)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Brand Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedBrandFilter}
              onChange={(e) => setSelectedBrandFilter(e.target.value)}
              className="w-full bg-black border border-gray-800 focus:border-red-500 rounded-xl px-3 py-2.5 text-xs text-gray-200 outline-none"
            >
              <option value="ALL">Filter by Brand (All Partner Brands)</option>
              {ALL_PREMIUM_BRANDS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Vehicle Match Status Badge */}
          <div className="md:col-span-3 bg-red-950/40 p-2.5 rounded-xl border border-red-900/30 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-red-500" />
              <div className="text-[11px]">
                <span className="text-gray-400 block -mb-0.5">Filter for:</span>
                <span className="font-bold text-white truncate max-w-[120px] block">
                  {selectedVehicle.make ? `${selectedVehicle.make} ${selectedVehicle.model}` : 'All Vehicles'}
                </span>
              </div>
            </div>
            {selectedVehicle.make && (
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                Matched
              </span>
            )}
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'ALL'
                ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/50'
                : 'bg-gray-900/80 text-gray-300 border-gray-800 hover:border-red-900/50'
            }`}
          >
            All Products ({allProducts.length})
          </button>

          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-900/50 font-bold'
                  : 'bg-gray-900/80 text-gray-300 border-gray-800 hover:border-red-900/50'
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Added Toast Alert */}
        {addedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-red-400 flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{addedToast}</span>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isVehicleCompatible = selectedVehicle.make 
              ? product.compatibility.some(c => c.toLowerCase().includes(selectedVehicle.make.toLowerCase()) || c.toLowerCase().includes('universal'))
              : true;

            return (
              <div
                key={product.id}
                className="bg-[#121212] rounded-2xl border border-red-900/30 hover:border-red-600/60 transition-all duration-300 overflow-hidden group flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden bg-black">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                    
                    {/* Brand Tag Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-red-900/40 text-[10px] font-bold uppercase tracking-wider text-red-400">
                      {product.brand}
                    </div>

                    {/* Vehicle Compatibility Tag */}
                    {selectedVehicle.make && (
                      <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-[9px] font-bold uppercase backdrop-blur-md border ${
                        isVehicleCompatible
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      }`}>
                        {isVehicleCompatible ? '✓ Compatible' : 'Check Specs'}
                      </div>
                    )}

                    {product.isPopular && (
                      <div className="absolute bottom-3 left-3 bg-amber-500 text-black px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                        Top Seller
                      </div>
                    )}
                  </div>

                  {/* Content Box */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-500 text-[10px]">({product.reviewsCount} reviews)</span>
                      <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-red-950 text-red-300 rounded font-bold uppercase">
                        Profit Store Stock
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Key Spec Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Object.entries(product.specifications).slice(0, 2).map(([k, v], i) => (
                        <span key={i} className="text-[10px] bg-gray-900 text-gray-300 px-2 py-0.5 rounded border border-gray-800">
                          <strong className="text-gray-400">{k}:</strong> {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Controls & Price */}
                <div className="p-5 pt-0 border-t border-gray-800/50 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-lg font-black text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[11px] text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="p-2 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg border border-gray-800 transition-colors"
                      title="View Technical Specifications"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAddToQuote(product)}
                      className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#121212] rounded-2xl border border-gray-800 space-y-3">
            <Search className="w-10 h-10 text-gray-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No products match your exact search criteria</h3>
            <p className="text-xs text-gray-400">Try clearing filters or search for another automotive category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedBrandFilter('ALL'); onSelectCategory('ALL'); }}
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Product Details Specs Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-red-900/50 rounded-2xl max-w-2xl w-full p-6 space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className="w-full sm:w-48 h-48 object-cover rounded-xl border border-red-900/30"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-500 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/40">
                  {activeModalProduct.brand}
                </span>
                <h3 className="text-lg font-bold text-white">{activeModalProduct.name}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{activeModalProduct.description}</p>
                <div className="text-xl font-black text-amber-400 pt-2">
                  ₹{activeModalProduct.price.toLocaleString('en-IN')}
                  {activeModalProduct.warranty && (
                    <span className="text-xs font-normal text-emerald-400 block mt-1">
                      ✓ {activeModalProduct.warranty}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(activeModalProduct.specifications).map(([k, v], i) => (
                  <div key={i} className="p-2 bg-black rounded-lg border border-gray-800">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Vehicle Compatibility</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProduct.compatibility.map((item, i) => (
                  <span key={i} className="text-[11px] bg-red-950/60 text-red-300 px-2.5 py-1 rounded-md border border-red-900/40 font-semibold">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="px-4 py-2 bg-gray-900 text-gray-300 text-xs font-semibold rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAddToQuote(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg"
              >
                Add to Corporate Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
