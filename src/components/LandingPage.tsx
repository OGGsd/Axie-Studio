import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Sparkles, Bot, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showLanguageSelect, setShowLanguageSelect] = useState(true);

  const handleAIChatAgent = () => {
    navigate('ai-chat-agents');
  };

  const handleOurService = () => {
    navigate('home');
  };

  const handleSkipTutorial = () => {
    setShowTutorial(false);
  };

  const handleLanguageSelect = (selectedLanguage: 'sv' | 'en') => {
    changeLanguage(selectedLanguage);
    setShowLanguageSelect(false);
  };

  const steps = [
    {
      title: currentLanguage.code === 'sv' ? "Välkommen till Axie Studio" : "Welcome to Axie Studio",
      description: currentLanguage.code === 'sv' 
        ? "Vi är här för att hjälpa dig hitta rätt digital lösning för ditt företag"
        : "We are here to help you find the right digital solution for your business",
      action: null,
      icon: Sparkles
    },
    {
      title: currentLanguage.code === 'sv' 
        ? "Vill du se vår AI-receptionist i aktion?"
        : "Want to see our AI receptionist in action?",
      description: currentLanguage.code === 'sv'
        ? "Klicka här för att se hur vår AI kan hjälpa dina kunder 24/7"
        : "Click here to see how our AI can help your customers 24/7",
      action: () => handleAIChatAgent(),
      buttonText: currentLanguage.code === 'sv' ? "Se AI Demo" : "See AI Demo",
      icon: Bot
    },
    {
      title: currentLanguage.code === 'sv'
        ? "Eller vill du utforska alla våra tjänster?"
        : "Or want to explore all our services?",
      description: currentLanguage.code === 'sv'
        ? "Klicka här för att se webbplatser, appar, e-handel och mer"
        : "Click here to see websites, apps, e-commerce and more",
      action: () => handleOurService(),
      buttonText: currentLanguage.code === 'sv' ? "Utforska Tjänster" : "Explore Services",
      icon: Globe
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Language Selection Screen
  if (showLanguageSelect) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <img 
              src="/Axiestudiologo.jpg" 
              alt="Axie Studio Logo" 
              className="h-20 mx-auto mb-6 rounded-xl shadow-lg"
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Axie Studio
            </h1>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Välj språk / Choose Language
            </h2>
            
            <div className="space-y-4">
              <motion.button
                onClick={() => handleLanguageSelect('sv')}
                className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-4 rounded-xl text-lg font-semibold hover:from-slate-800 hover:via-blue-800 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Svenska
              </motion.button>
              <motion.button
                onClick={() => handleLanguageSelect('en')}
                className="w-full bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-50 text-slate-900 p-4 rounded-xl text-lg font-semibold border-2 border-slate-300 hover:from-slate-200 hover:via-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                English
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showTutorial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Language Toggle */}
          <div className="text-right mb-6">
            <motion.button
              onClick={() => setShowLanguageSelect(true)}
              className="text-sm text-slate-700 hover:text-slate-900 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.code === 'sv' ? 'Ändra språk' : 'Change language'}
            </motion.button>
          </div>

          {/* Logo and Brand */}
          <div className="text-center mb-12">
            <img 
              src="/Axiestudiologo.jpg" 
              alt="Axie Studio Logo" 
              className="h-20 mx-auto mb-6 rounded-xl shadow-lg"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Axie Studio
            </h1>
            <p className="text-lg text-slate-700 mb-8 font-medium">
              {currentLanguage.code === 'sv' ? 'Välj vad du vill göra härnäst' : 'Choose what you want to do next'}
            </p>
          </div>

          {/* Professional Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.button
              onClick={handleAIChatAgent}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <Bot className="w-6 h-6" />
                <span>{currentLanguage.code === 'sv' ? 'Se AI Demo' : 'See AI Demo'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              onClick={handleOurService}
              className="group relative bg-gradient-to-r from-slate-100 via-blue-50 to-indigo-50 text-slate-900 p-6 rounded-xl text-lg font-semibold border-2 border-slate-300 hover:from-slate-200 hover:via-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <Globe className="w-6 h-6" />
                <span>{currentLanguage.code === 'sv' ? 'Utforska Tjänster' : 'Explore Services'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>
          </div>

          <div className="text-center mt-8">
            <motion.button
              onClick={() => setShowTutorial(true)}
              className="text-slate-700 hover:text-slate-900 text-sm font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.code === 'sv' ? 'Visa guide igen' : 'Show guide again'}
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Language Toggle */}
        <div className="text-right mb-6">
          <motion.button
            onClick={() => setShowLanguageSelect(true)}
            className="text-sm text-slate-700 hover:text-slate-900 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentLanguage.code === 'sv' ? 'Ändra språk' : 'Change language'}
          </motion.button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-700 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
              {currentLanguage.code === 'sv' ? `Steg ${currentStep + 1} av ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
            </span>
            <motion.button
              onClick={handleSkipTutorial}
              className="text-sm text-slate-700 hover:text-slate-900 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.code === 'sv' ? 'Hoppa över' : 'Skip'}
            </motion.button>
          </div>
          <div className="w-full bg-slate-300 rounded-full h-3 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-3 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Current Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/Axiestudiologo.jpg" 
                alt="Axie Studio Logo" 
                className="h-16 mx-auto mb-4 rounded-lg shadow-md"
              />
            </div>

            {/* Step Icon */}
            {steps[currentStep].icon && (
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full shadow-lg">
                  {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
                </div>
              </div>
            )}

            {/* Step Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {steps[currentStep].title}
            </h1>

            {/* Step Description */}
            <p className="text-lg text-slate-700 mb-8 leading-relaxed font-medium">
              {steps[currentStep].description}
            </p>

            {/* Action Button */}
            {steps[currentStep].action && (
              <motion.button
                onClick={steps[currentStep].action}
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 mb-8 shadow-lg hover:shadow-xl transform hover:scale-105 border-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-3">
                  <span>{steps[currentStep].buttonText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4">
              {currentStep > 0 && (
                <motion.button
                  onClick={prevStep}
                  className="px-6 py-2 text-slate-700 hover:text-slate-900 font-medium bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage.code === 'sv' ? 'Föregående' : 'Previous'}
                </motion.button>
              )}
              
              {currentStep < steps.length - 1 && (
                <motion.button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white rounded-lg hover:from-slate-800 hover:via-blue-800 hover:to-indigo-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage.code === 'sv' ? 'Nästa' : 'Next'}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Access at Bottom */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-700 mb-4 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md inline-block">
            {currentLanguage.code === 'sv' ? 'Eller gå direkt till:' : 'Or go directly to:'}
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={handleAIChatAgent}
              className="text-sm text-slate-700 hover:text-slate-900 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.code === 'sv' ? 'AI Demo' : 'AI Demo'}
            </motion.button>
            <span className="text-slate-500 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">|</span>
            <motion.button
              onClick={handleOurService}
              className="text-sm text-slate-700 hover:text-slate-900 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentLanguage.code === 'sv' ? 'Våra Tjänster' : 'Our Services'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 
