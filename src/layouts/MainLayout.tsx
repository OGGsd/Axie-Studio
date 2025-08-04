import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AIAgentSection from '../components/AIAgentSection';
import BookingSection from '../components/BookingSection';
import WebsiteSection from '../components/WebsiteSection';
import AppSection from '../components/AppSection';
import CommerceSection from '../components/CommerceSection';
import Services from '../components/Services';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import PrivacyPolicy from '../components/PrivacyPolicy';
import TermsOfService from '../components/TermsOfService';
import ChatInterface from '../components/ChatInterface';
import AIChatAgentsPage from '../components/AIChatAgentsPage';
import LandingPage from '../components/LandingPage';

const MainLayout: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const location = useLocation();
  
  // Handle hash navigation for sections
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  // Layout wrapper component for pages with header and footer
  const PageWithLayout = ({ children }: { children: React.ReactNode }) => (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNavigation />
    </>
  );

  return (
    <div className="min-h-screen" dir={currentLanguage.rtl ? 'rtl' : 'ltr'}>
      <Routes>
        {/* Landing Page - No header/footer */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Main Application Routes */}
        <Route path="home" element={
          <PageWithLayout>
            <HomePage />
          </PageWithLayout>
        } />
        
        {/* Direct access to main page without language prefix */}
        <Route path="main" element={
          <PageWithLayout>
            <HomePage />
          </PageWithLayout>
        } />
        
        {/* AI & Chat Routes */}
        <Route path="ai-chat-agents" element={
          <PageWithLayout>
            <AIChatAgentsPage />
          </PageWithLayout>
        } />
        <Route path="chat" element={<ChatInterface />} />
        
        {/* Service-Specific Routes */}
        <Route path="booking" element={
          <PageWithLayout>
            <BookingPage />
          </PageWithLayout>
        } />
        <Route path="websites" element={
          <PageWithLayout>
            <WebsitesPage />
          </PageWithLayout>
        } />
        <Route path="apps" element={
          <PageWithLayout>
            <AppsPage />
          </PageWithLayout>
        } />
        <Route path="commerce" element={
          <PageWithLayout>
            <CommercePage />
          </PageWithLayout>
        } />
        <Route path="services" element={
          <PageWithLayout>
            <ServicesPage />
          </PageWithLayout>
        } />
        
        {/* Information Routes */}
        <Route path="faq" element={
          <PageWithLayout>
            <FAQPage />
          </PageWithLayout>
        } />
        <Route path="contact" element={
          <PageWithLayout>
            <ContactPage />
          </PageWithLayout>
        } />
        
        {/* Legal Routes */}
        <Route path="privacy" element={
          <PageWithLayout>
            <PrivacyPolicyPage />
          </PageWithLayout>
        } />
        <Route path="terms" element={
          <PageWithLayout>
            <TermsOfServicePage />
          </PageWithLayout>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

// Page Components
const HomePage = () => (
  <>
    <Hero />
    <BookingSection />
    <WebsiteSection />
    <AppSection />
    <CommerceSection />
    <Services />
    <FAQ />
    <Contact />
  </>
);

const BookingPage = () => <BookingSection />;
const WebsitesPage = () => <WebsiteSection />;
const AppsPage = () => <AppSection />;
const CommercePage = () => <CommerceSection />;
const ServicesPage = () => <Services />;
const FAQPage = () => <FAQ />;
const ContactPage = () => <Contact />;
const PrivacyPolicyPage = () => <PrivacyPolicy />;
const TermsOfServicePage = () => <TermsOfService />;

export default MainLayout;