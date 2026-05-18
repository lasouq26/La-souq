import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Facebook, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Use the user-provided logo URL
const LOGO_URL = "https://cdn.shopify.com/s/files/1/0559/1213/6861/files/FafArtboard_1.png?v=1778162215";

const THEMES = [
  {
    id: 1,
    name: 'Theme 1: Arabic Earth',
    heroOverlay: '#b69b79',
    sectionBg: '#9da18a',
    menuBg: '#e8e3c9',
    highlightText: '#e8e3c9',
    buttonHoverBg: '#9da18a',
    buttonHoverText: '#e8e3c9',
    navBg: '#9da18a',
    footerBg: '#9da18a',
    coffeeDark: '#231f14',
    contactOverlay: '#231f14',
    menuButtonText: '#231f14',
    menuButtonBorder: 'rgba(35, 31, 20, 0.2)',
    accent: '#9da18a',
    cardTitle: '#231f14',
    testimonialBg: '#e8e3c9'
  },
  {
    id: 2,
    name: 'Theme 2: Mojave Sand',
    heroOverlay: '#b69b79',
    sectionBg: '#b69b79',
    menuBg: '#f4f4f4',
    highlightText: '#f4f4f4',
    buttonHoverBg: '#231f14',
    buttonHoverText: '#f4f4f4',
    navBg: '#b69b79',
    footerBg: '#b69b79',
    coffeeDark: '#231f14',
    contactOverlay: '#231a12',
    menuButtonText: '#231f14',
    menuButtonBorder: '#231f14',
    accent: '#b69b79',
    cardTitle: '#b69b79',
    testimonialBg: '#e8e3c9'
  }
];

