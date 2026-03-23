'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Set the phone number from the user's request
  const phoneNumber = "8678971472";

  useEffect(() => {
    setIsClient(true);
    // Show tooltip after a small delay
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);

    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 11000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  if (!isClient) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const openWhatsAppDirectly = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="absolute bottom-20 right-0 mb-2 w-max max-w-[200px] md:max-w-xs animate-bounce-subtle">
          <div className="bg-[#12121e]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl text-white">
            <p className="text-sm font-medium">👋 Hey there! Need help with your Instagram strategy? Let's chat on WhatsApp!</p>
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-[#12121e] border-r border-b border-white/10 rotate-45"></div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[320px] md:w-[360px] bg-[#0c0c14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0c0c14] rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">Vibecut Support</h3>
                <p className="text-xs text-white/80">Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-5 h-[200px] overflow-y-auto bg-[#0a0a0f] flex flex-col gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
              <p className="text-xs text-white/90">Hi! How can we help you create viral content today? 🎬</p>
              <span className="text-[10px] text-white/40 mt-1 block">11:05 PM</span>
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#0c0c14] border-t border-white/5 flex gap-2">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-white/20"
            />
            <button 
              type="submit"
              className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-green-500/20 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen 
            ? 'bg-[#12121e] rotate-90 scale-90 border border-white/10' 
            : 'bg-green-500 shadow-xl shadow-green-500/30 border-none hover:scale-110 active:scale-95'
        }`}
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <>
            <MessageCircle className="text-white fill-white" size={28} />
            {/* Ping effect */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white/30 backdrop-blur-sm border border-white/50"></span>
            </span>
          </>
        )}
      </button>

      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
