import { motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, Mail, Phone, Users, Check, ArrowRight, Sparkles, MapPin, 
  Coffee, Gift, ChevronRight, Award, Flame, Star, Heart
} from 'lucide-react';

interface SignatureExperiencesPageProps {
  onBackToHome: () => void;
  theme: any;
}

// Experience items details
const CATEGORY_DETAILS: Record<string, {
  subtitle: string;
  description: string;
  image: string;
  offerings: Array<{ name: string; desc: string; price?: string }>;
  accent: string;
}> = {
  "Signature Drinks": {
    subtitle: "Sip of Cultural Fusion",
    description: "Our signature drinks are custom crafted using premium single-origin roasts blended with organic floral waters, hand-ground spices, and house-made syrups to evoke rich Mediterranean and Middle Eastern heritages.",
    image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069293478-mpkync-chatgpt-image-may-6-2026-02-59-42-pm.jpg",
    offerings: [
      { name: "Habibti Latte", desc: "Espresso combined with soft rosewater, steam-infused milk, and crushed green cardamom.", price: "$6.50" },
      { name: "Spanish Saffron Cappuccino", desc: "Rich espresso with delicate real saffron threads and saffron-infused microfoam.", price: "$7.00" },
      { name: "Orange Blossom Cold Brew", desc: "18-hour slow cold brew layered with orange blossom water and hand-whipped sweet cream.", price: "$6.75" },
      { name: "Za'atar W' Zeit Latte", desc: "A sophisticated savory-sweet twist featuring thyme-infused syrup and a touch of olive oil.", price: "$6.50" }
    ],
    accent: "Rose, Cardamom & Saffron"
  },
  "Gourmet Toasts": {
    subtitle: "Artisanal Morning Rituals",
    description: "Thick-cut, daily baked sourdough sourdough loaded with premium cheeses, organic fruits, and delicate garnishes for a satisfying flavor harmony.",
    image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_31%20PM.png",
    offerings: [
      { name: "Truffle Avocado Toast", desc: "Whipped fresh avocado, white truffle spray, sea salt flakes, toasted sesame, microgreens.", price: "$14.50" },
      { name: "Burrata & Fig Jam Toast", desc: "Creamy fresh burrata ball, caramelized fig jam, toasted walnuts, fresh basil, hot honey.", price: "$15.00" },
      { name: "Smoked Salmon & Capers", desc: "Sourdough spread with herbed cream cheese, smoked wild salmon, red onions, capers, fresh dill.", price: "$16.50" }
    ],
    accent: "Thick-Cut Sourdough Bases"
  },
  "Desserts": {
    subtitle: "Bespoke Confections",
    description: "Every dessert is chosen for its culinary artistry and visual presentation, merging traditional Eastern confectionery textures with modern boutique patisserie styles.",
    image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_02_07%20PM.png",
    offerings: [
      { name: "Pistachio Kunafa Cheesecake", desc: "Velvety cheesecake layered with crunchy buttered kunafa pastry, crushed pistachios, and light orange blossom syrup.", price: "$9.50" },
      { name: "Cardamom Affogato", desc: "Double house espresso shot poured over premium vanilla bean gelato infused with hand-ground cardamom.", price: "$7.50" },
      { name: "Saffron Rose Tres Leches", desc: "Delicate sponge cake soaked in premium saffron-scented milk, topped with cloud-like whipped cream and edible rose petals.", price: "$8.50" }
    ],
    accent: "Fine Patisserie & Artisan Treats"
  },
  "Curated Marketplace": {
    subtitle: "Aesthetic Living Finds",
    description: "Hand-selected, luxury home accessories and lifestyle items sourced directly from independent design cooperatives and Mediterranean ateliers to add warmth to your spaces.",
    image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg",
    offerings: [
      { name: "Artisanal Arabic Terracotta Pots", desc: "Authentic, hand-thrown terracotta pots imported from legacy artisan collectives.", price: "$45.00" },
      { name: "La Souq Signature Espresso Beans", desc: "A 12oz bag of micro-roasted whole beans displaying complex notes of rose, cardamom, and dark honey.", price: "$24.00" },
      { name: "Handcrafted Brass Turkish Cezve Set", desc: "Heavy-gauge solid copper sand-brewing pot paired with elegant, delicate porcelain fincan cups.", price: "$89.00" }
    ],
    accent: "Handcrafted Heritage Pieces"
  },
  "Workshops": {
    subtitle: "Immersive Coffee Masterclasses",
    description: "Hands-on barista masterclasses and sensory workshops guiding you through the delicate science of espresso, milk texturing, and traditional hot-sand coffee brewing techniques.",
    image: "https://res.cloudinary.com/dhylipuur/image/upload/v1782493223/afe_euvgao.png",
    offerings: [
      { name: "Aromas of Arabia Workshop", desc: "A sensory masterclass on integrating organic flower waters, cardamom, and saffron into specialty drinks.", price: "$120.00" },
      { name: "Traditional Turkish Sand Brewing", desc: "Master the unique physics of sand-bed systems, heat transfer, and slow copper brewing.", price: "$95.00" },
      { name: "Artisanal Sourdough Styling", desc: "Discover toast carving, topping pairs, and beautiful visual layout designs for your high-end hosting.", price: "$85.00" }
    ],
    accent: "Master Barista Guided Sessions"
  },
  "Private Events": {
    subtitle: "Bespoke Social Celebrations",
    description: "Transform our architecturally stunning arches, soft-lit rooms, and premium coffee setups into a customized private sanctuary for your special brand events or intimate social gatherings.",
    image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777816829809-xb1fh9-8.jpg",
    offerings: [
      { name: "Intimate Social Soirées", desc: "Curated afternoon coffee and dessert flights for birthdays, bridal showers, or friendly reunions (Up to 35 guests)." },
      { name: "Brand & Creative Activations", desc: "Elegant, minimalist spacing ideal for fashion showcases, book releases, poetry readings, or creative corporate events." },
      { name: "Private Tasting & Roastery Tours", desc: "A private, multi-course flight of rare specialty coffees and signature pastries guided by our head roaster." }
    ],
    accent: "Tailored Luxury Gatherings"
  }
};

