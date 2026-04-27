import React from 'react';
import { Mail, Camera, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 border-t border-white/5 bg-bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif tracking-widest mb-6 block hover:text-accent transition-colors">
              Nio d&apos; Art
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Empowering artists and collectors through a curated digital gallery experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors"><Camera size={18} /></a>
              <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors"><Globe size={18} /></a>
              <a href="#" className="p-2 hover:bg-white/5 rounded-full transition-colors"><Share2 size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-8 font-semibold text-text-primary">Navigate</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/" className="hover:text-accent transition-colors underline-animated">Home</Link></li>
              <li><Link to="/gallery" className="hover:text-accent transition-colors underline-animated">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors underline-animated">About Artist</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors underline-animated">Contact</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-8 font-semibold text-text-primary">Collect</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><a href="#" className="hover:text-accent transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Authentication</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-8 font-semibold text-text-primary">Newsletter</h4>
            <p className="text-sm text-text-muted mb-6">Join our mailing list for early access to new collections.</p>
            <div className="flex border-b border-white/20 pb-2 focus-within:border-accent transition-colors">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent text-xs w-full focus:outline-none uppercase tracking-widest placeholder:text-text-muted/40"
              />
              <button className="p-1 hover:text-accent transition-colors"><Mail size={16} /></button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[10px] text-text-muted uppercase tracking-[0.2em]">
          <p>© 2024 Nio d&apos; Art - ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
