import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sv } from '../data/translations/sv';
import { en } from '../data/translations/en';
import { SUPPORTED_LANGUAGES, Language } from '../types/language';

interface LanguageContextType {
  currentLanguage: Language;
  t: (key: string, params?: Record<string, any>, fallback?: string) => string;
  tArray: (key: string, fallback?: any[]) => any[];
  changeLanguage: (languageCode: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  sv,
  en
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get language from URL path
    const pathSegments = window.location.pathname.split('/');
    const languageFromPath = pathSegments[1];
    
    const detectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === languageFromPath);
    
    if (detectedLanguage) {
      setCurrentLanguage(detectedLanguage);
      localStorage.setItem('preferred-language', detectedLanguage.code);
    } else {
      // Fallback to saved preference or default
      const savedLanguage = localStorage.getItem('preferred-language');
      const savedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === savedLanguage);
      if (savedLang) {
        setCurrentLanguage(savedLang);
      }
    }
    
    setIsLoading(false);
  }, []);

  const t = (key: string, params?: Record<string, any>, fallback?: string): string => {
    try {
      // Split the key by dots to navigate nested objects
      const keys = key.split('.');
      let value: any = translations[currentLanguage.code as keyof typeof translations];
      
      // Navigate through the nested object
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Key not found, try fallback
          if (fallback) return fallback;
          
          // Try to find in other language as fallback
          const otherLang = currentLanguage.code === 'sv' ? 'en' : 'sv';
          let fallbackValue: any = translations[otherLang as keyof typeof translations];
          
          for (const fallbackKey of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
              fallbackValue = fallbackValue[fallbackKey];
            } else {
              fallbackValue = null;
              break;
            }
          }
          
          if (fallbackValue && typeof fallbackValue === 'string') {
            return fallbackValue;
          }
          
          // Return the key if no translation found
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      // If value is an array, join it
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      
      // If value is a string, process parameters
      if (typeof value === 'string') {
        console.log(`Translation found for key "${key}":`, value);
        if (params) {
          return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
            return params[paramKey] !== undefined ? String(params[paramKey]) : match;
          });
        }
      return value;
    }
    
      // If value is not a string, try to convert it
      if (value !== null && value !== undefined) {
        return String(value);
      }
      
      return fallback || key;
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  };

  const tArray = (key: string, fallback?: any[]): any[] => {
    try {
      const keys = key.split('.');
      let value: any = translations[currentLanguage.code as keyof typeof translations];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Try to find in other language as fallback
          const otherLang = currentLanguage.code === 'sv' ? 'en' : 'sv';
          let fallbackValue: any = translations[otherLang as keyof typeof translations];
          
          for (const fallbackKey of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
              fallbackValue = fallbackValue[fallbackKey];
            } else {
              fallbackValue = null;
              break;
            }
          }
          
          if (Array.isArray(fallbackValue)) {
            return fallbackValue;
          }
          
          console.warn(`Translation array not found: ${key}`);
          return fallback || [];
        }
      }
      
      if (Array.isArray(value)) {
        return value;
      }
      
      return fallback || [];
    } catch (error) {
      console.warn(`Translation array error for key "${key}":`, error);
      return fallback || [];
    }
  };

  const changeLanguage = (languageCode: string) => {
    const newLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
      localStorage.setItem('preferred-language', languageCode);
      
      // Update URL without page reload
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/');
      pathSegments[1] = languageCode;
      const newPath = pathSegments.join('/');
      
      window.history.replaceState({}, '', newPath);
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    t,
    tArray,
    changeLanguage,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};