export default function SignatureExperiencesPage({ onBackToHome, theme }: SignatureExperiencesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Workshop Reservation Form state
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("");
  const [reservationName, setReservationName] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");
  const [reservationGuests, setReservationGuests] = useState("2");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationSubmitted, setReservationSubmitted] = useState(false);

  // Private Event Inquiry Form state
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEventType, setInquiryEventType] = useState("Private Celebration");
  const [inquiryGuests, setInquiryGuests] = useState("20");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName || !reservationEmail) return;
    setReservationSubmitted(true);
    setTimeout(() => {
      // Clear after visual feedback
      setReservationSubmitted(false);
      setReservationModalOpen(false);
      setReservationName("");
      setReservationEmail("");
      setReservationPhone("");
    }, 2800);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalOpen(false);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryPhone("");
      setInquiryMessage("");
    }, 2800);
  };

  const upcomingEvents = [
    {
      title: "Traditional Turkish Sand Brewing Masterclass",
      date: "August 14, 2026 • 2:00 PM",
      price: "$95.00",
      description: "Learn the ancient craft of heat-convected slow sand brewing inside heavy solid copper cezve. Complete with a signature cardamom dessert flight.",
      image: "https://res.cloudinary.com/dhylipuur/image/upload/v1782493223/afe_euvgao.png"
    },
    {
      title: "Aromas of Arabia Barista Workshop",
      date: "August 28, 2026 • 6:30 PM",
      price: "$120.00",
      description: "Explore advanced techniques in integrating organic rose water, orange blossom extracts, and real saffron strands into rich specialty microfoams.",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069447382-h8ij1r-chatgpt-image-may-6-2026-03-04-04-pm.jpg"
    },
    {
      title: "Mediterranean Bread & Spread Artistry",
      date: "September 12, 2026 • 11:00 AM",
      price: "$85.00",
      description: "A gorgeous design workshop covering local sourdough bread scoring, flavor profiles, and styling high-end visual platters for hosting.",
      image: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_29_31%20PM.png"
    }
  ];

  const galleryImages = [
    { src: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777816829809-xb1fh9-8.jpg", size: "col-span-1 row-span-1 md:col-span-2 md:row-span-2 aspect-[4/3]", label: "Intimate Gathering Spaces" },
    { src: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1778069372877-8f3go8-chatgpt-image-may-6-2026-03-01-38-pm.jpg", size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 aspect-square", label: "Lavender Cardamom Latte" },
    { src: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg", size: "col-span-1 row-span-1 md:col-span-1 md:row-span-2 aspect-[2/3]", label: "Marketplace Finds" },
    { src: "https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_02_07%20PM.png", size: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 aspect-square", label: "Kunafa Dessert Plates" },
    { src: "https://res.cloudinary.com/dhylipuur/image/upload/v1782493223/afe_euvgao.png", size: "col-span-1 row-span-1 md:col-span-2 md:row-span-1 aspect-[2/1] md:aspect-[3/1]", label: "Traditional Roastery sand brewing" }
  ];

  return (
    <div className="bg-[#f9f7f2] min-h-screen text-[#231f14] font-sans overflow-x-hidden pt-24 pb-12 selection:bg-[#9da18a] selection:text-white" id="signature-experiences-page">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24" id="experiences-hero">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee3d9] border border-[#b69b79]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#b69b79]" />
              <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#b69b79]">Signature Experiences</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.05] text-[#231f14]">
                Signature <br />
                <span className="italic text-[#b69b79] font-normal">Experiences</span>
              </h1>
              <div className="w-20 h-[2px] bg-[#b69b79] mt-3"></div>
            </div>

            <p className="text-base sm:text-lg text-[#231f14]/80 leading-relaxed font-light max-w-lg">
              More than coffee — thoughtfully crafted moments for taste, connection, creativity, and discovery. Discover the soul of LA SOUQ.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('experience-categories-grid')}
                className="px-8 py-4 bg-[#231f14] text-white hover:bg-[#9da18a] rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase shadow-md shadow-black/5 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore Experiences
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => {
                  setInquiryEventType("Private Event Package");
                  setInquiryModalOpen(true);
                }}
                className="px-8 py-4 border border-[#231f14]/20 hover:border-[#231f14] hover:bg-[#231f14]/5 text-[#231f14] rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Private Event
              </button>
            </div>
          </div>

          {/* Right Collage Column */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              
              {/* Primary Large Image */}
              <div className="col-span-8 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl border-4 border-white/50 relative group">
                <img 
                  src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777883362118-yx1u2n-generated-image-may-04-2026-11-25am-1.jpg" 
                  alt="Specialty Roasting Craft" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>

              {/* Stack of Secondary Images */}
              <div className="col-span-4 space-y-4">
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border-2 border-white relative group">
                  <img 
                    src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/ChatGPT%20Image%20Jun%2011,%202026,%2002_02_07%20PM.png" 
                    alt="Premium Desserts" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border-2 border-white relative group">
                  <img 
                    src="https://res.cloudinary.com/dhylipuur/image/upload/v1782493223/afe_euvgao.png" 
                    alt="Slow sand brewing workshops" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border-2 border-white relative group">
                  <img 
                    src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777814992479-nt047i-la-souq-18.jpg" 
                    alt="Boutique Marketplace Crafts" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Absolute Decorative Blob */}
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#9da18a]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#b69b79]/15 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </section>

      {/* 2. Brand Story Section */}
      <section className="bg-[#f2efe6] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-[#b69b79]/10 relative overflow-hidden" id="experiences-story">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-[#b69b79] block">Our Philosophy</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#231f14] leading-tight font-light">
            Designed for Moments <br />
            <span className="italic text-[#b69b79]">That Stay With You</span>
          </h2>
          
          <div className="w-16 h-0.5 bg-[#b69b79] mx-auto"></div>

          <p className="text-base sm:text-xl text-[#231f14]/75 leading-relaxed font-light max-w-2xl mx-auto italic">
            “At La Souq, every detail is created to feel intentional — from handcrafted drinks and gourmet bites to curated workshops and intimate gatherings. Our Signature Experiences bring together flavor, culture, creativity, and community in a beautifully designed setting.”
          </p>
          
          <div className="pt-4">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#231f14]/50">ROASTERY • MARKETPLACE • LIFESTYLE</span>
          </div>
        </div>

        {/* Subtle Decorative Elements */}
        <div className="absolute top-1/2 left-4 w-12 h-px bg-[#b69b79]/20 hidden md:block" />
        <div className="absolute top-1/2 right-4 w-12 h-px bg-[#b69b79]/20 hidden md:block" />
      </section>

      {/* 3. Experience Categories Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="experience-categories-grid">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-[#b69b79] block">Curated Portfolios</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#231f14] leading-none">Experience Categories</h2>
          <p className="text-sm font-light text-[#231f14]/60 max-w-md mx-auto">Click any category block below to explore detailed curated menus and offerings.</p>
          <div className="w-16 h-0.5 bg-[#b69b79] mx-auto mt-4"></div>
        </div>

        {/* 6 Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {Object.entries(CATEGORY_DETAILS).map(([title, details], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedCategory(title)}
              className="group bg-[#fdfbf7] rounded-[2.5rem] overflow-hidden border border-[#b69b79]/15 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(35,31,20,0.08)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-full"
            >
              <div>
                {/* Large Rounded Image Frame */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={details.image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Accent Badge */}
                  <div className="absolute bottom-4 left-4 bg-[#f9f7f2]/90 backdrop-blur-xs py-1 px-3.5 rounded-full border border-[#b69b79]/20">
                    <span className="text-[9px] tracking-wider font-bold uppercase text-[#b69b79]">
                      {details.accent}
                    </span>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-8 text-left space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest font-bold uppercase text-[#9da18a]">
                      {details.subtitle}
                    </span>
                    <h3 className="text-2xl font-serif text-[#231f14] group-hover:text-[#b69b79] transition-colors">
                      {title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-light text-[#231f14]/70 leading-relaxed line-clamp-3">
                    {details.description}
                  </p>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="px-8 pb-8 pt-2 text-left">
                <div className="w-full h-px bg-[#b69b79]/10 mb-5" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#b69b79] inline-flex items-center gap-1.5 transition-colors group-hover:text-[#231f14]">
                  Explore Curated Menu
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Featured Experience Section */}
      <section className="bg-[#f2efe6] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-[#b69b79]/10 relative overflow-hidden" id="featured-private-events">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white/40 group">
              <img 
                src="https://erhdgpknnzmatcgengpx.supabase.co/storage/v1/object/public/site-assets/courses/1777816829809-xb1fh9-8.jpg" 
                alt="Intimate Gatherings at La Souq" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
            </div>
            
            {/* Absolute badge overlay */}
            <div className="absolute -bottom-6 -right-6 bg-[#fcfbfa] p-6 rounded-[2rem] shadow-xl border border-[#b69b79]/15 max-w-[220px] text-left hidden sm:block">
              <Star className="w-5 h-5 text-[#b69b79] mb-2" />
              <p className="text-xs font-bold uppercase tracking-wider text-[#231f14] mb-1">Architectural Sanctuary</p>
              <p className="text-[10px] text-[#231f14]/60 font-light leading-relaxed">Designed with luxury arches and gorgeous morning light.</p>
            </div>
          </div>

          {/* Right Text & Highlights Column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-[#b69b79] block">Exquisite Hosting</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#231f14] leading-tight font-light">
              Host Your Moment <br />
              <span className="italic text-[#b69b79]">at La Souq</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[#231f14]/75 leading-relaxed font-light">
              Whether you are planning a private gathering, a brand event, a creative workshop, or a beautiful afternoon with friends, La Souq offers an atmosphere made for meaningful connection.
            </p>

            <div className="w-16 h-0.5 bg-[#b69b79]" />

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-2">
              {[
                "Private gatherings",
                "Coffee workshops",
                "Dessert experiences",
                "Curated gifting",
                "Community events",
                "Brand activations"
              ].map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#eee3d9] border border-[#b69b79]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#b69b79]" />
                  </div>
                  <span className="text-sm font-semibold text-[#231f14]">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => {
                  setInquiryEventType("Private Celebration / Gathering");
                  setInquiryModalOpen(true);
                }}
                className="px-8 py-4 bg-[#231f14] text-white hover:bg-[#9da18a] rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase shadow-md flex items-center gap-2"
              >
                Inquire About Private Events
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Upcoming Experiences (Workshops) Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="upcoming-workshops">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-[#b69b79] block">Limited Availability</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#231f14]">Upcoming Experiences</h2>
          <p className="text-sm font-light text-[#231f14]/60 max-w-md mx-auto">Reserve your place in our seasonal masterclasses. Intimate seating sizes.</p>
          <div className="w-16 h-0.5 bg-[#b69b79] mx-auto mt-4"></div>
        </div>

        {/* Horizontal Card Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.title}
              whileHover={{ y: -6 }}
              className="bg-[#fdfbf7] rounded-[2rem] overflow-hidden border border-[#b69b79]/15 shadow-sm p-5 flex flex-col justify-between h-full"
            >
              <div className="space-y-5">
                {/* Event Image Banner */}
                <div className="h-48 rounded-[1.5rem] overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#231f14] text-white py-1 px-3 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {event.price}
                  </div>
                </div>

                {/* Event text details */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2 text-[#b69b79]">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-[10px] tracking-widest font-bold uppercase">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-serif text-[#231f14] font-bold leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#231f14]/70 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Booking Trigger Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    setSelectedWorkshop(event.title);
                    setReservationDate(event.date.split(" • ")[0]);
                    setReservationModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full border border-[#231f14] text-[#231f14] hover:bg-[#231f14] hover:text-white text-[10px] font-bold tracking-[0.25em] transition-all duration-300 uppercase"
                >
                  Reserve Your Spot
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Gallery Section */}
      <section className="bg-[#f2efe6] py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-y border-[#b69b79]/10" id="editorial-moments-gallery">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-[#b69b79] block">Atmospheric Aesthetics</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[#231f14] leading-none">Moments From La Souq</h2>
            <div className="w-16 h-0.5 bg-[#b69b79] mx-auto mt-4"></div>
          </div>

          {/* Editorial masonry layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                className={`${img.size} rounded-[2rem] overflow-hidden shadow-md group relative`}
              >
                <img 
                  src={img.src} 
                  alt={img.label} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual shade banner on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end text-left">
                  <span className="text-white text-xs tracking-widest font-bold uppercase font-sans mb-1">LA SOUQ</span>
                  <p className="text-white/80 text-sm font-serif italic">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-8" id="experiences-final-cta">
        <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-[#b69b79] block">Your Moment Awaits</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#231f14] leading-tight font-light">
          Ready to Experience <br />
          <span className="italic text-[#b69b79]">La Souq?</span>
        </h2>
        
        <p className="text-base sm:text-lg text-[#231f14]/70 leading-relaxed max-w-xl mx-auto font-light">
          Explore our signature offerings, reserve a workshop, or plan a private gathering designed around your moment.
        </p>

        <div className="w-16 h-0.5 bg-[#b69b79] mx-auto"></div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button 
            onClick={() => scrollToSection('upcoming-workshops')}
            className="px-8 py-4 bg-[#231f14] text-white hover:bg-[#9da18a] rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase shadow-md flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
          >
            Book an Experience
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => {
              setInquiryEventType("General Collaboration");
              setInquiryModalOpen(true);
            }}
            className="px-8 py-4 border border-[#231f14]/20 hover:border-[#231f14] hover:bg-[#231f14]/5 text-[#231f14] rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 uppercase hover:-translate-y-0.5 active:translate-y-0"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Category Curated Menu Detail Modal */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-end md:items-center justify-center p-0 md:p-6 cursor-pointer" 
          onClick={() => setSelectedCategory(null)}
        >
          <motion.div 
            initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="relative bg-[#fcfbfa] w-full max-w-4xl rounded-t-[2.5rem] rounded-b-none md:rounded-[2.5rem] shadow-2xl overflow-hidden cursor-default grid grid-cols-1 md:grid-cols-12 max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pull Handle for mobile */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/40 backdrop-blur-sm rounded-full z-30 md:hidden" />

            {/* Close button */}
            <button 
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-black/5 text-[#231f14] transition-colors z-30"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Panel */}
            <div className="md:col-span-5 h-[200px] md:h-full relative overflow-hidden bg-black/5">
              <img 
                src={CATEGORY_DETAILS[selectedCategory].image} 
                alt={selectedCategory}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white text-left space-y-1">
                <span className="text-[9px] tracking-[0.3em] font-bold uppercase text-[#eee3d9] block">Curated Flight</span>
                <h4 className="text-2xl font-serif font-light">{selectedCategory}</h4>
              </div>
            </div>

            {/* Menu details content */}
            <div className="md:col-span-7 p-6 sm:p-8 md:p-12 flex flex-col justify-between overflow-y-auto max-h-[calc(95vh-200px)] md:max-h-[85vh]">
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-2xl font-serif font-light text-[#231f14] mb-3">
                    {selectedCategory}
                  </h3>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-[#231f14]/75">
                    {CATEGORY_DETAILS[selectedCategory].description}
                  </p>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#b69b79] block border-b border-[#b69b79]/15 pb-2 font-sans">
                    Handpicked Offerings
                  </span>
                  <div className="space-y-5 divide-y divide-[#b69b79]/10">
                    {CATEGORY_DETAILS[selectedCategory].offerings.map((item, idx) => (
                      <div key={idx} className={`pt-4 ${idx === 0 ? 'pt-0' : ''} flex items-start justify-between gap-4 text-left`}>
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold tracking-wider text-[#231f14] uppercase font-sans">
                            {item.name}
                          </h5>
                          <p className="text-xs font-light text-[#231f14]/60 leading-relaxed max-w-[360px]">
                            {item.desc}
                          </p>
                        </div>
                        {item.price && (
                          <span className="text-sm font-serif text-[#b69b79] font-medium whitespace-nowrap">
                            {item.price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action and close footer */}
              <div className="mt-8 pt-6 border-t border-[#b69b79]/10 flex flex-wrap gap-4 justify-end items-center">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-black/5 text-[#231f14]"
                >
                  Close Catalog
                </button>
                <a
                  href="https://order.toasttab.com/online/la-souq-richardson-dallas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#231f14] text-white hover:bg-[#9da18a] rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all"
                >
                  Order Online →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Workshop Reservation Modal */}
      {reservationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#fcfbfa] w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-[#b69b79]/20 relative"
          >
            <button 
              onClick={() => setReservationModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-black/5 text-[#231f14]"
            >
              <X className="w-5 h-5" />
            </button>

            {reservationSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#eee3d9] border border-[#b69b79]/20 text-[#b69b79] rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#231f14]">Reservation Requested</h3>
                <p className="text-sm font-light text-[#231f14]/75 max-w-xs mx-auto">
                  Thank you! We have logged your request for <strong>{selectedWorkshop}</strong>. An email invite confirmation will arrive shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-6 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#b69b79]">Experience Registration</span>
                  <h3 className="text-2xl font-serif text-[#231f14]">Reserve Your Spot</h3>
                  <p className="text-xs font-light text-[#231f14]/60">{selectedWorkshop}</p>
                </div>

                <div className="w-12 h-0.5 bg-[#b69b79]" />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b69b79]" />
                      <input 
                        type="text" 
                        required
                        value={reservationName}
                        onChange={(e) => setReservationName(e.target.value)}
                        placeholder="e.g. Elena Rostova" 
                        className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-3 pl-10 pr-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b69b79]" />
                      <input 
                        type="email" 
                        required
                        value={reservationEmail}
                        onChange={(e) => setReservationEmail(e.target.value)}
                        placeholder="elena@example.com" 
                        className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-3 pl-10 pr-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b69b79]" />
                        <input 
                          type="tel" 
                          value={reservationPhone}
                          onChange={(e) => setReservationPhone(e.target.value)}
                          placeholder="(555) 000-0000" 
                          className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-3 pl-10 pr-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Guests *</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b69b79]" />
                        <select 
                          value={reservationGuests}
                          onChange={(e) => setReservationGuests(e.target.value)}
                          className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-3 pl-10 pr-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all appearance-none"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5">5+ Guests</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#231f14] hover:bg-[#9da18a] text-white text-[10px] font-bold tracking-[0.25em] transition-all duration-300 uppercase rounded-full shadow-md"
                >
                  Submit Reservation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Private Event Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#fcfbfa] w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-[#b69b79]/20 relative"
          >
            <button 
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-black/5 text-[#231f14]"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#eee3d9] border border-[#b69b79]/20 text-[#b69b79] rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#231f14]">Inquiry Logged</h3>
                <p className="text-sm font-light text-[#231f14]/75 max-w-xs mx-auto">
                  Thank you! Our hosting coordinator will reach out via email within 24 hours to design your custom experience.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-5 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#b69b79]">Bespoke Gatherings</span>
                  <h3 className="text-2xl font-serif text-[#231f14]">Private Event Inquiry</h3>
                  <p className="text-xs font-light text-[#231f14]/60">Customize your atmosphere and coffee flight.</p>
                </div>

                <div className="w-12 h-0.5 bg-[#b69b79]" />

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Robert Vance" 
                      className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-2.5 px-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Email *</label>
                      <input 
                        type="email" 
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="robert@example.com" 
                        className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-2.5 px-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Phone</label>
                      <input 
                        type="tel" 
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="(214) 555-0199" 
                        className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-2.5 px-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Event Type</label>
                      <select 
                        value={inquiryEventType}
                        onChange={(e) => setInquiryEventType(e.target.value)}
                        className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-2.5 px-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all appearance-none"
                      >
                        <option value="Private Celebration">Private Celebration</option>
                        <option value="Brand Activation">Brand Activation</option>
                        <option value="Workshop Studio">Workshop Studio</option>
                        <option value="Afternoon Tea Flight">Afternoon Tea / Coffee Flight</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Expected Guests</label>
                      <input 
                        type="number" 
                        value={inquiryGuests}
                        onChange={(e) => setInquiryGuests(e.target.value)}
                        placeholder="e.g. 25" 
                        className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 py-2.5 px-4 text-xs font-light outline-none focus:border-[#b69b79] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#231f14]/60">Notes / Vision</label>
                    <textarea 
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Share a short note about what you are visioning..." 
                      className="w-full bg-white/50 focus:bg-white rounded-xl border border-[#b69b79]/20 p-4 text-xs font-light h-20 outline-none resize-none focus:border-[#b69b79] transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#231f14] hover:bg-[#9da18a] text-white text-[10px] font-bold tracking-[0.25em] transition-all duration-300 uppercase rounded-full shadow-md"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
}