const Hero = ({ theme }: { theme: typeof THEMES[0] }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 2.0, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-6" id="hero">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-x-0 h-[120%] -top-[10%]" 
          style={{ y, opacity }}
        >
          <img 
            src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778783208154-lskfe6-1-copy.jpg"
            alt="La Souq Richardson"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          {/* Brand color overlay replacing the old black overlay */}
          <div className="absolute inset-0 transition-colors duration-1000" style={{ backgroundColor: `${theme.heroOverlay}80` }}></div>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl text-center flex flex-col items-center pt-[90px]"
        style={{ color: theme.coffeeDark }}
      >
        {/* Centered Logo */}
        <motion.div 
          variants={itemVariants} 
          className="mb-8"
        >
          <img 
            src={LOGO_URL} 
            alt="LA SOUQ" 
            className="h-32 md:h-48 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.p 
          variants={itemVariants} 
          className="uppercase tracking-[0.6em] text-[16px] mb-12 font-bold"
          style={{ color: theme.coffeeDark }}
        >
          ARTISAN ROASTERY COFFEE & SHOP
        </motion.p>
        
            <motion.a 
              href="https://order.toasttab.com/online/la-souq-richardson-dallas" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-12 pt-5 pb-5 mb-12 overflow-hidden border uppercase text-[11px] font-bold tracking-[0.4em] transition-all duration-500"
              style={{ borderWidth: '1px', borderColor: '#231f14', color: '#231f14' }}
              id="order-button"
            >
              <span 
                className="relative z-10 transition-colors duration-500 flex items-center gap-4 text-[12px]" 
                style={{ color: '#231f14', borderColor: '#231f14' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme.buttonHoverText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#231f14';
                }}
              >
                ORDER AHEAD
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ backgroundColor: theme.buttonHoverBg }}></div>
            </motion.a>
      </motion.div>

      {/* Hero Bottom Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-24 lg:left-32 z-10"
      >
        <div className="flex items-start gap-4 border-l border-coffee-dark/20 pl-6 flex-col justify-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-12 border border-coffee-dark/20 rounded-t-full flex items-center justify-center p-1.5 opacity-60">
                <div className="w-full h-full border-t border-x border-coffee-dark/40 rounded-t-full"></div>
             </div>
             <div className="text-[10px] tracking-widest text-coffee-dark/50 leading-loose">
               <p className="font-bold text-coffee-dark/80 uppercase">Richardson, Texas</p>
               <p>1101 ABBOT KINNEY BLVD</p>
               <p>DALLAS, TX 90291</p>
             </div>
          </div>
          <button className="text-[9px] tracking-[0.3em] font-bold text-[#231f14] hover:text-coffee-dark transition-colors flex items-center gap-2">
            VIEW HOURS →
          </button>
        </div>
      </motion.div>


      {/* Hero Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4"
      >
        <span className="uppercase text-[8px] tracking-[0.5em] font-bold text-coffee-dark/40 rotate-90 translate-y-8">SCROLL</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-coffee-dark/30 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const InspirationSection = ({ theme }: { theme: typeof THEMES[0] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-24 border-y border-coffee-dark/5 overflow-hidden w-full transition-colors duration-1000" style={{ backgroundColor: theme.sectionBg }} id="inspiration">
      <div className="w-full px-6 md:px-24 lg:px-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col lg:flex-row items-stretch gap-0 lg:divide-x divide-coffee-dark/10"
        >
          
          {/* Inspired block */}
          <div 
            className="flex-1 flex flex-col md:flex-row items-center gap-10 lg:pr-16 mb-20 lg:mb-0"
          >
            <motion.div variants={itemVariants} className="w-[320px] h-[420px] flex-none bg-coffee-dark/5 overflow-hidden relative group rounded-xl">
              <video 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/sign/course-videos/grok-video-bce97b3f-5125-48d2-8fa9-a14870aa09d7.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWIwOTZlZC0wY2JkLTQ0MTYtYjBkZC1hOGJjZWVjNjlhMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3Vyc2UtdmlkZW9zL2dyb2stdmlkZW8tYmNlOTdiM2YtNTEyNS00OGQyLThmYTktYTE0ODcwYWEwOWQ3Lm1wNCIsImlhdCI6MTc3ODE1ODgyOSwiZXhwIjoxNzgwNzUwODI5fQ.FG9ebsfCvZ6w63eGEIm3NAhxkQL5hNwJqz8nUipIbZo" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-coffee-dark/5 mix-blend-overlay"></div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full md:w-1/2 space-y-6">
              <span className="text-[10px] tracking-[0.4em] font-bold uppercase transition-colors duration-1000" style={{ color: theme.highlightText }}>Inspired By</span>
              <h2 className="text-3xl md:text-4xl font-heading leading-[1.1] text-coffee-dark uppercase">
                Arabic Roots.<br />California Soul.
              </h2>
              <p className="text-coffee-dark/60 text-sm leading-relaxed font-light line-clamp-4">
                La Souq is where Arab heritage meets the laid-back rhythm of California. Our spaces are inspired by architecture, light, and tradition — created for connection.
              </p>
              <a href="#about" className="inline-flex items-center gap-3 text-[9px] tracking-[0.4em] font-extrabold text-coffee-dark hover:underline underline-offset-4 transition-all">
                OUR STORY <span className="text-xs">→</span>
              </a>
            </motion.div>
          </div>

          {/* Featured drink block */}
          <div 
            className="flex-1 flex flex-col items-center gap-10 lg:pl-16"
          >
            <div className="flex flex-col sm:flex-row items-center gap-10 w-full">
              <motion.div variants={itemVariants} className="w-[320px] h-[420px] flex-none bg-coffee-dark/5 overflow-hidden relative group rounded-xl">
                <video 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/sign/course-videos/grok-video-36d5cc8e-d515-4cbc-8a2c-7be31d2a65ab.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWIwOTZlZC0wY2JkLTQ0MTYtYjBkZC1hOGJjZWVjNjlhMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3Vyc2UtdmlkZW9zL2dyb2stdmlkZW8tMzZkNWNjOGUtZDUxNS00Y2JjLThhMmMtN2JlMzFkMmE2NWFiLm1wNCIsImlhdCI6MTc3ODE1OTA5NSwiZXhwIjoxNzgwNzUxMDk1fQ.H6ABdAePcx-43cHIHePpiJTzvVlC1ZoUVXpjQWWogoQ" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-coffee-dark/5 mix-blend-overlay"></div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex-1 space-y-6">
                <span className="text-[10px] tracking-[0.4em] font-bold uppercase transition-colors duration-1000" style={{ color: theme.highlightText }}>Featured Drink</span>
                <h2 className="text-3xl md:text-4xl font-heading leading-[1.1] text-coffee-dark uppercase">
                  Cardamom<br />Latte
                </h2>
                <p className="text-coffee-dark/60 text-sm leading-relaxed font-light line-clamp-3">
                  Smooth espresso, warm milk, and a touch of cardamom. A quiet comfort.
                </p>
                <a href="#menu" className="inline-flex items-center gap-3 text-[9px] tracking-[0.4em] font-extrabold text-coffee-dark hover:underline underline-offset-4 transition-all">
                  VIEW MENU <span className="text-xs">→</span>
                </a>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

