import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'
import { useStaggerReveal } from '../../hooks/useGSAP'
import { useFadeInUp } from '../../hooks/useGSAP'

const CATEGORIES = ['All', 'Phones', 'Tablets', 'TVs', 'Wearables', 'Appliances']

const PRODUCTS = [
  {
    id: 1,
    name: 'Nova S25 Ultra',
    tagline: '200MP camera · 5000mAh · AI-powered',
    price: 'From XAF 750,000',
    badge: 'New',
    accentColor: '#1428a0',
    category: 'Phones',
  },
  {
    id: 2,
    name: 'Nova S25+',
    tagline: '12GB RAM · 256GB · Triple camera',
    price: 'From XAF 550,000',
    badge: 'Popular',
    accentColor: '#8b5cf6',
    category: 'Phones',
  },
  {
    id: 3,
    name: 'Nova Fold 6',
    tagline: 'Foldable · 7.6" display · Flex mode',
    price: 'From XAF 1,200,000',
    badge: 'Premium',
    accentColor: '#0891b2',
    category: 'Phones',
  },
  {
    id: 4,
    name: 'NovaTab Pro 12',
    tagline: 'AMOLED · S-Pen included · 12GB RAM',
    price: 'From XAF 480,000',
    accentColor: '#059669',
    category: 'Tablets',
  },
  {
    id: 5,
    name: 'Nova Watch 7',
    tagline: 'Health tracker · 3-day battery · IP68',
    price: 'From XAF 180,000',
    badge: 'New',
    accentColor: '#dc2626',
    category: 'Wearables',
  },
  {
    id: 6,
    name: 'NovaCrystal 65" QLED',
    tagline: '4K 144Hz · Dolby Vision · Smart TV',
    price: 'From XAF 850,000',
    accentColor: '#ea580c',
    category: 'TVs',
  },
  {
    id: 7,
    name: 'Nova Buds Pro 2',
    tagline: 'ANC · 30hr battery · Hi-Fi audio',
    price: 'From XAF 95,000',
    accentColor: '#7c3aed',
    category: 'Wearables',
  },
  {
    id: 8,
    name: 'NovaFrost 500L',
    tagline: 'Inverter · WiFi control · Energy A+',
    price: 'From XAF 420,000',
    accentColor: '#0284c7',
    category: 'Appliances',
  },
]

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const headingRef = useFadeInUp()
  const gridRef = useStaggerReveal('.product-card', { stagger: 0.08 })

  const filtered = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="section bg-[var(--color-bg-secondary)] dark:bg-[var(--color-dark-bg-secondary)]">
      <div className="container mx-auto">
        {/* Header */}
        <div ref={headingRef} className="flex-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] mb-2 uppercase tracking-widest">
              Our Products
            </p>
            <h2 className="font-black text-4xl lg:text-5xl text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
              Built for you.
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] hover:gap-3 transition-all duration-300"
          >
            View all products <ArrowRight size={15} />
          </a>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer
                ${activeCategory === cat
                  ? 'bg-[var(--color-brand)] text-white shadow-lg scale-105'
                  : 'bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface)] text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-dark-border)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
