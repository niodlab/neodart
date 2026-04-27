import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const REGIONS = {
  US: { color: '#0079ff', name: 'United States' },
  India: { color: '#FF7722', name: 'India' },
  MiddleEast: { color: '#50C878', name: 'Middle East' }
};

export const ThemeProvider = ({ children }) => {
  // Initial state from localStorage or defaults
  const [region, setRegion] = useState(() => localStorage.getItem('pref-region') || 'US');
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('pref-mode');
    if (saved) return saved;
    // Time-based detection: 6 AM and 6 PM (6:00 to 18:00) -> Light Mode
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  });
  const [ageGroup, setAgeGroup] = useState(() => localStorage.getItem('pref-age') || 'young');

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('pref-region', region);
    localStorage.setItem('pref-mode', themeMode);
    localStorage.setItem('pref-age', ageGroup);
  }, [region, themeMode, ageGroup]);

  const resetPreferences = () => {
    setRegion('US');
    const hour = new Date().getHours();
    setThemeMode((hour >= 6 && hour < 18) ? 'light' : 'dark');
    setAgeGroup('young');
  };

  const value = {
    region,
    setRegion,
    themeMode,
    setThemeMode,
    ageGroup,
    setAgeGroup,
    resetPreferences,
    REGIONS
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
