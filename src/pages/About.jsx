import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Palette, Sparkles, Award } from 'lucide-react';

const About = () => {
  const timeline = [
    { year: '2015', event: 'The First Brushstroke', desc: 'Started exploring oil painting in a small attic studio in Paris.' },
    { year: '2018', event: 'Solitude Series', desc: 'First major collection exploring themes of isolation and inner peace.' },
    { year: '2021', event: 'Grand Prix Selection', desc: 'Recognized by the Contemporary Art Guild for innovative use of light.' },
    { year: '2024', event: 'The Digital Gallery', desc: 'Launching AURUM.ART to connect global collectors with visionary work.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold block">The Creator</span>
            <h1 className="text-6xl md:text-8xl leading-tight">Beyond the <br /><span className="italic font-serif text-accent">Canvas</span>.</h1>
          </div>
          
          <div className="space-y-6 text-text-muted leading-relaxed max-w-lg">
            <p>
              Born from a desire to capture the intangible, AURUM.ART is the culmination of a decade-long journey through the realms of classical technique and modern abstraction.
            </p>
            <p>
              Every piece in this gallery is a fragment of a larger narrative—a search for truth in the interplay of shadow and light. We don't just sell paintings; we offer portals to quiet moments of introspection and wonder.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div className="flex items-start space-x-4">
               <div className="p-3 bg-accent/10 rounded-full text-accent"><Palette size={20} /></div>
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Technique</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Impasto & Glazing mastery developed over 10 years of practice.</p>
               </div>
            </div>
            <div className="flex items-start space-x-4">
               <div className="p-3 bg-accent/10 rounded-full text-accent"><Sparkles size={20} /></div>
               <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-2">Vision</h4>
                  <p className="text-xs text-text-muted leading-relaxed">Art as a bridge between the physical and the spiritual world.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="relative">
           {/* Decorative elements */}
           <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-accent/10 -z-10" />
           <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-accent/5 blur-3xl -z-10" />
           
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="canvas-frame aspect-[4/5] overflow-hidden"
           >
              <img 
                src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110" 
                alt="Artist Portrait" 
              />
           </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-20 border-t border-white/5">
        <div className="text-center mb-20 space-y-4">
          <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold">Provenance</span>
          <h2 className="text-4xl md:text-5xl italic font-serif">Journey Through Time</h2>
        </div>

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />
          
          <div className="space-y-24">
            {timeline.map((item, idx) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Year Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-12 md:top-auto w-12 h-12 bg-bg-primary border-2 border-accent rounded-full flex items-center justify-center z-10 shadow-lg shadow-accent/20">
                  <span className="text-[10px] font-bold text-accent">{item.year}</span>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[42%] text-center md:text-left ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                  <h3 className="text-xl uppercase tracking-widest mb-4 group-hover:text-accent transition-colors font-serif">{item.event}</h3>
                  <p className="text-sm text-text-muted leading-relaxed italic">
                    "{item.desc}"
                  </p>
                </div>
                
                {/* Visual Spacer */}
                <div className="hidden md:block w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-40 text-center space-y-10 py-20 bg-bg-secondary border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <Award className="mx-auto text-accent w-12 h-12 mb-4 animate-pulse" />
        <h2 className="text-4xl md:text-6xl max-w-4xl mx-auto leading-tight px-6 z-10 relative">
          Own a Piece of <span className="italic font-serif text-accent">Contemporary</span> History.
        </h2>
        <div className="pt-8 z-10 relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Explore the Collection
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
