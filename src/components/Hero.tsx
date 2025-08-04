import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Award, Users, Heart, Zap, Sparkles, MessageCircle, Bot, ChevronRight, Play, Globe, Shield, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { cn, gradients, glass, shadows } from '../lib/utils';

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChatInterface = () => {
    navigate('chat');
  };

  const handleAIChatAgents = () => {
    navigate('ai-chat-agents');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Enhanced Background Effects - 21st.dev inspired */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Enhanced Floating Elements - 21st.dev style */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/3 left-8 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-2/3 right-1/3 w-6 h-6 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge - 21st.dev inspired */}
          <motion.div 
            className="flex justify-center items-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="glow" className="text-sm px-6 py-3">
              <Star className="mr-2" size={16} />
              {t('hero.badge')}
              <Sparkles className="ml-2 text-amber-400" size={16} />
            </Badge>
          </motion.div>
          
          {/* Enhanced Typography - 21st.dev inspired */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="block">{t('hero.title')}</span>
            <span className={cn("block bg-clip-text text-transparent font-black", gradients.secondary)}>
              {t('hero.subtitle')}
            </span>
          </motion.h1>
          
          {/* Enhanced Description Card - 21st.dev inspired */}
          <motion.div 
            className="relative mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Card variant="glass" className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <CardContent className="p-8">
                <p className="text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
            {t('hero.description')}
                </p>
              </CardContent>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl" />
            </Card>
          </motion.div>
          
          {/* Enhanced CTA Buttons - 21st.dev inspired */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              onClick={handleAIChatAgents}
              variant="glow"
              size="lg"
              className="group"
            >
              <span>{t('hero.cta.primary')}</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Button>
            
            <Button
              onClick={handleChatInterface}
              variant="glass"
              size="lg"
              className="group"
            >
              <MessageCircle size={20} className="mr-2" />
              <span>{t('hero.cta.secondary')}</span>
            </Button>
          </motion.div>

          {/* Enhanced Statistics Cards - 21st.dev inspired */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            {[
              { icon: Users, value: '500+', label: t('hero.stats.clients') },
              { icon: Award, value: '98%', label: t('hero.stats.satisfaction') },
              { icon: Zap, value: '24/7', label: t('hero.stats.support') },
              { icon: TrendingUp, value: '300%', label: t('hero.stats.growth') }
            ].map((stat, index) => (
              <Card
                key={index}
                variant="glass"
                className="group"
                animate={true}
                hover={true}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className={cn("p-3 rounded-xl", gradients.primary)}>
                      <stat.icon className="text-white" size={24} />
              </div>
            </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Enhanced Feature Cards - 21st.dev inspired */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {[
              { icon: Bot, title: t('hero.features.ai.title'), description: t('hero.features.ai.description') },
              { icon: Globe, title: t('hero.features.global.title'), description: t('hero.features.global.description') },
              { icon: Shield, title: t('hero.features.secure.title'), description: t('hero.features.secure.description') }
            ].map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                className="group relative overflow-hidden"
                animate={true}
                hover={true}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={cn("p-3 rounded-xl mr-4", gradients.primary)}>
                      <feature.icon className="text-white" size={24} />
              </div>
                    <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
            </div>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl" />
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;