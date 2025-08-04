import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t('common.services'),
      links: [
        { name: t('common.aiChatAgents'), href: "/ai-chat-agents" },
        { name: t('common.webDevelopment'), href: "/home#websites" },
        { name: t('common.appDevelopment'), href: "/home#apps" },
        { name: t('common.ecommerce'), href: "/home#commerce" }
      ]
    },
    {
      title: t('common.company'),
      links: [
        { name: t('common.aboutUs'), href: "/home#about" },
        { name: t('common.contact'), href: "/contact" },
        { name: t('common.blog'), href: "/blog" },
        { name: t('common.careers'), href: "/careers" }
      ]
    }
  ];
  
  return (
    <footer className="relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/Axiestudiologo.jpg" 
                alt="Axie Studio" 
                  className="h-10 w-10 rounded-xl shadow-lg"
                />
                <span className="ml-3 text-xl font-bold text-slate-900">Axie Studio (Test)</span>
              </motion.div>
              
              <motion.p 
                className="text-slate-600 leading-relaxed max-w-md mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t('common.weCreateFuture')} 
                {t('common.fromIntelligentChat')}
              </motion.p>

              {/* Contact Info */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 text-slate-600">
                  <Mail className="w-4 h-4" />
                                      <span className="text-sm">{t('common.stefanEmail')}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Phone className="w-4 h-4" />
                                      <span className="text-sm">{t('common.phoneNumber')}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <MapPin className="w-4 h-4" />
                                      <span className="text-sm">{t('common.address')}</span>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + sectionIndex * 0.1 }}
              >
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => navigate(link.href)}
                        className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                      >
                        {link.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>


        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            {/* Copyright */}
            <motion.div 
              className="flex items-center space-x-2 text-slate-600"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
                                <span className="text-sm">{t('common.copyright', { year: currentYear })}</span>
              <Heart className="w-4 h-4 text-red-400" />
            </motion.div>

            {/* Legal Links */}
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => navigate('/privacy')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                Integritetspolicy
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                Användarvillkor
              </button>
              <button
                onClick={() => navigate('/cookies')}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                Cookies
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;