const MenuSection = ({ theme }: { theme: typeof THEMES[0] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const signatureScrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const isSignatureHovered = useRef(false);

  const menuItems = [
    {
      id: 1,
      name: "DOUBLE ESPRESSO",
      description: "Rich, concentrated espresso from our house blend, bold and balanced.",
      price: "$4.00",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778060900663-6e4qri-chatgpt-image-may-6-2026-12-48-11-pm.jpg"
    },
    {
      id: 2,
      name: "AMERICANO",
      description: "Smooth espresso mellowed with hot water for a clean, classic finish.",
      price: "$4.00",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778060660817-ifxbqb-chatgpt-image-may-6-2026-12-43-23-pm.jpg"
    },
    {
      id: 3,
      name: "CORTADO (4oz)",
      description: "Equal parts espresso and lightly textured milk -- bold and smooth.",
      price: "$4.50",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778060434831-gomena-chatgpt-image-may-6-2026-12-39-04-pm.jpg"
    },
    {
      id: 4,
      name: "FLAT WHITE (8oz)",
      description: "Velvety micro-foam poured over espresso -- silky, rich, and refined.",
      price: "$5.00",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778060387049-p3o46u-chatgpt-image-may-6-2026-12-38-22-pm.jpg"
    }
  ];

  const signatureMenuItems = [
    {
      id: 5,
      name: "HABIBTI LATTE",
      description: "Soft rose & warm cardamom accented espresso -- floral and comforting.",
      price: "$6.50+",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069447382-h8ij1r-chatgpt-image-may-6-2026-03-04-04-pm.jpg"
    },
    {
      id: 6,
      name: "LAVENDER & HONEY LATTE",
      description: "Calming lavender and golden honey layered with rich espresso.",
      price: "$6.50+",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069372877-8f3go8-chatgpt-image-may-6-2026-03-01-38-pm.jpg"
    },
    {
      id: 7,
      name: "ZA'ATAR W' ZEIT LATTE",
      description: "A savory twist -- fresh thyme and a hint of olive oil meet espresso.",
      price: "$6.50+",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069477594-0ftxlm-chatgpt-image-may-6-2026-03-03-04-pm.jpg"
    },
    {
      id: 8,
      name: "ROUHI LATTE",
      description: "Silky white chocolate and cool mint folded into espresso -- fresh, smooth, and lightly sweet.",
      price: "$7.00+",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069293478-mpkync-chatgpt-image-may-6-2026-02-59-42-pm.jpg"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const signatureContainer = signatureScrollRef.current;
    
    let animationId: number;
    const scrollSpeed = 0.6;

    const scroll = () => {
      if (scrollContainer && !isHovered.current) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      if (signatureContainer && !isSignatureHovered.current) {
        signatureContainer.scrollLeft += scrollSpeed;
        if (signatureContainer.scrollLeft >= signatureContainer.scrollWidth / 2) {
          signatureContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 2.0, 
        ease: [0.19, 1, 0.22, 1] 
      } 
    }
  };

  return (
    <section className="py-32 relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: theme.menuBg }} id="menu">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-dark/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="w-full relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="px-6 md:px-24 lg:px-32 flex flex-col mb-5 pl-6"
        >
          <motion.p 
            variants={itemVariants}
            className="text-[12px] tracking-[0.5em] font-bold text-coffee-dark/30 uppercase mb-0"
          >
            THE COLLECTION
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-heading text-coffee-dark uppercase tracking-tight"
          >
            COFFEE
          </motion.h2>
        </motion.div>

        {/* Carousel container 1 */}
        <div className="relative group/carousel py-[10px]">
          {/* Left scroll fade indicator */}
          <div className="absolute top-0 left-0 h-full w-24 z-20 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${theme.menuBg}, ${theme.menuBg}CC, transparent)` }}></div>
          
          <motion.div 
            ref={scrollRef}
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-6 px-6 md:px-12"
          >
            {[...menuItems, ...menuItems].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
                }}
                className="flex-none w-[280px] sm:w-[340px] md:w-[520px] h-[210px] md:h-[380px] bg-[#fdfaf7] rounded-[2.5rem] overflow-hidden border border-gold/10 flex relative group shadow-[0_20px_50px_-20px_rgba(35,31,20,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(35,31,20,0.15)] transition-shadow duration-700"
              >
                {/* Decorative background depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                
                <div className="flex-1 p-6 md:p-12 flex flex-col justify-between relative z-10">
                  <div className="relative">
                    {/* Item Index */}
                    <span className="hidden md:inline-block text-[9px] tracking-[0.4em] font-bold text-gold/60 uppercase mb-4 md:mb-6">
                      COLLECTION NO. 0{menuItems.indexOf(item) + 1}
                    </span>
                    
                    <h3 className="text-lg md:text-2xl font-heading text-coffee-dark mb-3 md:mb-4 tracking-tight transition-colors duration-500 uppercase" style={{ color: theme.cardTitle }}>
                      {item.name}
                    </h3>
                    
                    <div className="w-12 h-[1px] bg-gold/30 mb-4 md:mb-6 group-hover:w-20 group-hover:bg-gold/60 transition-all duration-700 ease-out"></div>
                    
                    <p className="text-[12px] md:text-sm text-coffee-dark/50 leading-relaxed font-light italic max-w-[280px]">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 md:mt-8 flex items-center justify-between">
                    <span className="hidden md:inline-block text-[10px] tracking-[0.2em] font-bold text-coffee-dark/40 uppercase">
                      Premium Selection
                    </span>
                    <span className="text-[12px] md:text-[13px] tracking-widest font-bold bg-white/80 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-gold/10 shadow-sm transition-colors duration-1000" style={{ color: theme.id === 1 ? '#9da18a' : theme.buttonHoverBg }}>
                      {item.price}
                    </span>
                  </div>
                </div>
                
                <div className="w-[110px] md:w-[220px] h-full relative overflow-hidden flex-none">
                  <div className="absolute inset-0 bg-[#231f14]/5 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <button 
                      className="w-12 h-12 bg-white text-coffee-dark rounded-full flex items-center justify-center shadow-2xl border border-gold/20 hover:bg-coffee-dark hover:text-white transition-all duration-500 transform scale-0 group-hover:scale-100 translate-y-4 group-hover:translate-y-0"
                      aria-label="Add to order"
                    >
                      <Plus size={22} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Right scroll fade indicator */}
          <div className="absolute top-0 right-0 h-full w-24 z-20 pointer-events-none transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to left, ${theme.menuBg}, ${theme.menuBg}CC, transparent)` }}></div>
        </div>

        {/* Signature Coffee Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="px-6 md:px-24 lg:px-32 flex flex-col mb-5 pt-32"
        >
          <motion.p 
            variants={itemVariants}
            className="text-[12px] tracking-[0.5em] font-bold text-coffee-dark/30 uppercase mb-0"
          >
            HANDPICKED FAVORITES
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-heading text-coffee-dark uppercase tracking-tight"
          >
            SIGNATURE COFFEE
          </motion.h2>
        </motion.div>

        {/* Carousel container 2 (Signature) */}
        <div className="relative group/carousel-sig py-[10px]">
          {/* Left scroll fade indicator */}
          <div className="absolute top-0 left-0 h-full w-24 z-20 pointer-events-none opacity-0 group-hover/carousel-sig:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${theme.menuBg}, ${theme.menuBg}CC, transparent)` }}></div>
          
          <motion.div 
            ref={signatureScrollRef}
            onMouseEnter={() => (isSignatureHovered.current = true)}
            onMouseLeave={() => (isSignatureHovered.current = false)}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-6 px-6 md:px-12"
          >
            {[...signatureMenuItems, ...signatureMenuItems].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                variants={itemVariants}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
                }}
                className="flex-none w-[280px] sm:w-[340px] md:w-[520px] h-[210px] md:h-[380px] bg-[#fdfaf7] rounded-[2.5rem] overflow-hidden border border-gold/10 flex relative group shadow-[0_20px_50px_-20px_rgba(35,31,20,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(35,31,20,0.15)] transition-shadow duration-700"
              >
                {/* Decorative background depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                
                <div className="flex-1 pt-6 md:pt-8 pl-6 md:pl-12 pr-6 pb-6 md:pb-12 flex flex-col justify-between relative z-10">
                  <div className="relative">
                    {/* Item Index */}
                    <span className="hidden md:inline-block text-[9px] tracking-[0.4em] font-bold text-gold/60 uppercase mb-4 md:mb-6">
                      SIGNATURE NO. 0{signatureMenuItems.indexOf(item) + 1}
                    </span>
                    
                    <h3 className="text-lg md:text-2xl font-heading text-coffee-dark mb-3 md:mb-4 tracking-tight transition-colors duration-500 uppercase text-balance" style={{ color: theme.cardTitle }}>
                      {item.name}
                    </h3>
                    
                    <div className="w-12 h-[1px] bg-gold/30 mb-4 md:mb-6 group-hover:w-20 group-hover:bg-gold/60 transition-all duration-700 ease-out"></div>
                    
                    <p className="text-[12px] md:text-sm text-coffee-dark/50 leading-relaxed font-light italic max-w-[280px]">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 md:mt-8 flex items-center justify-between">
                    <span className="hidden md:inline-block text-[10px] tracking-[0.2em] font-bold text-coffee-dark/40 uppercase">
                      Limited Release
                    </span>
                    <span className="text-[12px] md:text-[13px] tracking-widest font-bold bg-white/80 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-gold/10 shadow-sm transition-colors duration-1000" style={{ color: theme.id === 1 ? '#9da18a' : theme.buttonHoverBg }}>
                      {item.price}
                    </span>
                  </div>
                </div>
                
                <div className="w-[110px] md:w-[220px] h-full relative overflow-hidden flex-none">
                  <div className="absolute inset-0 bg-[#231f14]/5 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <button 
                      className="w-12 h-12 bg-white text-coffee-dark rounded-full flex items-center justify-center shadow-2xl border border-gold/20 hover:bg-coffee-dark hover:text-white transition-all duration-500 transform scale-0 group-hover:scale-100 translate-y-4 group-hover:translate-y-0"
                      aria-label="Add to order"
                    >
                      <Plus size={22} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Right scroll fade indicator */}
          <div className="absolute top-0 right-0 h-full w-24 z-20 pointer-events-none transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to left, ${theme.menuBg}, ${theme.menuBg}CC, transparent)` }}></div>
        </div>

        {/* 'More' Button Section */}
        <div className="flex justify-center mt-20 transition-colors duration-1000" style={{ backgroundColor: theme.menuBg, borderColor: theme.menuBg }}>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 overflow-hidden border uppercase text-[11px] font-bold tracking-[0.4em] transition-all duration-500"
            style={{ borderColor: '#231f14' }}
          >
            <span 
              className="relative z-10 transition-colors duration-500" 
              style={{ color: '#231f14' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.buttonHoverText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#231f14';
              }}
            >
              View Full Menu
            </span>
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ backgroundColor: theme.buttonHoverBg }}></div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black aspect-video md:h-[85vh]" id="brand-video">
      {/* Overlay to prevent dragging/clicking on the YouTube player */}
      <div className="absolute inset-0 z-10 cursor-default"></div>
      
      <div className="w-full h-full relative pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[112%] h-[115%] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/W1fLD63M6Uw?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&showinfo=0&playlist=W1fLD63M6Uw&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&origin=http://localhost:3000"
          title="La Souq Experience"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{ border: 'none' }}
        ></iframe>
      </div>
      
      {/* Cinematic overlay for brand color integration */}
      <div className="absolute inset-0 bg-[#231f14]/15 mix-blend-multiply pointer-events-none"></div>
      
      {/* Decorative text vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-12 left-12 md:left-24 z-20 hidden md:block"
      >
        <span className="text-[10px] tracking-[0.6em] font-bold text-white/60 uppercase">The Craft In Motion</span>
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
    <section ref={sectionRef} className="pt-32 pb-0 px-6 md:pl-[97px] md:pr-[90px] overflow-hidden" id="about">
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
              className="aspect-square overflow-hidden rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] relative z-10 ring-1 ring-coffee-dark/5"
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
            
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-heading text-coffee-dark uppercase leading-[0.9] tracking-tighter">
              ROASTERY <br />
              <span className="text-5xl md:text-7xl text-gold font-heading uppercase tracking-tighter">COFFEE AND</span><br />
              SHOP
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed text-lg lg:text-xl max-w-xl font-light">
              From source to cup, we celebrate the ritual of coffee. Our beans are harvested with integrity and slow-roasted in micro-batches to unlock their most complex stories. 
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-6 group">
              <a 
                href="https://www.workshopstudio.com/la-souq" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block relative overflow-hidden bg-coffee-dark text-white px-10 py-5 uppercase text-xs tracking-[0.3em] font-bold transition-all duration-300 rounded shadow-xl hover:shadow-gold/20 hover:scale-[1.02]"
              >
                <span className="relative z-10">EXPLORE OUR STORY</span>
              </a>
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
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex items-end">
                <span className="text-white uppercase text-[10px] tracking-[0.5em] font-bold">Discover More</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LocationsSection = ({ theme }: { theme: typeof THEMES[0] }) => {
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
    <section className="pt-[90px] pb-32 px-6 md:pl-[92px] md:pr-[90px] transition-colors duration-1000" style={{ backgroundColor: theme.sectionBg }} id="locations">
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
          <div className="w-24 h-1 transition-colors duration-1000" style={{ backgroundColor: theme.id === 2 ? '#e8e3c9' : '#c5a367' }}></div>
        </motion.div>
        
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-coffee-dark mb-2">Richardson, TX</h3>
          <p className="text-xs uppercase tracking-[0.3em] font-medium transition-colors duration-1000" style={{ color: theme.id === 2 ? '#e8e3c9' : '#9ca3af' }}>{locations.length} locations</p>
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
                <h4 
                  className="text-2xl font-bold border-b pb-1 inline-block cursor-pointer transition-all duration-300"
                  style={{ 
                    borderColor: theme.coffeeDark,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.accent;
                    e.currentTarget.style.borderColor = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.borderColor = theme.coffeeDark;
                  }}
                >
                  {loc.name}
                </h4>
                <div className="text-sm md:text-base leading-relaxed font-light transition-colors duration-1000" style={{ color: theme.highlightText }}>
                  <p>{loc.address}</p>
                  <p>{loc.phone}</p>
                </div>
                <p className="font-bold text-sm md:text-base mt-6 transition-colors duration-1000" style={{ color: theme.id === 2 ? '#231f14' : theme.coffeeDark }}>{loc.hours}</p>
                <div className="pt-6">
                  <a 
                    href="#" 
                    className="group/link inline-flex items-center space-x-3 text-[12px] tracking-[0.4em] font-bold transition-colors"
                    style={{ color: theme.id === 2 ? '#231f14' : theme.coffeeDark }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.accent}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.id === 2 ? '#231f14' : theme.coffeeDark}
                  >
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

        <div className="max-w-5xl mx-auto px-6 py-20 rounded-3xl relative overflow-hidden mt-32 transition-colors duration-1000" style={{ backgroundColor: theme.testimonialBg }}>
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
            <p className="leading-[2] text-lg lg:text-xl font-light italic font-serif transition-colors duration-1000" style={{ color: theme.id === 2 ? '#2b2d24' : '#4b5563' }}>
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

const ContactSection = ({ theme }: { theme: typeof THEMES[0] }) => {
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
    <section className="relative py-40 px-6 md:px-[90px] overflow-hidden min-h-[800px] flex items-center transition-colors duration-1000" style={{ backgroundColor: theme.id === 1 ? '#231f14' : '#141414' }} id="contact">
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
          <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, ${theme.contactOverlay}, ${theme.contactOverlay}CC, transparent)` }}></div>
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
            <div className="w-12 h-px" style={{ backgroundColor: theme.accent }}></div>
            <span className="uppercase text-[10px] tracking-[0.4em] font-bold" style={{ color: theme.accent }}>Get In Touch</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-heading leading-tight tracking-tighter uppercase">
            ARTISAN<br />
            CONNECTION
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-white/60 text-lg lg:text-xl max-w-md font-light leading-relaxed">
            From wholesale inquiries to private tastings, we invite you to reach out and become part of the La Souq community.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8">
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50" style={{ color: theme.accent }}>Visit Us</h4>
              <p className="text-base font-medium tracking-wide leading-relaxed">
                150 W Main St, Suite 900<br />Richardson, TX 75080
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50" style={{ color: theme.accent }}>Say Hello</h4>
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
              <div className="w-16 h-1" style={{ backgroundColor: theme.accent }}></div>
            </div>

            <form className="space-y-8" id="contact-form">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="bg-transparent w-full border-b border-white/20 py-4 text-sm font-light outline-none transition-colors placeholder:text-white/20" 
                  onFocus={(e) => e.target.style.borderColor = theme.accent}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-transparent w-full border-b border-white/20 py-4 text-sm font-light outline-none transition-colors placeholder:text-white/20" 
                  onFocus={(e) => e.target.style.borderColor = theme.accent}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                />
              </div>
              <div className="relative group">
                <textarea 
                  placeholder="Your Message" 
                  className="bg-transparent w-full border-b border-white/20 py-4 text-sm font-light h-32 outline-none transition-colors resize-none placeholder:text-white/20"
                  onFocus={(e) => e.target.style.borderColor = theme.accent}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                ></textarea>
              </div>
              
              <button 
                className="group relative w-full overflow-hidden border py-5 uppercase text-xs font-bold tracking-[0.4em] transition-all duration-500"
                style={{ borderColor: theme.accent, color: theme.accent }}
              >
                <span className="relative z-10 group-hover:text-coffee-dark transition-colors duration-500">Submit Inquiry</span>
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ backgroundColor: theme.accent }}></div>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ theme, onThemeToggle }: { theme: typeof THEMES[0], onThemeToggle: () => void }) => {
  return (
    <footer className="py-16 px-6 md:px-[90px] transition-colors duration-1000" style={{ backgroundColor: theme.footerBg }} id="footer">
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

            {/* Theme Toggle Button */}
            <div className="pt-4">
              <button 
                onClick={onThemeToggle}
                className="px-6 py-2 border border-coffee-dark/20 rounded-full text-[10px] tracking-[0.2em] font-bold text-coffee-dark hover:bg-coffee-dark hover:text-white transition-all uppercase"
              >
                Switch to {theme.id === 1 ? 'Theme 2' : 'Theme 1'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12" id="footer-links">
            <div className="space-y-4">
              <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-coffee-dark/50">OUR WEBSITE</h4>
              <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}>HOME</a></li>
                <li><a href="#about" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}>ABOUT</a></li>
                <li><a href="#contact" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}>CONTACT US</a></li>
                <li><a href="#" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}>MESSAGE</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-coffee-dark/50">OUR SOCIALS</h4>
              <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                <li><a href="#" className="flex items-center transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}><Facebook className="w-3 h-3 mr-2" /> FACEBOOK</a></li>
                <li><a href="#" className="flex items-center transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}><Instagram className="w-3 h-3 mr-2" /> INSTAGRAM</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-widest text-coffee-dark/50 uppercase space-y-4 md:space-y-0" style={{ borderTop: `1px solid ${theme.id === 2 ? theme.accent : 'rgba(35, 31, 20, 0.1)'}` }}>
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

