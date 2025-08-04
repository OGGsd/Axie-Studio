import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import StructuredData from './SEO/StructuredData';

const FAQ = () => {
  const { t, tArray } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = tArray('faq.questions') || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {Array.isArray(faqs) && faqs.length > 0 && (
        <StructuredData type="faq" data={faqs} />
      )}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-slate-200/50 px-6 py-3 rounded-full text-slate-900 font-semibold mb-6 text-sm sm:text-base shadow-lg">
              <HelpCircle className="mr-2" size={20} />
              {t('faq.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {t('faq.title')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {Array.isArray(faqs) && faqs.map((faq: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="text-slate-900" size={24} />
                    ) : (
                      <Plus className="text-slate-900" size={24} />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{t('faq.cta.title')}</h3>
              <p className="text-lg mb-6 opacity-90">
                {t('faq.cta.description')}
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('faq.cta.button')} →
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;