import { useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Phones', 'Tablets', 'TVs', 'Wearables', 'Appliances']

const PRODUCTS = [
  { id: 1, name: 'Nova S25 Ultra', tagline: '200MP · 5000mAh · AI-powered', price: 'From XAF 750,000', badge: 'New', accent: '#0071e3', category: 'Phones' },
  { id: 2, name: 'Nova S25+', tagline: '12GB RAM · 256GB · Triple cam', price: 'From XAF 550,000', badge: 'Popular', accent: '#7c3aed', category: 'Phones' },
  { id: 3, name: 'Nova Fold 6', tagline: 'Foldable · 7.6" · Flex mode', price: 'From XAF 1,200,000', badge: 'Premium', accent: '#0891b2', category: 'Phones' },
  { id: 4, name: 'NovaTab Pro 12', tagline: 'AMOLED · S-Pen · 12GB RAM', price: 'From XAF 480,000', accent: '#059669', category: 'Tablets' },
  { id: 5, name: 'Nova Watch 7', tagline: 'Health · 3-day battery · IP68', price: 'From XAF 180,000', badge: 'New', accent: '#dc2626', category: 'Wearables' },
  { id: 6, name: 'NovaCrystal 65"', tagline: '4K 144Hz · Dolby Vision', price: 'From XAF 850,000', accent: '#ea580c', category: 'TVs' },
  { id: 7, name: 'Nova Buds Pro 2', tagline: 'ANC · 30hr · Hi-Fi audio', price: 'From XAF 95,000', accent: '#7c3aed', category: 'Wearables' },
  { id: 8, name: 'NovaFrost 500L', tagline: 'Inverter · WiFi · Energy A+', price: 'From XAF 420,000', accent: '#0284c7', category: 'Appliances' },
]

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.products-heading', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.products-heading', start: 'top 85%' }
    })
    gsap.fromTo('.product-card-item', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: '.products-grid', start: 'top 80%' }
    })
  }, { scope: sectionRef })

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <section id="products" ref={sectionRef}
      className="container mx-auto px-5 2xl:px-0 py-20 lg:py-32">

      {/* Heading */}
      <div className="products-heading flex-between flex-wrap gap-4 mb-10 opacity-0">
        <div>
          <p className="font-semibold text-sm uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-primary)' }}>Our Products</p>
          <h2 className="font-bold text-4xl lg:text-5xl" style={{ color: 'var(--text)' }}>Built for you.</h2>
        </div>
        <a href="#" className="flex items-center gap-1.5 font-semibold text-sm transition-all duration-300 hover:gap-3"
          style={{ color: 'var(--color-primary)' }}>
          View all <ArrowRight size={14} />
        </a>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300"
            style={activeCategory === cat
              ? { backgroundColor: 'var(--color-primary)', color: '#fff' }
              : { backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="product-card-item opacity-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product: { name, tagline, price, badge, accent } }) {
  return (
    <div className="group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
      {/* Visual */}
      <div className="relative h-52 flex-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}12 0%, ${accent}06 100%)` }}>
        {badge && (
          <span className="absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-full text-white z-10"
            style={{ backgroundColor: accent }}>{badge}</span>
        )}
        <DeviceSVG accent={accent} name={name} />
      </div>
      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-base mb-0.5" style={{ color: 'var(--text)' }}>{name}</h3>
        <p className="font-regular text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{tagline}</p>
        <div className="flex-between">
          <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{price}</span>
          <button className="flex items-center gap-1 font-semibold text-xs transition-all duration-300 group/btn"
            style={{ color: accent }}>
            Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

function DeviceSVG({ accent, name }) {
  const lower = name.toLowerCase()
  if (lower.includes('watch')) return (
    <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
      <rect x="28" y="4" width="24" height="16" rx="3" fill={accent} fillOpacity="0.3"/>
      <rect x="28" y="90" width="24" height="16" rx="3" fill={accent} fillOpacity="0.3"/>
      <rect x="12" y="22" width="56" height="66" rx="18" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.5"/>
      <circle cx="40" cy="55" r="18" fill={accent} fillOpacity="0.1"/>
      <line x1="40" y1="43" x2="40" y2="55" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="55" x2="48" y2="60" stroke={accent} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
  if (lower.includes('tv') || lower.includes('crystal')) return (
    <svg width="160" height="100" viewBox="0 0 160 100" fill="none">
      <rect x="4" y="4" width="152" height="82" rx="6" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      <rect x="12" y="11" width="136" height="68" rx="3" fill={accent} fillOpacity="0.07"/>
      <rect x="60" y="88" width="40" height="6" rx="3" fill={accent} fillOpacity="0.3"/>
      <rect x="68" y="90" width="24" height="4" rx="2" fill={accent} fillOpacity="0.2"/>
    </svg>
  )
  if (lower.includes('tab')) return (
    <svg width="110" height="140" viewBox="0 0 110 140" fill="none">
      <rect x="6" y="4" width="98" height="132" rx="12" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      <rect x="14" y="14" width="82" height="112" rx="6" fill={accent} fillOpacity="0.07"/>
      <circle cx="55" cy="132" r="4" fill={accent} fillOpacity="0.3"/>
    </svg>
  )
  if (lower.includes('bud') || lower.includes('frost') || lower.includes('nova')) return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <rect x="15" y="15" width="70" height="70" rx="18" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="20" fill={accent} fillOpacity="0.15"/>
      <circle cx="50" cy="50" r="10" fill={accent} fillOpacity="0.3"/>
    </svg>
  )
  // Phone default
  return (
    <svg width="72" height="136" viewBox="0 0 72 136" fill="none">
      <rect x="3" y="3" width="66" height="130" rx="14" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5"/>
      <rect x="9" y="11" width="54" height="108" rx="8" fill={accent} fillOpacity="0.06"/>
      <circle cx="36" cy="126" r="4" fill={accent} fillOpacity="0.3"/>
      <rect x="24" y="7" width="24" height="4" rx="2" fill={accent} fillOpacity="0.3"/>
      <rect x="65" y="35" width="7" height="24" rx="3.5" fill={accent} fillOpacity="0.3"/>
    </svg>
  )
}
