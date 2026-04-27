import { useEffect } from 'react';
import { useThemeContext, REGIONS } from '../context/ThemeContext';

export const useTheme = () => {
    const context = useThemeContext();
    const { region, themeMode, ageGroup } = context;

    useEffect(() => {
        const root = document.documentElement;

        // 1. Apply Regional Accent
        let accentColor = REGIONS[region]?.color || '#c5a059';
        
        // India Region contrast adjustment for Light Mode
        if (themeMode === 'light' && region === 'India') {
            accentColor = '#D55F11'; // Darker terracotta orange for accessibility on light backgrounds
        }
        
        const accentForeground = (region === 'US' || (themeMode === 'light' && region === 'India'))
            ? '#ffffff'
            : '#000000';

        root.style.setProperty('--accent', accentColor);
        root.style.setProperty('--accent-hover', `${accentColor}ee`);
        root.style.setProperty('--accent-foreground', accentForeground);

        // 2. Apply Theme Mode (Light/Dark)
        if (themeMode === 'light') {
            root.style.setProperty('--bg-primary', '#fcfcfc');
            root.style.setProperty('--bg-secondary', '#f0f0f0');
            root.style.setProperty('--surface-elevated', 'rgba(255, 255, 255, 0.9)');
            root.style.setProperty('--text-primary', '#0c0c0c');
            root.style.setProperty('--text-muted', '#222222'); // Darkened for better readability
            root.style.setProperty('--border', '#d1d1d1');
            root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.72)');
            root.style.setProperty('--glass-border', 'rgba(12, 12, 12, 0.08)');
        } else {
            root.style.setProperty('--bg-primary', '#0a0a0a');
            root.style.setProperty('--bg-secondary', '#141414');
            root.style.setProperty('--surface-elevated', 'rgba(20, 20, 20, 0.88)');
            root.style.setProperty('--text-primary', '#f0f0f0');
            root.style.setProperty('--text-muted', '#a0a0a0');
            root.style.setProperty('--border', '#2a2a2a');
            root.style.setProperty('--glass-bg', 'rgba(10, 10, 10, 0.72)');
            root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
        }

        // 3. Apply Age Group Personalization
        if (ageGroup === 'senior') {
            // Senior Mode: Larger text, Serif font, better spacing, high contrast
            root.style.setProperty('--base-size', '20px');
            root.style.setProperty('--font-main', '"Playfair Display", Georgia, serif'); 
            root.style.setProperty('--line-height', '1.8');
            root.style.setProperty('--letter-spacing', '0.01em');
            
            // Adjust text primary for higher contrast in senior mode if in light theme
            if (themeMode === 'light') {
                root.style.setProperty('--text-primary', '#000000');
                root.style.setProperty('--text-muted', '#222222');
            } else {
                root.style.setProperty('--text-primary', '#ffffff');
                root.style.setProperty('--text-muted', '#cccccc');
            }
        } else {
            // Young Mode: Modern Sans-Serif, Normal size
            root.style.setProperty('--base-size', '16px');
            root.style.setProperty('--font-main', '"Inter", sans-serif');
            root.style.setProperty('--line-height', 'normal');
            root.style.setProperty('--letter-spacing', 'normal');
        }

    }, [region, themeMode, ageGroup]);

    return context;
};
