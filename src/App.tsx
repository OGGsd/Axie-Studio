import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGUAGES } from './types/language';
import MainLayout from './layouts/MainLayout';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Default route - redirect to preferred language */}
            <Route path="/" element={<LanguageRedirect />} />
            
            {/* Language-specific routes */}
            {SUPPORTED_LANGUAGES.map(lang => (
              <Route 
                key={lang.code} 
                path={`/${lang.code}/*`} 
                element={<MainLayout />}
              />
            ))}
            
            {/* Direct routes that need LanguageProvider */}
            <Route path="/*" element={<MainLayout />} />
            
            {/* Catch-all route - redirect to preferred language */}
            <Route path="*" element={<LanguageRedirect />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </Router>
  );
}

// Component to redirect to the preferred language
function LanguageRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  
  React.useEffect(() => {
    // Get preferred language with improved detection
    const getPreferredLanguage = () => {
      try {
        // First check localStorage
        const saved = localStorage.getItem('preferred-language');
        if (saved) {
          const found = SUPPORTED_LANGUAGES.find(lang => lang.code === saved);
          if (found) return found;
        }
        
        // Then check browser language with fallback
        const browserLang = navigator.language?.split('-')[0] || 'en';
        const detected = SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang);
        
        // Default to Swedish if no match found
        return detected || SUPPORTED_LANGUAGES[0];
      } catch (error) {
        console.warn('Language detection failed, using default:', error);
        return SUPPORTED_LANGUAGES[0]; // Swedish as default
      }
    };
    
    const preferredLanguage = getPreferredLanguage();
    const newPath = `/${preferredLanguage.code}${location.pathname === '/' ? '' : location.pathname}${location.search}${location.hash}`;
    
    // Use replace to avoid adding to browser history
    navigate(newPath, { replace: true });
  }, [location, navigate, currentLanguage]);
  
  return <LoadingSpinner />;
}

export default App;