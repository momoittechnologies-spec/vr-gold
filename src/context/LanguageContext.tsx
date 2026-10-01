'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isTelugu: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'te',
  setLang: () => {},
  toggleLang: () => {},
  isTelugu: true,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('te');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vr_gold_language');
      if (saved === 'en' || saved === 'te') {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('vr_gold_language', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const next = lang === 'te' ? 'en' : 'te';
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isTelugu: lang === 'te' }}>
      {children}
    </LanguageContext.Provider>
  );
}
