import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import artworks from '../data/artworks';
import { useTheme } from '../hooks/useTheme';

const Home = () => {
  const { region } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background parallax and scale
  const bgScale = useTransform(scrollYProgress, [0, 0.45, 0.85], [1.06, 1.16, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0.82, 1], [1, 0.55]);

  // Caption 1: Reveal
  const caption1Opacity = useTransform(scrollYProgress, [0.02, 0.1, 0.22, 0.3], [0, 1, 1, 0]);
  const caption1Y = useTransform(scrollYProgress, [0.02, 0.1, 0.22, 0.3], [110, 24, 0, -24]);

  // Caption 2: Soul
  const caption2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const caption2Y = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [110, 24, 0, -24]);

  // Caption 3: Collector
  const caption3Opacity = useTransform(scrollYProgress, [0.6, 0.72, 0.86, 0.96], [0, 1, 1, 0]);
  const caption3Y = useTransform(scrollYProgress, [0.6, 0.72, 0.86, 0.96], [110, 24, 0, -18]);

  const featuredArtworks = artworks.slice(0, 3);

  const springConfig = { stiffness: 72, damping: 24, restDelta: 0.001 };
  const smoothBGScale = useSpring(bgScale, springConfig);
  const smoothBGOpacity = useSpring(bgOpacity, springConfig);
  const smoothCaption1Opacity = useSpring(caption1Opacity, springConfig);
  const smoothCaption1Y = useSpring(caption1Y, springConfig);
  const smoothCaption2Opacity = useSpring(caption2Opacity, springConfig);
  const smoothCaption2Y = useSpring(caption2Y, springConfig);
  const smoothCaption3Opacity = useSpring(caption3Opacity, springConfig);
  const smoothCaption3Y = useSpring(caption3Y, springConfig);
  const assetBase = import.meta.env.BASE_URL;
  const heroBackgroundImage = region === 'India'
    ? `${assetBase}images/nioDart-india-Painting.jpg`
    : region === 'MiddleEast'
      ? `${assetBase}images/nioDart-middleEast-Painting.png`
      : `${assetBase}images/nioDart-US-Painting.png`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Scroll-Triggered Hero Container */}
      <section ref={containerRef} className="h-[400vh] relative">
        {/* Sticky Background Image */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div 
            style={{ scale: smoothBGScale, opacity: smoothBGOpacity, willChange: 'transform, opacity' }}
            className="absolute inset-0 z-0 bg-black"
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            
            {/* Readability Scrims */}
            <div className="absolute inset-0 z-15 bg-gradient-to-b from-black/60 via-transparent to-black/60 opacity-70" />
            
            <img 
              src={heroBackgroundImage}
              alt="Main Artistic Background"
              className="w-full h-full object-cover grayscale-[30%] brightness-[1.0]"
            />
          </motion.div>

          {/* Captions Overlay */}
          <div className="relative h-full flex items-center justify-center text-center z-20 px-6">
            
            {/* Caption 1 */}
            <motion.div 
              style={{ opacity: smoothCaption1Opacity, y: smoothCaption1Y, willChange: 'transform, opacity' }}
              className="absolute inset-x-0 flex flex-col items-center justify-center px-6 space-y-6"
            >
              <span className="text-accent tracking-[0.4em] text-xs font-black block text-shadow-sm">Nio d&apos; Art</span>
              <h1 className="text-6xl md:text-9xl leading-tight text-white text-shadow-lg">
                Art That <br />
                <span className="italic font-serif text-accent">Breathes</span>.
              </h1>
            </motion.div>

            {/* Caption 2 */}
            <motion.div 
              style={{ opacity: smoothCaption2Opacity, y: smoothCaption2Y, willChange: 'transform, opacity' }}
              className="absolute inset-x-0 flex flex-col items-center justify-center px-6 space-y-6"
            >
              <h2 className="text-4xl md:text-7xl leading-tight max-w-4xl mx-auto text-white text-shadow-md">
                Where <span className="italic font-serif text-accent">Classical Soul</span> <br />
                Meets Modern Vision.
              </h2>
            </motion.div>

            {/* Caption 3 */}
            <motion.div 
              style={{ opacity: smoothCaption3Opacity, y: smoothCaption3Y, willChange: 'transform, opacity' }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div className="space-y-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl leading-tight italic font-serif text-accent">
                  Curated for the
                </h2>
                <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] uppercase tracking-[0.14em] font-sans text-white text-shadow-lg">
                  Discerning Collector.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <Link to="/gallery" className="btn-primary flex items-center space-x-4 px-10 group">
                    <span>Explore Gallery</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                  <Link to="/about" className="px-8 py-3 bg-bg-secondary/80 border border-white/10 text-sm uppercase tracking-widest hover:text-accent hover:border-accent/40 transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm">
                    <span>Our Story</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ opacity: smoothCaption1Opacity, willChange: 'opacity' }}
              className="absolute bottom-12 flex flex-col items-center space-y-4"
            >
              <span className="text-[10px] text-white/80 uppercase tracking-[0.4em] mb-2 text-shadow-sm">Scroll To Experience</span>
              <div className="w-px h-16 bg-white/20 relative overflow-hidden">
                <motion.div 
                  animate={{ y: [0, 64, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-accent"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection - After Scroll Hero */}
      <section className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4 text-left">
            <span className="text-accent uppercase tracking-[0.2em] text-xs">Aesthetical Curation</span>
            <h2 className="text-4xl md:text-6xl italic font-serif">A Contemporary Signature</h2>
          </div>
          <Link to="/gallery" className="text-xs uppercase tracking-widest hover:text-accent flex items-center space-x-2 border-b border-white/10 pb-1">
            <span>Explore All Masterpieces</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {featuredArtworks.map((artwork, idx) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className="group space-y-8"
            >
              <div className="relative aspect-[4/5] overflow-hidden canvas-frame border-0">
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-2xl font-serif tracking-wide">{artwork.title}</h3>
                    <p className="text-[10px] text-text-muted tracking-widest uppercase mt-2">{artwork.medium} | {artwork.size}</p>
                  </div>
                  <span className="text-accent font-semibold text-lg">${artwork.price.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-bg-secondary py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 grayscale hidden lg:block">
          <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200" className="object-cover w-full h-full" alt="" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-16">
            <h2 className="text-5xl md:text-7xl leading-tight">
              Art is the <br />
              <span className="italic font-serif text-accent">Eternal Echo</span> of the Human Soul.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-sm text-text-muted leading-relaxed uppercase tracking-widest font-light">
              <p>
                At AURUM.ART, we serve as guardians of the intangible. We believe that art transcends physical boundaries, offering a visceral bridge between the artist's silence and the collector's resonance.
              </p>
              <p>
                Every stroke curated here is born from a legacy of mastery and a revolution of thought. We provide not just canvases, but cultural artifacts that transform shared spaces into private shrines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
