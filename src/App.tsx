import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandCarousel } from './components/BrandCarousel';
import { VehicleServiceHighway } from './components/VehicleServiceHighway';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductCatalog } from './components/ProductCatalog';
import { AIVehicleAdvisor } from './components/AIVehicleAdvisor';
import { ServicesSection } from './components/ServicesSection';
import { WorkingProcess } from './components/WorkingProcess';
import { FranchisePortal } from './components/FranchisePortal';
import { StoreLocator } from './components/StoreLocator';
import { GallerySection } from './components/GallerySection';
import { BlogSection } from './components/BlogSection';
import { QuoteDrawer } from './components/QuoteDrawer';
import { AIChatWidget } from './components/AIChatWidget';
import { Footer } from './components/Footer';

import { Product, QuoteItem, VehicleSelection } from './types';
import { Car, X, Sparkles, CheckCircle2 } from 'lucide-react';

export function App() {
  // Global State
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSelection>({
    make: 'Hyundai',
    model: 'Creta',
    year: '2023',
    fuelType: 'Diesel'
  });

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Modals & Drawers state
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Quote Cart Actions
  const handleAddQuoteItem = (product: Product) => {
    setQuoteItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setQuoteItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuoteItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* Navbar */}
      <Navbar
        quoteItems={quoteItems}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        selectedVehicle={selectedVehicle}
        onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onOpenFranchiseModal={() => setIsFranchiseModalOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
          onOpenFranchiseModal={() => setIsFranchiseModalOpen(true)}
          onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        {/* 2. Featured OEM Brand Ticker */}
        <BrandCarousel />

        {/* Live Multi-Vehicle Service Highway Animation */}
        <VehicleServiceHighway />

        {/* 3. Corporate About Section */}
        <AboutSection />

        {/* 4. Why Choose Us (10 Cards) */}
        <WhyChooseUs />

        {/* 5. Product Categories & Catalog */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedVehicle={selectedVehicle}
          onAddQuoteItem={handleAddQuoteItem}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        {/* 6. AI Vehicle Advisor / Technical Diagnostic Tool */}
        <AIVehicleAdvisor selectedVehicle={selectedVehicle} />

        {/* 7. Workshop & Detailing Services */}
        <ServicesSection />

        {/* 8. Working Process (5 Steps) */}
        <WorkingProcess />

        {/* 9. Franchise Opportunity Portal */}
        <FranchisePortal />

        {/* 10. Pan-India Store Locator */}
        <StoreLocator />

        {/* 11. Visual Gallery & Detailing Studio Showcase */}
        <GallerySection />

        {/* 12. Expert Blog & Maintenance Guides */}
        <BlogSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onOpenFranchiseModal={() => setIsFranchiseModalOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Quote Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        quoteItems={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearQuote={handleClearQuote}
        selectedVehicle={selectedVehicle}
      />

      {/* Floating AI Assistant Chatbot */}
      <AIChatWidget
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        selectedVehicle={selectedVehicle}
      />

      {/* Vehicle Selector Standalone Modal */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-red-900/50 rounded-2xl max-w-md w-full p-6 space-y-4 relative">
            <button
              onClick={() => setIsVehicleModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-600 rounded-lg text-white">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Select Your Car</h3>
                <p className="text-xs text-gray-400">Lock specs to filter compatible products</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Make / Brand</label>
                <select
                  value={selectedVehicle.make}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, make: e.target.value })}
                  className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="Hyundai">Hyundai</option>
                  <option value="Tata Motors">Tata Motors</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Maruti Suzuki">Maruti Suzuki</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Kia">Kia</option>
                  <option value="BMW">BMW</option>
                  <option value="Audi">Audi</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Honda">Honda</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Model Name</label>
                <input
                  type="text"
                  value={selectedVehicle.model}
                  onChange={(e) => setSelectedVehicle({ ...selectedVehicle, model: e.target.value })}
                  placeholder="e.g. Creta, Nexon, Thar, Swift"
                  className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Year</label>
                  <select
                    value={selectedVehicle.year}
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, year: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Fuel Type</label>
                  <select
                    value={selectedVehicle.fuelType}
                    onChange={(e) => setSelectedVehicle({ ...selectedVehicle, fuelType: e.target.value })}
                    className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric / EV</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsVehicleModalOpen(false)}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase rounded-xl shadow-lg mt-2 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Vehicle Specification</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
