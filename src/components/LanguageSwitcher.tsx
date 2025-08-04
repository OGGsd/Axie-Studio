import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../types/language';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const handleLanguageChange = (language: typeof SUPPORTED_LANGUAGES[0]) => {
    changeLanguage(language.code);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[140px] touch-manipulation"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe size={18} className="text-blue-500" />
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="text-sm font-semibold flex-1 text-left">{currentLanguage.nativeName}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Language Selection - Mobile Drawer or Desktop Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {isMobile ? (
              // Mobile Drawer (slides up from bottom)
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[10000] max-h-[85vh] overflow-hidden flex flex-col"
                style={{ backgroundColor: 'white', colorScheme: 'light only' }}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                {/* Drag Handle */}
                <div className="flex justify-center pt-4 pb-2">
                  <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">Select Language</h3>
                    <p className="text-sm text-gray-500">Choose your preferred language</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                
                {/* Languages */}
                <div className="p-4 flex-1 overflow-y-auto mobile-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="space-y-2">
                    {SUPPORTED_LANGUAGES.map((language) => (
                      <motion.button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className={`w-full text-left p-4 flex items-center justify-between hover:bg-blue-50 rounded-2xl transition-colors touch-manipulation min-h-[60px] ${
                          currentLanguage.code === language.code ? 'bg-blue-50 border-2 border-blue-200' : 'border-2 border-transparent'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <span className="text-3xl mr-4">{language.flag}</span>
                          <div>
                            <div className="font-semibold text-gray-900 text-base">{language.nativeName}</div>
                            <div className="text-sm text-gray-500">{language.name}</div>
                          </div>
                        </div>
                        
                        {currentLanguage.code === language.code && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-blue-500 rounded-full p-2"
                          >
                            <Check size={16} className="text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Globe size={16} className="mr-2" />
                    <span>Global Excellence</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Desktop Dropdown
              <motion.div
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <h3 className="font-bold text-gray-900 text-sm">Select Language</h3>
                  <p className="text-xs text-gray-500">Choose your preferred language</p>
                </div>
                
                {/* Languages */}
                <div className="p-2">
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <motion.button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`w-full text-left px-3 py-3 flex items-center justify-between hover:bg-blue-50 rounded-lg transition-colors ${
                        currentLanguage.code === language.code ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{language.flag}</span>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{language.nativeName}</div>
                          <div className="text-xs text-gray-500">{language.name}</div>
                        </div>
                      </div>
                      
                      {currentLanguage.code === language.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-blue-500 rounded-full p-1"
                        >
                          <Check size={12} className="text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <Globe size={12} className="mr-1" />
                    <span>Global Excellence</span>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;