import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useFadeInUp, useStaggerReveal } from '../../hooks/useGSAP'
import Button from '../ui/Button'

const MARQUEE_ITEMS = [
  'Up to 30% off · ',
  'Free shipping nationwide · ',
  'Trade-in your old device · ',
  '0% installment available · ',
  'Official warranty included · ',
  'Same-day delivery in major cities · ',
]

const DEALS = [
  {
    title: 'Student Offer',
    description: 'Verified students get 15% off all devices and free Nova Buds with any phone.',
    discount: '15% OFF',
    color: '#7c3aed',
    bg: 'from-purple-900/20 to-purple-900/5',
    expiry: 'Ends 30 June',
  },
  {
    title: 'Bundle & Save',
    description: 'Buy a Nova S25 + NovaTab and save XAF 120,000. Perfect for work and play.',
    discount: 'Save 120K',
    color: '#059669',
    bg: 'from-emerald-900/20 to-emerald-900/5',
    expiry: 'Limited stock',
  },
  {
    title: 'Trade-In Deal',
    description: 'Trade in any smartphone and get up to XAF 200,000 off your next Nova device.',
    discount: 'Up to 200K',
    color: '#ea580c',
    bg: 'from-orange-900/20 to-orange-900/5',
    expiry: 'Ongoing',
  },
]

export default function PromoSection() {
  const marqueeRef = useRef(null)
  const headingRef = useFadeInUp()
  const cardsRef = useStaggerReveal('.deal-card', { stagger: 0.1 })

  // Infinite marquee animation
  useEffect(() => {
    if (!marqueeRef.current) return
    const el = marqueeRef.current
    const width = el.scrollWidth / 2

    const tween = gsap.to(el, {
      x: -width,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [])

  return (
    <section
      id="deals"
      className="py-20 overflow-hidden relative"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Marquee ticker */}
      <div className="relative overflow-hidden mb-16 border-y border-[var(--color-border)] dark:border-[var(--color-dark-border)] bg-[var(--color-brand)] py-3">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {/* Doubled for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-white text-sm font-bold px-2 inline-flex items-center">
              {item}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mx-2" />
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-5 2xl:px-0">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <p className="text-sm font-bold text-[var(--color-brand)] dark:text-[var(--color-accent)] mb-3 uppercase tracking-widest">
            Exclusive Offers
          </p>
          <h2 className="font-black text-4xl lg:text-5xl text-[var(--color-text)] dark:text-[var(--color-dark-text)]">
            Deals made for Africa.
          </h2>
          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] mt-4 max-w-md mx-auto">
            Localised pricing, mobile money payments, and offers tailored for your market.
          </p>
        </div>

        {/* Deal cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEALS.map((deal) => (
            <div
              key={deal.title}
              className={`deal-card relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${deal.bg}
                border border-[var(--color-border)] dark:border-[var(--color-dark-border)]
                hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Discount badge */}
              <div
                className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-black mb-5"
                style={{ backgroundColor: deal.color }}
              >
                {deal.discount}
              </div>

              <h3 className="font-black text-2xl text-[var(--color-text)] dark:text-[var(--color-dark-text)] mb-3">
                {deal.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] leading-relaxed mb-6">
                {deal.description}
              </p>

              <div className="flex-between">
                <a
                  href="#"
                  className="text-sm font-bold transition-colors duration-300"
                  style={{ color: deal.color }}
                >
                  Shop now →
                </a>
                <span className="text-xs text-[var(--color-text-muted)] dark:text-[var(--color-dark-text-muted)]">
                  {deal.expiry}
                </span>
              </div>

              {/* Decorative blob */}
              <div
                className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: deal.color }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 rounded-3xl overflow-hidden relative p-10 lg:p-14 text-center"
          style={{ background: 'linear-gradient(135deg, #1428a0 0%, #0891b2 50%, #00c8ff 100%)' }}
        >
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">Mobile Money Ready</p>
            <h3 className="font-black text-3xl lg:text-5xl text-white mb-4">
              Pay with MTN MoMo or Orange Money
            </h3>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              All purchases can be completed with your favourite mobile money wallet. No card needed.
            </p>
            <Button variant="white" size="lg">Shop with Mobile Money</Button>
          </div>
          {/* Background circles */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white opacity-5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white opacity-5 translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </section>
  )
}
