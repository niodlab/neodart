import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    { icon: <MapPin size={20} />, label: 'Studio', value: '75018 Montmartre, Paris, FR' },
    { icon: <Mail size={20} />, label: 'Email', value: 'studio@aurum.art' },
    { icon: <Phone size={20} />, label: 'WhatsApp', value: '+33 1 23 45 67 89' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left Side: Info */}
        <div className="space-y-16">
          <div className="space-y-6">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold block">Inquiry</span>
            <h1 className="text-6xl md:text-8xl leading-tight">Start a <br /><span className="italic font-serif text-accent">Dialogue</span>.</h1>
            <p className="text-text-muted text-lg max-w-md leading-relaxed">
              Whether you're looking to acquire a piece, request a bespoke commission, or simply wish to discuss artistic visions—we're here to listen.
            </p>
          </div>

          <div className="space-y-10">
            {contactInfo.map((info, idx) => (
              <motion.div 
                key={info.label} 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-center space-x-6 group"
              >
                <div className="p-4 bg-white/5 border border-white/5 text-accent rounded-full group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-1">{info.label}</h4>
                  <p className="text-lg font-serif">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-12 border-t border-white/5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-6 italic">Artist Note</h4>
            <p className="text-sm text-text-muted italic leading-relaxed max-w-xs">
              "Every letter received is a new perspective shared. I personally review all commission requests to ensure my vision aligns with your story."
            </p>
            <p className="text-sm mt-4 font-serif">— Aurum</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-accent/10 -z-10 group-hover:rotate-45 transition-transform duration-[2s]" />
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-bg-secondary p-10 md:p-14 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-[500px] flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="p-6 bg-accent/20 rounded-full text-accent mb-4 animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl font-serif">Message Received</h3>
                  <p className="text-text-muted max-w-xs mx-auto text-sm uppercase tracking-widest leading-loose">
                    Your inquiry has been cataloged. We shall respond within two sunsets.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-accent underline underline-offset-8 uppercase text-[10px] font-bold tracking-[0.3em] pt-10"
                  >
                    Send Another Letter
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-muted ml-1">Your Alias</label>
                      <input 
                        required
                        type="text" 
                        placeholder="NAME" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-bg-primary border border-white/10 p-4 text-xs tracking-widest focus:outline-none focus:border-accent transition-colors uppercase outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-muted ml-1">Digital Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="EMAIL" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-bg-primary border border-white/10 p-4 text-xs tracking-widest focus:outline-none focus:border-accent transition-colors uppercase outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-muted ml-1">Nature of Inquiry</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-bg-primary border border-white/10 p-4 text-xs tracking-widest focus:outline-none focus:border-accent transition-colors uppercase outline-none appearance-none cursor-pointer"
                    >
                      <option>General Inquiry</option>
                      <option>Bespoke Commission</option>
                      <option>Wholesale/Gallery Partnership</option>
                      <option>Press & Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-muted ml-1">Your Vision / Request</label>
                    <textarea 
                      required
                      placeholder="TELL US MORE ABOUT YOUR INTEREST..." 
                      rows="6"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-bg-primary border border-white/10 p-4 text-xs tracking-widest focus:outline-none focus:border-accent transition-colors uppercase outline-none resize-none"
                    />
                  </div>

                  <button 
                    disabled={formState === 'sending'}
                    className="w-full btn-primary flex items-center justify-center space-x-3 group relative overflow-hidden"
                  >
                    <span className="relative z-10">{formState === 'sending' ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                    {formState !== 'sending' && <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform relative z-10" />}
                    {formState === 'sending' && <motion.div 
                      className="absolute inset-0 bg-accent-hover"
                      initial={{ left: '-100%' }}
                      animate={{ left: '0%' }}
                      transition={{ duration: 2, ease: "linear" }}
                    />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
