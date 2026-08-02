import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, RefreshCw, Car, Wrench } from 'lucide-react';
import { VehicleSelection } from '../types';

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle: VehicleSelection;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({
  isOpen,
  onClose,
  selectedVehicle
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I am your PROFIT AUTOMOBILE STORE Master Tech Assistant. ${
        selectedVehicle.make ? `I see you are driving a ${selectedVehicle.make} ${selectedVehicle.model}.` : ''
      } How can I assist you with spare parts, engine oils, batteries, or store recommendations today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsgText = input;
    setInput('');

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsgText,
          vehicleContext: selectedVehicle
        })
      });

      const data = await res.json();
      const aiReplyText = data.reply || data.text || "Thank you for asking! For exact fitment, visit your nearest Profit Automobile Store.";

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const aiMsg: Message = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "I am connected to the PROFIT Master Database. For Castrol Oils, Exide Batteries, and Android Stereos, all our products carry 100% genuine OEM warranty.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#121212] border border-red-900/50 rounded-2xl shadow-2xl flex flex-col h-[520px] text-white overflow-hidden backdrop-blur-xl">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 via-black to-red-950 p-4 border-b border-red-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>PROFIT Master Tech AI</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            </h3>
            <span className="text-[10px] text-gray-400 block -mt-0.5">Automotive Expert Assistant</span>
          </div>
        </div>

        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-900">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Vehicle Context Bar */}
      {selectedVehicle.make && (
        <div className="bg-red-950/40 px-4 py-1.5 border-b border-red-900/30 text-[10px] text-amber-300 flex items-center gap-2">
          <Car className="w-3.5 h-3.5 text-red-400" />
          <span>Locked Context: <strong>{selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})</strong></span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-red-600 text-white rounded-br-none font-medium'
                  : 'bg-black border border-gray-800 text-gray-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-gray-500 mt-1 px-1">{m.time}</span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-xs italic bg-black/60 p-2.5 rounded-xl w-max border border-gray-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
            <span>Master Tech AI is formulating response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-black/60 border-t border-gray-800/60 flex items-center gap-2 overflow-x-auto text-[10px]">
        {['Engine Oil for Creta', 'Exide Battery Price', 'Android Stereo Specs', 'Franchise Cost'].map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="px-2.5 py-1 bg-gray-900 hover:bg-red-950 text-gray-300 rounded-lg border border-gray-800 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-black border-t border-gray-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask AI Master Mechanic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-900 border border-gray-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
