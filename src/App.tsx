import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Use the user-provided logo URL
const LOGO_URL = "https://cdn.shopify.com/s/files/1/0559/1213/6861/files/FafAsset_3ldpi.png?v=1777814453";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-coffee-dark/10 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'}`}
      id="navbar"
    >
      <div className="w-full px-6 md:px-[90px] flex justify-between items-center text-white">
        <a href="#" className="flex items-center transition-transform hover:scale-105 active:scale-95" id="logo">
          <img 
            src={LOGO_URL} 
            alt="LA SOUQ" 
            className="h-6 md:h-8 w-auto object-contain transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        </a>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          id="menu-toggle"
          className="text-gold hover:text-white transition-all duration-300 transform hover:rotate-90"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="absolute top-full left-0 w-full bg-coffee-dark/98 border-t border-white/5 shadow-2xl overflow-hidden text-white z-40"
            id="mobile-menu"
          >
            <div className="px-6 py-12 flex flex-col items-center space-y-8 uppercase text-lg tracking-[0.3em] font-medium">
              {['About', 'Menu', 'Gallery', 'Wholesale', 'Contact'].map((item, idx) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-gold transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
              
              <div className="flex space-x-6 pt-4 text-white/50">
                <Instagram className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 2.0, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-x-0 h-[120%] -top-[10%]" 
          style={{ y, opacity }}
        >
          <img 
            src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg" 
            alt="Luxury Roastery Interior"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center text-white px-6"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <img 
            src={LOGO_URL} 
            alt="LA SOUQ" 
            className="h-20 md:h-32 lg:h-48 mx-auto object-contain filter drop-shadow-[0_0_20px_rgba(226,213,145,0.3)] transition-all duration-700 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.p 
          variants={itemVariants} 
          className="uppercase tracking-[0.6em] text-xs md:text-sm lg:text-base mb-16 font-medium text-gold/80"
        >
          ARTISAN ROASTERY COFFEE & SHOP
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
          <a 
            href="#menu" 
            className="group relative overflow-hidden border border-gold text-gold px-16 py-4 uppercase text-xs tracking-[0.3em] font-bold transition-all duration-500"
            id="order-button"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">ORDER HERE</span>
            <span className="absolute inset-0 bg-gold transform translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
          </a>
          <a 
            href="#menu" 
            className="uppercase text-[9px] tracking-[0.4em] font-bold text-white/50 hover:text-gold transition-all duration-300 underline-offset-8 hover:underline"
            id="takeout-link"
          >
            VIEW TAKE-OUT MENU
          </a>
        </motion.div>
      </motion.div>

      {/* Hero Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <span className="uppercase text-[8px] tracking-[0.5em] font-bold text-white/40">SCROLL</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold/50 to-transparent">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/3 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  const images = [
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777816829809-xb1fh9-8.jpg",
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777817076882-efg8jp-3.jpg",
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777817656741-xzhp9p-la-souq-c946076fc6979dc0d3006c3258335f0f.jpg",
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777818106383-49xstx-330660.jpg",
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777884497265-4bunsd-generated-image-may-04-2026-11-41am-copy.jpg"
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yImg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={sectionRef} className="bg-white pt-32 pb-0 px-6 md:pl-[97px] md:pr-[90px] overflow-hidden" id="about">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
            id="about-image-main"
            className="relative"
          >
            <motion.div 
              style={{ y: yImg }} 
              className="aspect-square overflow-hidden rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] relative z-10 ring-1 ring-black/5"
            >
              <img 
                src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777883362118-yx1u2n-generated-image-may-04-2026-11-25am-1.jpg" 
                alt="Crafting Perfect Coffee"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold rounded-full -z-0 opacity-10 blur-3xl"></div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
            className="space-y-10"
            id="about-text"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="w-12 h-px bg-gold"></div>
              <span className="uppercase text-[10px] tracking-[0.4em] font-bold text-gold">Est. 2026</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl text-coffee-dark uppercase leading-[0.9] font-bold tracking-tighter">
              ROASTERY <br />
              <span className="text-5xl md:text-7xl text-gold font-bold uppercase tracking-tighter">COFFEE AND</span><br />
              SHOP
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed text-lg lg:text-xl max-w-xl font-light">
              From source to cup, we celebrate the ritual of coffee. Our beans are harvested with integrity and slow-roasted in micro-batches to unlock their most complex stories. 
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-6 group">
              <button className="relative overflow-hidden bg-coffee-dark text-white px-10 py-5 uppercase text-xs tracking-[0.3em] font-bold transition-all duration-300 rounded shadow-xl hover:shadow-gold/20 hover:scale-[1.02]">
                <span className="relative z-10">EXPLORE OUR STORY</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mb-40 overflow-hidden" id="gallery-carousel">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-heading mb-2">CURATED MOMENTS</h3>
            <div className="w-24 h-1 bg-gold"></div>
          </motion.div>
          <span className="hidden md:block uppercase text-[10px] tracking-[0.4em] text-gray-400 font-bold">Swipe to Explore</span>
        </div>

        <motion.div 
          className="flex gap-10 px-10"
          animate={{ 
            x: [0, -2048] 
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: "fit-content" }}
          whileHover={{ animationPlayState: "paused" }} // Pause on hover logic check
        >
          {[...images, ...images, ...images].map((src, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -15 }}
              className="flex-shrink-0 w-80 md:w-[540px] aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl relative group cursor-pointer transition-all duration-500"
              id={`gallery-image-${idx}`}
            >
              <img 
                src={src} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt="Gallery Visual" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex items-end">
                <span className="text-white uppercase text-[10px] tracking-[0.5em] font-bold">Discover More</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LocationsSection = () => {
  const locations = [
    {
      id: 'richardson-main',
      name: 'Richardson Main',
      address: '150 W Main St, Suite 900, Richardson, TX 75080',
      phone: '(214) 579-9550',
      hours: 'Mon-Sun: 6:30am–7:00pm',
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg"
    },
    {
      id: 'cityline-plaza',
      name: 'CityLine Plaza',
      address: '1250 State St, Richardson, TX 75082',
      phone: '(469) 709-8033',
      hours: 'Mon-Sun: 6:30am–7:00pm',
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777817076882-efg8jp-3.jpg"
    }
  ];

  return (
    <section className="pt-0 pb-32 px-6 md:pl-[92px] md:pr-[90px] bg-white" id="locations">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-heading text-coffee-dark mb-4 tracking-tight">
            Our Locations
          </h2>
          <div className="w-24 h-1 bg-gold"></div>
        </motion.div>
        
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-coffee-dark mb-2">Richardson, TX</h3>
          <p className="text-gray-400 text-xs uppercase tracking-[0.3em] font-medium">{locations.length} locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {locations.map((loc) => (
            <motion.div 
              key={loc.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8 group"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl relative cursor-pointer">
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold border-b border-coffee-dark pb-1 inline-block cursor-pointer transition-all duration-300 hover:text-gold hover:border-gold">
                  {loc.name}
                </h4>
                <div className="text-gray-500 text-sm md:text-base leading-relaxed font-light">
                  <p>{loc.address}</p>
                  <p>{loc.phone}</p>
                </div>
                <p className="text-coffee-dark font-bold text-sm md:text-base mt-6">{loc.hours}</p>
                <div className="pt-6">
                  <a href="#" className="group/link inline-flex items-center space-x-3 text-[12px] tracking-[0.4em] font-bold text-coffee-dark hover:text-gold transition-colors">
                    <span>ORDER AHEAD</span>
                    <motion.span 
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 py-20 bg-gray-50 rounded-3xl relative overflow-hidden mt-32">
          <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-gold opacity-20 -m-4"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-gold opacity-20 -m-4"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center relative z-10"
            id="secondary-text"
          >
            <p className="text-gray-600 leading-[2] text-lg lg:text-xl font-light italic font-serif">
              "It won’t be long now until you can enjoy a delicious fresh-brewed coffee with your friends at La Souq. We’ve poured our hearts into every detail of this venue, working with local craftspeople to create a space that doesn't just serve coffee, but serves the community. Join us soon for an unforgettable encounter."
            </p>
            <div className="mt-8 flex justify-center space-x-1">
              {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold"></div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative py-40 px-6 md:px-[90px] overflow-hidden min-h-[800px] flex items-center bg-coffee-dark" id="contact">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-x-0 h-[120%] -top-[10%]" 
          style={{ y: yBg }}
        >
          <img 
            src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg" 
            alt="Contact Background"
            className="w-full h-full object-cover opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark via-coffee-dark/80 to-transparent"></div>
        </motion.div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10 text-white items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          className="space-y-10"
          id="contact-info"
        >
          <motion.div variants={itemVariants} className="flex items-center space-x-4">
            <div className="w-12 h-px bg-gold"></div>
            <span className="uppercase text-[10px] tracking-[0.4em] font-bold text-gold">Get In Touch</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-heading leading-tight tracking-tighter uppercase font-bold">
            ARTISAN<br />
            CONNECTION
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-white/60 text-lg lg:text-xl max-w-md font-light leading-relaxed">
            From wholesale inquiries to private tastings, we invite you to reach out and become part of the La Souq community.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8">
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50">Visit Us</h4>
              <p className="text-base font-medium tracking-wide leading-relaxed">
                150 W Main St, Suite 900<br />Richardson, TX 75080
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50">Say Hello</h4>
              <p className="text-base font-medium tracking-wide leading-relaxed">
                hello@lasouq.com<br />(214) 579-9550
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-2xl p-10 md:p-16 rounded-[40px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          id="contact-form-container"
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold uppercase tracking-tight">Send a message</h3>
              <div className="w-16 h-1 bg-gold"></div>
            </div>

            <form className="space-y-8" id="contact-form">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="bg-transparent w-full border-b border-white/20 py-4 text-sm font-light outline-none focus:border-gold transition-colors placeholder:text-white/20" 
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent w-full border-b border-white/20 py-4 text-sm font-light outline-none focus:border-gold transition-colors placeholder:text-white/20" 
                />
              </div>
              <div className="relative group">
                <textarea 
                  placeholder="Your Message" 
                  className="bg-transparent w-full border-b border-white/20 py-4 text-sm font-light h-32 outline-none focus:border-gold transition-colors resize-none placeholder:text-white/20"
                ></textarea>
              </div>
              
              <button className="group relative w-full overflow-hidden border border-gold py-5 uppercase text-xs font-bold tracking-[0.4em] transition-all duration-500">
                <span className="relative z-10 text-gold group-hover:text-black transition-colors duration-500">Submit Inquiry</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gold py-16 px-6 md:px-[90px]" id="footer">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-16">
          <div className="space-y-6" id="footer-brand">
            <img 
              src={LOGO_URL} 
              alt="LA SOUQ" 
              className="h-12 w-auto object-contain brightness-0 opacity-80" 
              referrerPolicy="no-referrer"
            />
            <p className="text-coffee-dark/70 text-xs leading-relaxed max-w-md">
              Won’t be long now until you can enjoy a delicious fresh-brewed coffee with your friends at La Souq in Richardson, TX. Roasted memories serving the community since 2026.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12" id="footer-links">
            <div className="space-y-4">
              <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-coffee-dark/50">OUR WEBSITE</h4>
              <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                <li><a href="#" className="hover:text-gold transition-colors">HOME</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">ABOUT</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">CONTACT US</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">MESSAGE</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-coffee-dark/50">OUR SOCIALS</h4>
              <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                <li><a href="#" className="flex items-center hover:text-gold transition-colors"><Facebook className="w-3 h-3 mr-2" /> FACEBOOK</a></li>
                <li><a href="#" className="flex items-center hover:text-gold transition-colors"><Instagram className="w-3 h-3 mr-2" /> INSTAGRAM</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee-dark/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-widest text-coffee-dark/50 uppercase space-y-4 md:space-y-0">
          <p>© 2026 LA SOUQ. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-coffee-dark transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-coffee-dark transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    console.log("La Souq Roastery App Initialized");
  }, []);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white" id="main-app-container">
      <Navbar />
      <Hero />
      <AboutSection />
      <LocationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
