import React from 'react';
import { ShoppingCart, Package, CreditCard, Truck, BarChart, Shield, Users, Zap, Target, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CommerceSection = () => {
  const { t, tArray } = useLanguage();
  
  const features = [
    {
      icon: ShoppingCart,
      title: t('commerce.features.webshop.title'),
      description: t('commerce.features.webshop.description')
    },
    {
      icon: Package,
      title: t('commerce.features.products.title'),
      description: t('commerce.features.products.description')
    },
    {
      icon: CreditCard,
      title: t('commerce.features.payments.title'),
      description: t('commerce.features.payments.description')
    },
    {
      icon: Truck,
      title: t('commerce.features.shipping.title'),
      description: t('commerce.features.shipping.description')
    },
    {
      icon: BarChart,
      title: t('commerce.features.analytics.title'),
      description: t('commerce.features.analytics.description')
    },
    {
      icon: Shield,
      title: t('commerce.features.security.title'),
      description: t('commerce.features.security.description')
    }
  ];

  const advancedFeatures = [
    {
      icon: Users,
      title: t('commerce.advanced.features.crm.title'),
      description: t('commerce.advanced.features.crm.description')
    },
    {
      icon: MessageSquare,
      title: t('commerce.advanced.features.marketing.title'),
      description: t('commerce.advanced.features.marketing.description')
    },
    {
      icon: Calendar,
      title: t('commerce.advanced.features.booking.title'),
      description: t('commerce.advanced.features.booking.description')
    },
    {
      icon: TrendingUp,
      title: t('commerce.advanced.features.analytics.title'),
      description: t('commerce.advanced.features.analytics.description')
    },
    {
      icon: Target,
      title: t('commerce.advanced.features.leads.title'),
      description: t('commerce.advanced.features.leads.description')
    },
    {
      icon: Zap,
      title: t('commerce.advanced.features.automation.title'),
      description: t('commerce.advanced.features.automation.description')
    }
  ];

  return (
    <section id="commerce" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t('commerce.title')}</h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {t('commerce.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <feature.icon className="text-slate-900 mb-4" size={40} />
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t('commerce.advanced.title')}</h3>
            <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto">
              {t('commerce.advanced.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-white/20 transition-colors">
                <feature.icon className="text-white mb-3" size={28} />
                <h4 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t('commerce.cta.title')}</h3>
              <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
                {tArray('commerce.cta.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">{t('commerce.cta.title')}</h4>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {t('commerce.cta.pricing', {}, 'Från 10 995 kr startavgift + 895 kr/månad får du en komplett e-handelslösning med allt du behöver för att börja sälja online.')}
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                {t('commerce.cta.button')} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommerceSection;