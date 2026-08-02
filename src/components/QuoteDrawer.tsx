import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, FileText, Printer, Building2, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { QuoteItem, VehicleSelection } from '../types';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quoteItems: QuoteItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
  selectedVehicle: VehicleSelection;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  quoteItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  selectedVehicle
}) => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    gstin: '',
    city: ''
  });

  const subtotal = quoteItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const gstEstimate = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstEstimate;

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#121212] border-l border-red-900/40 text-white h-full flex flex-col justify-between shadow-2xl relative">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-red-950/60 to-black">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Corporate Quotation Cart</h3>
              <span className="text-[10px] text-gray-400">{quoteItems.length} Products Selected</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full bg-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Items List */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {quoteItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-700 mx-auto" />
              <p className="text-xs font-semibold">Your Quotation Cart is Empty</p>
              <p className="text-[11px] text-gray-600">Browse product categories and click "Add to Quote" to build your official price estimate.</p>
            </div>
          ) : (
            quoteItems.map((item) => (
              <div key={item.product.id} className="p-3 bg-black rounded-xl border border-gray-800 flex items-center justify-between gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded-lg border border-red-900/30 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-red-400 uppercase">{item.product.brand}</span>
                  <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                  <p className="text-xs font-black text-amber-400 mt-0.5">₹{item.product.price.toLocaleString('en-IN')}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-900 rounded-lg border border-gray-800 text-xs font-bold">
                    <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="px-2 py-1 text-gray-400 hover:text-white">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-white">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="px-2 py-1 text-gray-400 hover:text-white">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button onClick={() => onRemoveItem(item.product.id)} className="p-1.5 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {quoteItems.length > 0 && (
          <div className="p-5 border-t border-gray-800 bg-black space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Items Subtotal:</span>
                <span className="text-white font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated GST (18%):</span>
                <span className="text-white font-semibold">₹{gstEstimate.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-gray-800">
                <span>Total Quote Estimate:</span>
                <span className="text-amber-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setShowPdfModal(true)}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Official Proforma Quotation</span>
            </button>
          </div>
        )}

      </div>

      {/* Official PDF Print Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-gray-900 max-w-3xl w-full p-8 rounded-2xl shadow-2xl relative my-8 print:m-0 print:p-0 print:shadow-none">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letterhead Header */}
            <div className="flex items-center justify-between border-b-2 border-red-600 pb-4 mb-6">
              <div>
                <h1 className="text-2xl font-black tracking-wider text-black font-display uppercase">
                  PROFIT <span className="text-red-600">AUTOMOBILE</span> STORE
                </h1>
                <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">
                  Retail Chain of Big Business House
                </p>
                <p className="text-[10px] text-gray-500">Corporate HQ: Plot 45, Okhla Industrial Area Phase-III, New Delhi - 110020</p>
                <p className="text-[10px] text-gray-500">GSTIN: 07AABCP1234F1Z9 | Toll Free: 1800-102-PROFIT</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-black bg-red-600 text-white px-3 py-1 rounded uppercase">PROFORMA QUOTATION</span>
                <p className="text-xs font-bold text-gray-700 mt-2">Ref #: PAS/2026/QT-{Math.floor(1000 + Math.random() * 9000)}</p>
                <p className="text-[10px] text-gray-500">Date: {new Date().toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            {/* Customer Inputs Form in Modal */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 text-xs space-y-3 print:hidden">
              <h4 className="font-bold text-gray-800 uppercase">Customer Information for Quote</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  className="p-2 border rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  className="p-2 border rounded bg-white"
                />
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={customerDetails.companyName}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, companyName: e.target.value })}
                  className="p-2 border rounded bg-white"
                />
              </div>
            </div>

            {/* Print Header Preview info */}
            <div className="hidden print:grid grid-cols-2 gap-4 text-xs mb-6 pb-4 border-b">
              <div>
                <strong>Billed To:</strong> {customerDetails.name || 'Valued Customer'}<br />
                <strong>Company:</strong> {customerDetails.companyName || 'N/A'}<br />
                <strong>Phone:</strong> {customerDetails.phone || 'N/A'}
              </div>
              <div>
                <strong>Vehicle Spec:</strong> {selectedVehicle.make ? `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.year})` : 'Universal / All Vehicles'}
              </div>
            </div>

            {/* Quotation Table */}
            <table className="w-full text-xs text-left mb-6 border-collapse">
              <thead>
                <tr className="bg-gray-100 border-y border-gray-300 font-bold uppercase text-gray-700">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Item Particulars & Brand</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quoteItems.map((item, idx) => (
                  <tr key={item.product.id}>
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3">
                      <strong className="block text-gray-900">{item.product.name}</strong>
                      <span className="text-[10px] text-gray-500 uppercase">{item.product.brand} | {item.product.warranty}</span>
                    </td>
                    <td className="py-2 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-2 px-3 text-right">₹{item.product.price.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-bold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Math */}
            <div className="flex justify-end mb-6">
              <div className="w-64 space-y-1.5 text-xs border-t pt-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated GST (18%):</span>
                  <span>₹{gstEstimate.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 border-t pt-1">
                  <span>Grand Total:</span>
                  <span className="text-red-600">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="text-[10px] text-gray-500 border-t pt-4 space-y-1">
              <p className="font-bold uppercase text-gray-700">Corporate Guarantee & Terms:</p>
              <p>1. 100% Genuine OEM products guaranteed by Big Business House group.</p>
              <p>2. Free doorstep installation available at all Profit Automobile Store outlets across India.</p>
              <p>3. Quote valid for 15 days from date of issue.</p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t print:hidden">
              <button onClick={() => setShowPdfModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 text-xs font-bold rounded-lg">
                Close
              </button>
              <button onClick={handlePrint} className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-2">
                <Printer className="w-4 h-4" />
                <span>Print / Download PDF Quotation</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
