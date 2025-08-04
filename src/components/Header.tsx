import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, ChevronDown, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface DropdownItem {
  title: string;
  description: string;
  href: string;
  popular?: boolean;
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
}

interface DropdownCategory {
  title: string;
  items: DropdownItem[];
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '/home' },
    { name: t('nav.services'), href: '#', hasDropdown: true },
    { name: t('nav.contact'), href: '/contact' }
  ];

  const dropdownCategories: DropdownCategory[] = [
    {
      title: t('nav.dropdown.categories.webDevelopment'),
      items: [
        {
          title: t('nav.dropdown.items.responsiveWebsites'),
          description: t('nav.dropdown.items.responsiveWebsitesDesc'),
          href: "/home#websites",
          popular: true
        },
        {
          title: t('nav.dropdown.items.ecommerceSolutions'),
          description: t('nav.dropdown.items.ecommerceSolutionsDesc'),
          href: "/home#commerce"
        },
        {
          title: t('nav.dropdown.items.webApplications'),
          description: t('nav.dropdown.items.webApplicationsDesc'),
          href: "/home#apps"
        }
      ]
    },
    {
      title: t('nav.dropdown.categories.aiAutomation'),
      items: [
        {
          title: t('nav.dropdown.items.aiChatAgents'),
          description: t('nav.dropdown.items.aiChatAgentsDesc'),
          href: "/ai-chat-agents",
          popular: true
        },
        {
          title: t('nav.dropdown.items.bookingSystem'),
          description: t('nav.dropdown.items.bookingSystemDesc'),
          href: "/home#booking"
        },
        {
          title: t('nav.dropdown.items.processAutomation'),
          description: t('nav.dropdown.items.processAutomationDesc'),
          href: "/home#services"
        }
      ]
    },
    {
      title: t('nav.dropdown.categories.pricing'),
      items: [
        {
          title: t('nav.dropdown.items.basicChatBot'),
          description: t('nav.dropdown.items.basicChatBotDesc'),
          href: "/home#services"
        },
        {
          title: t('nav.dropdown.items.intelligentChatBot'),
          description: t('nav.dropdown.items.intelligentChatBotDesc'),
          href: "/home#services",
          popular: true
        },
        {
          title: t('nav.dropdown.items.enterpriseSolutions'),
          description: t('nav.dropdown.items.enterpriseSolutionsDesc'),
          href: "/contact"
        }
      ]
    }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    window.open('https://app.axiestudio.se', '_blank');
  };

  return (
      <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200/20' 
          : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/home')}
              whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
                  <img 
              src="/Axiestudiologo.jpg" 
                    alt="Axie Studio" 
              className="h-10 w-10 rounded-xl shadow-lg"
                  />
            <span className="ml-3 text-xl font-bold text-slate-900">
              {t('common.axieStudio')}
            </span>
            </motion.div>
            
            {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                <motion.button
                      className="flex items-center space-x-1 px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileHover={{ y: -1 }}
                    >
                      <span>{item.name}</span>
                  <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </motion.button>

                <AnimatePresence>
                       {isDropdownOpen && (
                    <motion.div
                           className="absolute bottom-full left-0 mb-2 w-screen max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/20 overflow-hidden"
                           initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                          <div className="p-8">
                            <div className="grid grid-cols-3 gap-8">
                              {dropdownCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                  <h3 className="text-sm font-semibold text-slate-900 mb-6 uppercase tracking-wide border-b border-slate-200 pb-2">
                                    {category.title}
                                  </h3>
                                  <div className="space-y-4">
                                {category.items.map((item, itemIndex) => (
                                      <motion.div
                                    key={itemIndex}
                                        className="group cursor-pointer"
                                        whileHover={{ x: 4 }}
                                        onClick={() => handleNavigation(item.href)}
                                      >
                                                                                 <Card variant="glass">
                                           <CardContent className="p-4">
                                             <div className="flex items-start justify-between">
                                               <div className="flex-1 min-w-0">
                                                 <div className="flex items-center space-x-2 mb-2">
                                                   <h4 className="text-sm font-medium text-slate-900 truncate">
                                                     {item.title}
                                                   </h4>
                                          {item.popular && (
                                                     <Badge variant="glow" className="text-xs">
                                                       {t('common.popular')}
                                                     </Badge>
                                                   )}
                                                 </div>
                                                 <p className="text-xs text-slate-600 leading-relaxed">
                                                   {item.description}
                                                 </p>
                                      </div>
                                        </div>
                                           </CardContent>
                                         </Card>
                                      </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                                                         {/* Bottom CTA */}
                             <div className="mt-8 pt-6 border-t border-slate-200">
                               <div className="text-center">
                                 <p className="text-sm text-slate-600 mb-3">
                                   {t('common.needCustom')}
                                 </p>
                                 <Button
                                   variant="glow"
                                   onClick={() => navigate('/contact')}
                              className="mx-auto"
                                 >
                                   <span>{t('common.contactUs')}</span>
                                 </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
                ) : (
              <motion.button
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
                    onClick={() => handleNavigation(item.href)}
                    whileHover={{ y: -1 }}
                  >
                    {item.name}
              </motion.button>
                )}
            </div>
            ))}

            {/* Language Switcher */}
            <motion.button
              className="flex items-center space-x-2 px-4 py-2 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200/50 text-slate-700 hover:text-slate-900 transition-all duration-200"
              onClick={() => changeLanguage(currentLanguage.code === 'sv' ? 'en' : 'sv')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLanguage.code === 'sv' ? 'EN' : 'SV'}
              </span>
            </motion.button>

            {/* CTA Button */}
            <Button
              variant="glow"
              onClick={handleLogin}
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('nav.bookTime')}</span>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl bg-slate-100/80 backdrop-blur-sm border border-slate-200/50"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

        {/* Mobile Navigation */}
          <AnimatePresence>
          {isOpen && (
              <motion.div
              className="lg:hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/20 mt-4 mb-4"
                initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
              <div className="p-6 space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    className="block w-full text-left px-4 py-3 text-slate-700 hover:text-slate-900 font-medium rounded-xl hover:bg-slate-50 transition-colors duration-200"
                    onClick={() => handleNavigation(item.href)}
                    whileHover={{ x: 4 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                <div className="pt-4 border-t border-slate-200">
                  <Button
                    variant="glow"
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t('nav.bookTime')}</span>
                  </Button>
                </div>
              </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      {/* Backdrop for dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default Header;