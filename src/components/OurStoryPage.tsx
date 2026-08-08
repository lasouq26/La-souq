import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect } from 'react';
import { ArrowLeft, Facebook, Instagram, Music } from 'lucide-react';

interface OurStoryPageProps {
  onBackToHome: () => void;
  theme: any;
}

const LOGO_URL = "https://res.cloudinary.com/dhylipuur/image/upload/v1782591238/lassAsset_2ldpi_a9proq.svg";

export default function OurStoryPage({ onBackToHome, theme }: OurStoryPageProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [0.3, 0.08]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const storyImages = [
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777816829809-xb1fh9-8.jpg",
    "https://res.cloudinary.com/dhylipuur/image/upload/v1786016634/DSC02990_copy_fgwpp7.jpg",
    "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777817656741-xzhp9p-la-souq-c946076fc6979dc0d3006c3258335f0f.jpg",
    "https://res.cloudinary.com/dhylipuur/image/upload/v1786016764/Untitled-5_wq8ygz.png",
    "https://res.cloudinary.com/dhylipuur/image/upload/v1785964225/DSC07504_copy_cgchyy.jpg",
    "https://res.cloudinary.com/dhylipuur/image/upload/v1786017029/DSC09092_1_copy_hgifwl.jpg"
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#231f14] selection:bg-[#b69b79] selection:text-white font-sans">
      {/* Sticky Top Header Navigation */}
      <nav 
        className="sticky top-0 z-50 transition-all duration-500 px-4 md:px-[80px] lg:px-[130px] h-20 md:h-24 flex items-center justify-between shadow-sm backdrop-blur-md"
        style={{ 
          borderBottomWidth: '4px', 
          borderBottomStyle: 'solid',
          borderBottomColor: 'rgba(35, 31, 20, 0.1)',
          backgroundColor: theme?.navBg || '#b69b79'
        }}
      >
        {/* Left side Logo */}
        <div className="flex items-center gap-4 md:gap-6 flex-none">
          <motion.button
            type="button"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group cursor-pointer flex items-center gap-3 bg-transparent border-0 p-0"
            onClick={onBackToHome}
            aria-label="Back to home"
          >
            <img 
              src={LOGO_URL} 
              alt=""
              className="h-6 md:h-7 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </motion.button>
        </div>

        {/* Center links (matching home page nav links) */}
        <div className="hidden lg:flex items-center gap-10 font-sans">
          <button
            onClick={onBackToHome}
            className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase cursor-pointer bg-transparent border-0 p-0"
            style={{ color: theme?.coffeeDark || '#231f14' }}
          >
            HOME
          </button>

          <a 
            href="https://order.toasttab.com/online/la-souq-richardson-dallas" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase"
            style={{ color: theme?.coffeeDark || '#231f14' }}
          >
            MENU
          </a>
          
          <span 
            className="text-[11px] tracking-[0.3em] font-bold underline underline-offset-8 decoration-2 uppercase cursor-default" 
            style={{ color: theme?.coffeeDark || '#231f14' }}
          >
            OUR STORY
          </span>

          <button 
            onClick={() => {
              onBackToHome();
              setTimeout(() => {
                const el = document.getElementById('locations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
            className="text-[11px] tracking-[0.3em] font-bold hover:underline underline-offset-8 transition-all uppercase cursor-pointer bg-transparent border-0 p-0"
            style={{ color: theme?.coffeeDark || '#231f14' }}
          >
            CONTACT
          </button>
        </div>

        {/* Right side CTA */}
        <div className="flex-none flex items-center gap-3 font-sans">
          <button
            onClick={onBackToHome}
            className="lg:hidden flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider hover:opacity-75 transition-colors pr-1 cursor-pointer"
            style={{ color: theme?.coffeeDark || '#231f14' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <a 
            href="https://order.toasttab.com/online/la-souq-richardson-dallas"
            target="_blank"
            rel="noopener noreferrer"
            className="border px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] tracking-[0.2em] font-bold transition-all duration-300 pt-[8px] md:pt-[10px] uppercase whitespace-nowrap"
            style={{ 
              color: theme?.coffeeDark || '#231f14',
              borderColor: theme?.coffeeDark || '#231f14'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme?.buttonHoverBg || '#231f14';
              e.currentTarget.style.color = theme?.buttonHoverText || '#f4f4f4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme?.coffeeDark || '#231f14';
            }}
          >
            ORDER AHEAD
          </a>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="relative pt-16 md:pt-20 pb-20 md:pb-28 px-6 md:px-16 bg-[#f4f4f4] text-coffee-dark font-sans overflow-hidden">
        {/* Background Image with Parallax Scroll Effect */}
        <motion.div 
          className="absolute inset-x-0 h-[120%] -top-[10%] pointer-events-none opacity-30"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <img
            src="https://res.cloudinary.com/dhylipuur/image/upload/v1786012350/Lasouq_back_1_amntue.jpg"
            alt="LA SOUQ Background"
            className="w-full h-full object-cover object-center scale-105"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Eyebrow & Line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-2 mb-3"
          >
            <span className="text-sm md:text-sm uppercase tracking-[0.4em] font-bold text-[#b69b79]">
              OUR STORY
            </span>
            <div className="w-6 h-[1px] bg-[#b69b79]/80"></div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-coffee-dark font-normal leading-tight uppercase"
          >
            Culture. <span className="text-[#b69b79]">Craft.</span> Community.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm tracking-[0.3em] font-bold uppercase text-coffee-dark/70 mt-2.5 max-w-xl mx-auto"
          >
            INSPIRED BY HERITAGE. MADE FOR TODAY.
          </motion.p>

          {/* 3 Arched Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto mt-14 md:mt-20">
            {/* Card 1: Culture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center group"
            >
              {/* Arched Image Window with Radial Glow Behind */}
              <div className="relative w-full">
                {/* Radial gradient background depth glow */}
                <div 
                  className="absolute -inset-4 sm:-inset-6 rounded-[140px] sm:rounded-[180px] blur-xl opacity-70 pointer-events-none -z-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(182, 155, 121, 0.5) 0%, rgba(182, 155, 121, 0.2) 55%, transparent 80%)'
                  }}
                />

                <div className="w-full aspect-[3/4] sm:aspect-[5/7] rounded-t-[140px] sm:rounded-t-[180px] overflow-hidden bg-[#efe9e0] shadow-sm ring-1 ring-coffee-dark/5 relative z-10">
                  <img
                    src="https://res.cloudinary.com/dhylipuur/image/upload/v1786049669/DSC08164_copy1_nxyg1y.jpg"
                    alt="Culture - Archway & Olive Shadows"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Icon */}
              <div className="mt-8 mb-3">
                <svg className="w-9 h-9 text-[#b69b79] stroke-[1.2] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 21V10a6 6 0 0 1 12 0v11" />
                  <path d="M9 21V11a3 3 0 0 1 6 0v10" />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="text-sm md:text-base font-bold tracking-[0.35em] text-coffee-dark uppercase mb-2">
                CULTURE
              </h3>

              {/* Line */}
              <div className="w-5 h-[1.5px] bg-[#b69b79] mb-3 opacity-60"></div>

              {/* Description */}
              <p className="text-sm font-normal leading-relaxed text-coffee-dark/85 max-w-[240px] text-center">
                Rooted in heritage and inspired by the spirit of the souq.
              </p>
            </motion.div>

            {/* Card 2: Craft */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center group"
            >
              {/* Arched Image Window with Radial Glow Behind */}
              <div className="relative w-full">
                {/* Radial gradient background depth glow */}
                <div 
                  className="absolute -inset-4 sm:-inset-6 rounded-[140px] sm:rounded-[180px] blur-xl opacity-70 pointer-events-none -z-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(182, 155, 121, 0.5) 0%, rgba(182, 155, 121, 0.2) 55%, transparent 80%)'
                  }}
                />

                <div className="w-full aspect-[3/4] sm:aspect-[5/7] rounded-t-[140px] sm:rounded-t-[180px] overflow-hidden bg-[#efe9e0] shadow-sm ring-1 ring-coffee-dark/5 relative z-10">
                  <img
                    src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069477594-0ftxlm-chatgpt-image-may-6-2026-03-03-04-pm.jpg"
                    alt="Craft - Specialty Latte"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Icon */}
              <div className="mt-8 mb-3">
                <svg className="w-9 h-9 text-[#b69b79] stroke-[1.2] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 21V3" />
                  <path d="M12 7c3-3 6-2 7 1-3 3-6 2-7-1z" />
                  <path d="M12 11c-3-3-6-2-7 1 3 3 6 2 7-1z" />
                  <path d="M12 15c3-3 6-2 7 1-3 3-6 2-7-1z" />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="text-sm md:text-base font-bold tracking-[0.35em] text-coffee-dark uppercase mb-2">
                CRAFT
              </h3>

              {/* Line */}
              <div className="w-5 h-[1.5px] bg-[#b69b79] mb-3 opacity-60"></div>

              {/* Description */}
              <p className="text-sm font-normal leading-relaxed text-coffee-dark/85 max-w-[240px] text-center">
                Thoughtfully sourced. Expertly crafted. Made with intention.
              </p>
            </motion.div>

            {/* Card 3: Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center group"
            >
              {/* Arched Image Window with Radial Glow Behind */}
              <div className="relative w-full">
                {/* Radial gradient background depth glow */}
                <div 
                  className="absolute -inset-4 sm:-inset-6 rounded-[140px] sm:rounded-[180px] blur-xl opacity-70 pointer-events-none -z-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(182, 155, 121, 0.5) 0%, rgba(182, 155, 121, 0.2) 55%, transparent 80%)'
                  }}
                />

                <div className="w-full aspect-[3/4] sm:aspect-[5/7] rounded-t-[140px] sm:rounded-t-[180px] overflow-hidden bg-[#efe9e0] shadow-sm ring-1 ring-coffee-dark/5 relative z-10">
                  <img
                    src="https://res.cloudinary.com/dhylipuur/image/upload/v1782492887/38a6f49e-7d7c-4237-9a09-7ad6a2146830_fn5cy6.png"
                    alt="Community - Gathering in Cafe"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Icon */}
              <div className="mt-8 mb-3">
                <svg className="w-9 h-9 text-[#b69b79] stroke-[1.2] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="7" r="2.5" />
                  <path d="M8.5 17.5c0-2.2 1.8-4 3.5-4s3.5 1.8 3.5 4" />
                  <circle cx="6" cy="9.5" r="2" />
                  <path d="M3.5 18c0-1.7 1.3-3 2.5-3s2 .5 2.5 1" />
                  <circle cx="18" cy="9.5" r="2" />
                  <path d="M15.5 16c.5-.5 1.3-1 2.5-1s2.5 1.3 2.5 3" />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="text-sm md:text-base font-bold tracking-[0.35em] text-coffee-dark uppercase mb-2">
                COMMUNITY
              </h3>

              {/* Line */}
              <div className="w-5 h-[1.5px] bg-[#b69b79] mb-3 opacity-60"></div>

              {/* Description */}
              <p className="text-sm font-normal leading-relaxed text-coffee-dark/85 max-w-[240px] text-center">
                A place to gather, connect, and thrive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Narrative - Genesis & Heritage */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden bg-[#f4f4f4]">
        {/* Background Image with 40% opacity */}
        <div className="absolute inset-0 pointer-events-none opacity-75">
          <img
            src="https://res.cloudinary.com/dhylipuur/image/upload/v1786013784/DSC02985_copy_zsl2vs.jpg"
            alt="LA SOUQ Sanctuary Background"
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Linear Gradient Overlay (#b69b79 from 100% to 10% opacity) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'linear-gradient(to right, rgba(182, 155, 121, 1) 0%, rgba(182, 155, 121, 1) 20%, rgba(182, 155, 121, 0.2) 60%)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1440px] mx-auto space-y-6 text-left"
        >
          <div className="flex items-center justify-start gap-3 text-[#f4f4f4] font-bold text-xs uppercase tracking-[0.3em]">
            <div className="w-8 h-px bg-[#f4f4f4]"></div>
            <span>OUR STORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#231f14] leading-tight font-light text-left uppercase max-w-[800px]">
            A place to slow down, discover, and thrive.
          </h2>

          <p className="text-[#231f14] leading-relaxed font-normal text-base md:text-lg text-left max-w-[800px]">
            A dinner in a souq in Dubai. Sitting among the conversations, the warmth, and the quiet hum of discovery, we thought of the souqs, cafés, and marketplaces that had always drawn us in.
            What made those places stay with us was never just the food or the coffee — it was how they made people feel. That became LA SOUQ: a gathering place built on culture, craft, and community.
            Even the name is personal. "Souq" for the marketplace. "La" for the women who inspire us — our two daughters most of all — and why we support women-led businesses whenever we can.
            Come for the coffee. Stay for what happens around it.
          </p>

          <p className="text-[#231f14] leading-relaxed font-normal text-base md:text-lg text-left max-w-[800px]">
            LA SOUQ was born in Richardson, Texas out of a passion to honor this timeless ritual. We designed our space as an architectural haven—soft arched entryways, warm terracotta hues, subtle floral aromas, and an atmosphere crafted specifically for lingering.
          </p>
        </motion.div>
      </section>

      {/* Visual Gallery Mosaic */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <span 
            className="text-[10px] sm:text-[11px] tracking-[0.45em] font-bold uppercase block transition-colors duration-1000 mb-0"
            style={{ color: '#b69b79', marginBottom: '0px', paddingRight: '0px', textAlign: 'center' }}
          >
            MOMENTS & DETAILS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[60px] font-serif text-[#231f14] tracking-normal max-w-2xl mx-auto leading-tight font-light mt-1">
            Curated Gallery
          </h2>
          <p className="text-[#231f14]/80 text-sm font-bold mt-3 max-w-xl mx-auto tracking-widest uppercase">
            <span className="text-[#b69b79]">Walk in for</span> coffee. <span className="text-[#b69b79]">Stay for</span> culture. <span className="text-[#b69b79]">Return for</span> community
          </p>
          <div 
            className="h-[2px] mx-auto mt-6 transition-colors duration-1000" 
            style={{ backgroundColor: '#b69b79', borderColor: '#b69b79', width: '96px' }}
          ></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {storyImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5"
            >
              <img
                src={src}
                alt={`LA SOUQ Gallery ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        {/* Experience LA SOUQ Today Block in Gallery Section */}
        <div className="text-center pt-10 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl md:text-[72px] font-serif text-[#231f14] tracking-tight inline-flex items-center justify-center flex-wrap gap-x-3 gap-y-2 w-full">
            <span>Experience</span>
            <img 
              src="https://res.cloudinary.com/dhylipuur/image/upload/v1786020994/la_souq_logo_v9axpa.svg" 
              alt="LA SOUQ" 
              className="h-9 sm:h-[52px] md:h-[52px] w-auto inline-block object-contain" 
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <span>Today</span>
          </h2>
          <p className="text-[#231f14]/80 font-light text-base sm:text-lg">
            Visit us in Richardson, TX, or order your favorite coffee & gourmet treats online.
          </p>
          <div 
            className="h-[2px] mx-auto transition-colors duration-1000" 
            style={{ backgroundColor: '#b69b79', borderColor: '#b69b79', width: '96px' }}
          ></div>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            <motion.a
              href="https://order.toasttab.com/online/la-souq-richardson-dallas"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-12 pt-5 pb-5 overflow-hidden border uppercase text-[11px] font-bold tracking-[0.4em] transition-all duration-500 group-hover:border-[#b69b79]"
              style={{ borderWidth: '1px', borderColor: '#231f14', color: '#231f14' }}
              id="order-online-button"
            >
              <span 
                className="relative z-10 transition-colors duration-500 flex items-center gap-4 text-[12px] group-hover:text-[#f4f4f4]"
                style={{ color: '#231f14' }}
              >
                ORDER AHEAD
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-[#b69b79]"></div>
            </motion.a>

            <motion.button
              onClick={onBackToHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-10 py-5 overflow-hidden border border-[#231f14]/30 uppercase text-[11px] font-bold tracking-[0.3em] transition-all duration-500 cursor-pointer text-[#231f14] hover:border-[#231f14]"
            >
              <span className="relative z-10 text-[12px]">Return to Homepage</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Page Footer */}
      <footer className="py-16 px-6 md:px-[90px] transition-colors duration-1000" style={{ backgroundColor: theme?.footerBg || '#e8ded2' }} id="footer">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-16">
            <div className="space-y-6" id="footer-brand">
              <img 
                src={LOGO_URL} 
                alt="LA SOUQ" 
                className="h-9 w-auto object-contain brightness-0 opacity-80" 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <p className="text-[#231f14]/70 text-xs leading-relaxed max-w-md">
                Inspired by traditional souqs, contemporary cafe culture, and the warmth of old-world hospitality, LA SOUQ blends culture, craft, and community into an elevated experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12" id="footer-links">
              <div className="space-y-4">
                <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-[#231f14]/50">OUR WEBSITE</h4>
                <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                  <li>
                    <a 
                      href="https://order.toasttab.com/online/la-souq-richardson-dallas" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="transition-colors hover:text-[#b69b79]"
                    >
                      MENU
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                      className="transition-colors uppercase font-bold cursor-pointer bg-transparent border-0 p-0 hover:text-[#b69b79]"
                    >
                      OUR STORY
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={onBackToHome} 
                      className="transition-colors uppercase font-bold cursor-pointer bg-transparent border-0 p-0 hover:text-[#b69b79]"
                    >
                      CONTACT US
                    </button>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="uppercase text-[12px] tracking-[0.2em] font-bold text-[#231f14]/50">OUR SOCIALS</h4>
                <ul className="space-y-2 uppercase text-[10px] tracking-widest font-bold">
                  <li>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61566543663898" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center transition-colors hover:text-[#b69b79]"
                    >
                      <Facebook className="w-3 h-3 mr-2" /> FACEBOOK
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.instagram.com/lasouqcoffee?igsh=MXg3bHA1eGRiMXRkeg==" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center transition-colors hover:text-[#b69b79]"
                    >
                      <Instagram className="w-3 h-3 mr-2" /> INSTAGRAM
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://vm.tiktok.com/ZS96rXAeH1sXW-vwxRA/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center transition-colors hover:text-[#b69b79]"
                    >
                      <Music className="w-3 h-3 mr-2" /> TIKTOK
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div 
            className="pt-6 flex justify-center items-center text-[9px] tracking-widest text-[#231f14]/50 uppercase"
            style={{ borderTop: `1px solid ${theme?.id === 2 ? (theme?.accent || '#b69b79') : 'rgba(35, 31, 20, 0.1)'}` }}
          >
            <p>© {new Date().getFullYear()} LA SOUQ. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
