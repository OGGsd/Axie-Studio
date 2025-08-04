import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import IndustryDemos from './IndustryDemos';

const AIChatAgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Helper function to safely get array from translation
  const getTranslationArray = (key: string): string[] => {
    const value = t(key);
    if (Array.isArray(value)) {
      return value;
    }
    // If it's a string, try to parse it as JSON or return as single item array
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch {
        return [value];
      }
    }
    return [];
  };

  const agents = [
    {
      id: 'booking-receptionist',
      name: t('aiChatAgents.agents.booking.name'),
      description: t('aiChatAgents.agents.booking.description'),
      color: 'from-blue-500 to-blue-600',
      features: getTranslationArray('aiChatAgents.agents.booking.features'),
      details: t('aiChatAgents.agents.booking.details')
    },
    {
      id: 'information-receptionist',
      name: t('aiChatAgents.agents.information.name'),
      description: t('aiChatAgents.agents.information.description'),
      color: 'from-green-500 to-green-600',
      features: getTranslationArray('aiChatAgents.agents.information.features'),
      details: t('aiChatAgents.agents.information.details')
    },
    {
      id: 'service-receptionist',
      name: t('aiChatAgents.agents.service.name'),
      description: t('aiChatAgents.agents.service.description'),
      color: 'from-purple-500 to-purple-600',
      features: getTranslationArray('aiChatAgents.agents.service.features'),
      details: t('aiChatAgents.agents.service.details')
    }
  ];

  const statistics = [
    { number: '95%', label: t('aiChatAgents.statistics.customerSatisfaction') },
    { number: '70%', label: t('aiChatAgents.statistics.costSavings') },
    { number: '24/7', label: t('aiChatAgents.statistics.availability') },
    { number: '<30s', label: t('aiChatAgents.statistics.responseTime') }
  ];

  const useCases = [
    {
      industry: t('aiChatAgents.useCases.restaurants.industry'),
      examples: getTranslationArray('aiChatAgents.useCases.restaurants.examples'),
      benefits: getTranslationArray('aiChatAgents.useCases.restaurants.benefits')
    },
    {
      industry: t('aiChatAgents.useCases.salons.industry'),
      examples: getTranslationArray('aiChatAgents.useCases.salons.examples'),
      benefits: getTranslationArray('aiChatAgents.useCases.salons.benefits')
    },
    {
      industry: t('aiChatAgents.useCases.drivingSchools.industry'),
      examples: getTranslationArray('aiChatAgents.useCases.drivingSchools.examples'),
      benefits: getTranslationArray('aiChatAgents.useCases.drivingSchools.benefits')
    },
    {
      industry: t('aiChatAgents.useCases.libraries.industry'),
      examples: getTranslationArray('aiChatAgents.useCases.libraries.examples'),
      benefits: getTranslationArray('aiChatAgents.useCases.libraries.benefits')
    }
  ];

  const faqData = [
    {
      question: t('aiChatAgents.faq.implementation.question'),
      answer: t('aiChatAgents.faq.implementation.answer')
    },
    {
      question: t('aiChatAgents.faq.integration.question'),
      answer: t('aiChatAgents.faq.integration.answer')
    },
    {
      question: t('aiChatAgents.faq.bookingIntegration.question'),
      answer: t('aiChatAgents.faq.bookingIntegration.answer')
    },
    {
      question: t('aiChatAgents.faq.security.question'),
      answer: t('aiChatAgents.faq.security.answer')
    },
    {
      question: t('aiChatAgents.faq.terminology.question'),
      answer: t('aiChatAgents.faq.terminology.answer')
    },
    {
      question: t('aiChatAgents.faq.fallback.question'),
      answer: t('aiChatAgents.faq.fallback.answer')
    }
  ];

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleSeeDemo = () => {
    setIsDemoOpen(true);
  };

  const closeDemo = () => {
    setIsDemoOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.div 
        className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToLanding}
              className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-all duration-300 hover:bg-slate-100 px-3 py-2 rounded-lg"
            >
              <ArrowLeft size={18} />
              <span className="font-medium">{t('aiChatAgents.backToHome')}</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                {t('aiChatAgents.aiReceptionist')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white px-8 py-4 rounded-full font-semibold mb-8 inline-block shadow-xl">
                          {t('aiChatAgents.nextGenAI')}
          </div>

          <h1 className="text-6xl font-black text-slate-900 mb-8 leading-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            {t('aiChatAgents.hero.title')}
          </h1>
          
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-10 text-lg">
            {t('aiChatAgents.hero.subtitle')}
          </p>

          <div className="w-32 h-1 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mx-auto rounded-full shadow-lg"></div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {statistics.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-4xl font-black text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">{stat.number}</div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Industry Leadership Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold mb-8 inline-block shadow-xl">
                          {t('aiChatAgents.industryLeader')}
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            {t('aiChatAgents.leadership.title')}
          </h2>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed mb-10">
            {t('aiChatAgents.leadership.subtitle')}
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-3xl font-black text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">{t('aiChatAgents.leadership.stats.customers')}</div>
              <div className="text-sm text-slate-600 font-medium">{t('aiChatAgents.leadership.stats.customersLabel')}</div>
            </div>
            <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-3xl font-black text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">{t('aiChatAgents.leadership.stats.faster')}</div>
              <div className="text-sm text-slate-600 font-medium">Snabbare</div>
            </div>
            <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-3xl font-black text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">{t('aiChatAgents.leadership.stats.accurate')}</div>
              <div className="text-sm text-slate-600 font-medium">Mer Exakt</div>
            </div>
          </div>
        </motion.div>

        {/* Embedded AI Agent */}
        <motion.div 
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/50 mb-20 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{t('aiChatAgents.liveAIReceptionist')}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg" />
                  <span className="text-sm opacity-90 font-medium">Live & Redo att Hjälpa</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-900 bg-white/80 px-4 py-2 rounded-full">
                Powered by AI
              </div>
            </div>
          </div>

          {/* Embedded Content */}
          <div className="relative" style={{ height: '650px' }}>
            <iframe
              src="https://axieagent.netlify.app/"
              className="w-full h-full border-0"
              title="Axie AI Agent"
              allow="microphone; camera; geolocation"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Industry Demos */}
        <IndustryDemos />

        {/* Use Cases Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Användningsområden
            </h2>
            <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Våra AI-receptionister kan anpassas för olika branscher och användningsområden. 
              Här är några exempel på hur serviceföretag använder våra lösningar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-slate-900 mb-6">{useCase.industry}</h3>
                
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-700 mb-4">Exempel på funktioner:</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {useCase.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-4">Fördelar:</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              {t('common.transparentPricing')}
            </h2>
            <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
              {t('common.choosePackage')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 p-10 relative hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">Basic Chat Bot</h3>
                <div className="text-5xl font-black text-slate-900 mb-3 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">995 kr</div>
                <div className="text-slate-600 font-medium">per månad</div>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{t('common.basicAIConversation')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{t('common.availability247')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{t('common.upTo1000Conversations')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{t('common.emailSupport')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700 font-medium">{t('common.basicCustomization')}</span>
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-5 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {t('common.chooseBasic')}
              </button>
            </div>

            {/* Intelligent Plan */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl shadow-2xl border border-slate-200/50 p-10 relative text-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-xl">
                  {t('common.mostPopular')}
                </div>
              </div>
              
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold mb-6">Intelligent Chat Bot</h3>
                <div className="text-5xl font-black mb-3">14 995 kr</div>
                <div className="text-slate-300 mb-3 font-medium">{t('common.startFee')}</div>
                <div className="text-3xl font-bold">995 kr</div>
                <div className="text-slate-300 font-medium">{t('common.perMonth')}</div>
              </div>
              
              <ul className="space-y-5 mb-10">
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.everythingFromBasic')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.usesCompanyInfo')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.unlimitedConversations')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.prioritySupport')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.fullCustomization')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.advancedAnalytics')}</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span className="font-medium">{t('common.integrationWithExisting')}</span>
                </li>
              </ul>

              <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-5 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {t('common.chooseIntelligent')}
              </button>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-slate-600 mb-6 font-medium">{t('common.noHiddenFees')} • {t('common.moneyBack')} • {t('common.professionalSetup')}</p>
            <button className="text-slate-900 font-semibold hover:underline text-lg">
              {t('common.seeFullPricing')} →
            </button>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Varför En Digital Receptionist?
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Våra AI-receptionister är byggda med avancerad maskininlärning och naturlig språkbehandling. 
            De förstår kontext, lär sig från varje interaktion, och levererar alltid personlig och relevant service.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 p-8 border border-gray-200"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`bg-gradient-to-r ${agent.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{agent.name}</h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">{agent.description}</p>
              
              <div className="space-y-3 mb-6">
                {agent.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 bg-gradient-to-r ${agent.color} rounded-full`} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                {agent.details}
              </p>
              
              <button
                onClick={handleSeeDemo}
                className={`w-full bg-gradient-to-r ${agent.color} text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              >
                See Demo
              </button>
            </motion.div>
          ))}
        </motion.div>



        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Tillgänglighet</h3>
            <p className="text-gray-600 leading-relaxed">
              Våra AI-agenter är alltid redo att hjälpa dina kunder, oavsett tid på dygnet. 
              Ingen väntetid, ingen kö, alltid tillgänglig när det behövs.
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Omedelbara Svar</h3>
            <p className="text-gray-600 leading-relaxed">
              Få svar på dina frågor inom sekunder, inte timmar. 
              Våra AI-agenter analyserar och svarar på komplexa frågor omedelbart.
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Inlärning</h3>
            <p className="text-gray-600 leading-relaxed">
              Våra AI-agenter lär sig kontinuerligt och förbättras från varje interaktion. 
              De blir smartare över tid och anpassar sig till ditt företags specifika behov.
            </p>
          </div>

          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Systemintegration</h3>
            <p className="text-gray-600 leading-relaxed">
              Integrerar sömlöst med dina befintliga system och använder er data för att ge 
              personlig och relevant support till era kunder.
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Vanliga Frågor
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Svar på de vanligaste frågorna om våra AI-agenter och implementation.
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Implementation Timeline */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Enkel Implementation
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Från beställning till live på bara 2-4 veckor. Vi tar hand om allt - du fokuserar på ditt företag.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Konsultation</h3>
                              <p className="text-gray-600">{t('common.customSolution')}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Konfiguration</h3>
              <p className="text-gray-600">Vi integrerar med dina system och tränar AI:n på er data</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Testning</h3>
              <p className="text-gray-600">Omfattande testning och finjustering för optimal prestanda</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Live</h3>
              <p className="text-gray-600">Din AI-receptionist går live och börjar hjälpa dina kunder</p>
            </div>
          </div>
        </motion.div>

        {/* Contact & Demo Section */}
        <motion.div 
          className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {t('common.bookFreeDemo')}
              </h2>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {t('common.bookFreeDemoSubtitle')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700">{t('common.personalDemo')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700">{t('common.customizedForIndustry')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700">{t('common.noObligation')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-700">{t('common.freeROICalculation')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-200/50">
              <h3 className="text-xl font-bold text-slate-900 mb-6">{t('common.bookYourDemo')}</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-700">{t('common.liveGoogleCalendar')}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    {t('common.bookDirectly')}
                  </p>
                </div>
                
                {/* Google Calendar Iframe */}
                <div className="relative bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-3 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700 ml-2">{t('common.bookingCalendar')}</span>
                    </div>
                  </div>
                  <iframe
                    src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0QR3uRxVB7rb4ZHqJ1qYmz-T0e2CFtV5MYekvGDq1qyWxsV_Av3nP3zEGk0DrH2HqpTLoXuK0h"
                    className="w-full h-96 border-0"
                    title={t('aiChatAgents.bookConsultation')}
                    style={{
                      background: 'white'
                    }}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    {t('common.chooseTimeNoObligation')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Content */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-12 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t('common.futureCustomerService')}
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('common.futureCustomerServiceDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('common.benefitsForBusiness')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('common.reduceCosts')}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Förbättra kundnöjdhet genom snabbare svar</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Skala kundservice utan att öka personal</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Använd befintliga system och data för personlig support</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Teknisk Kapacitet</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Avancerad NLP för naturlig konversation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Maskininlärning för kontinuerlig förbättring</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sömlös integration med bokningssystem, CRM och databaser</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Säker och GDPR-kompatibel lösning</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-16 text-white shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold mb-8 inline-block shadow-xl">
            BEGRÄNSAD TID
          </div>
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
            Bli En Del av Framtiden
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Anslut dig till 500+ företag som redan har transformerat sin kundservice. 
            Börja spara tid och pengar redan idag.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-white/80 rounded-3xl backdrop-blur-md hover:bg-white transition-all duration-300">
              <div className="text-3xl font-black mb-3 text-slate-900">70%</div>
              <div className="text-sm text-slate-700 font-medium">Kostnadsbesparing</div>
            </div>
            <div className="text-center p-8 bg-white/80 rounded-3xl backdrop-blur-md hover:bg-white transition-all duration-300">
              <div className="text-3xl font-black mb-3 text-slate-900">24/7</div>
              <div className="text-sm text-slate-700 font-medium">Tillgänglighet</div>
            </div>
            <div className="text-center p-8 bg-white/80 rounded-3xl backdrop-blur-md hover:bg-white transition-all duration-300">
              <div className="text-3xl font-black mb-3 text-slate-900">2-4</div>
              <div className="text-sm text-slate-700 font-medium">Veckor till live</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleSeeDemo}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Boka Gratis Demo
            </button>
            <button
              onClick={handleBackToLanding}
              className="border-2 border-white text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
            >
              Ring Oss Nu
            </button>
          </div>
          
          <p className="text-sm text-slate-400 mt-8 font-medium">
            Gratis demo • 30 dagars pengarna tillbaka • Ingen bindningstid
          </p>
        </motion.div>
      </div>

      {/* Demo Popup */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeDemo}
            />
            
            {/* Popup Content */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl h-[80vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-lg">AI Chat Demo</span>
                </div>
                <button
                  onClick={closeDemo}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Iframe */}
              <iframe
                src="https://chatbotex1.netlify.app/"
                className="w-full h-full border-0"
                title="AI Chat Demo"
                allow="microphone; camera; geolocation"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatAgentsPage; 