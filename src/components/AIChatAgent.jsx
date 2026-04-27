import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, RefreshCw, Sun, Moon, MapPin, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const AIChatAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { region, setRegion, themeMode, setThemeMode, ageGroup, setAgeGroup, resetPreferences, REGIONS } = useTheme();

    const togglePanel = () => setIsOpen(!isOpen);

    return (
        <div className="ai-agent-container select-none">
            {/* Pulsing Floating Button */}
            <motion.button
                onClick={togglePanel}
                className="fixed bottom-6 right-6 z-[100] p-3.5 bg-accent rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform"
                initial={false}
                animate={{
                    boxShadow: [
                      "0 0 0 0px var(--accent)",
                      "0 0 0 15px rgba(0, 0, 0, 0)",
                    ]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeOut"
                }}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            {/* Slide-in Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[98] bg-black/20 backdrop-blur-[1px]"
                            aria-hidden="true"
                        />
                        <motion.aside
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[340px] bg-bg-secondary border-l border-border z-[99] p-6 shadow-[0_0_40px_rgba(0,0,0,0.4)] flex flex-col backdrop-blur-2xl"
                        >
                            {/* Header */}
                            <div className="mb-6 pt-2">
                                 <h2 className="text-xl font-serif mb-2 bg-gradient-to-r from-accent via-accent/80 to-accent text-transparent bg-clip-text font-bold">Personal Assistant</h2>
                                 <p className="text-text-muted text-sm italic opacity-100 leading-relaxed font-serif">
                                    “I can personalize your experience.”
                                 </p>
                            </div>

                            {/* Controls */}
                            <div className="space-y-6 flex-grow overflow-y-auto no-scrollbar pb-4">
                                {/* Region Selection */}
                                <section>
                                    <label className="text-[10px] uppercase tracking-widest text-accent font-black mb-3 block flex items-center gap-1.5 opacity-100">
                                        <MapPin size={12} /> Region
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                         {Object.entries(REGIONS).map(([key, value]) => (
                                             <button
                                                key={key}
                                                onClick={() => setRegion(key)}
                                                className={`px-3 py-1.5 text-xs border rounded-full transition-all duration-300 flex items-center gap-2 group ${region === key ? 'border-accent bg-accent font-extrabold' : 'border-border/60 hover:border-accent/40 bg-bg-primary text-text-muted hover:text-text-primary'}`}
                                                style={region === key ? { color: 'var(--accent-foreground)' } : undefined}
                                             >
                                                 <span>{value.name}</span>
                                                 <div 
                                                    className={`w-2 h-2 rounded-full ${region === key ? 'bg-black/40' : ''}`} 
                                                    style={{ backgroundColor: region === key ? undefined : value.color }}
                                                 ></div>
                                             </button>
                                         ))}
                                    </div>
                                </section>

                                {/* Theme Mode Toggle */}
                                <section>
                                    <label className="text-[10px] uppercase tracking-widest text-accent font-black mb-3 block flex items-center gap-1.5 opacity-100">
                                        {themeMode === 'light' ? <Sun size={12} /> : <Moon size={12} />} Theme
                                    </label>
                                    <div className="inline-flex bg-bg-primary p-1 rounded-full border border-border relative">
                                        <div 
                                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-full transition-transform duration-300 ease-out z-0"
                                            style={{ 
                                                transform: themeMode === 'light' ? 'translateX(0)' : 'translateX(100%)',
                                                backgroundColor: 'var(--accent)'
                                            }}
                                        />
                                        <button
                                            onClick={() => setThemeMode('light')}
                                            className={`relative z-10 w-10 h-8 flex items-center justify-center transition-colors duration-300 ${themeMode === 'light' ? 'font-bold' : 'text-text-muted hover:text-text-primary'}`}
                                            style={themeMode === 'light' ? { color: 'var(--accent-foreground)' } : undefined}
                                            title="Light Mode"
                                        >
                                            <Sun size={16} />
                                        </button>
                                        <button
                                            onClick={() => setThemeMode('dark')}
                                            className={`relative z-10 w-10 h-8 flex items-center justify-center transition-colors duration-300 ${themeMode === 'dark' ? 'font-bold' : 'text-text-muted hover:text-text-primary'}`}
                                            style={themeMode === 'dark' ? { color: 'var(--accent-foreground)' } : undefined}
                                            title="Dark Mode"
                                        >
                                            <Moon size={16} />
                                        </button>
                                    </div>
                                </section>

                                {/* Age Group Selection */}
                                <section>
                                    <label className="text-[10px] uppercase tracking-widest text-accent font-black mb-3 block flex items-center gap-1.5 opacity-100">
                                        <Users size={12} /> Select Age Range
                                    </label>
                                    <div className="flex gap-2">
                                         <button
                                            onClick={() => setAgeGroup('young')}
                                            className={`px-4 py-2 text-xs rounded-full border transition-all duration-300 font-black ${ageGroup === 'young' ? 'border-accent bg-accent' : 'border-border/60 text-text-muted hover:border-accent/40 bg-bg-primary'}`}
                                            style={ageGroup === 'young' ? { color: 'var(--accent-foreground)' } : undefined}
                                         >
                                            &lt; 59
                                         </button>
                                         <button
                                            onClick={() => setAgeGroup('senior')}
                                            className={`px-4 py-2 text-xs rounded-full border transition-all duration-300 font-black ${ageGroup === 'senior' ? 'border-accent bg-accent shadow-lg scale-105' : 'border-border/60 text-text-muted hover:border-accent/40 bg-bg-primary'}`}
                                            style={ageGroup === 'senior' ? { color: 'var(--accent-foreground)' } : undefined}
                                         >
                                            60 &gt;
                                         </button>
                                    </div>
                                    <p className="mt-3 text-[10px] text-text-muted italic opacity-100 leading-tight">
                                        Range '60 &gt;' optimizes fonts and contrast for better readability.
                                    </p>
                                </section>
                            </div>

                            {/* Footer - Reset */}
                            <div className="pt-4 border-t border-border mt-auto">
                                <button
                                    onClick={resetPreferences}
                                    className="w-full py-3 flex items-center justify-center gap-2 text-[10px] text-text-muted hover:text-accent transition-all duration-300 group rounded-lg hover:bg-accent/5"
                                >
                                    <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> 
                                    <span className="tracking-widest uppercase font-black">Reset Settings</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatAgent;
