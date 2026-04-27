import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const { toggleWishlistPanel, getTotalWishlistItems } = useWishlistStore();
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{
        paddingTop: isScrolled ? '1rem' : '1.5rem',
        paddingBottom: isScrolled ? '1rem' : '1.5rem',
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'rgba(0, 0, 0, 0)',
        borderColor: isScrolled ? 'var(--glass-border)' : 'rgba(255, 255, 255, 0)',
        boxShadow: isScrolled ? '0 12px 40px rgba(0,0,0,0.18)' : '0 0 0 rgba(0,0,0,0)',
        backdropFilter: isScrolled ? 'blur(18px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(18px)' : 'blur(0px)',
        y: isScrolled ? 0 : 6
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[60] border-b"
      style={{ willChange: 'transform, padding, background-color, backdrop-filter' }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{
          opacity: isScrolled ? 0.28 : 1
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(to bottom, color-mix(in srgb, var(--bg-primary) 92%, transparent) 0%, color-mix(in srgb, var(--bg-primary) 62%, transparent) 65%, transparent 100%)'
        }}
      />
      <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
        {/* Logo */}
        <Link 
          to="/" 
          className="relative z-10 text-2xl font-serif tracking-widest text-text-primary hover:text-accent transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]"
        >
          Nio d&apos; Art
        </Link>

        {/* Desktop Navigation */}
        <div className="relative z-10 hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm uppercase tracking-widest hover:text-accent transition-colors relative group [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] ${
                location.pathname === link.path ? 'text-accent' : 'text-text-primary'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                location.pathname === link.path ? 'w-full' : ''
              }`} />
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="relative z-10 flex items-center space-x-6 text-text-primary">
          <button className="text-current hover:text-accent transition-colors">
            <Search size={20} />
          </button>
          <button
            onClick={toggleWishlistPanel}
            className="text-current hover:text-accent transition-colors relative"
          >
            <Heart size={20} />
            {getTotalWishlistItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center" style={{ color: 'var(--accent-foreground)' }}>
                {getTotalWishlistItems()}
              </span>
            )}
          </button>
          <button 
            onClick={toggleCart}
            className="text-current hover:text-accent transition-colors relative"
          >
            <ShoppingBag size={20} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ color: 'var(--accent-foreground)' }}>
                {getTotalItems()}
              </span>
            )}
          </button>
          <button 
            className="md:hidden text-current hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass py-8 px-6 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-lg uppercase tracking-widest hover:text-accent transition-colors ${
                  location.pathname === link.path ? 'text-accent' : 'text-text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
