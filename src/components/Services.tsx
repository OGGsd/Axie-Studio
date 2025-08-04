import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import ServiceCard from './ServiceCard';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Services = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      title: t('services.website.title'),
      description: t('services.website.description'),
      startPrice: "8 995 kr",
      monthlyPrice: "495 kr",
      badge: t('services.website.badge'),
      gradient: "from-slate-900 via-blue-900 to-indigo-900",
      features: [
        { name: t('services.website.features.0'), included: true },
        { name: t('services.website.features.1'), included: true },
        { name: t('services.website.features.2'), included: true },
        { name: t('services.website.features.3'), included: true },
        { name: t('services.website.features.4'), included: true },
        { name: t('services.website.features.5'), included: true },
        { name: t('services.website.features.6'), included: false },
        { name: t('services.website.features.7'), included: false }
      ]
    },
    {
      title: t('services.commerce.title'),
      description: t('services.commerce.description'),
      startPrice: "10 995 kr",
      monthlyPrice: "895 kr",
      badge: t('services.commerce.badge'),
      gradient: "from-slate-900 via-blue-900 to-indigo-900",
      features: [
        { name: t('services.commerce.features.0'), included: true },
        { name: t('services.commerce.features.1'), included: true },
        { name: t('services.commerce.features.2'), included: true },
        { name: t('services.commerce.features.3'), included: true },
        { name: t('services.commerce.features.4'), included: true },
        { name: t('services.commerce.features.5'), included: true },
        { name: t('services.commerce.features.6'), included: true },
        { name: t('services.commerce.features.7'), included: true }
      ]
    },
    {
      title: t('services.booking.title'),
      description: t('services.booking.description'),
      startPrice: "10 995 kr",
      monthlyPrice: "995 kr",
      isPopular: true,
      badge: t('services.booking.badge'),
      gradient: "from-slate-900 via-blue-900 to-indigo-900",
      features: [
        { name: t('services.booking.features.0'), included: true },
        { name: t('services.booking.features.1'), included: true },
        { name: t('services.booking.features.2'), included: true },
        { name: t('services.booking.features.3'), included: true },
        { name: t('services.booking.features.4'), included: true },
        { name: t('services.booking.features.5'), included: true },
        { name: t('services.booking.features.6'), included: true },
        { name: t('services.booking.features.7'), included: true }
      ]
    },
    {
      title: t('services.complete.title'),
      description: t('services.complete.description'),
      startPrice: "14 995 kr",
      monthlyPrice: "1 495 kr",
      badge: t('services.complete.badge'),
      gradient: "from-slate-900 via-blue-900 to-indigo-900",
      info: t('services.complete.info'),
      features: [
        { name: t('services.complete.features.0'), included: true },
        { name: t('services.complete.features.1'), included: true },
        { name: t('services.complete.features.2'), included: true },
        { name: t('services.complete.features.3'), included: true },
        { name: t('services.complete.features.4'), included: true },
        { name: t('services.complete.features.5'), included: true },
        { name: t('services.complete.features.6'), included: true },
        { name: t('services.complete.features.7'), included: true }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-slate-400/10 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          ref={ref}
        >
          {/* Badge */}
          <Badge 
            variant="glow"
            className="mb-8 text-sm"
          >
            {t('services.badge')}
          </Badge>

          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            {t('services.title')}
          </h2>

          {/* Subtitle */}
          <motion.p 
            className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('services.subtitle')}
          </motion.p>

          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Card variant="glass">
              <CardContent className="px-4 py-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-400 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-slate-900">{t('hero.stats.customers')}</span>
                </div>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="px-4 py-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-slate-900">{t('hero.stats.uptime')}</span>
                </div>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="px-4 py-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-slate-900">{t('common.support247')}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Pricing Cards - Improved Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <ServiceCard
                {...service}
                buttonText={t('common.getStarted')}
                onContact={handleContact}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Card variant="gradient" className="p-8 sm:p-12 text-white relative overflow-hidden">
            <CardContent className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                {t('services.cta.title')}
              </h3>
              <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto">
                {t('services.cta.description')}
              </p>
              
              <Button
                variant="default"
                size="lg"
                onClick={handleContact}
                className="bg-white text-slate-900 font-bold shadow-2xl hover:shadow-glow-lg transition-all duration-500 transform hover:scale-105 text-lg"
              >
                <span className="flex items-center">
                  <div className="w-4 h-4 bg-slate-900 rounded mr-2"></div>
                  {t('services.cta.button')}
                  <div className="w-4 h-4 bg-slate-900 rounded ml-2"></div>
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Fine print */}
          <Card variant="elevated" className="mt-8">
            <CardContent className="p-6">
              <div className="text-sm text-slate-600 space-y-2">
                <p className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-slate-900 rounded-full mr-2"></span>
                  * {t('services.fineprint.appStore')}
                </p>
                <p className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span>
                  ** {t('services.fineprint.domain')}
                </p>
                <p className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-indigo-900 rounded-full mr-2"></span>
                  {t('services.fineprint.vat')}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                  <span className="flex items-center text-emerald-600">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    {t('common.freeConsultation')}
                  </span>
                  <span className="flex items-center text-slate-900">
                    <span className="w-2 h-2 bg-slate-900 rounded-full mr-2"></span>
                    {t('common.noCommitment')}
                  </span>
                  <span className="flex items-center text-blue-900">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span>
                    {t('common.support247')}
                  </span>
                  <span className="flex items-center text-indigo-900">
                    <span className="w-2 h-2 bg-indigo-900 rounded-full mr-2"></span>
                    {t('common.fastDelivery')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;