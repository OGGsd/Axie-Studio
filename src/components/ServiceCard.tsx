import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface Feature {
  name: string;
  included: boolean;
  info?: string;
}

interface ServiceCardProps {
  title: string;
  description: string;
  startPrice: string;
  monthlyPrice: string;
  setupPrice?: string;
  features: Feature[];
  isPopular?: boolean;
  badge?: string;
  gradient?: string;
  buttonText?: string;
  onContact: () => void;
  info?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  startPrice,
  monthlyPrice,
  features,
  isPopular = false,
  badge,
  gradient = "from-slate-900 via-blue-900 to-indigo-900",
  buttonText,
  onContact,
  info
}) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      className={`relative h-full flex flex-col overflow-hidden rounded-3xl shadow-lg transition-all duration-500 bg-white hover:shadow-xl ${
        isPopular ? 'ring-4 ring-slate-900/20 scale-105' : ''
      }`}
      whileHover={{ y: isPopular ? -8 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
        <div className="flex justify-between items-start mb-4">
          {badge && (
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <div className="w-3 h-3 bg-white rounded mr-1"></div>
              {badge}
            </span>
          )}
          
          {isPopular && (
            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <div className="w-3 h-3 bg-white rounded mr-1"></div>
              {t('common.mostPopular')}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-black mb-2 flex items-center">
          {title}
          {isPopular && <div className="ml-2 w-4 h-4 bg-amber-300 rounded"></div>}
        </h3>
        
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className={`text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {startPrice}
            </span>
            <span className="text-slate-500 ml-2 text-sm font-medium">{t('common.startFee')}</span>
          </div>
          <div className="flex items-baseline mb-3">
            <span className="text-2xl font-bold text-slate-800">{monthlyPrice}</span>
          </div>
          
          <div className={`bg-gradient-to-r ${gradient} rounded-xl p-3 text-center`}>
            <p className="text-xs font-semibold text-white">
              Inga bindningstider • Avsluta när som helst
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex-1 mb-6">
          <h4 className="font-bold text-slate-900 mb-4 flex items-center">
            <div className="w-4 h-4 bg-slate-900 rounded mr-2"></div>
            {t('common.whatIncluded')}
          </h4>
          
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-0.5">
                  {feature.included ? (
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-1 shadow-lg">
                      <div className="w-2 h-2 bg-white rounded"></div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-slate-300 to-slate-400 rounded-full p-1">
                      <div className="w-2 h-2 bg-white rounded"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    feature.included ? 'text-slate-800' : 'text-slate-400 line-through'
                  }`}>
                    {feature.name}
                  </span>
                  {feature.info && (
                    <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2">
                      <div className="flex items-start">
                        <div className="w-3 h-3 bg-amber-600 rounded mr-2 flex-shrink-0 mt-0.5"></div>
                        <span className="text-xs text-amber-800 leading-relaxed">{feature.info}</span>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          {/* Service-specific info */}
          {info && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-amber-600 rounded mr-2 flex-shrink-0 mt-0.5"></div>
                <span className="text-xs text-amber-800 leading-relaxed">{info}</span>
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={onContact}
          className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 text-base shadow-lg ${
            isPopular
              ? `bg-gradient-to-r ${gradient} text-white hover:shadow-xl`
              : `border-2 border-slate-300 text-slate-700 hover:bg-gradient-to-r hover:${gradient} hover:text-white hover:border-transparent`
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center">
            <div className="w-4 h-4 bg-current rounded mr-2"></div>
            {buttonText}
            <div className="w-4 h-4 bg-current rounded ml-2"></div>
          </span>
        </motion.button>

        {/* Trust badge */}
        <div className="mt-4 text-center">
          <span className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white`}>
            Kostnadsfri konsultation ingår alltid
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;