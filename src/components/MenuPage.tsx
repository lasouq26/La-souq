import { ArrowLeft, ArrowRight, Coffee, Pause, Play, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { menuCategories, toastItemUrl, type MenuItem } from '../data/menu';

function MenuCard({ item }: { item: MenuItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.19, 1, 0.22, 1] }}
      whileHover={reducedMotion ? undefined : { y: -12, scale: 1.02, transition: { duration: 0.6 } }}
      className="group relative flex min-h-[270px] w-[min(310px,82vw)] shrink-0 overflow-hidden rounded-[2.5rem] border border-[#b69b79]/15 bg-[#fdfaf7] shadow-[0_20px_50px_-20px_rgba(35,31,20,0.1)] transition-shadow duration-700 hover:shadow-[0_40px_80px_-15px_rgba(35,31,20,0.15)] sm:min-h-[300px] sm:w-[380px] md:min-h-[380px] md:w-[520px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" aria-hidden="true" />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between p-5 md:p-10">
        <div>
          <h3 className="font-heading text-lg uppercase leading-tight tracking-tight text-coffee-dark md:text-2xl">{item.name}</h3>
          <div className="my-4 h-px w-12 bg-[#b69b79]/40 transition-all duration-700 group-hover:w-20 group-hover:bg-[#b69b79]/70 motion-reduce:transition-none md:my-6" />
          {item.description && <p className="text-xs font-light italic leading-relaxed text-coffee-dark/65 md:text-sm">{item.description}</p>}
        </div>
        <span className="mt-6 self-start rounded-full border border-[#b69b79]/15 bg-white/80 px-3 py-1.5 text-xs font-bold tracking-widest text-[#8a7052] shadow-sm md:px-4">{item.price || 'Price on Toast'}</span>
      </div>
      <div className="relative flex w-[105px] shrink-0 items-center justify-center overflow-hidden bg-[#eee3d9] sm:w-[140px] md:w-[210px]">
        {item.image && !imageFailed ? (
          <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover grayscale-[10%] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 motion-reduce:transform-none motion-reduce:transition-none" loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        ) : (
          <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-[#b69b79]/30 bg-[#fdfaf7]/30" aria-hidden="true"><Coffee className="text-[#b69b79]" size={40} strokeWidth={1} /></div>
        )}
        <a href={toastItemUrl(item.toastItemPath)} className="absolute bottom-5 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#b69b79]/20 bg-white text-coffee-dark shadow-xl transition-all duration-500 hover:bg-coffee-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coffee-dark md:bottom-6 md:right-6 md:group-hover:-translate-y-1 motion-reduce:transition-none" aria-label={`Order ${item.name} on Toast`}>
          <Plus size={22} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

function MenuCarousel({ items, name }: { items: MenuItem[]; name: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const interacting = useRef(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || paused || reducedMotion || items.length < 2) return;
    let frame = 0;
    let previous = 0;
    let position = container.scrollLeft;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(container);
    const scroll = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (visible && !interacting.current && !document.hidden) {
        position += elapsed * 0.025;
        const maximum = container.scrollWidth - container.clientWidth;
        if (position >= maximum) position = 0;
        container.scrollLeft = position;
      } else {
        position = container.scrollLeft;
      }
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused, reducedMotion, items]);

  const move = (direction: number) => {
    setPaused(true);
    scrollRef.current?.scrollBy({ left: direction * (window.innerWidth < 768 ? 334 : 552), behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <div>
      <div className="mb-2 flex justify-end gap-2 px-1">
        {!reducedMotion && items.length > 1 && <button type="button" onClick={() => setPaused(value => !value)} aria-label={`${paused ? 'Play' : 'Pause'} ${name} scrolling`} aria-pressed={paused} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b69b79]/30 transition-colors hover:bg-[#eee3d9]">{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>}
        <button type="button" onClick={() => move(-1)} aria-label={`Previous ${name} items`} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b69b79]/30 transition-colors hover:bg-[#eee3d9]"><ArrowLeft size={18} aria-hidden="true" /></button>
        <button type="button" onClick={() => move(1)} aria-label={`Next ${name} items`} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b69b79]/30 transition-colors hover:bg-[#eee3d9]"><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
      <div ref={scrollRef} role="region" aria-label={`${name} items`} tabIndex={0}
        onMouseEnter={() => { interacting.current = true; }}
        onMouseLeave={() => { interacting.current = false; }}
        onFocusCapture={() => { interacting.current = true; }}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) interacting.current = false; }}
        onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)} onKeyDown={() => setPaused(true)}
        className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-12 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8"
      >
        {items.map(item => <MenuCard key={item.toastItemPath} item={item} />)}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const reducedMotion = useReducedMotion();
  const [categoryId, setCategoryId] = useState('all');
  const visibleCategories = menuCategories
    .filter(category => categoryId === 'all' || category.id === categoryId);
  const resultCount = visibleCategories.reduce((total, category) => total + category.items.length, 0);

  return (
    <main id="menu" className="bg-[#f4f4f4] pt-20 text-coffee-dark md:pt-24">
      <div id="menu-items" className="w-full scroll-mt-24 px-6 pb-20 pt-10">
        <header className="mb-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#b69b79]">Made for Your Kind of Day.</p>
          <h1 className="mx-auto mt-1 max-w-5xl font-serif text-4xl font-normal uppercase leading-tight tracking-tight sm:text-6xl md:text-7xl">Our <span className="text-[#8c7255]">Menu</span></h1>
          <div className="mx-auto mt-6 h-[2px] w-24 bg-[#b69b79]" aria-hidden="true" />
        </header>
        <div className="relative mt-8 flex items-center justify-center pr-20 sm:pr-24">
          <div role="group" aria-label="Menu categories" className="flex flex-wrap justify-center gap-2">
            {[{ id: 'all', name: 'All' }, ...menuCategories].map(category => (
              <button type="button" key={category.id} aria-pressed={categoryId === category.id} onClick={() => setCategoryId(category.id)} className={`min-h-11 rounded-full border px-4 py-2 text-xs transition-colors ${categoryId === category.id ? 'border-coffee-dark bg-coffee-dark text-white' : 'border-coffee-dark/20 bg-transparent hover:bg-[#eee3d9]'}`}>
                {category.name}
              </button>
            ))}
          </div>
          <p role="status" aria-live="polite" className="absolute right-0 text-right text-xs text-coffee-dark/70">{resultCount} {resultCount === 1 ? 'item' : 'items'}{categoryId !== 'all' ? ` in ${menuCategories.find(category => category.id === categoryId)?.name}` : ''}</p>
        </div>

        <div className="space-y-16 pt-12 md:space-y-24">
          {visibleCategories.map(category => (
            <section key={category.id} aria-labelledby={`heading-${category.id}`}>
              <motion.div initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.6 }} className="mb-3 flex items-end justify-between gap-4 pl-2 sm:pl-6 md:pl-12 lg:pl-20">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-[#8a7052]">{category.id === 'signature-coffee' ? 'Handpicked favorites' : 'Thoughtfully crafted'}</p>
                  <h2 id={`heading-${category.id}`} className="font-heading text-4xl uppercase tracking-tight sm:text-5xl md:text-6xl">{category.name}</h2>
                  <p className="mt-2 text-sm text-coffee-dark/70">{category.note}</p>
                </div>
                <span className="text-sm text-[#756047]">{String(category.items.length).padStart(2, '0')}</span>
              </motion.div>
              <MenuCarousel items={category.items} name={category.name} />
            </section>
          ))}
        </div>

      </div>
    </main>
  );
}
