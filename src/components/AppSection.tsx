import React from 'react';
import { Smartphone, Download, Zap, Globe, Bell, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AppSection = () => {
  const { t, tArray } = useLanguage();
  
  const features = [
    {
      icon: Zap,
      title: t('apps.features.performance.title'),
      description: t('apps.features.performance.description')
    },
    {
      icon: Globe,
      title: t('apps.features.crossPlatform.title'),
      description: t('apps.features.crossPlatform.description')
    },
    {
      icon: Bell,
      title: t('apps.features.notifications.title'),
      description: t('apps.features.notifications.description')
    },
    {
      icon: Download,
      title: t('apps.features.distribution.title'),
      description: t('apps.features.distribution.description')
    },
    {
      icon: Smartphone,
      title: t('apps.features.native.title'),
      description: t('apps.features.native.description')
    },
    {
      icon: Shield,
      title: t('apps.features.security.title'),
      description: t('apps.features.security.description')
    }
  ];

  return (
    <section id="apps" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t('apps.title')}</h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {t('apps.subtitle')}
          </p>
        </div>

        {/* Features Grid with Video */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 sm:mb-16">
          {/* Features - Left Side */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 hover:bg-slate-50 rounded-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-slate-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <feature.icon className="text-slate-900" size={28} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video - Right Side */}
          <div className="lg:col-span-1 flex items-center justify-center">
            <div className="relative max-w-xs mx-auto">
              <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4 rounded-3xl shadow-2xl">
                <div className="bg-black rounded-2xl overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto max-w-[280px] object-cover"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 500'%3E%3Crect width='280' height='500' fill='%23000'/%3E%3C/svg%3E"
                  >
                    <source 
                      src="https://kt5xwoxw7ivvaxql.public.blob.vercel-storage.com/uri_ifs___V_uJHUCjafxCBBnNqIXlY6__i1GrZYUeRJn1pyoCuulWU-0MhpuJT3xkGNJ9fq2Vnc5syLlucUB6.mp4" 
                      type="video/mp4" 
                    />
                    {t('apps.videoFallback', {}, 'Din webbläsare stöder inte video-taggen.')}
                  </video>
                </div>
                {/* Phone Frame Details */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg animate-bounce">
                <Bell size={16} />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-slate-900 text-white p-2 rounded-full shadow-lg animate-pulse">
                <Download size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t('apps.cta.title')}</h3>
              <p className="text-base sm:text-lg mb-6 opacity-90">
                {t('apps.cta.description')}
              </p>
              <ul className="space-y-2 text-sm opacity-90">
                {tArray('apps.cta.features').map((feature: string, index: number) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-xl p-6">
                <Smartphone className="mx-auto mb-4" size={48} />
                <h4 className="text-lg sm:text-xl font-semibold mb-2">{t('apps.features.distribution.title')}</h4>
                <p className="text-sm opacity-90 mb-4">
                  {t('apps.features.distribution.description')}
                </p>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-purple-600 px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  {t('apps.cta.button')} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;