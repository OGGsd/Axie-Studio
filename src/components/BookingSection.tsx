import React from 'react';
import { Calendar, Clock, Users, CreditCard, Bell, BarChart3 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BookingSection = () => {
  const { t, tArray } = useLanguage();

  return (
    <section id="booking" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t('booking.title')}</h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {t('booking.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <Calendar className="text-slate-900 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t('booking.features.scheduling.title')}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{t('booking.features.scheduling.description')}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <Clock className="text-slate-900 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t('booking.features.realtime.title')}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{t('booking.features.realtime.description')}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <Users className="text-slate-900 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t('booking.features.crm.title')}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{t('booking.features.crm.description')}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <CreditCard className="text-slate-900 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t('booking.features.payments.title')}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{t('booking.features.payments.description')}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <Bell className="text-slate-900 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t('booking.features.reminders.title')}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{t('booking.features.reminders.description')}</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
            <BarChart3 className="text-slate-900 mb-4" size={40} />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">{t('booking.features.analytics.title')}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{t('booking.features.analytics.description')}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t('booking.industries.title')}</h3>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            {t('booking.industries.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
            {tArray('booking.industries.list').map((industry: string, index: number) => (
              <span key={index} className="bg-white/20 px-3 sm:px-4 py-2 rounded-full">{industry}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;