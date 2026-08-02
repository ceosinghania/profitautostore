import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ShoppingBag, CheckCircle2, Sparkles, 
  Car, Eye, ShieldCheck, Tag, Star, ChevronRight, X, ArrowUpDown
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/storeData';
import { Product, VehicleSelection, QuoteItem } from '../types';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  selectedVehicle: VehicleSelection;
  onAddQuoteItem: (product: Product) => void;
  onOpenAiChat: () => void;
}

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
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 rounded-full border border-red-700/40 text-red-400 text-xs font-bold uppercase tracking-widest mb-3">
              Comprehensive Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight">
              PRODUCT <span className="text-red-600">CATEGORIES</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              100% Genuine Lubricants, Batteries, Accessories, Spare Parts, Filters & Detailing Products.
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

        {/* Search & Filter Header Bar */}
        <div className="bg-[#121212] border border-red-900/40 rounded-2xl p-4 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
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
              <option value="ALL">All Partner Brands</option>
              <option value="Castrol">Castrol</option>
              <option value="Mobil 1">Mobil 1</option>
              <option value="Bosch">Bosch</option>
              <option value="Exide">Exide</option>
              <option value="Amaron">Amaron</option>
              <option value="3M Automotive">3M Automotive</option>
              <option value="PROFIT Signature">PROFIT Signature</option>
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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
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
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 ${
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
