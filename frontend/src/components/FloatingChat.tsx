import React, { useState } from 'react';
import { Sparkles, X, Minus, Maximize2 } from 'lucide-react';
import ChatWidget from './ChatWidget';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[400px] glass-card rounded-2xl overflow-hidden premium-shadow"
          >
            <div className="flex items-center justify-between p-4 bg-primary-600 text-white">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold tracking-tight">AI HR Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-[500px]">
              <ChatWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300
          ${isOpen ? 'bg-white text-primary-600 rotate-90' : 'bg-primary-600 text-white hover:scale-110'}
        `}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
      </button>
    </div>
  );
};

export default FloatingChat;
