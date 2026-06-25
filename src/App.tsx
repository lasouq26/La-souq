import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Facebook, Plus, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import cafeDetailPots from './assets/images/cafe_detail_pots_1777813549634.png';
import coffeePouring from './assets/images/coffee_pouring_1777813533745.png';

// Use the user-provided logo URL
const LOGO_URL = "https://cdn.shopify.com/s/files/1/0559/1213/6861/files/Logo.svg?v=1780575680";

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
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          >
            <source src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/sign/course-videos/0507.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWIwOTZlZC0wY2JkLTQ0MTYtYjBkZC1hOGJjZWVjNjlhMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3Vyc2UtdmlkZW9zLzA1MDcubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTE4MjE4MCwiZXhwIjoxODEyNzE4MTgwfQ.Ji4EVtMXsJCFv0kEInnCVXXg-jNlDMSddh49BXBBh_A" type="video/mp4" />
          </video>
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
            className="h-[109px] md:h-[163px] w-auto object-contain"
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
               <p>150 W MAIN ST, SUITE 900</p>
               <p>RICHARDSON, TX 75080</p>
             </div>
          </div>
          <a href="#locations" className="text-[9px] tracking-[0.3em] font-bold text-[#231f14] hover:text-coffee-dark transition-colors flex items-center gap-2">
            VIEW HOURS →
          </a>
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
  const [video1Loaded, setVideo1Loaded] = useState(false);

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
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full flex justify-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24"
        >
          <motion.div variants={itemVariants} className="w-full max-w-[340px] aspect-[3/4] md:w-[340px] md:h-[450px] flex-none bg-coffee-dark/5 overflow-hidden relative group rounded-2xl">
            <video 
              className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${video1Loaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setVideo1Loaded(true)}
            >
              <source src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/sign/course-videos/grok-video-b5f53e76-5cfb-4986-8961-ed28ba739aba%20(1).mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWIwOTZlZC0wY2JkLTQ0MTYtYjBkZC1hOGJjZWVjNjlhMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3Vyc2UtdmlkZW9zL2dyb2stdmlkZW8tYmVmNTNlNzYtNWNmYi00OTg2LTg5NjEtZWQyOGJhNzM5YWJhICgxKS5tcDQiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMzk2MjM2LCJleHAiOjE4MTM5MzIyMzZ9.0BJu__SxzVCnCLpUAzsr_3xnpURVeoZ4XzBThCjS6oM" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-coffee-dark/5 mix-blend-overlay"></div>
            {!video1Loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-coffee-dark/10">
                <div className="w-5 h-5 rounded-full border-2 border-coffee-dark/20 border-t-coffee-dark animate-spin"></div>
              </div>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex-1 space-y-6">
            <span className="text-[10px] tracking-[0.4em] font-bold uppercase transition-colors duration-1000" style={{ color: theme.highlightText }}>Inspired By</span>
            <h2 className="text-3xl md:text-5xl font-heading leading-[1.1] text-coffee-dark uppercase">
              Arabic Roots.<br />Mediterranean Soul.
            </h2>
            <p className="text-coffee-dark/60 text-sm leading-relaxed font-light">
              Inspired by traditional souqs, contemporary cafe culture, and the warmth of old-world hospitality, LA SOUQ blends culture, coffee, and community into an experience designed to linger.
            </p>
            <a href="#brand-video" className="inline-flex items-center gap-3 text-[9px] tracking-[0.4em] font-extrabold text-coffee-dark hover:underline underline-offset-4 transition-all">
              OUR STORY <span className="text-xs">→</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const EXPERIENCE_DETAILS: Record<number, {
  tagline: string;
  description: string;
  detailsImage: string;
  items: Array<{ name: string; description: string; price?: string }>;
}> = {
  1: {
    tagline: "Sip of Artistry",
    description: "Our signature drinks are custom crafted using premium single-origin roasts blended with floral waters, hand-ground spices, and house-made syrups to create sophisticated flavors that soothe the senses and evoke rich cultural heritages.",
    detailsImage: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778060900663-6e4qri-chatgpt-image-may-6-2026-12-48-11-pm.jpg",
    items: [
      { name: "Rose Cardamom Latte", description: "Espresso, real steam-infused milk, organic rose water, crushed green cardamom.", price: "$6.50" },
      { name: "Spanish Saffron Cappuccino", description: "Rich espresso with saffron-infused microfoam and delicate real saffron threads.", price: "$7.00" },
      { name: "Orange Blossom Cold Brew", description: "18-hour cold brew paired with orange blossom water and non-dairy sweet cream.", price: "$6.75" },
      { name: "Pistachio Rose Matcha", description: "Ceremonial stoneground matcha with organic pistachio milk and light rose syrup.", price: "$7.20" }
    ]
  },
  2: {
    tagline: "Elevated Morning Rituals",
    description: "Baked daily on thick-cut artisanal sourdough bread, our savory toasts blend rich Mediterranean textures, artisanal cheeses, and light premium toppings to start your morning with bold, memorable flavors.",
    detailsImage: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_31%20PM.png",
    items: [
      { name: "Truffle Avocado Toast", description: "Whipped fresh avocado, white truffle spray, sea salt flakes, toasted sesame, microgreens.", price: "$14.50" },
      { name: "Burrata & Fig Jam Toast", description: "Fresh burrata ball, caramelised fig jam, toasted walnuts, fresh basil, hot honey drizzle.", price: "$15.00" },
      { name: "Smoked Salmon & Capers", description: "Sourdough topped with herbed cream cheese, smoked wild salmon, red onion, capers, dill.", price: "$16.50" }
    ]
  },
  3: {
    tagline: "Handcrafted Confections",
    description: "Every dessert is custom-selected for its boutique craft and distinctive presentation, pairing traditional Eastern dessert textures with modern patisserie aesthetics for a perfectly sweet finish.",
    detailsImage: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_02_07%20PM.png",
    items: [
      { name: "Pistachio Kunafa Cheesecake", description: "Decadent cheesecake layered with crunchy buttered kunafa pastry and orange blossom syrup.", price: "$9.50" },
      { name: "Cardamom Affogato", description: "Double house espresso poured over vanilla bean gelato infused with hand-ground cardamom.", price: "$7.50" },
      { name: "Saffron Rose Tres Leches", description: "Light sponge cake soaked in saffron milk, topped with whipped cream and rose petals.", price: "$8.50" }
    ]
  },
  4: {
    tagline: "Aesthetic Living Finds",
    description: "Browse our hand-selected boutique items chosen to bring warmth and understated elegance into your home. Each artifact is sourced directly from independent Mediterranean and Middle Eastern design studios.",
    detailsImage: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg",
    items: [
      { name: "Artisanal Arabic Terracotta Pots", description: "Hand-thrown terracotta pottery imported from legacy artisan cooperatives.", price: "$45.00" },
      { name: "La Souq Signature Espresso Beans", description: "A 12oz bag of light-medium roast with notes of rose, cardamom, and dark honey.", price: "$24.00" },
      { name: "Handcrafted Brass Turkish Coffee Set", description: "Traditional heavy-gauge copper cezve with elegant porcelain fincan cups.", price: "$89.00" }
    ]
  },
  5: {
    tagline: "Immersive Coffee Masterclasses",
    description: "Go beyond the cup. Our intimate workshops offer hand-on guiding from master baristas, allowing you to learn the subtle science and arts of specialty espresso, roasting, and traditional sand brewing.",
    detailsImage: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777884497265-4bunsd-generated-image-may-04-2026-11-41am-copy.jpg",
    items: [
      { name: "Aromas of Arabia Barista Workshop", description: "A comprehensive session on integrating floral waters and hand-ground spices into espresso.", price: "$120.00" },
      { name: "Traditional Turkish Sand Brewing", description: "Master the unique art of brewing rich coffee in hot sand bed systems.", price: "$95.00" },
      { name: "Sourdough & Spread Masterclass", description: "Learn layout design, toppings pairing, and base carving for gourmet hosting.", price: "$85.00" }
    ]
  }
};

const ExperiencesSection = ({ theme }: { theme: typeof THEMES[0] }) => {
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  return (
    <section className="py-24 border-b border-coffee-dark/5 overflow-hidden w-full transition-colors duration-1000" style={{ backgroundColor: '#f4f4f4' }} id="experiences">
      <div className="w-full px-6 md:px-[120px]">
        {/* Style block for signature experiences rolling grid and parallax effects */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes signatureScrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes signatureScrollDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          .sig-scroll-up {
            animation: signatureScrollUp var(--sig-speed, 25s) linear infinite;
          }
          .sig-scroll-down {
            animation: signatureScrollDown var(--sig-speed, 25s) linear infinite;
          }
          .group\\/col:hover .sig-scroll-up,
          .group\\/col:hover .sig-scroll-down {
            animation-play-state: paused;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />

        {/* Header block modeled after the uploaded wireframe */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span 
            className="text-[10px] sm:text-[11px] tracking-[0.45em] font-bold uppercase block transition-colors duration-1000 mb-0"
            style={{ color: '#b69b79', marginBottom: '0px' }}
          >
            crafted moments for every guest.
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[60px] font-serif text-coffee-dark tracking-normal max-w-2xl mx-auto leading-tight font-light mt-1">
            Signature Experiences
          </h2>
          <div 
            className="h-[2px] mx-auto mt-6 transition-colors duration-1000" 
            style={{ backgroundColor: '#b69b79', borderColor: '#b69b79', width: '96px' }}
          ></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row overflow-x-auto overflow-y-hidden gap-6 sm:gap-8 md:gap-10 pb-8 scrollbar-none snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-x-visible lg:pb-0 lg:snap-none"
        >
          {[
            {
              id: 1,
              title: "Signature Drinks",
              caption: "Handcrafted sips made to set the mood.",
              direction: "up",
              speed: "35s",
              images: [
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069293478-mpkync-chatgpt-image-may-6-2026-02-59-42-pm.jpg",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069372877-8f3go8-chatgpt-image-may-6-2026-03-01-38-pm.jpg",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069447382-h8ij1r-chatgpt-image-may-6-2026-03-04-04-pm.jpg",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069477594-0ftxlm-chatgpt-image-may-6-2026-03-03-04-pm.jpg"
              ]
            },
            {
              id: 2,
              title: "Gourmet Toasts",
              caption: "Elevated bites with bold, memorable flavor.",
              direction: "down",
              speed: "42s",
              images: [
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_31%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_40%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_47%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_54%20PM.png"
              ]
            },
            {
              id: 3,
              title: "Desserts",
              caption: "Sweet finishes with a boutique touch.",
              direction: "up",
              speed: "35s",
              images: [
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_02_07%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_02_07%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2001_59_50%20PM.png"
              ]
            },
            {
              id: 4,
              title: "Curated Marketplace",
              caption: "A refined selection of lifestyle finds.",
              direction: "down",
              speed: "45s",
              images: [
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_56_38%20PM%20(1).png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_56_39%20PM%20(2).png"
              ]
            },
            {
              id: 5,
              title: "Workshops",
              caption: "Engaging coffee masterclasses and artisan sessions.",
              direction: "up",
              speed: "32s",
              images: [
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2003_28_54%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2003_33_17%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2003_30_57%20PM.png",
                "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2003_35_14%20PM.png"
              ]
            }
          ].map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col group/col flex-none w-[280px] sm:w-[320px] md:w-[360px] lg:w-auto lg:flex-1 snap-start"
            >
              {/* Column Card Frame replicating wireframe staggering with increased height */}
              <div 
                className="h-[380px] sm:h-[460px] md:h-[500px] w-full relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(35,31,20,0.12)]"
                style={{ backgroundColor: `${theme.coffeeDark}0F` }}
              >
                {/* Decorative background depth & highlights */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10 rounded-[2.5rem]"></div>
                
                {/* Top and bottom soft blend gradients to dissolve cards into background */}
                <div 
                  className="absolute top-0 inset-x-0 h-16 z-20 pointer-events-none transition-colors duration-1000" 
                  style={{ backgroundImage: 'linear-gradient(to bottom, #f4f4f4, transparent)' }}
                ></div>
                <div 
                  className="absolute bottom-0 inset-x-0 h-16 z-20 pointer-events-none transition-colors duration-1000" 
                  style={{ backgroundImage: 'linear-gradient(to top, #f4f4f4, transparent)' }}
                ></div>

                {/* Staggered container of images repeating like the wireframe texture */}
                <div 
                  className={`flex flex-col gap-2 md:gap-3 absolute w-full ${
                    item.direction === "up" ? "sig-scroll-up" : "sig-scroll-down"
                  }`}
                  style={{ 
                    "--sig-speed": item.speed,
                    top: 0
                  } as any}
                >
                  {[...item.images, ...item.images].map((imgUrl, cardIdx) => (
                    <div 
                      key={cardIdx} 
                      className="w-full h-[180px] sm:h-[230px] md:h-[270px] flex-none rounded-[1.8rem] overflow-hidden px-2 md:px-3"
                    >
                      <img 
                        src={imgUrl}
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-[1.8rem] shadow-sm transform group-hover/col:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Left-aligned Label and Caption below each column */}
              <div className="mt-6 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 
                    className="text-[18px] font-serif tracking-wide block uppercase"
                    style={{ color: theme.coffeeDark }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-[12px] leading-relaxed font-light font-sans max-w-[240px]"
                    style={{ color: `${theme.coffeeDark}CC` }}
                  >
                    {item.caption}
                  </p>
                </div>
                <div className="pt-3">
                  <a
                    id={`view-more-${item.id}`}
                    href="https://order.toasttab.com/online/la-souq-richardson-dallas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 group/btn transition-colors hover:opacity-80"
                    style={{ color: '#b69b79' }}
                  >
                    View More
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Experience Details Modal */}
        {selectedExperience && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6 cursor-pointer" 
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-[#fcfbfa] w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden cursor-default grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button top-right */}
              <button 
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-coffee-dark/5 transition-colors z-30"
                style={{ color: theme.coffeeDark }}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Visual panel */}
              <div className="md:col-span-5 h-[180px] md:h-full relative overflow-hidden bg-coffee-dark/5">
                <img 
                  src={EXPERIENCE_DETAILS[selectedExperience.id]?.detailsImage || selectedExperience.images[0]} 
                  alt={selectedExperience.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <span className="text-[10px] tracking-[0.3em] font-semibold uppercase block text-[#e8e3c9] mb-1 font-sans">
                    {EXPERIENCE_DETAILS[selectedExperience.id]?.tagline || "Artisan Craft"}
                  </span>
                  <h4 className="text-xl font-serif font-light">{selectedExperience.title}</h4>
                </div>
              </div>

              {/* Right Column: Details Content */}
              <div className="md:col-span-7 p-6 sm:p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[calc(90vh-180px)] md:max-h-[85vh]">
                <div className="space-y-6 text-left">
                  <div>
                    <h3 className="text-2xl font-serif font-light text-coffee-dark mb-3">
                      {selectedExperience.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-light leading-relaxed text-coffee-dark/70">
                      {EXPERIENCE_DETAILS[selectedExperience.id]?.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#b69b79] block border-b border-coffee-dark/10 pb-2 font-sans">
                      Curated Offerings
                    </span>
                    <div className="space-y-4 divide-y divide-coffee-dark/5">
                      {EXPERIENCE_DETAILS[selectedExperience.id]?.items.map((offering, idx) => (
                        <div key={idx} className={`pt-3 ${idx === 0 ? 'pt-0' : ''} flex items-start justify-between gap-4 text-left`}>
                          <div className="space-y-1">
                            <h5 className="text-xs font-bold tracking-wider text-coffee-dark uppercase font-sans">
                              {offering.name}
                            </h5>
                            <p className="text-xs font-sans font-light text-coffee-dark/60 leading-relaxed max-w-[360px]">
                              {offering.description}
                            </p>
                          </div>
                          {offering.price && (
                            <span className="text-sm font-serif text-[#b69b79] whitespace-nowrap font-medium">
                              {offering.price}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-coffee-dark/5 flex justify-end">
                  <button 
                    onClick={() => setSelectedExperience(null)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-coffee-dark/5 border font-sans"
                    style={{ borderColor: `${theme.coffeeDark}20`, color: theme.coffeeDark }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
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
            our menu
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
                className="flex-none w-[290px] sm:w-[340px] md:w-[520px] h-[240px] sm:h-[260px] md:h-[380px] bg-[#fdfaf7] rounded-[2.5rem] overflow-hidden border border-gold/10 flex relative group shadow-[0_20px_50px_-20px_rgba(35,31,20,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(35,31,20,0.15)] transition-shadow duration-700"
              >
                {/* Decorative background depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                
                <div className="flex-1 p-5 md:p-12 flex flex-col justify-between relative z-10">
                  <div className="relative">
                    <h3 className="text-lg md:text-2xl font-heading text-coffee-dark mb-2 md:mb-4 tracking-tight transition-colors duration-500 uppercase" style={{ color: theme.cardTitle }}>
                       {item.name}
                    </h3>
                    
                    <div className="w-12 h-[1px] bg-gold/30 mb-3 md:mb-6 group-hover:w-20 group-hover:bg-gold/60 transition-all duration-700 ease-out"></div>
                    
                    <p className="text-[11px] md:text-sm text-coffee-dark/50 leading-relaxed font-light italic max-w-[280px] line-clamp-3 md:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-8 flex items-center justify-start">
                    <span className="text-[12px] md:text-[13px] tracking-widest font-bold bg-white/80 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-gold/10 shadow-sm transition-colors duration-1000" style={{ color: '#b69b79' }}>
                      {item.price}
                    </span>
                  </div>
                </div>
                
                <div className="w-[105px] sm:w-[130px] md:w-[220px] h-full relative overflow-hidden flex-none">
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
                className="flex-none w-[290px] sm:w-[340px] md:w-[520px] h-[240px] sm:h-[260px] md:h-[380px] bg-[#fdfaf7] rounded-[2.5rem] overflow-hidden border border-gold/10 flex relative group shadow-[0_20px_50px_-20px_rgba(35,31,20,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(35,31,20,0.15)] transition-shadow duration-700"
              >
                {/* Decorative background depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                
                <div className="flex-1 p-5 md:p-12 flex flex-col justify-between relative z-10">
                  <div className="relative">
                    <h3 className="text-lg md:text-2xl font-heading text-coffee-dark mb-2 md:mb-4 tracking-tight transition-colors duration-500 uppercase text-balance" style={{ color: theme.cardTitle }}>
                      {item.name}
                    </h3>
                    
                    <div className="w-12 h-[1px] bg-gold/30 mb-3 md:mb-6 group-hover:w-20 group-hover:bg-gold/60 transition-all duration-700 ease-out"></div>
                    
                    <p className="text-[11px] md:text-sm text-coffee-dark/50 leading-relaxed font-light italic max-w-[280px] line-clamp-3 md:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-8 flex items-center justify-start">
                    <span className="text-[12px] md:text-[13px] tracking-widest font-bold bg-white/80 backdrop-blur-sm px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-gold/10 shadow-sm transition-colors duration-1000" style={{ color: '#b69b79' }}>
                      {item.price}
                    </span>
                  </div>
                </div>
                
                <div className="w-[105px] sm:w-[130px] md:w-[220px] h-full relative overflow-hidden flex-none">
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
          <motion.a
            href="https://order.toasttab.com/online/la-souq-richardson-dallas"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 overflow-hidden border uppercase text-[11px] font-bold tracking-[0.4em] transition-all duration-500 inline-block text-center"
            style={{ borderColor: '#231f14' }}
          >
            <span 
              className="relative z-10 transition-colors duration-500 block" 
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
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const VideoSection = ({ theme }: { theme: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(err => console.log(err));
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 transition-colors duration-1000" style={{ backgroundColor: theme.sectionBg }} id="brand-video">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs tracking-[0.4em] font-bold uppercase block mb-3" style={{ color: '#e8e3c9' }}>Cinema Experience</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading tracking-tight font-serif mb-4" style={{ color: '#231f14' }}>
            The Craft In Motion
          </h2>
          <div className="w-20 h-0.5 mx-auto" style={{ backgroundColor: '#e8e3c9' }}></div>
        </div>

        {/* Video Player Card - Keeps a pristine 16:9 ratio with no crop whatsoever */}
        <div className="max-w-5xl mx-auto aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative group bg-black border border-white/5">
          
          {/* Overlay to block native clicking behavior */}
          <div className="absolute inset-0 z-10"></div>

          {/* Actual 16:9 full size video - matches the exact outer container */}
          <div className="w-full h-full relative pointer-events-none">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover border-none"
              src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/sign/course-videos/lasouq.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNWIwOTZlZC0wY2JkLTQ0MTYtYjBkZC1hOGJjZWVjNjlhMDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjb3Vyc2UtdmlkZW9zL2xhc291cS5tcDQiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxMTgyNTg5LCJleHAiOjE4MTI3MTg1ODl9.O_D2a_8y6xYJbpYlxqk-1XAUtvnSNQy6w0ckSrim32U"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          {/* Cinematic subtle color gradations */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20 pointer-events-none z-20"></div>

          {/* Custom Controls Overlay - Fully branded, reveals beautifully, handles precise mute/play toggles */}
          <div className="absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6 md:p-8 flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
            
            {/* Play/Pause custom controls */}
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-[#e8e3c9] hover:bg-[#c5a367] text-[#231f14] transition-all duration-300 transform active:scale-95 shadow-lg shadow-black/40 pointer-events-auto"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4.5 h-4.5 fill-[#231f14] text-[#231f14]" /> : <Play className="w-4.5 h-4.5 fill-[#231f14] text-[#231f14] ml-0.5" />}
              </button>
              <div>
                <span className="text-white font-medium text-xs tracking-wider uppercase">
                  {isPlaying ? 'La Souq' : 'Paused'}
                </span>
                <p className="text-[9px] text-[#e8e3c9]/60 uppercase tracking-widest mt-0.5">Richardson, Dallas</p>
              </div>
            </div>

            {/* Custom volume controls */}
            <button 
              onClick={toggleMute}
              className="px-4 py-2.5 md:px-5 md:py-3 rounded-full flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-300 border border-white/15 active:scale-95 pointer-events-auto"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase">UNMUTE SOUND</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase">MUTE SOUND</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const CommunitySection = ({ theme }: { theme: any }) => {
  const reviews = [
    {
      platform: "Google Review",
      rating: "★★★★★",
      text: `"Absolutely incredible coffee and atmosphere! The warm cardamom notes here are unmatched, and the design of the space makes you want to stay all day."`,
      author: "SARAH M.",
      date: "MAY 2026"
    },
    {
      platform: "Yelp Review",
      rating: "★★★★★",
      text: `"The signature Habibti Latte is outstanding. Beautiful architectural arches, gorgeous natural light, and extremely welcoming old-world hospitality."`,
      author: "DAVID K.",
      date: "APRIL 2026"
    },
    {
      platform: "Instagram",
      rating: null,
      text: `"LA SOUQ is my new sanctuary. Pure aesthetic bliss combined with high-grade, true coffee roasting craft. ✨ ☕"`,
      author: "@URBAN_CRAFTS",
      date: "MAY 2026"
    },
    {
      platform: "TikTok",
      rating: null,
      text: `"Found the most beautiful coffee shop in Dallas/Richardson! Incredible gourmet toasts and addictive Lavender Honey Lattes. 10/10 vibe checks only."`,
      author: "@DALLASEATS",
      date: "JUNE 2026"
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden transition-colors duration-1000" style={{ backgroundColor: '#f5f3ec' }} id="community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] sm:text-xs tracking-[0.4em] font-bold uppercase block mb-3" style={{ color: '#c5a367' }}>Guest Experiences</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading tracking-tight font-serif mb-4" style={{ color: '#231f14' }}>
            From The Community
          </h2>
          <div className="w-24 h-0.5 mx-auto mt-6" style={{ backgroundColor: '#c5a367' }}></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between min-h-[260px] md:min-h-[300px] p-6 md:p-8 bg-[#fdfaf7] rounded-[2rem] border border-[#231f14]/5 shadow-[0_20px_50px_-20px_rgba(35,31,20,0.06)] hover:shadow-[0_45px_90px_-15px_rgba(35,31,20,0.14)] hover:-translate-y-1 transition-all duration-500 group"
            >
              {/* Card Top: Platform & Rating */}
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-[9px] font-bold tracking-[0.12em] text-[#231f14]/40 bg-[#231f14]/5 uppercase border border-[#231f14]/5">
                  {review.platform}
                </span>
                {review.rating && (
                  <span className="text-[#c5a367] text-[12px] font-bold tracking-[0.1em]">
                    {review.rating}
                  </span>
                )}
              </div>

              {/* Card Body: Quote text */}
              <p className="text-[#231f14]/85 text-[14px] leading-relaxed italic font-serif my-5 md:my-8 pr-1 font-light">
                {review.text}
              </p>

              {/* Card Footer: Divider + User Credits */}
              <div className="pt-5 border-t border-[#231f14]/5 mt-auto flex items-center justify-between text-[11px] tracking-[0.12em] font-bold text-[#231f14]">
                <span className="uppercase">{review.author}</span>
                <span className="text-[#231f14]/40 text-[9px] uppercase font-light tracking-widest">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
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
    }
  ];

  return (
    <section className="pt-[90px] pb-32 px-6 md:pl-[92px] md:pr-[90px] transition-colors duration-1000" style={{ backgroundColor: theme.sectionBg }} id="locations">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-heading text-coffee-dark mb-4 tracking-tight">
            Our Location
          </h2>
          <div className="w-24 h-1 mx-auto transition-colors duration-1000" style={{ backgroundColor: theme.id === 2 ? '#e8e3c9' : '#c5a367' }}></div>
        </motion.div>
        


        {/* Bespoke, ultra-premium centered single location showcase */}
        <div className="max-w-[1200px] mx-auto bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 md:p-10 shadow-[0_30px_70px_-15px_rgba(35,31,20,0.1)] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Image showcase */}
            <div className="md:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-lg">
              <img 
                src={locations[0].image} 
                alt="La Souq Richardson Main Roastery" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
            </div>

            {/* Details panel */}
            <div className="md:col-span-6 space-y-6 text-left">
              <div>
                <h4 className="text-3xl md:text-4xl font-serif font-bold text-coffee-dark tracking-tight">
                  {locations[0].name}
                </h4>
                <div className="w-12 h-1 bg-[#c5a367] mt-3 rounded-full" style={{ borderColor: '#e2ddc4', backgroundColor: '#e2ddc4' }}></div>
              </div>

              <div className="space-y-2 text-sm md:text-base leading-relaxed" style={{ color: theme.coffeeDark }}>
                <p className="font-medium opacity-90">{locations[0].address}</p>
                <p className="font-bold tracking-wide">{locations[0].phone}</p>
              </div>

              {/* Hours section with Google Sync status & Toast option */}
              <div className="pt-4 border-t border-coffee-dark/10 space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-bold text-coffee-dark/60 uppercase block">Operating Hours</span>
                <p className="text-xl md:text-2xl font-serif font-bold tracking-tight text-coffee-dark">{locations[0].hours}</p>
                
              </div>


            </div>

          </div>
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
              Inspired by traditional souqs, contemporary cafe culture, and the warmth of old-world hospitality, LA SOUQ blends culture, coffee, and community into an experience.
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
                <li><a href="#brand-video" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}>OUR STORY</a></li>
                <li><a href="#locations" className="transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}>CONTACT US</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-coffee-dark/50">OUR SOCIALS</h4>
              <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                <li><a href="https://www.facebook.com/profile.php?id=61566543663898" target="_blank" rel="noopener noreferrer" className="flex items-center transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}><Facebook className="w-3 h-3 mr-2" /> FACEBOOK</a></li>
                <li><a href="https://www.instagram.com/lasouqcoffee?igsh=MXg3bHA1eGRiMXRkeg==" target="_blank" rel="noopener noreferrer" className="flex items-center transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = theme.accent} onMouseLeave={(e) => e.currentTarget.style.color = ''}><Instagram className="w-3 h-3 mr-2" /> INSTAGRAM</a></li>
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
        <a 
          href="https://order.toasttab.com/online/la-souq-richardson-dallas" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase" 
          style={{ color: theme.coffeeDark }}
        >
          MENU
        </a>
        <a href="#brand-video" className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase" style={{ color: theme.coffeeDark, borderColor: theme.coffeeDark }}>OUR STORY</a>
        <a href="#locations" className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase" style={{ color: theme.coffeeDark, borderColor: theme.coffeeDark }}>CONTACT</a>
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
      <ExperiencesSection theme={theme} />
      {/* <MenuSection theme={theme} /> */}
      {/* <VideoSection theme={theme} /> */}
      {/* <AboutSection theme={theme} /> */}
      <LocationsSection theme={theme} />
      <CommunitySection theme={theme} />
      {/* <ContactSection theme={theme} /> */}
      <Footer theme={theme} onThemeToggle={handleThemeToggle} />
    </div>
  );
}