const Navbar = ({ theme }: { theme: typeof THEMES[0] }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-[80px] lg:px-[130px] h-20 md:h-24 flex items-center justify-between border-b border-coffee-dark/5 shadow-sm"
      style={{ 
        borderBottomWidth: '4.22222px', 
        backgroundColor: theme.navBg
      }}
    >
      {/* Left side Logo */}
      <div className="flex-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={LOGO_URL} 
            alt="LA SOUQ" 
            className="h-6 md:h-7 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Center links (hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-10">
        <a href="#menu" className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase" style={{ color: theme.coffeeDark }}>MENU</a>
        <a href="#about" className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase" style={{ color: theme.coffeeDark, borderColor: theme.coffeeDark }}>OUR STORY</a>
        <a href="#contact" className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase" style={{ color: theme.coffeeDark, borderColor: theme.coffeeDark }}>CONTACT</a>
      </div>

      {/* Right side CTA */}
      <div className="flex-none">
        <a 
          href="https://order.toasttab.com/online/la-souq-richardson-dallas"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-coffee-dark/20 hover:border-coffee-dark px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] font-bold transition-all duration-300 pt-[10px] uppercase"
          style={{ 
            color: theme.coffeeDark, 
            borderColor: theme.coffeeDark,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.buttonHoverBg;
            e.currentTarget.style.color = theme.buttonHoverText;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.coffeeDark;
          }}
        >
          ORDER AHEAD
        </a>
      </div>
    </nav>
  );
};

export default function App() {
  const [themeIndex, setThemeIndex] = useState(1);
  const theme = THEMES[themeIndex];

  const handleThemeToggle = () => {
    setThemeIndex((prev) => (prev === 0 ? 1 : 0));
  };

  useEffect(() => {
    console.log(`La Souq Roastery App Initialized with ${theme.name}`);
  }, [themeIndex]);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-white" id="main-app-container">
      <Navbar theme={theme} />
      <Hero theme={theme} />
      <InspirationSection theme={theme} />
      <MenuSection theme={theme} />
      <VideoSection />
      {/* <AboutSection theme={theme} /> */}
      <LocationsSection theme={theme} />
      <ContactSection theme={theme} />
      <Footer theme={theme} onThemeToggle={handleThemeToggle} />
    </div>
  );
}
