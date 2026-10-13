import { ArrowDown, ArrowUpRight, Clock, Mail, MapPin, Phone, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const collections = [
  {
    name: 'Cups',
    eyebrow: 'For the daily ritual',
    description: 'Distinctive cups chosen to make every coffee and tea ritual feel a little more considered.',
    image: 'https://res.cloudinary.com/dhylipuur/image/upload/v1785964149/cap_cpfy2u.jpg',
  },
  {
    name: 'Olive Oil',
    eyebrow: 'From the grove',
    description: 'Beautiful bottles of olive oil selected for their character, quality, and place at the table.',
    image: 'https://res.cloudinary.com/dhylipuur/image/upload/v1785964205/olive_hlqbax.jpg',
  },
  {
    name: 'Honey & Pantry',
    eyebrow: 'From the pantry',
    description: 'Golden honey and small-batch pantry goods with a story, a place, and a maker behind them.',
    image: 'https://res.cloudinary.com/dhylipuur/image/upload/v1785964204/honey_vfgmz3.jpg',
  },
  {
    name: 'Chocolate & Sweets',
    eyebrow: 'A little pleasure',
    description: 'Gift-worthy chocolates and sweet discoveries, curated for generous moments and quiet ones.',
    image: 'https://res.cloudinary.com/dhylipuur/image/upload/v1785964207/chocolate_ukoljk.jpg',
  },
];

export default function MarketplacePage() {
  const reducedMotion = useReducedMotion();
  const [contactOpen, setContactOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const visitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!contactOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      visitButtonRef.current?.focus();
    };
  }, [contactOpen]);

  return (
    <main className="overflow-hidden bg-[#f4f4f4] pt-20 text-coffee-dark md:pt-24">
      <section className="relative min-h-[78vh] px-6 py-14 sm:py-20 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute -right-36 top-6 h-96 w-96 rounded-full bg-[#b69b79]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-48 top-1/3 h-80 w-80 rounded-full bg-[#9da18a]/10 blur-3xl" aria-hidden="true" />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1, ease: [0.19, 1, 0.22, 1] }}
          className="relative mx-auto max-w-7xl text-center"
        >
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.15, duration: 0.7 }} className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#9a7958]">Objects with a story</motion.p>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.25, duration: 0.9, ease: [0.19, 1, 0.22, 1] }} className="mx-auto mt-4 max-w-5xl font-serif text-4xl font-normal uppercase leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Curated <span className="text-[#8c7255]">Marketplace</span>
          </motion.h1>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.4, duration: 0.8 }} className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-coffee-dark/70 sm:text-base">
            A collection of beautiful, useful things discovered across cultures and chosen with intention—from cups and bottles to honey, chocolate, and gifts worth sharing.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-3 sm:gap-5 lg:mt-20 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <motion.figure
              key={collection.name}
              initial={reducedMotion ? false : { opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.12 * index, duration: reducedMotion ? 0 : 0.9, ease: [0.19, 1, 0.22, 1] }}
              whileHover={reducedMotion ? undefined : { y: -10, transition: { duration: 0.55, ease: [0.19, 1, 0.22, 1] } }}
              className={`group relative overflow-hidden rounded-[1.8rem] bg-[#eee3d9] shadow-[0_20px_50px_-25px_rgba(35,31,20,0.28)] transition-shadow duration-700 hover:shadow-[0_35px_65px_-24px_rgba(35,31,20,0.38)] ${index % 2 ? 'mt-8 lg:mt-14' : ''}`}
            >
              <img src={collection.image} alt={collection.name} className="aspect-[3/4] h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06] motion-reduce:transition-none" decoding="async" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-coffee-dark/75 via-coffee-dark/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left text-white opacity-90 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-white/70">{collection.eyebrow}</span>
                <span className="mt-1 block font-serif text-xl leading-tight sm:text-2xl">{collection.name}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-14 flex justify-center lg:mt-20">
          <motion.a
            href="#collections"
            whileHover={reducedMotion ? undefined : { scale: 1.05 }}
            whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            className="group relative inline-flex items-center gap-4 overflow-hidden border border-coffee-dark px-12 py-5 text-[11px] font-bold uppercase tracking-[0.4em]"
          >
            <span className="relative z-10 flex items-center gap-4 transition-colors duration-500 group-hover:text-white">
              Explore the collection
              <motion.span animate={reducedMotion ? undefined : { y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ArrowDown size={15} aria-hidden="true" />
              </motion.span>
            </span>
            <span className="absolute inset-0 translate-y-full bg-coffee-dark transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:transition-none" aria-hidden="true" />
          </motion.a>
        </div>
      </section>

      <section id="collections" className="relative bg-[#b69b79] px-6 py-20 sm:py-28 md:px-12 lg:px-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.19, 1, 0.22, 1] }} className="mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#f4f4f4]">Found in the souq</p>
            <h2 className="mt-1 font-serif text-3xl font-light leading-tight tracking-normal text-coffee-dark sm:text-4xl md:whitespace-nowrap md:text-[60px]">Things to keep. Things to give.</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {collections.map((collection, index) => (
              <motion.article
                key={collection.name}
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: reducedMotion ? 0 : (index % 2) * 0.1, duration: reducedMotion ? 0 : 0.9, ease: [0.19, 1, 0.22, 1] }}
                whileHover={reducedMotion ? undefined : { y: -8, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }}
                className="group grid min-h-[360px] overflow-hidden rounded-[2.5rem] bg-[#eee3d9] shadow-[0_18px_45px_-28px_rgba(35,31,20,0.35)] transition-shadow duration-700 hover:shadow-[0_30px_60px_-25px_rgba(35,31,20,0.45)] sm:grid-cols-[1fr_46%]"
              >
                <div className="relative flex flex-col justify-between p-7 sm:p-10">
                  <span className="absolute right-7 top-7 font-serif text-2xl text-[#b69b79]/45 sm:right-10 sm:top-9">0{index + 1}</span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#9a7958]">{collection.eyebrow}</p>
                    <h3 className="mt-4 text-3xl font-light leading-none sm:text-4xl">{collection.name}</h3>
                    <div className="my-6 h-px w-12 bg-[#b69b79] transition-all duration-700 group-hover:w-24 motion-reduce:transition-none" />
                    <p className="max-w-sm text-sm leading-7 text-coffee-dark/65">{collection.description}</p>
                  </div>
                  <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-dark/50">Available in store</p>
                </div>
                <div className="relative min-h-64 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-coffee-dark/5 opacity-100 transition-opacity duration-700 group-hover:opacity-0" aria-hidden="true" />
                  <img src={collection.image} alt="" className="h-full w-full object-cover grayscale-[8%] transition-all duration-[1200ms] group-hover:scale-[1.07] group-hover:grayscale-0 motion-reduce:transition-none" loading="lazy" decoding="async" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f4f4f4] px-6 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b69b79]/20" aria-hidden="true" />
        <motion.div initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reducedMotion ? 0 : 1, ease: [0.19, 1, 0.22, 1] }} className="relative mx-auto max-w-4xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#9a7958]">The collection changes with discovery</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light sm:text-6xl">Come see what is on the shelves.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-coffee-dark/65">Visit LA SOUQ to explore the current marketplace selection and find something for your home, your table, or someone you love.</p>
          <motion.button ref={visitButtonRef} type="button" onClick={() => setContactOpen(true)} whileHover={reducedMotion ? undefined : { scale: 1.05 }} whileTap={reducedMotion ? undefined : { scale: 0.95 }} className="group relative mt-8 inline-flex items-center gap-4 overflow-hidden border border-coffee-dark px-10 py-5 text-[11px] font-bold uppercase tracking-[0.35em]">
            <span className="relative z-10 flex items-center gap-4 transition-colors duration-500 group-hover:text-white">Plan your visit <ArrowUpRight size={16} aria-hidden="true" /></span>
            <span className="absolute inset-0 translate-y-full bg-coffee-dark transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:transition-none" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </section>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-coffee-dark/55 p-4 backdrop-blur-sm"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={event => { if (event.target === event.currentTarget) setContactOpen(false); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="visit-dialog-title"
              initial={reducedMotion ? false : { opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-[#f4f4f4] shadow-2xl"
            >
              <div className="h-2 bg-[#b69b79]" />
              <button ref={closeButtonRef} type="button" onClick={() => setContactOpen(false)} className="absolute right-5 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-coffee-dark/20 transition-colors hover:bg-coffee-dark hover:text-white sm:right-7 sm:top-8" aria-label="Close contact information">
                <X size={18} aria-hidden="true" />
              </button>
              <div className="p-7 sm:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#9a7958]">Visit LA SOUQ</p>
                <h2 id="visit-dialog-title" className="mt-3 pr-12 text-4xl font-light sm:text-5xl">Richardson Main</h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-coffee-dark/65">Come explore the current marketplace collection, enjoy a coffee, and discover what is new on the shelves.</p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a href="https://www.google.com/maps/search/?api=1&query=150+W+Main+Street+Suite+900+Richardson+TX+75081" target="_blank" rel="noopener noreferrer" className="group flex min-h-28 items-start gap-4 rounded-3xl bg-[#eee3d9] p-5 transition-transform duration-500 hover:-translate-y-1 motion-reduce:transition-none">
                    <MapPin className="mt-0.5 shrink-0 text-[#9a7958]" size={20} aria-hidden="true" />
                    <span><strong className="block text-xs uppercase tracking-[0.18em]">Address</strong><span className="mt-2 block text-sm leading-6 text-coffee-dark/70">150 W Main Street, Suite 900<br />Richardson, TX 75081</span></span>
                  </a>
                  <div className="flex min-h-28 items-start gap-4 rounded-3xl bg-[#eee3d9] p-5">
                    <Clock className="mt-0.5 shrink-0 text-[#9a7958]" size={20} aria-hidden="true" />
                    <span><strong className="block text-xs uppercase tracking-[0.18em]">Hours</strong><span className="mt-2 block text-sm leading-6 text-coffee-dark/70">Monday–Sunday<br />8:00am–10:00pm</span></span>
                  </div>
                  <a href="tel:+12816867750" className="flex items-center gap-4 rounded-3xl border border-coffee-dark/10 p-5 transition-colors hover:bg-[#eee3d9]">
                    <Phone className="shrink-0 text-[#9a7958]" size={20} aria-hidden="true" /><span><strong className="block text-xs uppercase tracking-[0.18em]">Call</strong><span className="mt-1 block text-sm text-coffee-dark/70">281-686-7750</span></span>
                  </a>
                  <a href="mailto:info@lasouq.com" className="flex items-center gap-4 rounded-3xl border border-coffee-dark/10 p-5 transition-colors hover:bg-[#eee3d9]">
                    <Mail className="shrink-0 text-[#9a7958]" size={20} aria-hidden="true" /><span><strong className="block text-xs uppercase tracking-[0.18em]">Email</strong><span className="mt-1 block text-sm text-coffee-dark/70">info@lasouq.com</span></span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
